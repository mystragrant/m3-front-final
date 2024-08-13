import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CreatorLabel } from "../../../shared/CreatorLabel/creatorLabel";

export const CollectionBanner = () => {
  return (
    <Flex
      my="60px"
      bgSize="cover"
      borderRadius="8px"
      alignItems="flex-end"
      bgPos="center"
      bgImage="/assets/images/nft-mocks/obrazek.png"
      h="400px"
    >
      <Flex flexDir="column" p="40px" pb="70px" align="flex-start">
        <CreatorLabel
          name="Mystra"
          avatarUrl="/assets/brand/default-avatar.jpg"
          verified={true}
        />
        <Box mt="28px" fontSize="12px" fontWeight="300" fontFamily="Inter">
          Collections
        </Box>
        <Box
          lineHeight="115%"
          transform={"translateX(-2px)"}
          fontSize="32px"
          fontFamily="Inter"
        >
          Mystra Studio
        </Box>
        <Link to="/marketplace/casper-test/598537a98d64febe8e8a933229cc4e6d17ec438db95c37048744b9898697fe0b">
          <Button
            mt="20px"
            fontFamily="Inter"
            fontSize="14px"
            bg="white"
            color="black"
            fontWeight="normal"
          >
            Check collection
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
