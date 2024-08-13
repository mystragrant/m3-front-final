import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const CardItem = ({
  header,
  value,
  label,
}: {
  header: string;
  value: React.ReactNode;
  label: string;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex
      flexDir="column"
      justify="space-between"
      padding="14px 20px"
      gap="12px"
    >
      <Box fontSize="12px" fontWeight="300">
        {header}
      </Box>
      <Flex flexDir="column">
        <Box fontFamily="Space Mono" fontSize="16px">
          {value}
        </Box>
        <Box color={textSecondary} fontFamily="Space Mono" fontSize="10px">
          {label}
        </Box>
      </Flex>
    </Flex>
  );
};
