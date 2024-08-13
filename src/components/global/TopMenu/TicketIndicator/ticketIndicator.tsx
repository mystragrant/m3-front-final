import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";

export const TicketIndicator = () => {
  const { borderPrimary } = useThemeProvider();
  const { tickets_amount } = useUserProvider();

  return (
    <Flex
      border="1px solid"
      borderRadius="8px"
      borderColor={borderPrimary}
      h="46px"
      px="12px"
      align="center"
      gap="7px"
    >
      <Box fontSize="12px" fontFamily="Inter">
        Ticket
      </Box>
      <Box bg="white" boxSize="2px" borderRadius="50%" />
      <Box
        bg={tickets_amount > 0 ? "brandSecondary.500" : "gray"}
        boxSize="9px"
        borderRadius="50%"
      />
    </Flex>
  );
};
