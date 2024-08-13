/* eslint-disable */
import { Box, Flex, Grid, Image, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DetailsList } from "../../components/pages/marketplaceItem/DetailsList/detailsList";
import { ItemTraits } from "../../components/pages/marketplaceItem/ItemTraits/itemTraits";
import { ListingMenu } from "../../components/pages/marketplaceItem/ListingMenu/listingMenu";
import { OfferList } from "../../components/pages/marketplaceItem/OfferList/offerList";
import { DropdownContainer } from "../../components/shared/containers/dropdownContainer";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { MultichainIcon } from "../../components/shared/display/MultichainIcon/multichainIcon";
import { MYSTRA_API_URL } from "../../constants";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../providers/User/userProvider";
import { trimHash } from "../../utils/utils";

export async function loadWasmFileAsUint8Array(wasmFilename: string) {
  const wasmUrl = "/wasm/" + wasmFilename;
  const response = await fetch(wasmUrl);
  if (!response.ok) {
    throw new Error(`Failed to load WASM file: ${response.statusText}`);
  }

  const wasmArrayBuffer = await response.arrayBuffer();
  const wasmBytes = new Uint8Array(wasmArrayBuffer);

  return wasmBytes;
}

const Buffer = require("buffer/").Buffer;

export interface NFTData {
  image: string;
  description: string;
  name: string;
  id: string;
  attributes: { attribute_type: string; attribute_value: string }[];
  owner: string;
  listingData: { price: number; expirationDate: Date };
  nftStandard: string;
  saleStatus: string;
}

export const MarketplaceItemPage = () => {
  const { id, chainName, collectionAddress } = useParams();

  const [parsing, setParsing] = useState<boolean>(false);

  const [item, setItem] = useState<NFTData | null>(null);

  const { textPrimary, textSecondary } = useThemeProvider();

  useEffect(() => {
    if (id && chainName && collectionAddress && !parsing) {
      setParsing(true);
      axios
        .get(
          `${MYSTRA_API_URL}/nft/${chainName}/${collectionAddress}/${id}?dataParsed=false`,
        )
        .then(({ data }) => {
          console.log(data);

          const parsedMetadata = JSON.parse(data.token_metadata[0]);

          console.log(parsedMetadata);

          const newAttributes: any = [];

          if (parsedMetadata.attributes) {
            if (typeof parsedMetadata.attributes[0] == "string") {
              for (const attr of parsedMetadata.attributes) {
                newAttributes.push({
                  attribute_type: "Attribute",
                  attribute_value: attr,
                });
              }
            } else {
              for (const attr of parsedMetadata.attributes) {
                newAttributes.push({
                  attribute_type: attr.trait_type,
                  attribute_value: attr.value,
                });
              }
            }
          }

          const newData: NFTData = {
            image: parsedMetadata.asset,
            owner: data.owner_of,
            description: parsedMetadata.token_description
              ? parsedMetadata.token_description
              : data.token_description
                ? data.token_description
                : "No description provided",
            name: parsedMetadata.name
              ? parsedMetadata.name
              : data.token_metadata[2].name
                ? data.token_metadata[2].name
                : "Unknown",
            id: data.token_id ?? id,
            attributes: newAttributes,
            listingData: {
              price: data.token_price ?? 0,
              expirationDate: new Date(data.listing_expiration_date),
            },
            nftStandard: data.contract_type,
            saleStatus: data.sale_type_status,
          };

          setItem(newData);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setParsing(true);
        });
    }
  }, [id, chainName, collectionAddress]);

  const { casper_public_key_wallet, evm_wallet } = useUserProvider();

  const isYours = useMemo(() => {
    try {
      if (chainName == "casper" || chainName == "casper-test") {
        if (item?.owner == "") return false;
        return (
          casper_public_key_wallet.toLocaleLowerCase() ==
          item?.owner.toLocaleLowerCase()
        );
      } else {
        return evm_wallet == item?.owner;
      }
    } catch (e) {
      return false;
    }
  }, [item?.owner, casper_public_key_wallet, evm_wallet]);

  const handleListingEnd = () => {
    if (item) {
      const x = {
        ...item,
        listingData: {
          price: 0,
          expirationDate: new Date(),
        },
      };

      setItem(x);
    }
  };


  return item ? (
    <PageContainer>
      <Grid templateColumns="auto 1.4fr" gap="80px">
        <Flex flexDir="column" gap="32px">
          <Flex pos="relative" boxSize="450px" overflow="hidden">
            <Image
              borderRadius="4px"
              bgColor="gray"
              bgImage={item ? item.image : ""}
              bgPos="center"
              bgSize="cover"
              style={{
                imageRendering: "pixelated",
              }}
              boxSize="450px"
              position="sticky"
              top="116px"
            />
          </Flex>
          <Flex flexDir="column" gap="16px">
            <DropdownContainer label={"Description"}>
              <Flex fontFamily="Inter" fontSize="14px" color={textSecondary}>
                {item && item.description}
              </Flex>
            </DropdownContainer>

            {item && item.attributes.length > 0 && (
              <ItemTraits items={item ? item.attributes : []} />
            )}
            <DetailsList
              contractAddress={collectionAddress ?? ""}
              chain={chainName ?? ""}
              tokenId={id ?? ""}
              creatorEarnings={4}
              standard={item.nftStandard.toUpperCase()}
            />
          </Flex>
        </Flex>
        <Flex flexDir="column" gap="40px">
          <Flex flexDir="column">
            <Flex
              fontSize="14px"
              color="brandSecondary.500"
              gap="6px"
              fontFamily="Inter"
              align="center"
            >
              <Box _hover={{ textDecor: "underline" }}>
                <Link to={`/marketplace/${chainName}/${collectionAddress}`}>
                  {collectionAddress?.slice(0, 6) +
                    "..." +
                    collectionAddress?.slice(-6)}
                </Link>
              </Box>
            </Flex>
            <Flex fontFamily="Inter" gap="10px" align="center" fontSize="24px">
              {item && item.name}
              <MultichainIcon chain={chainName ?? ""} />
            </Flex>
          </Flex>
          <Flex align="center" gap="10px">
            <Box
              boxSize="40px"
              borderRadius="50%"
              bgPos="center"
              bgSize="cover"
              bgImage="/assets/brand/default-avatar.jpg"
            ></Box>
            <Flex flexDir="column" fontSize="14px" fontFamily="Inter">
              <Box fontWeight="300" fontSize="14px" color={textSecondary}>
                Owned by
              </Box>
              <Box fontFamily="Space Mono">{item && trimHash(item.owner)}</Box>
            </Flex>
          </Flex>

          <ListingMenu
            address={collectionAddress ?? ""}
            tokenStandard={item.nftStandard}
            price={item.listingData?.price ?? 0}
            expirationDate={item.listingData.expirationDate}
            chainId={chainName ?? ""}
            tokenId={item.id ?? ""}
            isYours={isYours}
            listingType={item.saleStatus}
            handleListingEnded={handleListingEnd}
          />

          {item.saleStatus != "auction" && <OfferList
            address={collectionAddress ?? ""}
            nftStandard={item.nftStandard}
            chain={chainName ?? ""}
            tokenId={item.id ?? ""}
            owner={item.owner}
            isYours={isYours}
          />}
        </Flex>
      </Grid>
    </PageContainer>
  ) : (
    <Flex h="calc(100vh - 74px)" align="center" justify="center">
      <Spinner />
    </Flex>
  );
};
