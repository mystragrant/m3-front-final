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

export const ValidatorList = () => {
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
          Top validators
        </Box>
        <Box fontSize="14px" color={themeColor}>
          See all validators
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
              Validator
            </Th>
            <Th
              borderColor={borderPrimary}
              textAlign="right"
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Fee
            </Th>
            <Th
              borderColor={borderPrimary}
              textAlign="right"
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Total Stake
            </Th>
            <Th
              borderColor={borderPrimary}
              textAlign="right"
              color={"#DFDDEC"}
              fontWeight="normal"
            >
              Performance
            </Th>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
              return (
                <Tr>
                  <Td borderColor={borderPrimary}>
                    <Flex align="center" gap="10px">
                      <Box boxSize="42px" bg="#373737" borderRadius="50%" />
                      <Flex flexDir="column">
                        <Box fontFamily="Space Mono" fontSize="14px">
                          0138e6…de45
                        </Box>
                        <Box
                          fontWeight="300"
                          fontSize="12px"
                          fontFamily="Inter"
                        >
                          Forest Staking
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
                  <Td borderColor={borderPrimary} fontFamily="Space Mono">
                    <Flex align="center" gap="10px" justifyContent="flex-end">
                      <CircularProgress
                        trackColor="#171717"
                        color={themeColor}
                        value={95}
                        size="24px"
                        thickness={16}
                      />
                      95%
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
