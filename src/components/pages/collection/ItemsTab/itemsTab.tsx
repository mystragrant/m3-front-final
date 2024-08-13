/* eslint-disable */

import { Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MYSTRA_API_URL } from "../../../../constants";
import { fromMotes } from "../../../../helpers/misc";
import { INFTData } from "../../../../pages/wallet/nft";
import { NFTItem } from "../../../shared/NFTItem/NFTitem";

export const ItemsTab = ({ noFilter = false }: { noFilter?: boolean }) => {
  const { collectionAddress, chainName: chainId } = useParams();
  const [nfts, setNFTs] = useState<INFTData[]>([]);

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/nft/${chainId}/${collectionAddress}?dataParsed=false&page_number=1&page_size=2000&order_by=token_id&order_direction=ASC`,
      )
      .then((res) => {
        console.log(res);
        const data = res.data.nft_data;

        console.log(data)

        let newNFTs: INFTData[] = [];

        for (const item of data) {
          console.log(item);
          const metadata = JSON.parse(item.token_metadata);

          const nft: INFTData = {
            contract_hash: item.contract_hash,
            chain_id: "casper-test",
            contract_type: item.contract_type,
            description: "",
            name: metadata.name ?? "",
            asset: metadata.asset ?? "",
            circulating: 0,
            collection_name: item.contract_name,
            token_id: item.token_id,
            hidden: false,
            listingData:
              item.sale_type_status != "none" &&
              new Date().getTime() < item.listing_expiration_date
                ? {
                    price: Number(fromMotes(item.token_price)),
                    expirationDate: new Date(item.listing_expiration_date),
                  }
                : undefined,
            saleStatus: item.sale_type_status,
          };

          newNFTs = newNFTs.concat([nft]);
        }

        setNFTs(newNFTs);

        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Grid
      gap="38px"
      maxW="100%"
      templateColumns={noFilter ? "1fr" : "1fr"}
    >
      <Flex flexDir="column" gap="28px">
        <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" gap="16px">
          {nfts.map((item: INFTData) => {
            return (
              <NFTItem
                key={item.contract_hash + item.token_id}
                loadNfts={() => {}}
                isYours={false}
                data={item}
                saleStatus={item.saleStatus}
                hide={() => {}}
                unhide={() => {}}
                deleteNFT={() => {}}
                price={item.listingData?.price}
                expirationDate={
                  item.listingData
                    ? item.listingData.expirationDate.getTime()
                    : 0
                }
              />
            );
          })}
        </Grid>
      </Flex>
      {/* {!noFilter && (
        <Flex flexDir="column" gap="28px">
          <Filters />
        </Flex>
      )} */}
    </Grid>
  );
};
