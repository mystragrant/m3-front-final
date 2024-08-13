import { Flex, Box } from "@chakra-ui/react";

export const ConnectionIndicator = ({ connected }: { connected: boolean }) => {
  return (
    <Flex alignItems="center" color="black" gridGap="10px">
      <Box color="#333A4A" letterSpacing="-0.02em" fontSize="17px">
        {connected ? "Connected" : "Disconnected"}
      </Box>
      <Box
        boxSize="8px"
        borderRadius="50%"
        bg={connected ? "#37D400" : "#FF2929"}
      ></Box>
    </Flex>
  );
};
