import {
  Box,
  Flex,
  Grid,
  Image,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const DaoList = () => {
  const { borderPrimary, textSecondary } = useThemeProvider();

  return (
    <Flex flexDir="column">
      <Grid templateColumns="1fr 1fr" gap="20px">
        <Input placeholder="Search by project name, network etc." />
        <Grid templateColumns={"1fr 1fr 1fr"} gap="12px">
          <Select placeholder="Project Phase">
            <option>Incubation Phase</option>
          </Select>
          <Select placeholder="Blockchain">
            <option>Incubation Phase</option>
          </Select>
          <Select placeholder="Something">
            <option>Something</option>
          </Select>
        </Grid>
      </Grid>
      <TableContainer mt="40px" px="0">
        <Table variant="simple" px="0">
          <Thead fontFamily="Inter !important">
            <Tr px="0" mx="0px">
              <Th
                fontWeight="400"
                borderColor={borderPrimary}
                fontFamily="Inter"
                color={textSecondary}
              >
                Fav.
              </Th>
              <Th
                fontWeight="400"
                borderColor={borderPrimary}
                fontFamily="Inter"
                color={textSecondary}
              >
                Name
              </Th>
              <Th
                fontWeight="400 "
                borderColor={borderPrimary}
                fontFamily="Inter"
                color={textSecondary}
              >
                Network
              </Th>
              <Th
                fontWeight="400"
                borderColor={borderPrimary}
                fontFamily="Inter"
                color={textSecondary}
              >
                Active users
              </Th>
              <Th
                fontWeight="400"
                borderColor={borderPrimary}
                fontFamily="Inter"
                color={textSecondary}
              >
                Current Status
              </Th>
            </Tr>
          </Thead>
          <Tbody mx="0px">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <Tr
                  bg={index % 2 == 1 ? "none" : "rgba(255,255,255,0.03)"}
                  border="none"
                >
                  <Td border="none">2.4k</Td>
                  <Td border="none">
                    <Flex gap="14px" align="center">
                      <Flex
                        boxSize="40px"
                        borderRadius="50%"
                        bg="black"
                        border="1px solid"
                        borderColor={borderPrimary}
                      />
                      <Box fontFamily="Inter">Mystra</Box>
                    </Flex>
                  </Td>
                  <Td border="none">
                    <Flex gap="14px" align="center" fontSize="14px">
                      <Image w="20px" src="/assets/icons/erc20/polygon.svg" />{" "}
                      Polygon
                    </Flex>
                  </Td>
                  <Td border="none">{(index * index * 10000 + 4000) % 423}</Td>
                  <Td border="none">0.91444</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
