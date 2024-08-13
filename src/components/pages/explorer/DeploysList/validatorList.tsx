import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  theme,
  Tr,
} from "@chakra-ui/react";
import { useExplorerTheme } from "../../../../providers/ExplorerTheme/useExplorerTheme";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";

export const DeploysList = () => {
  const { borderPrimary, textSecondary } = useThemeProvider();

  const { themeColor } = useExplorerTheme();

  return (
    <Flex
      border="1px solid"
      borderRadius="8px"
      flexDir="column"
      borderColor={borderPrimary}
      fontFamily="Inter"
    >
      <Flex
        align="center"
        justify="space-between"
        h="60px"
        borderBottom="1px solid"
        borderColor={borderPrimary}
        px="20px"
      >
        <Box fontFamily="Inter" fontSize="16px">
          Latest deploys
        </Box>
        <Box fontSize="14px" color={themeColor}>
          See all deploys
        </Box>
      </Flex>
      <TableContainer>
        <Table fontFamily="Inter" fontSize="14px">
          <Thead>
            <Th
              borderColor={borderPrimary}
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Deploy Hash
            </Th>
            <Th
              borderColor={borderPrimary}
              textAlign="right"
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Action
            </Th>
            <Th
              borderColor={borderPrimary}
              textAlign="right"
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Amount
            </Th>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
              return (
                <Tr>
                  <Td borderColor={borderPrimary}>
                    <Flex align="center" py="1px" gap="10px">
                      <Flex flexDir="column" justify="center">
                        <Flex
                          fontFamily="Space Mono"
                          gap="6px"
                          align="center"
                          fontSize="14px"
                        >
                          <CheckCircleIcon color={themeColor} /> 0138e6…de45
                        </Flex>
                        <Box
                          color={textSecondary}
                          fontWeight="300"
                          fontSize="12px"
                          fontFamily="Inter"
                        >
                          5 min ago
                        </Box>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td borderColor={borderPrimary}>
                    <Flex
                      align="center"
                      fontFamily="Space Mono"
                      color={textSecondary}
                      justify="flex-end"
                    >
                      5.00%
                    </Flex>
                  </Td>
                  <Td borderColor={borderPrimary} fontFamily="Space Mono">
                    <Flex align="center" gap="8px" justify="flex-end">
                      371,527,408 <MultichainIcon chain="casper" size={16} />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
