/* eslint-disable prettier/prettier */
import { Box, Button, Flex, Grid, Spinner, useDisclosure } from "@chakra-ui/react";
import {
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { useEffect, useState } from "react";
import {
  casperService,
  DEPLOY_TTL_MS,
  NETWORK_NAME,
} from "../../../../constants";
import { CASPER_MARKETPLACE_ADDRESS } from "../../../../constants/marketplace";
import { toMotes } from "../../../../helpers/misc";
import { cepStandardToNumber } from "../../../../helpers/misc/cep";
import { loadWasmFileAsUint8Array } from "../../../../pages/marketplace/MarketplaceItemPage";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { PriceItem } from "../PriceItem/priceItem";
import { OfferModal } from "./OfferModal.tsx/offerModal";
import { PlaceBidModal } from "./PlaceBidModal/placeBidModal";

const Buffer = require("buffer/").Buffer;

export function tokenStandardToNumber(standard: any) {
  if(standard) {
    if(standard.toLocaleLowerCase() == "cep47") {
      return 0 
    } else {
      return 1
    }
  } else {
    return 0
  }
 
}

export const ListingMenu = ({
  price,
  address,
  chainId,
  tokenId,
  expirationDate,
  listingType,
  isYours,
  handleListingEnded,
  tokenStandard
}: {
  price: number;
  address: string;
  chainId: string;
  tokenId: string;
  expirationDate: Date;
  listingType: string,
  isYours: boolean,
  handleListingEnded: () => void,
  tokenStandard: string
}) => {
  const { borderPrimary } = useThemeProvider();
  const { getCasperKey, signCasper, putDeployUniversal, requestConnection } =
    useMultiWalletProvider();

  const { textSecondary } = useThemeProvider();

  const [loading, setLoading] = useState<boolean>(false);

  const {isLogged } = useUserProvider()



  const cancelListing = async () => {
    let pubKey = " ";
    setLoading(true)

    if (chainId == "casper" || chainId == "casper-test") {
      try {
        pubKey = await getCasperKey();

        console.log(address);

        const runtimeArgs = RuntimeArgs.fromMap({
          contract_hash: CLValueBuilder.string("contract-" + address),
          token_id: CLValueBuilder.u256(Number(tokenId)),
          token_standard: CLValueBuilder.u8(tokenStandardToNumber(tokenStandard)),
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS
        );

        const payment = DeployUtil.standardPayment(toMotes(2.5));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(CASPER_MARKETPLACE_ADDRESS, "hex")),
            "cancel_listing",
            runtimeArgs
          ),
          payment
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
                 
                    handleListingEnded()
                    setLoading(false)
                  })
                  .catch((e) => {
                    setLoading(false)
                  });
              })
              .catch((e: any) => {
                console.log(e);
                setLoading(false)
              });
          }
        } catch (e) {
          console.log(e);
          setLoading(false)
          requestConnection()
        }
      } catch (e) {
        console.log(e);
        setLoading(false)
        requestConnection()
      }
    } else {
      requestConnection()
    }
  };

  const buyNFT = async () => {
    let pubKey = " ";

    try {
      pubKey = await getCasperKey();

      const runtimeArgs = RuntimeArgs.fromMap({
        token_id: CLValueBuilder.u256(Number(tokenId)),
        buy_contract_hash: CLValueBuilder.string("contract-" + address),
        marketplace_hash: CLValueBuilder.string(
          "contract-" + CASPER_MARKETPLACE_ADDRESS
        ),
        amount: CLValueBuilder.u512(price),
        token_standard: CLValueBuilder.u8(cepStandardToNumber(tokenStandard)),
      } as any);


      const deployParams = new DeployUtil.DeployParams(
        CLPublicKey.fromHex(pubKey),
        NETWORK_NAME,
        1,
        DEPLOY_TTL_MS
      );

      const payment = DeployUtil.standardPayment(toMotes(15));

      const deploy = DeployUtil.makeDeploy(
        deployParams,
        DeployUtil.ExecutableDeployItem.newModuleBytes(
          await loadWasmFileAsUint8Array("marketplace-payment.wasm"),
          runtimeArgs
        ),
        payment
      );

      try {
        if (deploy) {
          const deployJson = DeployUtil.deployToJson(deploy);

          signCasper(deployJson)
            .then((res: any) => {
              console.log(res);

              putDeployUniversal(res, deploy as any, pubKey)
                .then((res) => {
                  console.log(res);

                  casperService.waitForDeploy(res).then((r) => {
                    console.log(r);
                  });
                })
                .catch((e) => {});
            })
            .catch((e: any) => {
              console.log(e);
            });
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const [parsedPrice, setParsedPrice] = useState<number>(0);

  useEffect(() => {
    if(chainId == "casper" || chainId == "casper-test") {
      setParsedPrice(Number(price) / 1000000000)
    }
  }, [price])

  const offerModal = useDisclosure()
  const bidModal = useDisclosure()

  return (
    <Flex flexDir="column" gap="12px">
      <OfferModal network={chainId} tokenId={tokenId} address={address} isOpen={offerModal.isOpen} onOpen={offerModal.onOpen} onClose={offerModal.onClose}/>
      <PlaceBidModal network={chainId} tokenId={tokenId} address={address} isOpen={bidModal.isOpen} onOpen={bidModal.onOpen} onClose={bidModal.onClose}/>
      {price > 0 && <Flex
        h="54px"
        border="1px solid"
        align="center"
        fontSize="16px"
        alignItems="center"
        borderRadius="8px"
        justify="space-between"
        gap="24px"
        px="24px"
        borderColor={borderPrimary}
      >
        <Flex gap="24px">
          {listingType == "listing" ? "Current price:" : "Highest bid"}
          <PriceItem price={parsedPrice.toString()} chain={chainId} />
        </Flex>
        <Flex gap="10px" fontSize="14px">
          <Flex color={textSecondary}>Ends at </Flex>
          <Box>{expirationDate.toLocaleString()}</Box>
        </Flex>
      </Flex>}
      {!isYours && listingType == "listing" && isLogged && <Grid templateColumns="1fr 1fr" gap="14px">
         {price > 0 &&<Button
          fontSize="14px"
          fontWeight="400"
          bg="white"
          color="black"
          h="50px"
          onClick={buyNFT}
        >
          Buy now
        </Button>}
        <Button
          h="50px"
          fontSize="14px"
          fontWeight="400"
          bg="transparent"
          border="0.5px solid"
          color="white"
          onClick={offerModal.onOpen}
        >
          Make offer
        </Button>
      </Grid> }
      {!isYours && listingType == "auction" && isLogged && <Grid templateColumns="1fr" gap="14px">
         
        <Button
          h="50px"
          fontSize="14px"
          border="0.5px solid"
          color="white"
          fontWeight="400"
          bg="transparent"
          
          onClick={bidModal.onOpen}
        >
          Place bid
        </Button>
      </Grid> }
     {price > 0 && isYours && listingType == "listing" && <Button
        h="50px"
        fontSize="14px"
        border="0.5px solid"
        color="white"
        fontWeight="400"
        bg="transparent"
        opacity={loading ? "0.3" : "1"}
        cursor={loading ? "default" : "pointer"}
        onClick={cancelListing}
      >
        {loading ? <Spinner/> : "Cancel listing"}
      </Button>}
    </Flex>
  );
};
