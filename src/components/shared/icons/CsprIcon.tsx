import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

export const CsprIcon = ({
  alwaysLight = false,
}: {
  alwaysLight?: boolean;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    alwaysLight ? "borderColor.light" : "borderColor.dark",
  );

  const backgroundColor = useColorModeValue(
    "background.light",
    alwaysLight ? "background.light" : "background.dark",
  );

  return (
    <Flex
      boxSize="16px"
      align="center"
      justify="center"
      borderRadius="50%"
      border="1px solid"
      borderColor={borderColor}
      background={backgroundColor}
    >
      <Image w="10px" src="/assets/images/casper.png" />
    </Flex>
  );
};
