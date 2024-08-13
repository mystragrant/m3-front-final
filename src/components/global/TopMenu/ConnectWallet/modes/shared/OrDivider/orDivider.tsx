import { Box, Grid } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export const OrDivider = () => {
  const { textPrimary, textSecondary } = useThemeProvider();

  return (
    <Grid templateColumns="1fr auto 1fr" gap="17px" alignItems="center">
      <Box h="1px" bg={textSecondary} />
      <Box color={textPrimary} textTransform="uppercase" fontSize="12px">
        Or
      </Box>
      <Box h="1px" bg={textSecondary} />
    </Grid>
  );
};
