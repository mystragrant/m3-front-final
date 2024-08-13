import { ArrowUpIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Link,
  Select,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  casperClient,
  CASPER_BLOCK_EXPLORER_BASE_URL,
  isTestnet,
} from "../../../../constants";
import {
  CASPERARMY_VALIDATOR_ADDRESS,
  CSPR_AUCTION_DELEGATE_FEE,
  CSPR_AUCTION_UNDELEGATE_FEE,
  ENTRY_POINT_DELEGATE,
  ENTRY_POINT_UNDELEGATE,
  MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR,
} from "../../../../constants/staking";
import { useEffectOnce } from "../../../../hooks/useEffectOnce";
import { useCasperWallet } from "../../../../providers/CasperWalletProvider/casperWalletProvider";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";
import { WalletProvider } from "../../../../providers/MultiWalletProvider/reducer";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { CasperArmyNodeAPI } from "../../../../services/casperarmy-api/node";
import { MystraAPI } from "../../../../services/mystra-api";
import { getStakeDeploy } from "../../../../services/staking";
import { abbrNum } from "../../../../utils";
import { trimHash } from "../../../../utils/utils";
import { CardContainer } from "../../../shared/containers/cardContainer";
import { DefaultInput } from "../../../shared/inputs/defaultInput";
import { TraitItem } from "../../../shared/TraitItem/traitItem";
import { SectionHeader } from "../../../shared/typography/sectionHeader";
import {
  NETWORK,
  WalletSelector,
} from "../../../shared/WalletSelector/walletSelector";
import { CalculatorItem } from "./CalculatorItem/calculatorItem";
import { StakeModal } from "./StakeModal/stakeModal";
import { ValidatorAddress } from "./ValidatorAddress/validatorAddress";
import {
  TxType,
  useTxQueue,
} from "../../../../providers/useTxQueue/useTxQueue";

export enum StakeStage {
  NONE,
  SIGN,
  DEPLOY,
  FINISH,
}

