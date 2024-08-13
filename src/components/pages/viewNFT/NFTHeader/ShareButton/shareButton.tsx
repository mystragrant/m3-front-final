import { Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { ShareIcon } from "../../../../shared/icons/ShareIcon";

export const ShareButton = () => {
  const { backgroundSecondary } = useThemeProvider();

  return (
    <Flex
      align="center"
      justify="center"
      boxSize="30px"
      borderRadius="50%"
      cursor="pointer"
      _hover={{ bg: backgroundSecondary }}
    >
      <ShareIcon />
    </Flex>
  );
};
