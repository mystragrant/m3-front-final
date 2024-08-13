/* eslint-disable */

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Buffer } from "buffer";
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
} from "../../../../constants";
import {
  CASPER_MARKETPLACE_ADDRESS,
  CASPER_MARKETPLACE_PACKAGE_HASH,
} from "../../../../constants/marketplace";
import { toMotes } from "../../../../helpers/misc";
import { cepStandardToNumber } from "../../../../helpers/misc/cep";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useTxQueue } from "../../../../providers/useTxQueue/useTxQueue";
import { chainIdToName } from "../../../../utils/parser";
import { trimHash } from "../../../../utils/utils";
import { tokenStandardToNumber } from "../../../pages/marketplaceItem/ListingMenu/listingMenu";
import { CustomModal } from "../../CustomModal/customModal";
import { NETWORK, WalletSelector } from "../../WalletSelector/walletSelector";
import { InputWrapper } from "../../containers/InputWrapper";

export const PlaceListingModal = ({
  isOpen,
  onOpen,
  image,
  tokenId,
  name,
  standard,
  collection,
  network,
  onClose,
  type,
  address,
  onTransfer,
}: {
  isOpen: boolean;
  onOpen: () => void;
  tokenId: any;
  name: string;
  network: any;
  collection: string;
  standard: string;
  image: string;
  onClose: () => void;
  type: string;
  address: string;
  onTransfer: () => void;
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

  const submitApprove = async () => {
    let pubKey = "";
    setLoading(true);

    if (network == "casper" || network == "casper-test") {
      try {
        pubKey = await getCasperKey();

        const hashBytes = Buffer.from(CASPER_MARKETPLACE_PACKAGE_HASH, "hex");

        const runtimeArgs = cepStandardToNumber(type) == 1 ? RuntimeArgs.fromMap({
          operator: CLValueBuilder.key(CLValueBuilder.byteArray(hashBytes as any)),
          token_id: [CLValueBuilder.i64(tokenId)],
        } as any) : RuntimeArgs.fromMap({
          spender: CLValueBuilder.key(CLValueBuilder.byteArray(hashBytes as any)),
          token_ids: CLValueBuilder.list([CLValueBuilder.u256(tokenId)]),
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS,
        );

        const payment = DeployUtil.standardPayment(toMotes(2.5));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(address, "hex")),
            "approve",
            runtimeArgs,
          ),
          payment,
        );

        try {
          console.log(deploy);
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    console.log(res);

                    casperService.waitForDeploy(res).then(() => {
                      if (listingType == "listing") {
                        startListing();
                      } else {
                        startAuction();
                      }
                    });
                  })
                  .catch((e) => {
                    setLoading(false);
                  });
              })
              .catch((e: any) => {
                setLoading(false);
                console.log(e);
              });
          }
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        requestConnection();
      }
    }
  };

  const startListing = async () => {
    let pubKey = " ";

    if (network == "casper" || network == "casper-test") {
      try {
        pubKey = await getCasperKey();

        console.log(address);

        const runtimeArgs = RuntimeArgs.fromMap({
          contract_hash: CLValueBuilder.string("contract-" + address),
          token_id: CLValueBuilder.u256(Number(tokenId)),
          price: CLValueBuilder.u512(toMotes(price)),
          duration_minutes: CLValueBuilder.u64(durationInMinutes),
          token_standard: CLValueBuilder.u8(tokenStandardToNumber(standard)),
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS,
        );

        const payment = DeployUtil.standardPayment(toMotes(2.5));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(CASPER_MARKETPLACE_ADDRESS, "hex")),
            "create_listing",
            runtimeArgs,
          ),
          payment,
        );

        try {
          console.log(deploy);
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    casperService.waitForDeploy(res).then(() => {
                      onClose();
                    });
                  })
                  .catch((e) => {
                    setLoading(false);
                  });
              })
              .catch((e: any) => {
                setLoading(false);
              });
          }
        } catch (e) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        requestConnection();
      }
    } else {
    }
  };

  const startAuction = async () => {
    let pubKey = " ";

    if (network == "casper" || network == "casper-test") {
      try {
        pubKey = await getCasperKey();

        console.log(address);

        const runtimeArgs = RuntimeArgs.fromMap({
          contract_hash: CLValueBuilder.string("contract-" + address),
          token_id: CLValueBuilder.u256(Number(tokenId)),
          price: CLValueBuilder.u512(toMotes(price)),
          duration_minutes: CLValueBuilder.u64(durationInMinutes),
          token_standard: CLValueBuilder.u8(0),
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS,
        );

        const payment = DeployUtil.standardPayment(toMotes(2.5));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(CASPER_MARKETPLACE_ADDRESS, "hex")),
            "start_auction",
            runtimeArgs,
          ),
          payment,
        );

        try {
          console.log(deploy);
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    setLoading(false);
                  })
                  .catch((e) => {
                    setLoading(false);
                  });
              })
              .catch((e: any) => {
                setLoading(false);
              });
          }
        } catch (e) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        requestConnection();
      }
    } else {
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
                <Grid
                  templateColumns="auto 1fr auto"
                  alignItems="center"
                  gap="20px"
                >
                  <Box
                    boxSize="80px"
                    border="1px solid"
                    borderColor={borderPrimary}
                    borderRadius="8px"
                    bgImage={image}
                    bgPos="center"
                    bgSize="cover"
                  ></Box>

                  <Flex justify="center" flexDir="column">
                    <Flex align="center" gap="10px">
                      <Box fontSize="20px" fontFamily="Inter">
                        {name} {type == "ERC1155" ? "" : "#" + tokenId}
                      </Box>{" "}
                    </Flex>
                    <Box>
                      <Box
                        color={textSecondary}
                        fontSize="16px"
                        fontFamily="Inter"
                        display="inline"
                      >
                        {collection ?? <Box>{trimHash(address)}</Box>}
                      </Box>
                    </Box>
                  </Flex>
                  <Box>
                    Chain:{" "}
                    <Box display={"inline"} textTransform="capitalize">
                      {chainIdToName(network)}
                    </Box>
                  </Box>
                </Grid>
                <Divider my="16px" />
                <Flex justify="space-between" align="center">
                  <Box color={textSecondary}>Choose sale type:</Box>

                  <RadioGroup onChange={setListingType} value={listingType}>
                    <Stack direction="row" gap="30px">
                      <Radio colorScheme="gray" value="listing">
                        Listing
                      </Radio>
                      <Radio colorScheme="gray" value="auction">
                        Auction
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <Divider my="16px" />
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
                    onClick={submitApprove}
                  >
                    Set for Sale
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
        header="List NFT for sale"
      />
    </>
  );
};
