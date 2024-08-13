import { Box, Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYSTRA_API_URL } from "../../../../constants";
import { fromMotes } from "../../../../helpers/misc";
import { INFTData } from "../../../../pages/wallet/nft";
import { NFTItem } from "../../../shared/NFTItem/NFTitem";

export const ChosenNFT = ({
  label,
  filter,
}: {
  label: string;
  filter?: string;
}) => {
  const [nfts, setNFTs] = useState<INFTData[]>([]);
  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/listings?page=1&pageSize=5&dataParsed=true${filter ? "&sale_type_status=" + filter : ""}`,
      )
      .then((res) => {
        const data = res.data.data.slice(0, 6);
        console.log(res.data.data);

        const chain = "casper-test";
        let newNFTs: INFTData[] = [];

        for (const item of data) {
          console.log(item.metadata);
          const metadata = JSON.parse(item.metadata);

          const nft: INFTData = {
            contract_hash: item.token_contract_hash,
            chain_id: chain,
            contract_type: item.contract_type,
            description: metadata.description ?? "",
            name: metadata.name ?? "",
            asset: metadata.asset ?? "",
            circulating: 0,
            collection_name: "",
            token_id: item.token_id,
            hidden: false,
            listingData:
              item.sale_type_status != "none"
                ? {
                    price: Number(fromMotes(item.token_price)),
                    expirationDate: new Date(item.listing_expiration_date),
                  }
                : { price: 15, expirationDate: new Date(0) },
            saleStatus: item.sale_type_status,
          };

          console.log(metadata.name);
          console.log(nft);

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
    <Flex flexDir="column" pos="relative" mb="48px">
      <Flex justify="space-between">
        <Box fontFamily="Inter" fontSize="20px" mb="20px">
          {label}
        </Box>
      </Flex>
      <Grid maxW="100%" gap="16px" templateColumns="1fr 1fr 1fr 1fr 1fr 1fr">
        {nfts.map((item) => {
          return (
            <NFTItem
              key={item.contract_hash + item.token_id}
              loadNfts={() => {}}
              data={item}
              hide={() => {}}
              unhide={() => {}}
              deleteNFT={() => {}}
              price={item.listingData?.price ?? 0}
              expirationDate={
                item.listingData ? item.listingData.expirationDate.getTime() : 0
              }
              saleStatus={item.saleStatus}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
