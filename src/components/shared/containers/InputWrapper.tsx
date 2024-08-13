import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const InputWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex flexDir="column" gap="4px">
      <Box color={textSecondary}>{label}</Box>
      {children}
    </Flex>
  );
};
