import { useColorMode } from "@chakra-ui/core";
import { Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const SectionParagraph = ({ children }: any) => {
  const textColor = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <Text
      color={textColor}
      fontSize="14px"
      fontWeight="400"
      lineHeight="160%"
      fontFamily="Sora"
    >
      {children}
    </Text>
  );
};
