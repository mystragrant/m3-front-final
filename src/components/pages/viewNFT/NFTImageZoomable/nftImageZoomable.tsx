import { Flex, Image } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const NFTImageZoomable = ({ url }: { url: string }) => {
  const { backgroundTertiary } = useThemeProvider();

  return (
    <Flex
      _hover={{ opacity: 0.8 }}
      bgImage={url}
      bgPos="center"
      bgSize="cover"
      cursor="pointer"
      transition="0.2s"
      pos="sticky"
      top="45px"
      boxShadow="inset 0px 0px 13.6501px rgba(0, 0, 0, 0.09)"
      bgColor={backgroundTertiary}
      borderRadius="4px"
      width="100%"
      paddingBottom="100%"
    >
      <Image
        src="/assets/icons/zoom.svg"
        pos="absolute"
        top="25px"
        left="25px"
      />
    </Flex>
  );
};
