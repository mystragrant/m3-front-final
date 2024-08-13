import { Heading, useColorModeValue } from "@chakra-ui/react";

export const SectionHeader = ({ children }: any) => {
  const textColor = useColorModeValue(
    "colorPrimary.light",
    "colorPrimary.dark",
  );

  return (
    <Heading
      color={textColor}
      as="h3"
      fontSize="16px"
      fontFamily="Inter"
      fontWeight="300"
      lineHeight="26px"
    >
      {children}
    </Heading>
  );
};
