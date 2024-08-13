import { Box, Flex } from "@chakra-ui/react";
import { useExplorerTheme } from "../../../../providers/ExplorerTheme/useExplorerTheme";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { CenterContainer } from "../../../shared/containers/CenterContainer/centerContainter";
import { CubeIcon } from "../../../shared/icons/CubeIcon";

const Cube = ({ height, time }: { height: number; time: Date }) => {
  const { themeColor } = useExplorerTheme();
  const { textSecondary, textPrimary } = useThemeProvider();

  return (
    <Flex flexDir="column" align="center" justify="center">
      <Flex align="center" justify="center" mb="10px" boxSize="30px">
        <CubeIcon size="30px" customColor={"white"} />
      </Flex>
      <Box fontSize="14px" color={"white"}>
        #{height}
      </Box>
      <Box fontSize="12px" color={textSecondary}>
        1 min ago
      </Box>
    </Flex>
  );
};

export const BlocksList = () => {
  const { themeColor } = useExplorerTheme();

  return (
    <CenterContainer>
      <Flex flexDir="column" mt="150px" pb="70px">
        <Flex
          fontSize="20px"
          justify="space-between"
          fontFamily="Inter"
          mb="20px"
        >
          Latest Blocks
          <Box color={themeColor} fontSize="14px">
            See all blocks
          </Box>
        </Flex>
        <Flex mt="10px" justify="space-between" align="center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
            return <Cube height={i + 2004320} time={new Date()} />;
          })}
        </Flex>
      </Flex>
    </CenterContainer>
  );
};
