import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../../utils/utils";
import { DropdownContainer } from "../../../shared/containers/dropdownContainer";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";

export const DetailsList = ({
  contractAddress,
  tokenId,
  chain,
  standard,
  creatorEarnings,
}: {
  contractAddress: string;
  tokenId: string;
  chain: string;
  standard: string;
  creatorEarnings: number;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <DropdownContainer label="Details">
      <Flex flexDir="column" gap="10px" fontSize="14px">
        <Flex align="center" justify="space-between">
          <Box>Contract address:</Box>
          <Box color="white">{trimHash(contractAddress)}</Box>
        </Flex>
        <Flex align="center" justify="space-between">
          <Box>Token ID:</Box>
          <Box color="white">#{tokenId}</Box>
        </Flex>
        <Flex align="center" justify="space-between">
          <Box>Chain:</Box>
          <Flex
            align="center"
            gap="8px"
            textTransform={"capitalize"}
            color="white"
          >
            {chain}
            <MultichainIcon size={20} chain={chain} />
          </Flex>
        </Flex>
        <Flex align="center" justify="space-between">
          <Box>Token standard:</Box>
          <Box color="white">{standard}</Box>
        </Flex>
        {/* <Flex align="center" justify="space-between">
          <Box>Creator earnings:</Box>
          <Box color="white">{creatorEarnings}%</Box>
        </Flex> */}
      </Flex>
    </DropdownContainer>
  );
};
