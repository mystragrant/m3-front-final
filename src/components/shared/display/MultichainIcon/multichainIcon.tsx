import { Flex, Image } from "@chakra-ui/react";
import { useMemo } from "react";

export const MultichainIcon = ({
  chain,
  size = 24,
  white = false,
}: {
  chain: string;
  white?: boolean;
  size?: number;
}) => {
  const icon = useMemo(() => {
    switch (chain) {
      case "0x1":
      case "eth":
        return "/assets/icons/blockchain/ethereum-eth-logo.svg";
      case "polygon":
      case "137":
      case "80001":
        return "assets/icons/blockchain/polygon-matic-icon.svg";
      case "casper-test":
      case "casper":
        return "assets/icons/blockchain/casper-logo.svg";
    }
  }, [chain]);

  return (
    <Flex
      align="center"
      bg="rgba(255,255,255,0.04)"
      boxSize={size + "px"}
      borderRadius="50%"
      backdropFilter="blur(40px)"
      pos="relative"
      border="1px solid"
      borderColor="rgba(255,255,255,0.16)"
      justify="center"
    >
      <Image
        filter={white ? "grayscale(1) brightness(100)" : "none"}
        src={icon}
        h="50%"
      />
    </Flex>
  );
};
