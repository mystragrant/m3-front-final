import { Box, Flex } from "@chakra-ui/react";

export const IconWithValue = ({
  icon,
  value,
  reversed = false,
}: {
  icon: React.ReactNode;
  value: React.ReactNode | any;
  reversed?: boolean;
}) => {
  return (
    <Flex align="center" gap="8px">
      {!reversed && <Box>{icon}</Box>}
      <Box fontSize="14px" fontFamily="Space Mono" fontWeight="400">
        {value}
      </Box>
      {reversed && <Box>{icon}</Box>}
    </Flex>
  );
};
