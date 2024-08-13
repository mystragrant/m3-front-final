import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../../utils/utils";

const ListItem = ({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex justifyContent="space-between">
      <Box color={textSecondary}>{header}</Box>
      {children}
    </Flex>
  );
};

export const NFTDetailsList = ({
  contractAddress,
  tokenId,
  network,
}: {
  contractAddress: string;
  tokenId: string;
  network: string;
}) => {
  return (
    <Flex w="100%" fontSize="14px" gap="6px" flexDir="column">
      {contractAddress && (
        <ListItem header={"Contract address"}>
          <Box fontWeight="500" textDecoration="underline" cursor="pointer">
            {trimHash(contractAddress)}
          </Box>
        </ListItem>
      )}
      {tokenId && <ListItem header={"Token ID"}>#{tokenId}</ListItem>}
      {network && <ListItem header={"Network"}>{network}</ListItem>}
    </Flex>
  );
};
