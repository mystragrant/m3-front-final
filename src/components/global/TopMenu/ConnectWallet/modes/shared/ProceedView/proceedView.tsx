import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export enum WalletType {
  METAMASK,
  CASPER_SIGNER,
  CASPER_WALLET,
  CASPER_DASH,
}

export const ProceedView = ({
  publicKey,
  onProceed,
  icon,
}: {
  walletType: WalletType;
  publicKey: string;
  onProceed: () => any;
  icon: string;
}) => {
  const { textSecondary, borderPrimary } = useThemeProvider();

  return (
    <Grid
      templateColumns="60px 1fr auto"
      pr="10px"
      w="100%"
      gap="0px"
      alignItems="center"
      border="1px solid"
      borderColor={borderPrimary}
      borderRadius="8px"
    >
      <Flex boxSize="60px" align="center" justify="center" borderRadius="50%">
        <Image w="20px" src={icon} />
      </Flex>
      <Flex flexDir="column" justify="center">
        <Box fontSize="14px" fontWeight="400" fontFamily="Inter">
          Connected wallet:
        </Box>
        <Box fontSize="12px" color={textSecondary}>
          {publicKey
            ? publicKey.slice(0, 10) + "..." + publicKey.slice(-10)
            : "Connect your wallet first"}
        </Box>
      </Flex>
      <Button
        onClick={onProceed}
        h="40px"
        bg="#EFEFEF"
        color="black"
        fontWeight="normal"
        fontSize="14px"
        borderRadius="4px"
      >
        Confirm
      </Button>
    </Grid>
  );
};
