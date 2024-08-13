import { Heading, useColorModeValue } from "@chakra-ui/react";

export const SmallHeader = ({ children }: any) => {
  const textColor = useColorModeValue(
    "colorPrimary.light",
    "colorPrimary.dark",
  );

  return (
    <Heading
      color={textColor}
      as="h4"
      fontSize="16px"
      fontWeight="400"
      lineHeight="110%"
      fontFamily="Inter"
      pb="0"
      mb="0"
    >
      {children}
    </Heading>
  );
};
