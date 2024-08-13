import { Box, Flex, Skeleton, Spinner, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYSTRA_API_URL } from "../../../../../constants";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Pagination } from "../../../../shared/Pagination/pagination";
import { useSearchParams } from "react-router-dom";

const helper = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const Ranking = () => {
  const { textPrimary, borderPrimary } = useThemeProvider();

  const [rankingItems, setRankingItems] = useState<any>([]);

  const [maxPages, setMaxPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/UsersRank/UsersRank?pageNumber=${page}&pageSize=20`,
      )
      .then((res) => {
        console.log(res);
        setMaxPages(res.data.total_pages);
        setRankingItems(
          res.data.users
            .sort(function (a: any, b: any) {
              return a.total_points - b.total_points;
            })
            .reverse(),
        );
        setSearchParams({ page: page.toString() });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, setSearchParams]);

  const navigate = useNavigate();

  return (
    <Flex flexDir="column" pos="relative">
      <Flex mb="20px" align="center" justify="space-between">
        <Box fontFamily="Inter" fontSize="24px">
          Mystra User Ranking
        </Box>
        <Pagination
          maxPages={maxPages}
          onNext={() => (page < maxPages ? setPage(page + 1) : null)}
          onPrev={() => (page > 1 ? setPage(page - 1) : null)}
          onClick={setPage}
          page={page}
        />
      </Flex>
      <TableContainer
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        border="1px solid"
        borderColor={borderPrimary}
      >
        <Table>
          <Thead
            zIndex="10"
            pos="sticky"
            top="0"
            fontFamily="Inter"
            borderColor={borderPrimary}
          >
            <Tr>
              <Th
                color="white"
                fontWeight="normal"
                textTransform="none"
                borderColor={borderPrimary}
                fontSize="14px"
              >
                Rank
              </Th>
              <Th
                color={textPrimary}
                fontWeight="normal"
                textTransform="none"
                borderColor={borderPrimary}
                fontSize="14px"
              >
                User
              </Th>
              <Th
                color={textPrimary}
                fontWeight="normal"
                display="flex"
                align="center"
                textTransform="none"
                borderColor={borderPrimary}
                fontSize="14px"
                gap="4px"
                w="200px"
              >
                Rating <Image w="14px" src="/assets/brand/star-white.svg" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {rankingItems.length > 0
              ? rankingItems.reverse().map((item: any, index: number) => {
                  return (
                    <Tr
                      h="40px"
                      bg={index % 2 === 0 ? "rgba(0,0,0,0.1)" : "none"}
                    >
                      <Td
                        borderColor={borderPrimary}
                        textAlign="center"
                        w="0px"
                        fontSize="14px"
                        fontFamily="Space Mono"
                      >
                        #{index + 1 + (page - 1) * 20}
                      </Td>
                      <Td borderColor={borderPrimary}>
                        <Flex
                          align="center"
                          gap="16px"
                          cursor="pointer"
                          onClick={() => navigate(`/users/${item.id}`)}
                        >
                          <Box
                            boxSize="34px"
                            borderRadius="50%"
                            bgImage={
                              item.avatar === "null"
                                ? "/assets/brand/default-avatar.jpg"
                                : item.avatar
                            }
                            bgSize="cover"
                            bgPos="center"
                          />
                          <Flex fontSize="14px" fontFamily="Inter">
                            {item.nickname}
                          </Flex>
                        </Flex>
                      </Td>
                      <Td borderColor={borderPrimary} w="200px">
                        <Flex
                          gap="10px"
                          display="flex"
                          fontFamily="Space Mono"
                          fontSize="14px"
                          align="center"
                        >
                          {Math.floor(item.total_points)}{" "}
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })
              : helper.map((item: any, index) => (
                  <Tr
                    borderColor={borderPrimary}
                    h="40px"
                    bg={index % 2 === 0 ? "rgba(0,0,0,0.1)" : "none"}
                  >
                    <Td
                      textAlign="center"
                      w="0px"
                      borderColor={borderPrimary}
                      fontSize="14px"
                      fontFamily="Space Mono"
                    >
                      #{item}
                    </Td>
                    <Td borderColor={borderPrimary}>
                      <Flex align="center" gap="10px">
                        <Flex
                          boxSize="34px"
                          borderRadius="50%"
                          bg={borderPrimary}
                          bgSize="cover"
                          bgPos="center"
                          align="center"
                          justify="center"
                        >
                          {" "}
                          <Spinner opacity="0.4" color="white" />{" "}
                        </Flex>
                        <Skeleton opacity="0.2">Nickname</Skeleton>
                      </Flex>
                    </Td>

                    <Td borderColor={borderPrimary} w="200px">
                      {" "}
                      <Skeleton opacity="0.2">Nickname</Skeleton>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="flex-end" mt="16px">
        <Pagination
          maxPages={maxPages}
          onNext={() => (page < maxPages ? setPage(page + 1) : null)}
          onPrev={() => (page > 1 ? setPage(page - 1) : null)}
          onClick={setPage}
          page={page}
        />
      </Flex>
    </Flex>
  );
};
