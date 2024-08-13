import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Link,
} from "@chakra-ui/react";
import { AppWrapper } from "./AppWrapper";
import { theme } from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "@elastic/eui/dist/eui_theme_dark.css";
import "@elastic/eui/dist/eui_theme_light.css";
import "./theme/toastify/scss/toastify.scss";
import { UserProvider } from "./providers/User/userProvider";
import { ThemeProvider } from "./providers/Theme/useThemeProvider";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MystraAPI } from "./services/mystra-api";
import { ChatProvider } from "./providers/Chat/chatProvider";
import { CasperWalletProvider } from "./providers/CasperWalletProvider/casperWalletProvider";
import { MultiWalletProvider } from "./providers/MultiWalletProvider/multiWalletProvider";

import {
  CasperDashConnector,
  CasperSignerConnector,
  CasperProvider,
  createClient,
  CasperDashWebConnector,
} from "@casperdash/usewallet";
import { DashboardProvider } from "./providers/Dashboard/useDashboard";
import { ChainFilterProvider } from "./providers/ChainFilter/useChainFilter";
import { TxQueueProvider } from "./providers/useTxQueue/useTxQueue";
import { CenterContainer } from "./components/shared/containers/CenterContainer/centerContainter";
import "@fontsource/plus-jakarta-sans";

const client = createClient({
  connectors: [new CasperSignerConnector(), new CasperDashConnector()],
  autoConnect: false,
});

export function App() {
  const [password, setPassword] = useLocalStorage("password", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    MystraAPI.loginEmail(email, password)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <ChainFilterProvider>
          <CasperProvider client={client}>
            <CasperWalletProvider>
              <MultiWalletProvider>
                <DashboardProvider>
                  <UserProvider>
                    <TxQueueProvider>
                      <Box display={{ base: "none", md: "block" }}>
                        <AppWrapper />
                      </Box>
                      {/* <CenterContainer>
                          <Flex h="100px" justifyContent="space-between">
                            <Box></Box>
                            <Flex
                              align="center"
                              gap="10px"
                              display={{ base: "none", sm: "flex" }}
                            >
                              <Box fontSize="12px" color="#BDBDBD">
                                Our Social Media:
                              </Box>
                              <Link href="https://t.me/mystraio">
                                <Image src="/assets/icons/TelegramLogo.svg" />
                              </Link>
                              <Link href="https://medium.com/@mystra">
                                <Image src="/assets/icons/MediumLogo.svg" />
                              </Link>
                              <Link href="https://discord.gg/PFVu7kN4Ds">
                                <Image src="/assets/icons/DiscordLogo.svg" />
                              </Link>
                              <Link href="https://twitter.com/mystra_io">
                                <Image src="/assets/icons/Xlogo.svg" />
                              </Link>
                            </Flex>
                          </Flex>
                          <Flex flexDir="column" margin="auto" maxW="530px">
                            <Flex
                              height="calc(100vh - 100px)"
                              flexDir="column"
                              justify="center"
                            >
                              <Box
                                display={{ base: "none", md: "flex" }}
                                letterSpacing="-0.64px"
                                fontSize="48px"
                                fontFamily="Inter"
                                pos="relative"
                              >
                                <Box color="#54E2B7" display="inline">
                                  Early testing
                                </Box>
                                &nbsp;is done!
                                <Image
                                  pos="absolute"
                                  right="6px"
                                  top="-20px"
                                  src="/assets/icons/stars.svg"
                                />
                              </Box>
                              <Flex
                                display={{ base: "flex", md: "none" }}
                                letterSpacing="-0.64px"
                                fontSize="48px"
                                fontFamily="Inter"
                                flexDir="column"
                                pos="relative"
                              >
                                <Box
                                  color="#54E2B7"
                                  lineHeight="100%"
                                  display="inline"
                                >
                                  Early testing
                                </Box>
                                is done!
                                <Image
                                  pos="absolute"
                                  right={{ base: "-6px", sm: "6px" }}
                                  top="-20px"
                                  src="/assets/icons/stars.svg"
                                />
                              </Flex>
                              <Flex fontSize="18px" fontFamily="Inter">
                                Thank you for the commitment!
                              </Flex>
                              <Box
                                lineHeight="150%"
                                mt="50px"
                                fontSize="20px"
                                fontFamily="Inter"
                                fontWeight="medium"
                              >
                                We will&nbsp;
                                <Box color="#54E2B7" display="inline">
                                  give away prizes to the most active early
                                  users
                                </Box>
                                . Stay tuned and follow us for the newest
                                updates!
                              </Box>
                              <Flex
                                h="46px"
                                mt="30px"
                                w={{ base: "100%", sm: "auto" }}
                                pos="relative"
                                mb="100px"
                              >
                                <Link
                                  w={{ base: "100%", sm: "auto" }}
                                  href="https://twitter.com/mystra_io"
                                >
                                  <Button
                                    w={{ base: "100%", sm: "220px" }}
                                    h="46px"
                                    fontWeight="400"
                                    bg="white"
                                    fontSize="16px"
                                    fontFamily="Inter"
                                    color="#121212"
                                    gap="14px"
                                  >
                                    <Image src="/assets/icons/x.svg" />
                                    Follow for updates
                                  </Button>
                                </Link>
                              </Flex>
                            </Flex>
                            <Flex
                              display={{ base: "flex", sm: "none" }}
                              pos="fixed"
                              bottom="0"
                              align="center"
                              h="120px"
                              left="0"
                            >
                              <Flex
                                align="center"
                                gap="6px"
                                justify="center"
                                w="100vw"
                                flexDir="column"
                              >
                                <Box fontSize="12px" color="#BDBDBD"></Box>
                                <Flex
                                  align="center"
                                  gap="20px"
                                  justify="center"
                                  w="100vw"
                                >
                                  <Link href="https://t.me/mystraio">
                                    <Image src="/assets/icons/TelegramLogo.svg" />
                                  </Link>
                                  <Link href="https://medium.com/@mystra">
                                    <Image src="/assets/icons/MediumLogo.svg" />
                                  </Link>
                                  <Link href="https://discord.gg/PFVu7kN4Ds">
                                    <Image src="/assets/icons/DiscordLogo.svg" />
                                  </Link>
                                  <Link href="https://twitter.com/mystra_io">
                                    <Image src="/assets/icons/Xlogo.svg" />
                                  </Link>
                                </Flex>
                              </Flex>
                            </Flex>
                          </Flex>

                          <Image
                            pos="fixed"
                            bottom="0"
                            zIndex="-1"
                            w="100vw"
                            left="0"
                            src="/assets/icons/background.png"
                          />
                          <Box
                            pos="fixed"
                            bottom="-50px"
                            w="80vw"
                            zIndex="-1"
                            left="10vw"
                            filter={{ base: "blur(140px)", sm: "blur(200px)" }}
                            opacity="0.6"
                            bg="#54E2B7"
                            h={{ base: "140px", sm: "100px" }}
                            borderRadius="50%"
                          />
                        </CenterContainer> */}
                    </TxQueueProvider>
                  </UserProvider>
                </DashboardProvider>
              </MultiWalletProvider>
            </CasperWalletProvider>
          </CasperProvider>
        </ChainFilterProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
