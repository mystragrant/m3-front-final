/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import {
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { useState } from "react";
import {
  casperService,
  DEPLOY_TTL_MS,
  NETWORK_NAME,
} from "../../../../../constants";
import { CASPER_MARKETPLACE_ADDRESS } from "../../../../../constants/marketplace";
import { toMotes } from "../../../../../helpers/misc";
import { loadWasmFileAsUint8Array } from "../../../../../pages/marketplace/MarketplaceItemPage";
import { useMultiWalletProvider } from "../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useTxQueue } from "../../../../../providers/useTxQueue/useTxQueue";
import { InputWrapper } from "../../../../shared/containers/InputWrapper";
import { CustomModal } from "../../../../shared/CustomModal/customModal";
import {
  NETWORK,
  WalletSelector,
} from "../../../../shared/WalletSelector/walletSelector";

export const OfferModal = ({
  isOpen,
  onOpen,
  tokenId,
  network,
  onClose,
  address,
}: {
  isOpen: boolean;
  onOpen: () => void;
  tokenId: any;
  network: any;
  onClose: () => void;
  address: string;
}) => {
  const { borderPrimary, textSecondary } = useThemeProvider();
  const {
    getCasperKey,
    signCasper,
    selectedCasperProvider,
    requestConnection,
    putDeployUniversal,
  } = useMultiWalletProvider();

  const [loading, setLoading] = useState<boolean>();

  const { addToQueue, deleteFromQueue, pushToDeleteQueue } = useTxQueue();

  const [listingType, setListingType] = useState<string>("listing");

  const [price, setPrice] = useState<number>(0);
  const [durationInMinutes, setDurationInMinutes] = useState<number>(1440);

  const makeOffer = async () => {
    let pubKey = " ";
    if(loading) return;
    setLoading(true);

    try {
      pubKey = await getCasperKey();

      const runtimeArgs = RuntimeArgs.fromMap({
        token_id: CLValueBuilder.u256(Number(tokenId)),
        offer_contract_hash: CLValueBuilder.string("contract-" + address),
        marketplace_hash: CLValueBuilder.string(
          "contract-" + CASPER_MARKETPLACE_ADDRESS,
        ),
        amount: CLValueBuilder.u512(toMotes(price)),
        duration_minutes: CLValueBuilder.u64(durationInMinutes),
      } as any);

      console.log(pubKey);

      const deployParams = new DeployUtil.DeployParams(
        CLPublicKey.fromHex(pubKey),
        NETWORK_NAME,
        1,
        DEPLOY_TTL_MS,
      );

      const payment = DeployUtil.standardPayment(toMotes(10));

      const deploy = DeployUtil.makeDeploy(
        deployParams,
        DeployUtil.ExecutableDeployItem.newModuleBytes(
          await loadWasmFileAsUint8Array("make-offer-call.wasm"),
          runtimeArgs,
        ),
        payment,
      );

      try {
        if (deploy) {
          const deployJson = DeployUtil.deployToJson(deploy);

          signCasper(deployJson)
            .then((res: any) => {
              console.log(res);

              putDeployUniversal(res, deploy as any, pubKey)
                .then((res: any) => {
                  console.log(res);

                  casperService.waitForDeploy(res).then((r) => {
                    onClose()
                  });
                })
                .catch((e: any) => {
                  setLoading(false);
                });
            })
            .catch((e: any) => {
              console.log(e);
              setLoading(false);
            });
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      requestConnection();
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        body={
          <>
            {loading ? (
              <Flex
                w="100%"
                py="70px"
                flexDir="column"
                justify="center"
                align="center"
                gap="10px"
              >
                <Spinner color="brandSecondary.500" />
                <Box>Processing...</Box>
              </Flex>
            ) : (
              <>
               

                <Flex flexDir="column" gap="12px">
                  <InputWrapper label="Price:">
                    <Input
                      fontSize="14px"
                      fontFamily="Space Mono"
                      value={price}
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                      }}
                    />
                  </InputWrapper>
                  <InputWrapper label="Duration:">
                    <Select
                      placeholder="Select option"
                      value={durationInMinutes}
                      onChange={(v) =>
                        setDurationInMinutes(Number(v.target.value))
                      }
                    >
                      <option value={2}>2 Minutes</option>
                      <option value={1440}>1 Day</option>
                      <option value={1440 * 3}>3 Days</option>
                      <option value={1440}>Week</option>
                      <option value={1440 * 30}>Month</option>
                    </Select>
                  </InputWrapper>
                </Flex>
                <Divider my="16px" /> 
                <Flex flexDir="column">
                  <Button
                    fontWeight="normal"
                    bg="#EFEFEF"
                    color="black"
                    fontFamily="Inter"
                    onClick={makeOffer}
                  >
                    Make offer
                  </Button>
                </Flex>
                {(network == "casper" || network == "casper-test") && (
                  <WalletSelector
                    network={NETWORK.CASPER}
                    isOpen={selectedCasperProvider == null}
                    onClose={() => {}}
                  />
                )}
              </>
            )}
          </>
        }
        header="Make Offer"
      />
    </>
  );
};
