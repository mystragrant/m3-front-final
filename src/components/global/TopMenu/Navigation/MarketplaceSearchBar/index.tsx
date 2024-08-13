/* eslint-disable */
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { MYSTRA_API_URL } from "../../../../../constants";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../../../utils/utils";

interface SearchResult {
  image: string | null;
  name: string;
  address: string;
  chain: string;
}

export const MarketplaceSearchBar = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [queryString, setQueryString] = useState<string>("");

  const [debouncedSearchTerm] : any = useDebounce(queryString, 700);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
      axios.get(`${MYSTRA_API_URL}/search_collection?searching_text=${debouncedSearchTerm}&page_number=1&page_size=5&order_by=collection_contract_name&order_direction=DESC`).then((res) => {
        setSearchResults(res.data.data.map((item : any) => {
          return {
            name: item.collection_name ?? "Unknown Collection",
            image: item.collection_icon,
            address: item.collection_contract_hash,
            chain: "casper-test"
          }
        }))
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        setLoading(false)
      })


   
  }, [debouncedSearchTerm]);


  useEffect(() => {
    setLoading(true)

  }, [ queryString])

  const {
    backgroundTertiary,
    borderPrimary,
    backgroundSecondary,
    textSecondary,
  } = useThemeProvider();

  const [focus, setFocus] = useState<boolean>();

  const navigate = useNavigate()

  return (
    <Flex pos="relative">
      {focus && <Flex
        flexDir="column"
        border="1px solid"
        borderRadius="8px"
        borderColor={borderPrimary}
        pos="absolute"
        w="100%"
        zIndex="100"
        top="50px"
        h="auto"
        padding="12px"
        bg={backgroundTertiary}
      >
        { loading ? <Flex justify="center" my="100px"><Spinner/></Flex> : searchResults.length > 0 ?searchResults.map((item, index) => {
          return (
            <Link to={`/marketplace/${item.chain}/${item.address}`}>
              <Flex
                p="12px"
                py="8px"
                borderRadius="8px"
                _hover={{ bg: backgroundSecondary }}
                align="center"
                gap="16px"
                key={item.address + index}
              >
                <Flex boxSize="40px" bg="#232323" bgImage={item.image ?? ""} bgPos="center" bgSize="cover" borderRadius="4px" />
                <Flex flexDir="column">
                  <Box fontSize="14px">{item.name}</Box>
                  <Box fontSize="12px" color={textSecondary}>
                    {trimHash(item.address)}
                  </Box>
                </Flex>
              </Flex>
            </Link>
          );
        }) : <Box fontSize="14px" color={textSecondary}>No results found.</Box>}
      </Flex>}
      <InputGroup h="40px">
        <InputLeftAddon
          borderColor={"rgba(255,255,255,0.1)"}
          bg="#141414"
          pr="0px"
          h="40px"
          borderRight="none"
        >
          <SearchIcon color="#73767D" />
        </InputLeftAddon>
        <Input
          w="300px"
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 300)}
          h="40px"
          bg="#141414"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          _placeholder={{ color: "#73767D" }}
          placeholder="Search for NFT collections of profiles"
          borderColor={"rgba(255,255,255,0.1)"}
          fontSize="14px"
          _focus={{
            borderColor: "rgba(255,255,255,0.1)",
            outline: "none",
            boxShadow: "none",
          }}
          fontFamily="Inter"
          borderLeft="none"
        />
      </InputGroup>
    </Flex>
  );
};
