import { Box, Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYSTRA_API_URL } from "../../../../constants";
import { CollectionItem } from "../items/CollectionItem";

export const Collections = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/collections?page_number=1&page_size=4&order_by=collection_total_volume&order_direction=DESC`,
      )
      .then((res) => {
        setItems(
          res.data.data.map((item: any) => {
            return {
              collection: {
                address: item.collection_contract_hash,
                floor: 50,
                volume: 50,
                title: item.collection_name ?? item.collection_contract_name,
                coverImage: item.collection_icon,
              },
              creator: {
                verified: false,
                avatar: "",
                name: "",
              },
            };
          }),
        );
      })
      .catch((e) => {});
  }, []);

  return (
    <Flex flexDir="column" gap="20px" mt="70px">
      <Box fontFamily="Inter" fontSize="20px">
        Trending collections
      </Box>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap="16px" h="350px">
        {items.map((item: any) => {
          return (
            <CollectionItem
              address={item.collection.address}
              floor={item.collection.floor}
              volume={item.collection.volume}
              creatorAvatar={item.creator.avatar}
              creatorName={item.creator.name}
              creatorVerified={item.creator.verified}
              title={item.collection.title}
              coverImage={item.collection.coverImage}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
