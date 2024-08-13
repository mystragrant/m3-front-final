import {
  ArrowForwardIcon,
  ChatIcon,
  CheckCircleIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Grid, Image, Input, Link, border } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MYSTRA_API_URL } from "../../../../constants";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import axios from "axios";
import { HeartIcon } from "../../../shared/icons/HeartIcon";
import { ShareIcon } from "../../../shared/icons/ShareIcon";
import { FeaturedProjects } from "./FeaturedProjects/featuredProjects";

interface NewsItem {
  time: Date;
  creatorName: string;
  creatorAvatar: string;
  text: string;
  imageUrl: string;
}

export const News = () => {
  const { borderPrimary, backgroundPrimary } = useThemeProvider();

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [maxPages, setMaxPages] = useState<number>(0);

  const [data, setData] = useState<any[]>([]);

  const [news, setNews] = useState<NewsItem[]>([]);

  const { textSecondary } = useThemeProvider();

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/dashboard/news?pageNumber=${pageNumber}&pageSize=20`,
      )
      .then((res) => {
        setData(res.data.items);
        setMaxPages(res.data.max_count_pages);
        setNews(
          res.data.items.map((item: any) => {
            return {
              creatorName: "News",
              imageUrl: item.imageUrl,
              text: item.text,
              date: item.date,
              creatorImage: "/assets/images/nft-mocks/download.jpg",
            };
          }),
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pageNumber]);

  const [selectedSearchIndex, setSelectedSearchIndex] = useState<number>(0);

  return (
    <Flex pos="relative" flexDir="column" w="100%">
      <Flex fontSize="21px" lineHeight={"100%"} fontFamily="Inter" mb="30px">
        Whats new in the Mystra World
      </Flex>
      <Flex
        h="70px"
        pos="sticky"
        justify={"center"}
        top="74px"
        zIndex="100"
        borderBottom="1px solid"
        flexDir="column"
        borderColor={borderPrimary}
        bg={backgroundPrimary}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="20px">
            {["All", "News", "Projects", "Votings"].map((item, index) => {
              return (
                <Flex
                  fontSize="16px"
                  onClick={() => setSelectedSearchIndex(index)}
                  cursor={"pointer"}
                  fontFamily="Inter"
                  opacity={index == selectedSearchIndex ? "1" : "0.6"}
                  pos="relative"
                >
                  {item}
                  {index == selectedSearchIndex && (
                    <Box
                      h="2px"
                      w="100%"
                      pos="absolute"
                      bottom="-4px"
                      bg="white"
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>
          <Flex
            boxSize="40px"
            w="300px"
            borderRadius={"8px"}
            border="1px solid"
            gap="14px"
            align="center"
            px="20px"
            borderColor={borderPrimary}
          >
            <SearchIcon color={textSecondary} />
            <Box fontFamily="Inter" fontSize="14px" color={textSecondary}>
              Search in Mystra
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        border="1px solid"
        borderTop="none"
        borderColor={borderPrimary}
      >
        <Grid templateColumns="1fr">
          {news &&
            news.map((news: any, index) => {
              return index % 6 != 1 ? (
                <Grid
                  role="group"
                  borderBottom="1px solid"
                  templateColumns={"auto 1fr"}
                  padding="20px"
                  px="50px"
                  pr="100px"
                  templateRows="1fr auto"
                  borderColor={borderPrimary}
                  gap="20px"
                  fontFamily="Inter"
                >
                  <Flex>
                    <Box
                      boxSize="44px"
                      bg="rgba(255,255,255,0.05)"
                      bgImage="/assets/images/nft-mocks/download.jpg"
                      bgSize="cover"
                      bgPos="center"
                      borderRadius="50%"
                    />
                  </Flex>
                  <Flex flexDir="column" justify="center">
                    <Flex flexDir="column" lineHeight={"130%"} h="44px">
                      <Flex align="center" fontWeight="Bold" gap="8px">
                        {news.creatorName}
                        <CheckCircleIcon w="12px" color="brandSecondary.500" />
                        <Box
                          fontWeight="normal"
                          fontSize="14px"
                          color={textSecondary}
                        >
                          18min ago
                        </Box>
                      </Flex>
                      <Flex
                        color={"rgba(255,255,255,0.7)"}
                        align="center"
                        fontSize="14px"
                      >
                        Crypto World News
                      </Flex>
                    </Flex>
                    <Flex mt="16px" fontSize="14px" flexDir="column">
                      {news.text}
                    </Flex>
                    <Flex mt="20px" flexDir="column">
                      <Image borderRadius="8px" src={news.imageUrl} />
                    </Flex>
                    <Flex justify="space-between" align="center" mt="20px">
                      <Flex
                        align="center"
                        fontSize="14px"
                        fontFamily="Inter"
                        gap="40px"
                      >
                        <Flex align="center" gap="10px">
                          <HeartIcon customColor="gray" customSize={20} /> 450
                        </Flex>
                        <Flex align="center" gap="10px">
                          <ChatIcon color="gray" /> 14
                        </Flex>
                      </Flex>
                      <Flex align="center" gap="10px">
                        <ShareIcon customColor="gray" />
                      </Flex>
                    </Flex>
                  </Flex>
                </Grid>
              ) : (
                <FeaturedProjects />
              );
            })}
        </Grid>
      </Flex>
    </Flex>
  );
};
