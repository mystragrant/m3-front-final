import {
  CasperDashConnector,
  CasperWalletConnector,
  useAccount,
  useConnect,
  useSignMessage,
} from "@casperdash/usewallet";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, ModalBody } from "@chakra-ui/react";
import { useState } from "react";
import { useCasperWallet } from "../../../../../../providers/CasperWalletProvider/casperWalletProvider";
import { useMultiWalletProvider } from "../../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";
import { JWT_TYPES } from "../../../../../../providers/User/types";
import { useUserProvider } from "../../../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../../../services/mystra-api";
import { ConnectMode } from "../../connectButton";
import { ConnectHeading } from "../shared/ConnectHeading/connectHeading";
import { ProceedView } from "../shared/ProceedView/proceedView";

enum WalletType {
  METAMASK = 0,
  CASPER_SIGNER = 1,
  CASPER_WALLET = 2,
  CASPER_DASH = 3,
}

export const ConnectWallet = ({
  setMode,
}: {
  setMode: (val: ConnectMode) => any;
}) => {
  const [account, setAccount] = useState<string>("");
  const [walletType, setWalletType] = useState<WalletType | null>();

  const { loginUser } = useUserProvider();

  const { publicKey: casperDashPublicKey } = useAccount();

  const { connect: connectWithCasperDash } = useConnect({
    connector: new CasperDashConnector(),
  });

  const { connect: connectWithCasperWallet } = useConnect({
    connector: new CasperWalletConnector(),
  });

  const {
    requestConnection,
    activeKey: casperWalletPublicKey,
    isConnected,
    signMessage: casperWalletSignMessage,
  } = useCasperWallet();

  const { metamaskInstalled, casperWalletInstalled } = useMultiWalletProvider();

  const { backgroundSecondary, textSecondary } = useThemeProvider();

  const handleMetamaskAuth = async () => {
    setMode(ConnectMode.LOADING);

    MystraAPI.getWalletSecret(account).then(async (res) => {
      let tx;

      try {
        tx = await (window as any).ethereum.request({
          method: "personal_sign",
          params: [res.data, account],
        });
      } catch (e) {
        setMode(ConnectMode.LOGIN_WALLET);
      }

      MystraAPI.authLoginEVM(tx, res.data)
        .then((res) => {
          loginUser(res.data, JWT_TYPES.EVM);
        })
        .catch(() => {
          setMode(ConnectMode.REGISTER_WALLET);
        });
    });
  };

  const { signMessageAsync } = useSignMessage({});

  const handleCasperDashAuth = async () => {
    setMode(ConnectMode.LOADING);

    try {
      const pubKey = casperDashPublicKey;

      if (pubKey) {
        await MystraAPI.getCasperSignerSeed(pubKey)
          .then(async (response: any) => {
            const secretToken = response.data;

            const data = await signMessageAsync({
              message: secretToken,
              signingPublicKeyHex: pubKey,
            });
            console.log(data);

            MystraAPI.authLoginSigner(data as string, response.data)
              .then((res) => {
                console.log(res.data);
                loginUser(res.data, JWT_TYPES.CASPER);
              })
              .catch((e) => {
                console.log(e);
                setMode(ConnectMode.REGISTER_WALLET);
              });
          })
          .catch((e) => {
            setMode(ConnectMode.LOGIN_WALLET);
          });
      } else {
        connectWithCasperDash();

        setMode(ConnectMode.LOGIN_WALLET);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCasperWalletAuth = async () => {
    setMode(ConnectMode.LOADING);

    try {
      const pubKey = casperWalletPublicKey;

      if (isConnected) {
        await MystraAPI.getCasperSignerSeed(pubKey)
          .then(async (response: any) => {
            const secretToken = response.data;

            await casperWalletSignMessage(secretToken, pubKey)
              .then((signHash) => {
                console.log(signHash, secretToken);
                if (signHash.cancelled) {
                  setMode(ConnectMode.LOGIN_WALLET);
                } else {
                  MystraAPI.authLoginSigner(
                    (signHash as any).signatureHex,
                    secretToken,
                  )
                    .then((res) => {
                      console.log(res.data);
                      loginUser(res.data, JWT_TYPES.CASPER);
                    })
                    .catch((e) => {
                      setMode(ConnectMode.REGISTER_WALLET);
                    });
                }
              })
              .catch(() => {
                setMode(ConnectMode.LOGIN_WALLET);
                console.error("Error during signing login message.");
              });
          })
          .catch((e) => {
            setMode(ConnectMode.LOGIN_WALLET);
          });
      } else {
        setMode(ConnectMode.LOGIN_WALLET);
        connectWithCasperWallet();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { borderPrimary } = useThemeProvider();

  return (
    <ModalBody display="grid" gridTemplateColumns="1fr" padding="0px" w="100%">
      <Flex
        gridTemplateColumns="1fr"
        flexDir="column"
        padding="57px 61px"
        gap="17px"
      >
        <Flex flexDir="column" w="100%" gap="14px" mb="20px">
          <Flex align="center" justify="space-between">
            <ConnectHeading>Connect your wallet</ConnectHeading>
            <Flex
              align="center"
              gap="5px"
              fontSize="14px"
              opacity="0.6"
              cursor="pointer"
              onClick={() => {
                if (walletType === null) setMode(ConnectMode.LOGIN);
                else setWalletType(null);
              }}
            >
              <Image
                src="/assets/icons/arrow-right.svg"
                transform="rotate(180deg)"
              />
              Back
            </Flex>
          </Flex>

          <Box fontSize="12px" color={textSecondary}>
            Select what wallet your want to connect bellow
          </Box>
        </Flex>
        {walletType == null && (
          <Flex flexDir="column" gap="10px" mb="20px">
            {[
              {
                icon: "/assets/icons/casper-wallet.png",
                name: "Casper Wallet",
                disabled: !casperWalletInstalled,
                onClick: async () => {
                  try {
                    connectWithCasperWallet();
                    setWalletType(WalletType.CASPER_WALLET);
                  } catch (e) {
                    console.log(e);
                    setWalletType(null);
                  }
                },
              },
              {
                icon: "/assets/icons/casperdash.png",
                name: "CasperDash",
                disabled: !casperWalletInstalled,
                onClick: async () => {
                  try {
                    setWalletType(WalletType.CASPER_DASH);
                  } catch (e) {
                    console.log(e);
                    setWalletType(null);
                  }
                },
              },
              {
                icon: "/assets/icons/metamask-logo.png",
                name: "MetaMask",
                disabled: !metamaskInstalled,
                onClick: async () => {
                  console.log("Metamask login");

                  if ((window as any).ethereum) {
                    await (window as any).ethereum.enable();
                    const accounts = await (window as any).ethereum.request({
                      method: "eth_requestAccounts",
                    });

                    setWalletType(WalletType.METAMASK);
                    setAccount(accounts[0]);

                    (window as any).ethereum.on(
                      "accountsChanged",
                      (accounts: string[]) => {
                        setWalletType(WalletType.METAMASK);
                        setAccount(accounts[0]);
                      },
                    );
                  }
                },
              },
              {
                icon: "/assets/icons/walc.svg",
                name: "WalletConnect",
                disabled: !metamaskInstalled,
                onClick: async () => {
                  console.log("Metamask login");

                  if ((window as any).ethereum) {
                    await (window as any).ethereum.enable();
                    const accounts = await (window as any).ethereum.request({
                      method: "eth_requestAccounts",
                    });

                    setWalletType(WalletType.METAMASK);
                    setAccount(accounts[0]);

                    (window as any).ethereum.on(
                      "accountsChanged",
                      (accounts: string[]) => {
                        setWalletType(WalletType.METAMASK);
                        setAccount(accounts[0]);
                      },
                    );
                  }
                },
              },
            ].map((item) => {
              return (
                <Flex
                  _hover={{ bg: backgroundSecondary }}
                  gap="20px"
                  cursor="pointer"
                  align="center"
                  justify="space-between"
                  padding="14px 24px"
                  borderRadius="8px"
                  onClick={item.disabled ? () => {} : item.onClick}
                  border="1px solid"
                  color={item.disabled ? textSecondary : "auto"}
                  borderColor={borderPrimary}
                >
                  <Flex align="center" gap="20px">
                    <Image
                      opacity={item.disabled ? "0.5" : "1"}
                      w="20px"
                      src={item.icon}
                    />
                    <Box fontSize="14px">{item.name}</Box>
                  </Flex>

                  {item.disabled && (
                    <DownloadIcon color="white" justifySelf="flex-end" />
                  )}
                </Flex>
              );
            })}
          </Flex>
        )}
        {walletType === WalletType.METAMASK && (
          <ProceedView
            walletType={WalletType.METAMASK}
            publicKey={account}
            onProceed={handleMetamaskAuth}
            icon={"/assets/icons/metamask-logo.png"}
          />
        )}

        {walletType === WalletType.CASPER_WALLET && (
          <ProceedView
            walletType={WalletType.CASPER_WALLET}
            publicKey={casperWalletPublicKey}
            onProceed={handleCasperDashAuth}
            icon={"/assets/icons/casper-wallet.png"}
          />
        )}
        {walletType === WalletType.CASPER_DASH && (
          <ProceedView
            walletType={WalletType.CASPER_DASH}
            publicKey={casperDashPublicKey ?? ""}
            onProceed={handleCasperDashAuth}
            icon={"/assets/icons/casperdash.png"}
          />
        )}
      </Flex>
    </ModalBody>
  );
};
