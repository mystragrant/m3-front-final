import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { useChainFilter } from "../../../../providers/ChainFilter/useChainFilter";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { BNBIcon } from "../../../shared/icons/Chains/BNBIcon";
import { CasperIcon } from "../../../shared/icons/Chains/CasperIcon";
import { EthereumIcon } from "../../../shared/icons/Chains/EthereumIcon";
import { PolygonIcon } from "../../../shared/icons/Chains/PolygonIcon";
import { CustomCheckbox } from "../../../shared/inputs/CustomCheckbox/customCheckbox";
import { CronosIcon } from "../../../shared/icons/Chains/CronosIcon";

export const ChainFilter = () => {
  const { borderPrimary, backgroundPrimary, textSecondary } =
    useThemeProvider();

  const { availableChains, toggleChain } = useChainFilter();

  return (
    <Flex pos="relative">
      <Menu matchWidth>
        <MenuButton>
          <Flex
            pos="relative"
            border="1px solid"
            borderRadius="8px"
            borderColor={borderPrimary}
            h="46px"
            px="12px"
            display="flex"
            flexDir="row"
            alignItems="center"
            gap="8px"
          >
            <Box fontSize="12px" fontFamily="Inter">
              Chain
            </Box>
            <Box bg="white" boxSize="2px" borderRadius="50%" />

            <Flex gap="7px" align="center">
              <Box opacity={availableChains.includes("1") ? "1" : "0.3"}>
                <EthereumIcon />
              </Box>
              <Box opacity={availableChains.includes("casper") ? "1" : "0.3"}>
                <CasperIcon />
              </Box>
              <Box opacity={availableChains.includes("137") ? "1" : "0.3"}>
                <PolygonIcon />
              </Box>
              <Box opacity={availableChains.includes("56") ? "1" : "0.3"}>
                <BNBIcon />
              </Box>
              <Box opacity={availableChains.includes("25") ? "1" : "0.3"}>
                <CronosIcon />
              </Box>
            </Flex>
            <ChevronDownIcon ml="10px" boxSize="20px" />
          </Flex>
        </MenuButton>
        <MenuList
          p="12px"
          w="100%"
          minW="0"
          border="1px solid"
          borderColor={borderPrimary}
          bg={backgroundPrimary}
        >
          <Box mb="6px" fontSize="14px" fontFamily="Inter">
            Filter platform content
          </Box>
          <Box
            mb="14px"
            fontSize="12px"
            fontFamily="Inter"
            color={textSecondary}
          >
            Choose what chain of content you want to display
          </Box>
          <Flex flexDir="column" gap="8px">
            <CustomCheckbox
              checked={availableChains.includes("casper")}
              onChange={() => toggleChain("casper")}
            >
              <Flex w="100%" color="white" justify="space-between">
                Casper
                <CasperIcon />
              </Flex>
            </CustomCheckbox>

            <CustomCheckbox
              checked={availableChains.includes("1")}
              onChange={() => toggleChain("1")}
            >
              <Flex w="100%" color="white" justify="space-between">
                Ethereum
                <EthereumIcon />
              </Flex>
            </CustomCheckbox>
            <CustomCheckbox
              checked={availableChains.includes("56")}
              onChange={() => toggleChain("56")}
            >
              <Flex w="100%" color="white" justify="space-between">
                Binance
                <BNBIcon />
              </Flex>
            </CustomCheckbox>
            <CustomCheckbox
              checked={availableChains.includes("137")}
              onChange={() => toggleChain("137")}
            >
              <Flex w="100%" color="white" justify="space-between">
                Polygon
                <PolygonIcon />
              </Flex>
            </CustomCheckbox>
            <CustomCheckbox
              checked={availableChains.includes("25")}
              onChange={() => toggleChain("25")}
            >
              <Flex w="100%" color="white" justify="space-between">
                Cronos
                <CronosIcon />
              </Flex>
            </CustomCheckbox>
          </Flex>
          <Box h="4px" />
        </MenuList>
      </Menu>
    </Flex>
  );
};
