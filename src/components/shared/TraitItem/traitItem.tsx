import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export const TraitItem = ({
  label,
  value,
  description,
}: {
  label: string;
  value: any | React.ReactNode;
  description: string;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const bgColor = useColorModeValue(
    "backgroundSecondary.light",
    "backgroundSecondary.dark",
  );
  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <Flex
      gap="0px"
      flexDir="column"
      padding="17px 20px"
      borderRadius="8px"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
    >
      <Box color={textSecondary} fontWeight="400" fontSize="12px">
        {label}
      </Box>
      <Box
        color={textPrimary}
        fontSize="14px"
        fontWeight="500"
        lineHeight="160%"
      >
        {value}
      </Box>
      <Box color={textSecondary} fontWeight="300" fontSize="12px">
        {description}
      </Box>
    </Flex>
  );
};
