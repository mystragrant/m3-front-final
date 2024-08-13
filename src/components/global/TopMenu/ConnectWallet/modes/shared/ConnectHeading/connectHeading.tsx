import { Box } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export const ConnectHeading = ({ children }: any) => {
  const { textPrimary } = useThemeProvider();

  return (
    <Box
      color={textPrimary}
      fontSize="26px"
      fontWeight="bold"
      lineHeight="100%"
    >
      {children}
    </Box>
  );
};
