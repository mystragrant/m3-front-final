import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { useMemo, useState } from "react";

export const NetworkIndicator = ({ chainId }: { chainId: string | number }) => {
  const [icon, setIcon] = useState(() => {
    if (chainId == "casper") return "C";
    else return "?";
  });

  const [label, setLabel] = useState(() => {
    if (chainId == "casper") return "Casper Network";
    else return "Unknown Network";
  });

  return (
    <Tooltip label={label}>
      <Flex
        alignItems="center"
        justify="center"
        borderRadius="50%"
        bg="rgba(0,0,0,0.1)"
        backdropFilter="blur(12px)"
        boxSize="24px"
        left="10px"
        top="10px"
        pos="absolute"
        zIndex="1"
      >
        <Box color="white" fontWeight="bold" fontSize="16px">
          {icon}
        </Box>
      </Flex>
    </Tooltip>
  );
};
