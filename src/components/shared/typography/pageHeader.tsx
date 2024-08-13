import { Heading, useColorModeValue } from "@chakra-ui/react";

export const PageHeader = ({ children }: any) => {
  const textColor = useColorModeValue(
    "colorPrimary.light",
    "colorPrimary.dark",
  );

  return (
    <Heading
      color={textColor}
      as="h2"
      fontSize="24px"
      fontWeight="600"
      lineHeight="110%"
      fontFamily="Sora, sans-serif"
    >
      {children}
    </Heading>
  );
};
