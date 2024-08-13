import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { getCollectionItems } from "../Collections/dataMock";
import { CollectionItem } from "../items/CollectionItem";

export const MarketplaceHeader = () => {
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const { borderPrimary } = useThemeProvider();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getCollectionItems().then((res: any) => {
      setItems(res);
    });
  });

  return (
    <Flex justify="space-between" alignItems="center" mt="20px">
      <Flex flexDir="column" gap="20px" maxW="700px">
        <Heading
          lineHeight="64px"
          letterSpacing="-0.90px"
          fontSize="54px"
          fontFamily="Inter"
          fontWeight="400"
          maxW="600px"
        >
          Discover rare digital art, collect and sell NFTs
        </Heading>
        <Box
          lineHeight="150%"
          maxW="500px"
          fontFamily="Inter"
          fontSize="20px"
          color={textSecondary}
        >
          Mystra Marketplace is an open marketplace for NFTs on the EVM & Casper
          Network
        </Box>

        <Flex my="10px" gap="14px" align="center">
          <Button bg="white" color="black" fontSize="14px" fontWeight="normal">
            Discover now
          </Button>
          <Link to="/creator-studio/nfts">
            <Flex
              px="20px"
              color="white"
              textDecor="underline"
              fontSize="14px"
              fontWeight="normal"
            >
              Just create
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Flex pos="relative" pr="70px" mt="40px">
        <Box
          pos="absolute"
          bgSize="cover"
          bgPos="center"
          bgImage="/assets/images/nft-mocks/stars.png"
          boxSize="300px"
          left="-70px"
          top="50px"
          borderRadius="8px"
        />
        <Box
          pos="absolute"
          bgSize="cover"
          right="0"
          bgPos="center"
          bgImage="/assets/images/nft-mocks/red-abstract.png"
          boxSize="300px"
          top="50px"
          borderRadius="8px"
        />
        <Grid
          bgSize="cover"
          bgPos="center"
          bgImage="/assets/images/nft-mocks/ghost.png"
          boxSize="400px"
          zIndex="1"
          borderRadius="8px"
        >
          {items.slice(0, 1).map((item: any) => {
            return (
              <CollectionItem
                address="598537a98d64febe8e8a933229cc4e6d17ec438db95c37048744b9898697fe0b"
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
    </Flex>
  );
};
