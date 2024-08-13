import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  useMultiWalletProvider,
  WalletProvider,
} from "../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { SectionHeader } from "../typography/sectionHeader";

export enum NETWORK {
  CASPER,
  ETHEREUM,
}

export const WalletSelector = ({
  network,
  isOpen,
  onClose,
}: {
  network: NETWORK;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    backgroundPrimary,
    backgroundSecondary,
    textSecondary,
    borderPrimary,
  } = useThemeProvider();

  const { selectCasperProvider } = useMultiWalletProvider();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={backgroundPrimary}
        padding="32px 47px"
        minW="600px"
        border="1px solid"
        borderColor={borderPrimary}
      >
        <Flex align="center" justify="space-between">
          <SectionHeader>Select wallet</SectionHeader>
          <CloseIcon
            cursor="pointer"
            onClick={onClose}
            _hover={{ opacity: 0.8 }}
            boxSize="12px"
          />
        </Flex>

        <ModalBody padding="0" margin="0" mt="20px">
          <Grid templateColumns="1fr 1fr" gap="20px" w="500px" mb="20px">
            {[
              // {
              //   icon: "/assets/icons/casper-logo.png",
              //   name: "Casper Signer",
              //   type: NETWORK.CASPER,
              //   onClick: async () => {
              //     selectCasperProvider(WalletProvider.CASPER_SIGNER);
              //   },
              // },
              {
                icon: "/assets/icons/casper-wallet.png",
                name: "Casper Wallet",
                type: NETWORK.CASPER,
                onClick: async () =>
                  selectCasperProvider(WalletProvider.CASPER_WALLET),
              },
              {
                icon: "/assets/icons/casper-wallet.png",
                name: "Casper Dash",
                type: NETWORK.CASPER,
                onClick: async () =>
                  selectCasperProvider(WalletProvider.CASPER_DASH),
              },
              {
                icon: "/assets/icons/metamask-logo.png",
                name: "MetaMask",
                type: NETWORK.ETHEREUM,
                onClick: async () =>
                  selectCasperProvider(WalletProvider.METAMASK),
              },
            ].map((item) => {
              return (
                network == item.type && (
                  <Flex
                    cursor="pointer"
                    _hover={{ bg: backgroundSecondary }}
                    gap="4px"
                    align="center"
                    justify="center"
                    flexDir="column"
                    h="100px"
                    borderRadius="8px"
                    onClick={item.onClick}
                    border="1px solid"
                    borderColor={textSecondary}
                  >
                    <Image w="20px" src={item.icon} />
                    <Box fontSize="14px">{item.name}</Box>
                  </Flex>
                )
              );
            })}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
