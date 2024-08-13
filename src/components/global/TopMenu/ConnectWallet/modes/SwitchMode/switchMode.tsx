import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

export const SwitchMode = ({
  topText,
  bottomText,
  onClick,
}: {
  topText: string;
  bottomText: string;
  onClick: () => any;
}) => {
  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  return (
    <Flex flexDir="column" align="flex-end" justify="center" gap="6px">
      <Box
        fontWeight="600"
        fontSize="14px"
        lineHeight="100%"
        color={textPrimary}
      >
        {topText}
      </Box>
      <Flex
        gap="5px"
        color={textPrimary}
        align="center"
        fontWeight="300"
        cursor="pointer"
        textDecoration="underline"
        fontSize="12px"
        lineHeight="80%"
        onClick={onClick}
      >
        {bottomText}
        <Image
          transform="rotate(315deg)"
          src="/assets/icons/arrow-right-brand.svg"
        />
      </Flex>
    </Flex>
  );
};
