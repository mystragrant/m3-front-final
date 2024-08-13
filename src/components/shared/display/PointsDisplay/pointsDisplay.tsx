import { Box, Flex, Image } from "@chakra-ui/react";
import { abbrNum } from "../../../../utils";

export const PointsDisplay = ({ amount }: { amount: number }) => {
  return (
    <Flex
      justify="flex-end"
      align="center"
      bg="#54E2B717"
      h="26px"
      fontFamily="Space Mono"
      fontWeight="700"
      px="8px"
      borderRadius="4px"
      fontSize="12px"
      gap="6px"
      color="brandSecondary.500"
    >
      <Box>{amount % 1 != 0 ? abbrNum(amount) : Math.floor(amount)}</Box>
      <Image w="14px" src="/assets/brand/star-white.svg" />
    </Flex>
  );
};
