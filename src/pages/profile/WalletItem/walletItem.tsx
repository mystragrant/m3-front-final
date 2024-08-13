import { Box, Flex, Image } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../utils/utils";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";

export enum NETWORK_TYPE {
  CASPER,
  EVM,
}

export const WalletItem = ({
  address,
  networkType,
}: {
  address: string;
  networkType: NETWORK_TYPE;
}) => {
  const { borderPrimary } = useThemeProvider();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!copied) {
      window.navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  return (
    <Flex
      h="32px"
      border="1px solid"
      borderRadius="4px"
      borderColor={borderPrimary}
      align="center"
      px="10px"
      gap="10px"
    >
      <Image
        maxH="18px"
        src={
          networkType === NETWORK_TYPE.CASPER
            ? "/assets/icons/casper-logo.png"
            : "/assets/icons/metamask-logo.png"
        }
      />
      <Box fontSize="12px" fontFamily="Space Mono">
        {trimHash(address)}
      </Box>
      <Box onClick={handleCopy} cursor="pointer">
        {!copied ? (
          <Image src="/assets/icons/copy.svg" />
        ) : (
          <CheckCircleIcon w="14px" />
        )}
      </Box>
    </Flex>
  );
};
