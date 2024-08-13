import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { NFTDetailsButton } from "../../marketplace/NFTDetailsButton";

export const AboutCollection = ({ text }: { text: string }) => {
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <Flex flexDir="column" gap="4px" mb="40px">
      <Box fontWeight="400" fontSize="20px" fontFamily="Inter">
        About collection
      </Box>
      <Flex
        fontFamily="Inter"
        fontSize="14px"
        maxW="700px"
        lineHeight="24px"
        color={textSecondary}
      >
        {text}
      </Flex>
      <NFTDetailsButton />
    </Flex>
  );
};
