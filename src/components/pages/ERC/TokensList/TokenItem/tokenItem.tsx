import { Box, Flex, Grid } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const TokenItem = ({
  name,
  balance,
  symbol,
  decimals,
  network,
}: {
  name: string;
  balance: string;
  symbol: string;
  decimals: number;
  network: string;
}) => {
  const {
    borderPrimary,
    backgroundSecondary,
    backgroundTertiary,
    textSecondary,
  } = useThemeProvider();

  return (
    <Grid
      cursor="pointer"
      _hover={{ bg: backgroundSecondary }}
      padding="0px 20px"
      templateColumns="auto auto 1fr"
      gap="50px"
      borderRadius="8px"
      h="56px"
      border="1px solid"
      borderColor={borderPrimary}
      bg={backgroundTertiary}
    >
      <Grid templateColumns="1fr auto" alignItems="center" gap="10px">
        <Box boxSize="34px" borderRadius="50%" bg={backgroundSecondary} />
        <Flex gap="3px" flexDir="column" justify="center">
          <Box lineHeight="100%" fontWeight="500">
            {symbol}
          </Box>
          <Box lineHeight="100%" fontSize="12px" color={textSecondary}>
            {name}
          </Box>
        </Flex>
      </Grid>
      <Flex align="center" fontSize="14px">
        {network}
        {decimals}
      </Flex>
      <Flex align="center" fontSize="14px">
        {balance}
      </Flex>
    </Grid>
  );
};
