import { Box, Flex } from "@chakra-ui/react";
import { EyeIcon } from "../../../../shared/icons/EyeIcon";

export const ViewsCount = ({ amount }: { amount: number }) => {
  return (
    <Flex gap="12px" align="center">
      <EyeIcon />
      <Box fontSize="14px">{amount}</Box>
    </Flex>
  );
};
