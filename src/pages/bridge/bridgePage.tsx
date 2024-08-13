import {
  Box,
  Button,
  Flex,
  Text,
  Grid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

import { PageContainer } from "../../components/shared/containers/pageContainer";
import { SmallHeader } from "../../components/shared/typography/smallHeader";

import { useNetworkInfo } from "../../hooks/bridge/useNetwork";
import { useTokenBalanceCallback } from "../../hooks/bridge/useTokenBalance";
import { getTokensFromConfig, toPlainString, toWei } from "../../utils";
import networks from "../../config/networks.json";
import Network from "../../type/Network";
import { useBridgeContract } from "../../hooks/useContract";
import { useBridgeAddress } from "../../hooks/bridge/useBridgeAddress";
import Token from "../../type/Token";
import Web3 from "web3";
import {
  CasperClient,
  CLPublicKey,
  CLValueBuilder,
  decodeBase16,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";

import {
  ApprovalState,
  useApproveCallback,
} from "../../hooks/bridge/useApproveCallback";
import { contractSimpleGetter } from "casper-js-client-helper/dist/helpers/lib";

import TransactionsTable from "../../components/pages/bridge/TransactionsTable";
import { isTestnet, NATIVE_TOKEN_ADDRESS } from "../../constants";
import { CustomSelect } from "../../components/shared/inputs/CustomSelect/customSelect";
import { DefaultInput } from "../../components/shared/inputs/defaultInput";
import { useMultiWalletProvider } from "../../providers/MultiWalletProvider/multiWalletProvider";
import {
  NETWORK,
  WalletSelector,
} from "../../components/shared/WalletSelector/walletSelector";
import { useUserProvider } from "../../providers/User/userProvider";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { useNavigate } from "react-router";
import { CustomCheckbox } from "../../components/shared/inputs/CustomCheckbox/customCheckbox";
import { WalletType } from "../../components/global/TopMenu/ConnectWallet/modes/shared/ProceedView/proceedView";

export const BridgePage = () => {
  const { isLogged, evm_wallet: account } = useUserProvider();

  const [walletType, setWalletType] = useState<WalletType>(WalletType.METAMASK);

  const [myTxn, setMyTxn] = useState<boolean>(false);
  const [asset, setAsset] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  const [selectedToken, setSelectedToken] = useState<Token | undefined>(
    undefined,
  );

  const [tokenList, setTokenList] = useState<Array<any>>([]);
  const [ethereum, setEthereum] = useState<any | null>(null);

  useEffect(() => {
    console.log("tokens", tokenList);
  }, [tokenList]);

  const { signCasper, getCasperKey, selectedCasperProvider } =
    useMultiWalletProvider();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setFetching] = useState(false);

  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const [chainId, setChainId] = useState<number | null>(null);

  useMemo(async () => {
    if ((window as any).ethereum) {
      setEthereum((window as any).ethereum);
      setChainId(
        Number(
          await (window as any).ethereum.request({ method: "eth_chainId" }),
        ),
      );
      (window as any).ethereum.on("chainChanged", (_chainId: string) => {
        setChainId(Number(_chainId));
      });
    }
  }, []);

  useEffect(() => {
    setSelectedToken(undefined);
    if (asset <= 0) return;
    setSelectedToken(tokenList[asset - 1]);
    console.log("token", tokenList[asset - 1]);
  }, [asset]);

  useEffect(() => {
    selectedToken && loadTokenBalance();
  }, [selectedToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const _tokenList = await getTokensFromConfig(from);
        // _tokenList = _tokenList.filter(t => t.address !== NATIVE_TOKEN_ADDRESS);
        setTokenList(_tokenList);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [from]);

  const sourceNetwork = useNetworkInfo(from);
  const targetNetwork = useNetworkInfo(to);

  const [evmAddress, setEvmAddress] = useState<string>("");

  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const tokenBalanceCallback = useTokenBalanceCallback(
    selectedToken ? selectedToken.address : undefined,
    selectedToken ? selectedToken.decimals : undefined,
    account,
    sourceNetwork,
  );

  const loadTokenBalance = async () => {
    setIsLoadingBalance(true);
    const _tokenBalance = await tokenBalanceCallback();
    setTokenBalance(_tokenBalance);
    setIsLoadingBalance(false);
  };

  const bridgeAddress = useBridgeAddress(from);
  const bridgeContract = useBridgeContract(bridgeAddress);

  const [approval, approveCallback] = useApproveCallback(
    toWei(Number(tokenAmount), selectedToken?.decimals),
    selectedToken,
    sourceNetwork?.chainId,
    bridgeAddress,
  );
  const [needApprove, setNeedApprove] = useState(true);

  const handleAssetChange = (val: any) => {
    setAsset(Number(val));
  };

  const handleToChange = (val: any) => {
    setAsset(0);

    if (networks.find((item) => item.chainId == val)?.notEVM) {
      setRecipient("");
    } else {
      setRecipient(evmAddress);
    }

    setTo(Number(val));
  };

  const handleFromChange = async (val: any) => {
    const changeTo = Number(val);

    if (!networks.find((item) => item.chainId == val)?.notEVM) {
      if (
        walletType === WalletType.METAMASK &&
        !(await changeNetwork(changeTo))
      ) {
        val = from.toString();
        return;
      }
    }

    setTo(0);
    setAsset(0);
    setTokenList([]);

    setFrom(changeTo);
  };

  const setMax = () => {
    setTokenAmount(isLoadingBalance ? 0 : tokenBalance);
  };

  const submitBridge = async () => {
    setErrorMessage(null);
    setResultMessage(null);

    let error = false;

    if (!error && !to) {
      setErrorMessage(
        "You must specify destination network before sending to bridge.",
      );
      error = true;
    }
    if (!error && !from) {
      setErrorMessage(
        "You must specify from network before sending to bridge.",
      );
      error = true;
    }

    if (!error && !from) {
      setErrorMessage(
        "You must specify from network before sending to bridge.",
      );
      error = true;
    }

    if (!error && from === to) {
      setErrorMessage("Can't transfer to the same network");
      error = true;
    }
    if (!error) {
      if (networks.find((item) => item.chainId == from)?.notEVM) {
        transferFromCasper();
      } else {
        if (await changeNetwork(from)) {
          transferFromEVM();
        } else {
          setErrorMessage("Change network failed.");
          error = true;
        }
      }
    }
  };

  const genRanHex = (size: number) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const [success, setSuccess] = useState<string>("");

  const transferFromCasper = async () => {
    try {
      setIsLoading(true);

      const publicKey = await getCasperKey();

      if (selectedToken && sourceNetwork && bridgeContract) {
        const decimal = selectedToken ? selectedToken.decimals : 18;
        const value = toWei(Number(tokenAmount), decimal);

        const senderKey = CLPublicKey.fromHex(publicKey);

        const deployParams = new DeployUtil.DeployParams(
          senderKey,
          sourceNetwork?.key ?? "casper-test",
          1,
          1800000,
        );

        const contractHash = selectedToken.address;
        console.log(contractHash);
        const contractHashAsByteArray = decodeBase16(contractHash);

        const id = genRanHex(64).toLowerCase();

        const fee = await contractSimpleGetter(
          sourceNetwork.rpcURL,
          contractHash,
          ["swap_fee"],
        );

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            contractHashAsByteArray,
            "request_bridge_back",
            RuntimeArgs.fromMap({
              amount: CLValueBuilder.u256(toPlainString(value)),
              fee: CLValueBuilder.u256(fee),
              to_chainid: CLValueBuilder.u256(
                targetNetwork ? targetNetwork.chainId.toString() : "42",
              ),
              receiver_address: CLValueBuilder.string(recipient),
              id: CLValueBuilder.string(id),
            }),
          ),
          DeployUtil.standardPayment(400000000),
        );

        const json = DeployUtil.deployToJson(deploy);
        const casperClient = new CasperClient(sourceNetwork.rpcURL);

        // Sign transcation using casper-signer.

        signCasper(json).then((sign: any) => {
          console.log(sign);
        });

        const signature = await window.casperlabsHelper.sign(
          json,
          publicKey,
          publicKey,
        );

        const deployObject = DeployUtil.deployFromJson(signature);

        let deployRes;
        if (deployObject.val instanceof DeployUtil.Deploy) {
          deployRes = await casperClient.putDeploy(deployObject.val);
        }

        if (deployRes) {
          setSuccess(
            "Please wait a few minutes to see ERC20 token in your wallet",
          );
          // toast.success(
          //   <ToastMessage
          //     color="success"
          //     headerText="Success!"
          //     bodyText="Please wait a few minutes to see ERC20 token in your wallet"
          //   />,
          //   {
          //     toastId: "onTransferToken",
          //   }
          // );

          loadTokenBalance();
          setTokenAmount(0);
        } else {
          setErrorMessage("Invalid signature");
          // toast.error(
          //   <ToastMessage
          //     color="danger"
          //     headerText="Error!"
          //     bodyText="Invalid signature"
          //   />,
          //   {
          //     toastId: "onTransferToken",
          //   }
          // );
          setIsLoading(false);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // we only care if the error is something _other_ than the user rejected the tx
      if (error?.code !== 4001) {
        const message = `Could not transfer this token to our bridge. Please try again.`;
        setErrorMessage(message);
        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText={message}
        //   />,
        //   {
        //     toastId: "onTransferToken",
        //   }
        // );
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const transferFromEVM = async () => {
    let accountHash = "";
    if (targetNetwork?.notEVM) {
      try {
        accountHash = CLPublicKey.fromHex(recipient).toAccountHashStr();
      } catch (error) {
        setErrorMessage("Wrong address.");
        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText="Wrong address."
        //   />,
        //   {
        //     toastId: "inputCasperAddress",
        //   }
        // );
        return;
      }
    }
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      setIsLoading(true);
      if (selectedToken && sourceNetwork && targetNetwork && bridgeContract) {
        const amountInWei = toWei(Number(tokenAmount), selectedToken.decimals);
        let value = 0;

        if (account && selectedToken.address === NATIVE_TOKEN_ADDRESS) {
          value = amountInWei.toNumber();
        }

        const web3 = new Web3(ethereum);
        let encoded = web3.eth.abi.encodeParameters(
          ["string"],
          [recipient?.toLowerCase()],
        );

        if (targetNetwork.notEVM) {
          encoded = web3.eth.abi.encodeParameters(
            ["string"],
            [accountHash.toLowerCase()],
          );
        }

        const receipt = await bridgeContract.methods
          .requestBridge(
            selectedToken.address,
            encoded,
            amountInWei.toString(10),
            targetNetwork.chainId,
          )
          .send({
            // chainId: toHex(sourceNetwork.chainId),
            from: accounts[0],
            value: value.toString(),
          });
        //}

        if (receipt) {
          setSuccess(
            "Success. After few minutes you will be able to claim your tokens using table on the right.",
          );
          // toast.success(
          //   <ToastMessage
          //     color="success"
          //     headerText="Success!"
          //     bodyText={`Now you can claim your ${selectedToken.symbol} on ${targetNetwork.name}.`}
          //     link={`${sourceNetwork.explorer}${sourceNetwork.txUrl}${receipt.transactionHash}`}
          //     linkText="View Transaction"
          //   />,
          //   {
          //     toastId: "onTransferToken",
          //   }
          // );

          loadTokenBalance();
          setTokenAmount(0);

          // // Reset approve state
          // if (!infinityApprove) {
          setNeedApprove(true);
          // }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // we only care if the error is something _other_ than the user rejected the tx
      if (error?.code !== 4001) {
        const message = `Could not transfer this token to our bridge. Please try again.`;
        setErrorMessage(message);
        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText={message}
        //   />,
        //   {
        //     toastId: "onTransferToken",
        //   }
        // );
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveToken = async (infinity?: boolean) => {
    try {
      if (!targetNetwork)
        if (!(await changeNetwork(from)))
          // toast.warn(
          //   <ToastMessage
          //     color="info"
          //     headerText="Warning"
          //     bodyText={`You must specify target network.`}
          //   />,
          //   {
          //     toastId: "onApprove",
          //   }
          // );
          return;
      if (selectedToken && targetNetwork) {
        const receipt = await approveCallback(infinity);

        if (receipt) {
          // toast.success(
          //   <ToastMessage
          //     color="success"
          //     headerText="Success!"
          //     bodyText={`Now you can transfer your ${selectedToken.symbol} to ${targetNetwork.name}.`}
          //   />,
          //   {
          //     toastId: "onApprove",
          //   }
          // );
          setNeedApprove(false);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // we only care if the error is something _other_ than the user rejected the tx
      if (error?.code !== 4001) {
        const message = `Could not approve this token. Please try again.`;
        setErrorMessage(message);
        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText={message}
        //   />,
        //   {
        //     toastId: "onApprove",
        //   }
        // );
      } else {
        setErrorMessage("Token approve failed.");
        // toast.error(
        //   <ToastMessage
        //     color="danger"
        //     headerText="Error!"
        //     bodyText="Token approve failed."
        //   />,
        //   {
        //     toastId: "onApprove",
        //   }
        // );
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onApprove = async () => {
    setIsLoading(true);
    await approveToken();
  };

  const changeNetwork = async (changeTo: number) => {
    try {
      // check if the chain to connect to is installed
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + changeTo.toString(16) }], // chainId must be in hexadecimal numbers
      });

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setEvmAddress(accounts[0]);
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          const netInfo = networks.find(
            (n) => n.chainId === changeTo,
          ) as Network;

          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + changeTo.toString(16),
                rpcUrls: [netInfo?.rpcURL],
                chainName: netInfo?.name,
                nativeCurrency: netInfo?.nativeCurrency,
                blockExplorerUrls: [netInfo?.explorer],
              },
            ],
          });

          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          setEvmAddress(accounts[0]);
        } catch (addError) {
          console.error(addError);
        }
      }
    }

    if (
      Number(await ethereum.request({ method: "eth_chainId" })) !== changeTo
    ) {
      return false;
    }
    return true;
  };

  const [isRecipientValid, setIsRecipientValid] = useState<boolean>(false);

  useEffect(() => {
    if (networks.find((item) => item.chainId == to)?.notEVM) {
      let valid = true;

      if (recipient.length != 68 && recipient.length != 66) {
        valid = false;
      }

      const startingWith = recipient.slice(0, 2);

      if (startingWith != "01" && startingWith != "02") {
        valid = false;
      }

      setIsRecipientValid(valid);
    } else {
      setIsRecipientValid(ethers.utils.isAddress(recipient));
    }
  }, [recipient]);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const { backgroundPrimary, borderPrimary, textPrimary, textSecondary } =
    useThemeProvider();

  return (
    <>
      <WalletSelector
        network={NETWORK.CASPER}
        onClose={onClose}
        isOpen={isOpen && selectedCasperProvider == null}
      />

      <PageContainer noBottomMargin noTopMargin>
        <Grid templateColumns=" 1fr 700px" gap="60px" fontFamily="Inter">
          <Flex flexDir="column" mt="40px" zIndex={1} pos="relative" pb="40px">
            <Flex flexDir="column" mb="40px">
              <Box fontSize="24px" fontFamily="Inter">
                Bridge your tokens
              </Box>
              <Box fontFamily="Inter" fontSize="14px" color={textSecondary}>
                Mystra Bridge is your ultimate solution for effortless, secure,
                and swift token transfers between the EVM and the Casper Network
              </Box>
            </Flex>
            <Flex flexDir="column" justifyContent="flex-start" gridGap="25px">
              <Flex flexDir="column" gridGap="12px">
                <SmallHeader>Departure blockchain</SmallHeader>
                <CustomSelect
                  onChange={handleFromChange}
                  selectedValue={from}
                  heading={"Select departure blockchain"}
                  description={
                    networks.find((item) => item.chainId == from)?.notEVM
                      ? ""
                      : evmAddress ?? "Loading"
                  }
                  isActive={from == 0}
                  items={networks
                    .filter((network) =>
                      network.isTestnet == isTestnet ? true : false,
                    )
                    .map((item) => {
                      return {
                        icon: item.logoURI,
                        label: item.name,
                        value: item.chainId,
                      };
                    })}
                />
              </Flex>
              <Flex flexDir="column" gridGap="12px">
                <SmallHeader>Destination blockchain</SmallHeader>
                <CustomSelect
                  onChange={handleToChange}
                  disabled={!from}
                  selectedValue={to}
                  isActive={from != 0 && to == 0}
                  heading={"Select destination blockchain"}
                  small
                  items={networks
                    .filter((item) => item.chainId != from)
                    .filter((network) =>
                      network.isTestnet == isTestnet ? true : false,
                    )
                    .map((item) => {
                      return {
                        icon: item.logoURI,
                        label: item.name,
                        value: item.chainId,
                      };
                    })}
                />
                <DefaultInput
                  onChange={(val: any) => {
                    setRecipient(val);
                  }}
                  error={
                    isRecipientValid
                      ? ""
                      : recipient != ""
                        ? "Address doesn't exist on target network"
                        : ""
                  }
                  isActive={to != 0 && !isRecipientValid}
                  disabled={to == 0}
                  placeholder={"Target wallet address"}
                  value={recipient}
                />
                <Box m="10px 0px">
                  {" "}
                  <Box>
                    Please DO NOT send you assets to Centralized Exchange (like
                    Binance) wallet. Only send to wallets where you control
                    private keys!
                  </Box>
                </Box>
              </Flex>
              <Flex flexDir="column" gridGap="12px">
                <SmallHeader>Asset</SmallHeader>
                <CustomSelect
                  heading="Select a token"
                  small
                  noIcons
                  isActive={isRecipientValid && asset == 0}
                  disabled={to == 0 || !isRecipientValid}
                  selectedValue={asset}
                  items={tokenList.map((item, index) => {
                    return {
                      icon: "",
                      label: item.name,
                      value: index + 1,
                    };
                  })}
                  onChange={handleAssetChange}
                />
              </Flex>
              <Flex flexDir="column" gridGap="12px">
                <SmallHeader>Amount</SmallHeader>
                <Grid templateColumns="1fr auto" h="50px" gap="10px">
                  <DefaultInput
                    placeholder="Transfer amount"
                    isActive={asset != 0 && Number(tokenAmount) == 0}
                    onChange={(value: any) => setTokenAmount(value)}
                    value={tokenAmount}
                    type="number"
                    disabled={asset == 0}
                  />
                  <Button
                    borderRadius="5px"
                    bg="white"
                    _hover={{ background: "white", opacity: 0.7 }}
                    onClick={
                      !isLogged
                        ? () => navigate("/bridge?login=true")
                        : networks.find((item) => item.chainId == from)
                              ?.notEVM ||
                            !selectedToken ||
                            tokenAmount === 0 ||
                            !needApprove ||
                            approval === ApprovalState.APPROVED
                          ? submitBridge
                          : onApprove
                    }
                    color="black"
                    fontSize="14px"
                    fontFamily="Inter"
                    fontWeight="normal"
                    disabled={
                      (isLoading && isLogged) ||
                      (tokenAmount == 0 && asset != 0 && isLogged)
                    }
                  >
                    {isLogged ? (
                      walletType === WalletType.CASPER_SIGNER ||
                      !selectedToken ||
                      tokenAmount === 0 ||
                      !needApprove ||
                      approval === ApprovalState.APPROVED ? (
                        !isLoading ? (
                          "Transfer to bridge"
                        ) : (
                          <Spinner color="black" />
                        )
                      ) : (
                        <div>
                          Unlock{" "}
                          {tokenAmount
                            ? `${tokenAmount} ${selectedToken?.symbol}`
                            : `${selectedToken?.symbol}`}
                        </div>
                      )
                    ) : (
                      "Login to Mystra first"
                    )}
                  </Button>
                </Grid>
              </Flex>

              {!isLoading && errorMessage && (
                <Text fontFamily="Inter" fontSize="14px" color="error.500">
                  {errorMessage}
                </Text>
              )}
              {!isLoading && success && (
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  color="brandSecondary.500"
                >
                  {success}
                </Text>
              )}
            </Flex>
            <Box
              boxSize="500px"
              pos="fixed"
              zIndex="-1"
              right="40%"
              top="100px"
              bottom="0"
              margin="auto"
              bg="white"
              pointerEvents="none"
              filter="blur(150px)"
              borderRadius="50%"
              opacity="0.03"
            ></Box>
          </Flex>
          <Flex
            overflowY="scroll"
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
            pl="40px"
            flexDir="column"
            maxH="calc(100vh - 74px)"
            pos="sticky"
            top="74px"
            minH="calc(100vh - 74px)"
            zIndex={1}
            bg={backgroundPrimary}
            borderLeft="1px solid"
            borderColor={borderPrimary}
            pt="40px"
          >
            <Flex justifyContent="space-between" mb="20px" align="center">
              <Box fontSize="24px" fontFamily="Inter">
                Latest transactions
              </Box>
              <CustomCheckbox big onChange={(val) => setMyTxn(val)}>
                Show only my transactions
              </CustomCheckbox>
            </Flex>
            <Box minH={500}>
              <TransactionsTable onlyMyTxn={myTxn} />
            </Box>
          </Flex>
        </Grid>
      </PageContainer>
    </>
  );
};
