import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEffectOnce } from "../../../../hooks/useEffectOnce";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../services/mystra-api";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";
import { CsprIcon } from "../../../shared/icons/CsprIcon";
import axios from "axios";
import { MYSTRA_API_URL } from "../../../../constants";
import { Pagination } from "../../../shared/Pagination/pagination";

export const Delegators = () => {
  const { id } = useUserProvider();

  const { borderPrimary, textSecondary } = useThemeProvider();
  const [delegators, setDelegators] = useState<any[]>([]);

  const [maxPages, setMaxPages] = useState<number>(0);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/delegators?validator_public_key=020377bc3ad54b5505971e001044ea822a3f6f307f8dc93fa45a05b7463c0a053bed&pageNumber=${page}&pageSize=7`,
      )
      .then((res) => {
        console.log(res);
        setMaxPages(res.data.total_pages);
        setDelegators(res.data.data);
      });
  }, [page]);

  return (
    <Flex mt="40px" ml="60px" mb="20px" flexDir="column">
      <Flex justifyContent="space-between">
        <Box fontSize="16px" fontFamily="Inter">
          Delegators ranking
        </Box>
        <Box>
          <Pagination
            maxPages={maxPages}
            onNext={() => (page < maxPages ? setPage(page + 1) : null)}
            onPrev={() => (page > 1 ? setPage(page - 1) : null)}
            onClick={setPage}
            page={page}
          />
        </Box>
      </Flex>
      <TableContainer
        w="100%"
        mt="20px"
        pos="relative"
        border="1px solid"
        borderColor={"transparent"}
      >
        <Table borderX="none" borderColor={borderPrimary}>
          <Thead
            pos="sticky"
            top="0px"
            borderColor={borderPrimary}
            border="none !important"
          >
            <Tr borderColor={borderPrimary} borderX="none">
              {["No.", "Delegator", "Amount"].map((item) => {
                return (
                  <Th
                    fontWeight="400"
                    fontSize="14px"
                    fontFamily="Inter"
                    px="none"
                    pr={item == "No." ? "10px" : "none"}
                    color={textSecondary}
                    borderColor={borderPrimary}
                    borderLeft="none"
                    textTransform="none"
                  >
                    <Flex
                      align="center"
                      justify={item == "Amount" ? "flex-end" : "initial"}
                    >
                      {item}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody px="none" borderColor={"none"} borderX="none">
            {delegators.length > 0 ? (
              delegators.map((item, index) => {
                return (
                  <Tr
                    px="none"
                    border="none"
                    margin="none"
                    fontSize="14px"
                    borderColor={borderPrimary}
                  >
                    <Td
                      fontFamily="Space Mono"
                      px="none"
                      pr="20px"
                      fontSize="14px"
                      alignContent="flex-start"
                      borderColor={borderPrimary}
                    >
                      #{index + 1 + (page - 1) * 10}
                    </Td>
                    <Td px="none" borderColor={borderPrimary}>
                      <Flex align="center" gap="12px">
                        <Box
                          boxSize="24px"
                          borderRadius="50%"
                          bgSize="cover"
                          bgPos="center"
                          bgImage={
                            item.avatar ?? "/assets/brand/default-avatar.jpg"
                          }
                        />
                        <Flex fontFamily="Space Mono" fontSize="12px">
                          {item.delegator.slice(0, 10)}...
                          {item.delegator.slice(-10)}
                        </Flex>
                      </Flex>
                    </Td>
                    <Td
                      fontFamily="Space Mono"
                      fontSize="14px"
                      borderColor={borderPrimary}
                      justifyItems="flex-end"
                      px="none"
                    >
                      <Flex justify="flex-end" align="center" gap="6px">
                        {item.staked_amount}{" "}
                        <MultichainIcon size={20} chain="casper" />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Box padding="24px" fontSize="14px">
                No active delegators
              </Box>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
