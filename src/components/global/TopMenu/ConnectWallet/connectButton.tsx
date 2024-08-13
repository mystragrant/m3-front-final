import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { ConnectWallet } from "./modes/ConnectWallet/connectWallet";
import { LoadingScreen } from "./modes/LoadingScreen/loadingScreen";
import { LoginPopup } from "./modes/LoginPopup/loginPopup";
import { RegisterPopup } from "./modes/RegisterPopup/registerPopup";
import { RegisterSuccess } from "./modes/RegisterSuccess/registerSuccess";
import { RegisterWallet } from "./modes/RegisterWallet/registerWallet";
import { WalletRegisterSuccess } from "./modes/WalletRegisterSuccess/walletRegisterSuccess";

export enum ConnectMode {
  LOGIN,
  REGISTER,
  LOGIN_WALLET,
  REGISTER_WALLET,
  REGISTER_SUCCESS,
  REGISTER_WALLET_SUCCESS,
  LOADING,
}

export const ConnectButton = () => {
  const [connectMode, setConnectMode] = useState<ConnectMode>(
    ConnectMode.LOGIN,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { borderPrimary } = useThemeProvider();

  const background = useColorModeValue("background.light", "background.dark");

  useEffect(() => {
    setConnectMode(ConnectMode.LOGIN);
  }, [isOpen]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.get("register");
    const params2 = searchParams.get("login");
    if (params === "true") {
      setConnectMode(ConnectMode.REGISTER);
      searchParams.delete("register");
      setSearchParams(searchParams);

      onOpen();
    }
    if (params2 === "true") {
      setConnectMode(ConnectMode.LOGIN);
      searchParams.delete("login");
      setSearchParams(searchParams);

      onOpen();
    }
  }, [searchParams, setSearchParams, onOpen]);

  const [walletRegisterError, setWalletRegisterError] =
    useState<boolean>(false);

  const page = {
    [ConnectMode.LOGIN]: () => (
      <LoginPopup setMode={setConnectMode} onClose={onClose} />
    ),
    [ConnectMode.REGISTER]: () => <RegisterPopup setMode={setConnectMode} />,
    [ConnectMode.LOGIN_WALLET]: () => (
      <ConnectWallet setMode={setConnectMode} />
    ),
    [ConnectMode.REGISTER_WALLET]: () => (
      <RegisterWallet
        setMode={setConnectMode}
        walletRegisterError={walletRegisterError}
        setWalletRegisterError={setWalletRegisterError}
      />
    ),
    [ConnectMode.REGISTER_SUCCESS]: () => <RegisterSuccess onClose={onClose} />,
    [ConnectMode.REGISTER_WALLET_SUCCESS]: () => (
      <WalletRegisterSuccess setMode={setConnectMode} onClose={onClose} />
    ),
    [ConnectMode.LOADING]: () => <LoadingScreen />,
  };

  return (
    <>
      <Button
        h="40px"
        fontFamily="Sora"
        bg="#EFEFEF"
        borderRadius="4px"
        fontWeight="400"
        minW="140px"
        fontSize="14px"
        color="black"
        onClick={onOpen}
      >
        <Flex gap="10px" align="center">
          Sign In
        </Flex>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          padding="0px"
          bg={background}
          margin="auto"
          display="grid"
          border="1px solid"
          borderRadius="8px"
          maxH="550px"
          maxW="900px"
          borderColor={borderPrimary}
          gridTemplateColumns="500px 400px"
        >
          {page[connectMode]()}
          <Flex
            flexDir="column"
            bg={"#111111"}
            pos="relative"
            borderLeft="1px solid"
            borderColor={borderPrimary}
            w="399px"
            h="550px"
            overflow="hidden"
            borderRightRadius="8px"
          >
            <Box
              fontSize="54px"
              fontFamily="inter"
              fontWeight="800"
              lineHeight="100%"
              mt="120px"
              ml="50px"
            >
              Stake
              <br />& Earn
            </Box>
            <Box
              fontSize="16px"
              fontFamily="inter"
              fontWeight="400"
              ml="50px"
              mt="14px"
            >
              Manage all your tokens froany <br /> others in one place!
            </Box>
            <Image
              bottom="0px"
              right="0px"
              pos="absolute"
              src="/assets/elements/promo/login.png"
            />
            <Image
              top="80px"
              right="190px"
              w="20px"
              pos="absolute"
              src="/assets/brand/star-white.svg"
            />
            <Image
              top="100px"
              right="100px"
              w="60px"
              pos="absolute"
              src="/assets/brand/star-white.svg"
            />
            <Box
              boxSize="200px"
              bg="brandSecondary.500"
              filter="blur(100px)"
              bottom="-100px"
              right="0px"
              left="0"
              margin="auto"
              pos="absolute"
            />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
