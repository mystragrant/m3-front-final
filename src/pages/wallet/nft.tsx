import { NotAllowedIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { TabContainer } from "../../components/shared/containers/tabContainer";
import { BigGridIcon } from "../../components/shared/icons/grids/BigGridIcon";
import { SmallGridIcon } from "../../components/shared/icons/grids/SmallGridIcon";
import { NFTItem } from "../../components/shared/NFTItem/NFTitem";
import { fromMotes } from "../../helpers/misc";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { usePrivatePage } from "../../hooks/usePrivatePage";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../providers/User/userProvider";
import { useTxQueue } from "../../providers/useTxQueue/useTxQueue";
import { MystraAPI } from "../../services/mystra-api";
import { buildIpfsGateway } from "../../utils/parser";

export interface INFTData {
  contract_hash: string;
  contract_type: string;
  chain_id: string;
  asset: string;
  description: string;
  collection_name: string;
  name: string;
  circulating: number;
  token_id: string;
  hidden: boolean;
  listingData?: {
    price: number;
    expirationDate: Date;
  };
  saleStatus: string;
}

enum NFT_GRID_MODES {
  BIG,
  SMALL,
}

const TopOptions = ({
  onChange,
  value,
}: {
  onChange: (val: NFT_GRID_MODES) => void;
  value: NFT_GRID_MODES;
}) => {
  const { borderPrimary, backgroundTertiary } = useThemeProvider();

  return (
    <Grid templateColumns="1fr auto" gap="8px" mb="16px">
      <>
        <Grid
          padding="0px 5px"
          templateColumns="1fr 1fr"
          border="1px solid"
          borderColor={borderPrimary}
          bg={backgroundTertiary}
          borderRadius="4px"
        >
          {[
            {
              mode: NFT_GRID_MODES.BIG,
              icon: <BigGridIcon />,
            },
            {
              mode: NFT_GRID_MODES.SMALL,
              icon: <SmallGridIcon />,
            },
          ].map((item) => {
            return (
              <Flex
                cursor={"pointer"}
                align="center"
                justify="center"
                boxSize="40px"
                onClick={() => onChange(item.mode)}
              >
                <Box opacity={value == item.mode ? "1" : "0.4"}>
                  {item.icon}
                </Box>
              </Flex>
            );
          })}
        </Grid>
      </>
    </Grid>
  );
};

export const NFTPage = () => {
  const [nfts, setNFTs] = useState<INFTData[]>([]);
  const { id } = useUserProvider();

  const [userNFTs, setUserNFT] = useLocalStorage<INFTData[]>("userNFT", []);

  useEffect(() => {
    setUserNFT(nfts);
  }, [nfts]);

  const [loaded, setLoaded] = useState<boolean>(false);

  const {
    isOpen: isAddTokenOpen,
    onOpen: onAddTokenOpen,
    onClose: onAddTokenClose,
  } = useDisclosure();

  const { backgroundSecondary, backgroundPrimary } = useThemeProvider();

  const { txQueue } = useTxQueue();

  const loadNfts = () =>
    MystraAPI.getNFTs(id)
      .then((res) => {
        const storedNFTS = nftStorage;
        const newNFTs: INFTData[] = [];
        console.log(res);

        for (const token of res.data[0]) {
          if (
            ["casper", "casper-test"].includes("casper") ||
            ["casper", "casper-test"].includes("casper")
          ) {
            const storedItem = storedNFTS.nfts.find(
              (item: any) =>
                item.token_id == token.token_id &&
                item.contract_hash == token.contract_hash &&
                item.chain_id == token.chain_id,
            );

            const metadata = JSON.parse(token.nft_metadata);

            const newNFT: INFTData = {
              chain_id: token.chain_id,
              contract_hash: token.contract_hash,
              contract_type: token.contract_type,
              collection_name: token.collection_name,
              circulating: Number(token.circulating),
              asset: metadata.asset,

              description: metadata.description,
              name: metadata.name,
              token_id: token.token_id,
              hidden: storedItem ? (storedItem as any).hidden : false,
              saleStatus: token.sale_type_status,
              listingData:
                token.sale_type_status != "none"
                  ? {
                      price: Number(fromMotes(token.token_price)),
                      expirationDate: new Date(token.listing_expiration_date),
                    }
                  : { price: 15, expirationDate: new Date(0) },
            };

            newNFTs.push(newNFT);
          } else {
            const metadata = JSON.parse(token.nft_metadata);

            const newNFT: INFTData = {
              chain_id: token.chain_id,
              contract_hash: token.contract_hash,
              contract_type: token.contract_type,
              collection_name: token.collection_name,
              circulating: Number(token.circulating),
              asset: metadata
                ? metadata.image
                  ? buildIpfsGateway(metadata.image ?? "")
                  : ""
                : "",
              description: metadata ? metadata.description : "",
              name: metadata ? metadata.name : "",
              token_id: token.token_id,
              hidden: false,
              saleStatus: token.sale_type_status,
              listingData:
                token.sale_type_status != "none"
                  ? {
                      price: Number(fromMotes(token.token_price)),
                      expirationDate: new Date(token.listing_expiration_date),
                    }
                  : { price: 0, expirationDate: new Date() },
            };
            console.log(token);

            newNFTs.push(newNFT);
          }

          setNFTs(newNFTs);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoaded(true);
      })
      .finally(() => {
        setLoaded(true);
      });

  useEffect(() => {
    loadNfts();
  }, []);

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  const [nftStorage, setNFTStorage] = useLocalStorage("nfts", {
    nfts: [],
    account: -1,
  });

  const alreadyTransferred = useMemo(() => {
    return txQueue.map((item) => item.contract);
  }, [txQueue]);

  useEffect(() => {
    if (nfts.length > 0) {
      setLoaded(true);
      setNFTStorage({
        nfts: nfts,
        account: id,
      } as any);
    }
  }, [nfts]);

  useEffect(() => {
    if (nftStorage.account == id) setNFTs(nftStorage.nfts);
  }, [nftStorage]);

  const hideNFT = (id: string, chain: string, contract_hash: string) => {
    const newNFTS = nfts.map((nft) => {
      if (
        id == nft.token_id &&
        chain == nft.chain_id &&
        nft.contract_hash == contract_hash
      ) {
        const newNft = { ...nft };
        newNft.hidden = true;
        return newNft;
      } else {
        return nft;
      }
    });
    setNFTs(newNFTS);
  };

  const unhideNFT = (id: string, chain: string, contract_hash: string) => {
    const newNFTS = nfts.map((nft) => {
      if (
        id == nft.token_id &&
        chain == nft.chain_id &&
        nft.contract_hash == contract_hash
      ) {
        const newNft = { ...nft };
        newNft.hidden = false;
        return newNft;
      } else {
        return nft;
      }
    });
    setNFTs(newNFTS);
  };

  const deleteNFT = (id: string, chain: string, contract_hash: string) => {
    setNFTs(
      nfts.filter(
        (item: any) =>
          !(
            item.token_id == id &&
            item.chain_id == chain &&
            item.contract_hash == contract_hash
          ),
      ),
    );
  };

  const collectedContent = useMemo(() => {
    console.log(alreadyTransferred);
    return nfts
      .filter((nft) => nft.hidden == false)
      .filter((nft) => !alreadyTransferred.includes(nft.contract_hash))
      .map((data) => {
        return (
          <NFTItem
            loadNfts={() => setTimeout(() => {}, 1000)}
            data={data}
            hide={hideNFT}
            unhide={unhideNFT}
            deleteNFT={deleteNFT}
            isYours={true}
          />
        );
      });
  }, [nfts, alreadyTransferred]);

  usePrivatePage();

  const [gridMode, setGridMode] = useState<NFT_GRID_MODES>(
    NFT_GRID_MODES.SMALL,
  );

  return (
    <PageContainer>
      {nfts && (
        <TabContainer
          items={[
            {
              label: "Everything",
              amount: collectedContent ? collectedContent.length : 0,
              content: (
                <>
                  <Box minH="100vh">
                    {loaded ? (
                      nfts.length > 0 ? (
                        <Grid
                          gap="14px"
                          templateColumns={
                            gridMode == NFT_GRID_MODES.BIG
                              ? "1fr 1fr 1fr 1fr"
                              : "1fr 1fr 1fr 1fr 1fr 1fr"
                          }
                        >
                          {collectedContent}
                        </Grid>
                      ) : (
                        <Flex
                          align="center"
                          h="40vh"
                          justify="center"
                          color="gray"
                          flexDir="column"
                          gap="10px"
                        >
                          <NotAllowedIcon opacity="0.7" boxSize="40px" />
                          No Items Found.{" "}
                          <Box
                            _hover={{ textDecor: "underline" }}
                            color="#EFEFEF"
                            cursor="pointer"
                            onClick={onAddTokenOpen}
                          >
                            Click to track NFT Contract
                          </Box>
                        </Flex>
                      )
                    ) : (
                      <Grid
                        gap="14px"
                        templateColumns={
                          gridMode == NFT_GRID_MODES.BIG
                            ? "1fr 1fr 1fr 1fr"
                            : "1fr 1fr 1fr 1fr 1fr"
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11].map(() => {
                          return (
                            <Skeleton
                              borderRadius="16px"
                              startColor={backgroundSecondary}
                              endColor={backgroundPrimary}
                            >
                              <NFTItem
                                loadNfts={loadNfts}
                                hide={hideNFT}
                                unhide={unhideNFT}
                                deleteNFT={deleteNFT}
                                data={{
                                  contract_hash: "string",
                                  contract_type: "string",
                                  chain_id: "dd",
                                  asset: "dd",
                                  description: "dd",
                                  collection_name: "dd",
                                  name: "",
                                  circulating: 5,
                                  token_id: "dd",
                                  saleStatus: "listing",
                                  hidden: false,
                                }}
                              />
                            </Skeleton>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>
                </>
              ),
            },
          ]}
        ></TabContainer>
      )}
    </PageContainer>
  );
};
