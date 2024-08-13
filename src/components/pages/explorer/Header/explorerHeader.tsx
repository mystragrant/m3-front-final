import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useExplorerTheme } from "../../../../providers/ExplorerTheme/useExplorerTheme";
import { CenterContainer } from "../../../shared/containers/CenterContainer/centerContainter";

export const ExplorerHeader = () => {
  const { themeColor } = useExplorerTheme();

  return (
    <Flex
      w="calc(100vw - 66px)"
      h="330px"
      margin="0 auto"
      bgRepeat="repeat"
      pos="relative"
      overflow="hidden"
      bgSize="1600px"
      bgImage="/assets/elements/explorer/background.png"
    >
      <CenterContainer>
        <Box fontSize="24px" fontFamily="Inter" mt="50px">
          The Casper Network Explorer
        </Box>

        <Input
          mt="20px"
          placeholder="Search by block / Block Height / Transaction / Account..."
          fontSize="14px"
          fontFamily="Inter"
          bg="#131313"
          zIndex="1"
          maxW="40%"
        />

        <Box
          bottom="-500px"
          pos="absolute"
          left="0"
          zIndex="0"
          right="0"
          margin="auto"
          bg={themeColor}
          filter="blur(170px)"
          boxSize="500px"
        />
      </CenterContainer>
    </Flex>
  );
};
