import { Box, Flex, Image, Tooltip } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const NetworkIndicator = ({ chainId }: { chainId: string | number }) => {
  const [icon, setIcon] = useState(() => {
    if (chainId == "casper-test" || chainId == "casper")
      return <Image boxSize="14px" src="/assets/icons/casper-logo.png" />;
    if (
      chainId == "mumbai" ||
      chainId == "polygon" ||
      chainId == "80001" ||
      chainId == "137"
    )
      return (
        <Image
          boxSize="14px"
          src="/assets/icons/blockchain/polygon-matic-icon.svg"
        />
      );
    if (chainId == "ethereum" || chainId == "1")
      return (
        <Image
          boxSize="14px"
          src="/assets/icons/blockchain/ethereum-eth-logo.svg"
        />
      );
    else return "?";
  });

  const [label, setLabel] = useState(() => {
    if (chainId == "casper") return "Casper Network";
    if (chainId == "casper-test") return "Casper Testnet Network";
    else return "Unknown Network";
  });

  const {
    backgroundSecondary,
    backgroundPrimary,
    textSecondary,
    borderPrimary,
  } = useThemeProvider();

  return (
    <Tooltip
      label={label}
      bg={backgroundSecondary}
      color={textSecondary}
      borderRadius="4px"
      border="1px solid"
      borderColor={borderPrimary}
    >
      <Flex
        alignItems="center"
        justify="center"
        borderRadius="50%"
        boxShadow="0px 0px 2px rgba(0, 0, 0, 0.25)"
        bg="white"
        backdropFilter="blur(12px)"
        boxSize="22px"
        left="7px"
        top="7px"
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
