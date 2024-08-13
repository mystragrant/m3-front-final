import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const ItemTemplate = ({
  header,
  children,
  description,
}: {
  header: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <>
      <Box mb="10px" fontSize="26px" fontFamily="Inter">
        {header}
      </Box>
      {description && (
        <Box fontFamily="Inter" fontSize="14px" color={textSecondary}>
          {description}
        </Box>
      )}
      <Flex flexDir="column" mt="40px">
        {" "}
        {children}
      </Flex>
    </>
  );
};