export const StakeForm = () => {
  const [stakeAmount, setStakeAmount] = useState<number>(500);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fee, setFee] = useState<number>(0);
  const [stage, setStage] = useState<StakeStage>(StakeStage.NONE);
  const [entryPoint, setEntryPoint] = useState<string>(ENTRY_POINT_DELEGATE); // Delegate or undelegate
  const {
    casper_public_key_wallet: casper_wallet,
    cspr_staked_on_mysta_casper_node,
    isLogged,
  } = useUserProvider();
  const [balance, setBalance] = useState<number>(0);

  const { txQueue } = useTxQueue();

  const currentlyDelegating = useMemo(() => {
    let sum = 0;
    for (const tx of txQueue.filter(
      (item) => item.type == TxType.STAKE && item.finished == false,
    )) {
      sum += Number(tx.value);
    }

    return sum;
  }, [txQueue]);

  const currentlyUndelegating = useMemo(() => {
    let sum = 0;
    for (const tx of txQueue.filter(
      (item) => item.type == TxType.UNSTAKE && item.finished == false,
    )) {
      sum += Number(tx.value);
    }

    return sum;
  }, [txQueue]);

  const navigate = useNavigate();

  useEffect(() => {
    if (casper_wallet != "") {
      MystraAPI.getCSPRBalance(casper_wallet).then((res) => {
        setBalance(res.data);
      });
    }
  }, [casper_wallet, currentlyDelegating]);

  // useEffect(() => {
  //   if (stakeAmount < MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR) {
  //     setError(`Minimum value is ${MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR}`);
  //   } else if (stakeAmount > balance) {
  //     setError(`You don't have enough CSPR`);
  //   } else {
  //     setError(null);
  //   }
  // }, [stakeAmount, balance]);

  const showConfirmModal = () => {
    if (error != null) return;
    setStage(StakeStage.NONE);
    onOpen();
  };

  const {
    signCasper,
    getCasperKey,
    selectedCasperProvider,
    putDeployUniversal,
    requestConnection,
    selectCasperProvider,
  } = useMultiWalletProvider();

  const { addToQueue } = useTxQueue();

  const [pubKeyError, setPubKeyError] = useState<string>("");
  const [txCancelled, setTxCancelled] = useState<boolean>(false);

  const handleSubmit = async (action: string) => {
    let pubKey = "";
    setTxCancelled(false);

    try {
      pubKey = await getCasperKey();
      setPubKeyError("");

      if (pubKey != casper_wallet) {
        if (selectedCasperProvider == WalletProvider.CASPER_WALLET) {
          await (window as any)
            .CasperWalletProvider()
            .requestSwitchAccount(pubKey);

          const newPubKey = await getCasperKey();
          if (newPubKey != casper_wallet) {
            setPubKeyError("Change account to " + trimHash(casper_wallet));
            return;
          }
        } else {
          setPubKeyError("Change account to " + trimHash(casper_wallet));
          return;
        }
      }

      setStage(StakeStage.SIGN);
      const deploy = await getStakeDeploy(
        pubKey,
        CASPERARMY_VALIDATOR_ADDRESS,
        action == ENTRY_POINT_DELEGATE
          ? CSPR_AUCTION_DELEGATE_FEE
          : CSPR_AUCTION_UNDELEGATE_FEE,
        stakeAmount,
        entryPoint,
      );

      const deployJson = DeployUtil.deployToJson(deploy);

      signCasper(deployJson)
        .then(async (signature: any) => {
          console.log(signature);
          if (signature.cancelled) {
            setTxCancelled(true);
          }
          putDeployUniversal(signature, deploy, pubKey)
            .then((signed) => {
              setStage(StakeStage.FINISH);

              console.log(signed);

              setBalance(
                (prev) =>
                  prev -
                  (action == ENTRY_POINT_DELEGATE
                    ? CSPR_AUCTION_DELEGATE_FEE + stakeAmount
                    : CSPR_AUCTION_UNDELEGATE_FEE - stakeAmount),
              );

              addToQueue(
                signed,
                action == ENTRY_POINT_DELEGATE
                  ? "Delegate CSPR"
                  : "Undelegate CSPR",
                stakeAmount.toString(),
                isTestnet ? "casper-test" : "casper",
                action == ENTRY_POINT_DELEGATE ? TxType.STAKE : TxType.UNSTAKE,
              );

              selectCasperProvider(null);
            })
            .catch((e) => {
              console.log(e);

              setStage(StakeStage.NONE);
              selectCasperProvider(null);
            });
        })
        .catch((e: any) => {
          selectCasperProvider(null);
          console.log(e);
          onClose();
        });
    } catch {
      selectCasperProvider(null);
      onClose();
      setStage(StakeStage.NONE);
      requestConnection();
    }
  };

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const { textSecondary, backgroundTertiary } = useThemeProvider();

  const [stakingMode, setStakingMode] = useState<string>("staking");
  const [amountError, setAmountError] = useState<boolean>(false);
  const [tooLowError, setTooLowError] = useState<boolean>(false);

  const [apy, setAPY] = useState<number>(0);

  const fetchAndUpdateData = () => {
    MystraAPI.getCasperNodeInfo()
      .then((res) => {
        console.log("node", res);
        const nodeDetails = res.data.node_details[0];

        setAPY(nodeDetails.node_apy ?? 0);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  useEffect(() => {
    if (stakeAmount < 500) {
      setTooLowError(true);
    } else {
      setTooLowError(false);
    }
    if (stakingMode == "staking") {
      if (stakeAmount > balance) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    } else {
      if (stakeAmount > cspr_staked_on_mysta_casper_node) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    }
  }, [stakeAmount]);

  useEffect(() => {
    setStakeAmount(0);
  }, [stakingMode]);

  return (
    <>
      <Flex flexDir="column" gap="24px">
        <Flex flexDir="column">
          <Box fontSize="24px" fontFamily="Inter">
            Stake your CSPR
          </Box>
          <Box fontFamily="Inter" fontSize="14px" color={textSecondary}>
            Delegating your CSPR tokens allows you to actively participate in
            the Casper Network and earn rewards. You contribute to network
            security while reaping the rewards!
          </Box>
        </Flex>
        <Flex
          mt="10px"
          flexDir="column"
          fontFamily="Inter"
          fontSize="14px"
          gap="8px"
        >
          <Box>Selected Network</Box>
          <ValidatorAddress apy={apy} />
        </Flex>

        <Flex
          opacity={isLogged && casper_wallet != "" ? 1 : 0.4}
          flexDir="column"
          fontFamily="Inter"
          fontSize="14px"
          gap="8px"
        >
          <Box>Your wallet state</Box>
          <Grid
            templateColumns="auto 1fr"
            bg="brandSecondary.500"
            border="1px solid"
            borderRadius="2px"
            pos="relative"
            overflow="hidden"
            h="8px"
            borderColor="brandSecondary.500"
          >
            <Box
              h="8px"
              right="0"
              pos="absolute"
              bg="repeating-linear-gradient(
                90deg,
                #171717,
                #171717 2px,
                #29A57FCC 2px,
                #29A57FCC 4px
              )"
              w={`${
                (cspr_staked_on_mysta_casper_node /
                  (cspr_staked_on_mysta_casper_node + balance)) *
                100
              }%`}
            />
          </Grid>
          <Flex flexDir="column">
            <Flex justify="space-between" fontFamily="Inter" fontSize="12px">
              <Flex align="center" gap="6px">
                <Box color={textSecondary}>Available: </Box>
                <Box fontFamily="Space Mono">
                  {balance - currentlyDelegating} CSPR
                </Box>
                {currentlyDelegating > 0 && (
                  <Box color={textSecondary}>
                    {"(" + currentlyDelegating + " delegating)"}
                  </Box>
                )}
              </Flex>

              <Flex align="center " gap="6px">
                <Box color={textSecondary}>Staked: </Box>
                <Box fontFamily="Space Mono">
                  {cspr_staked_on_mysta_casper_node} CSPR
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* <Grid templateColumns="1fr 1fr" gap="16px">
          <TraitItem
            label={"Available"}
            value={
              casper_wallet != ""
                ? balance + " CSPR"
                : "No Casper Wallet Linked"
            }
            description={""}
          />
          <TraitItem
            label={"Already staked"}
            value={cspr_staked_on_mysta_casper_node + " CSPR"}
            description={""}
          />
        </Grid> */}
        <Box h="1px" bg={borderColor} my="10px"></Box>
        <Flex flexDir="column" gap="9px">
          <Box fontSize="14px" fontFamily="Inter">
            Stake or undelegate your assets
          </Box>
          <Grid
            templateColumns="140px 200px 1fr auto"
            gap="10px"
            pos="relative"
          >
            <Select
              fontSize="14px"
              fontFamily="Inter"
              onChange={(e) => setStakingMode(e.target.value)}
            >
              <option value={"staking"}>Delegate</option>
              <option value="undelegate">Undelegate</option>
            </Select>
            <Input
              onChange={(e) =>
                setStakeAmount(
                  Number(e.target.value) > 12104571023
                    ? 12104571023
                    : Number(e.target.value),
                )
              }
              type="number"
              disabled={casper_wallet == ""}
              value={stakeAmount.toString()}
              min="500"
              _focus={{
                boxShadow: "none",
                outline: "none",
                borderColor: amountError ? "error.500" : borderColor,
              }}
              borderColor={amountError ? "error.500" : borderColor}
              placeholder={"min 500 cspr"}
              max={
                stakingMode == "staking"
                  ? balance
                  : cspr_staked_on_mysta_casper_node
              }
            />
            <Flex flexDir="column" justify="center">
              <Box
                fontSize="14px"
                fontFamily="Inter"
                color={amountError ? "error.500" : textSecondary}
              >
                {stakingMode == "staking" ? "Available" : "Staking"}
              </Box>
              <Box fontSize="12px" fontFamily="Space Mono">
                {stakingMode == "staking"
                  ? balance
                  : cspr_staked_on_mysta_casper_node}{" "}
                CSPR
              </Box>
            </Flex>
            {isLogged && casper_wallet ? (
              <>
                {stakingMode == "staking" && (
                  <Button
                    _hover={{ opacity: 0.7 }}
                    padding="0px 20px"
                    fontWeight="normal"
                    disabled={amountError == true || tooLowError}
                    fontSize="12px"
                    fontFamily="Inter"
                    bg="white"
                    color="black"
                    onClick={() => {
                      setFee(CSPR_AUCTION_DELEGATE_FEE);
                      setEntryPoint(ENTRY_POINT_DELEGATE);
                      showConfirmModal();
                    }}
                  >
                    Confirm
                  </Button>
                )}
                {stakingMode != "staking" && (
                  <Button
                    _hover={{ bg: borderColor, color: "white" }}
                    padding="0px 20px"
                    border="1px solid"
                    disabled={amountError == true || tooLowError}
                    borderColor={borderColor}
                    variant="ghost-dark"
                    fontWeight="normal"
                    fontSize="12px"
                    fontFamily="Inter"
                    bg="white"
                    color="black"
                    onClick={() => {
                      setFee(CSPR_AUCTION_UNDELEGATE_FEE);
                      setEntryPoint(ENTRY_POINT_UNDELEGATE);
                      showConfirmModal();
                    }}
                  >
                    Confirm
                  </Button>
                )}
              </>
            ) : (
              <Flex
                onClick={() => {
                  isLogged && casper_wallet == ""
                    ? navigate("/account/verification")
                    : navigate("/staking?login=true");
                }}
                padding="0px 20px"
                cursor="pointer"
                borderRadius="8px"
                align="center"
                color="black"
                justify="center"
                bg="white"
                fontSize="12px"
                fontWeight="normal"
              >
                {isLogged && casper_wallet == ""
                  ? "Link Casper First"
                  : "Log in first"}
              </Flex>
            )}
          </Grid>
        </Flex>
      </Flex>

      <Flex align="center" h="30px" mt="10px">
        {tooLowError && stakeAmount != 0 && (
          <Box fontFamily="Inter" fontSize="14px" color="error.500">
            Minimum amount is 500 CSPR
          </Box>
        )}
      </Flex>
      {stakingMode == "undelegate" && (
        <Flex
          fontSize="14px"
          color={textSecondary}
          align="center"
          gap="10px"
          fontFamily="Inter"
        >
          <WarningIcon /> Note that funds may return to your wallet even after
          few hours.
        </Flex>
      )}
      <Box fontFamily="Inter" fontSize="14px" mt="14px" mb="10px">
        Predicted rewards
      </Box>
      <Flex
        border="1px solid"
        borderColor={borderColor}
        borderBottom="none"
        fontSize="14px"
        justify="space-between"
        fontFamily="Inter"
        padding="8px 20px"
      >
        <Flex align="center" w="50px" color={textSecondary}>
          Time
        </Flex>
        <Flex align="center" w="200px" color={textSecondary}>
          CSPR
        </Flex>
        <Flex align="center" w="170px" color={textSecondary}>
          Points
        </Flex>
      </Flex>
      <CalculatorItem
        label="Daily"
        csprStaked={cspr_staked_on_mysta_casper_node}
        stakeAmount={
          stakingMode == "staking"
            ? stakeAmount > balance
              ? stakeAmount
              : stakeAmount
            : stakeAmount > cspr_staked_on_mysta_casper_node
              ? cspr_staked_on_mysta_casper_node
              : stakeAmount
        }
        stakingMode={stakingMode}
        divide={365}
        balance={balance}
        apy={apy}
      />
      <CalculatorItem
        label="Monthly"
        csprStaked={cspr_staked_on_mysta_casper_node}
        stakeAmount={
          stakingMode == "staking"
            ? stakeAmount > balance
              ? stakeAmount
              : stakeAmount
            : stakeAmount > cspr_staked_on_mysta_casper_node
              ? cspr_staked_on_mysta_casper_node
              : stakeAmount
        }
        stakingMode={stakingMode}
        divide={12}
        balance={balance}
        apy={apy}
      />
      <CalculatorItem
        label="Yearly"
        csprStaked={cspr_staked_on_mysta_casper_node}
        stakeAmount={
          stakingMode == "staking"
            ? stakeAmount > balance
              ? stakeAmount
              : stakeAmount
            : stakeAmount > cspr_staked_on_mysta_casper_node
              ? cspr_staked_on_mysta_casper_node
              : stakeAmount
        }
        stakingMode={stakingMode}
        divide={1}
        balance={balance}
        apy={apy}
      />
      <Box borderTop="1px solid" borderColor={borderColor} mb="40px" />
      <StakeModal
        amount={Number(stakeAmount)}
        cancelled={txCancelled}
        fee={Number(fee)}
        isOpen={isOpen && selectedCasperProvider != null}
        onClose={() => {
          onClose();
          setPubKeyError("");
          selectCasperProvider(null);
        }}
        onSubmit={() => handleSubmit(entryPoint)}
        error={pubKeyError}
        stage={stage}
      />
      <WalletSelector
        network={NETWORK.CASPER}
        onClose={onClose}
        isOpen={
          isOpen && selectedCasperProvider == null && stage != StakeStage.FINISH
        }
      />
    </>
  );
};
