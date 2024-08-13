import { Box } from "@chakra-ui/react";

export const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box color="error.500" fontSize="14px" fontWeight="400" fontFamily="Inter">
      {children}
    </Box>
  );
};
