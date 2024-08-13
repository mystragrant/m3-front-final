import { useAccount } from "@casperdash/usewallet";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, ModalBody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCasperWallet } from "../../../../../../providers/CasperWalletProvider/casperWalletProvider";
import { useMultiWalletProvider } from "../../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";
import { MystraAPI } from "../../../../../../services/mystra-api";
import { CustomCheckbox } from "../../../../../shared/inputs/CustomCheckbox/customCheckbox";
import { ErrorText } from "../../../../../shared/typography/errorText";
import { ConnectMode } from "../../connectButton";
import { ConnectHeading } from "../shared/ConnectHeading/connectHeading";
import { ProceedView, WalletType } from "../shared/ProceedView/proceedView";

export const RegisterWallet = ({
  setMode,
  setWalletRegisterError,
  walletRegisterError,
}: {
  setMode: (val: ConnectMode) => any;
  walletRegisterError: boolean;
  setWalletRegisterError: (value: boolean) => void;
}) => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [marketingAccepted, setMarketingAccepted] = useState<boolean>(false);
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [account, setAccount] = useState<string>("");
  const { textSecondary, backgroundSecondary } = useThemeProvider();

  const { metamaskInstalled, casperWalletInstalled } = useMultiWalletProvider();

  const {
    activeKey: casperWalletPublicKey,
    requestConnection: connectCasperWallet,
  } = useCasperWallet();

  const handleMetamaskRegister = async () => {
    setMode(ConnectMode.LOADING);

    MystraAPI.registerEVM(termsAccepted, marketingAccepted, account)
      .then((res) => {
        console.log(res);
        setMode(ConnectMode.REGISTER_WALLET_SUCCESS);
      })
      .catch((e) => {
        console.log(e);

        setWalletRegisterError(true);
        setMode(ConnectMode.REGISTER_WALLET);
      });
  };

  const [termsError, setTermsError] = useState<boolean>();

  const handleTermsError = () => {
    setTermsError(true);
  };

  useEffect(() => {
    setTermsError(false);
  }, [termsAccepted]);

  const { publicKey: casperDashPublicKey } = useAccount();

  const handleCasperDashRegister = async () => {
    setMode(ConnectMode.LOADING);

    MystraAPI.registerSigner(
      termsAccepted,
      marketingAccepted,
      casperDashPublicKey ?? "",
    )
      .then((res) => {
        console.log(res);
        setMode(ConnectMode.REGISTER_WALLET_SUCCESS);
      })
      .catch((e) => {
        console.log(e);
        setMode(ConnectMode.REGISTER_WALLET);
        setWalletRegisterError(true);
      });
  };

  const { borderPrimary } = useThemeProvider();

  const handleCasperWalletRegister = async () => {
    setMode(ConnectMode.LOADING);

    MystraAPI.registerSigner(
      termsAccepted,
      marketingAccepted,
      casperWalletPublicKey,
    )
      .then((res) => {
        console.log(res);
        setMode(ConnectMode.REGISTER_WALLET_SUCCESS);
      })
      .catch((e) => {
        console.log(e);
        setWalletRegisterError(true);

        setMode(ConnectMode.REGISTER_WALLET);
      });
  };

  return (
    <ModalBody display="grid" gridTemplateColumns="1fr" padding="0px" w="100%">
      <Flex
        gridTemplateColumns="1fr"
        flexDir="column"
        padding="57px 61px"
        gap="17px"
      >
        <Flex flexDir="column" w="100%" gap="14px" mb="20px">
          <Flex justify="space-between" align="center">
            <ConnectHeading>Register with Wallet</ConnectHeading>
            <Flex
              align="center"
              gap="5px"
              fontSize="14px"
              opacity="0.6"
              cursor="pointer"
              onClick={() => {
                if (walletType == null) setMode(ConnectMode.REGISTER);
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
        {walletType === null && (
          <Flex flexDir="column" gap="12px">
            <Flex flexDir="column" gap="10px" mb="20px">
              {[
                {
                  icon: "/assets/icons/casper-wallet.png",
                  name: "Casper Wallet",
                  disabled: !casperWalletInstalled,
                  onClick: async () => {
                    try {
                      await connectCasperWallet();

                      setWalletType(WalletType.CASPER_WALLET);
                    } catch (e) {
                      console.log(e);
                      setWalletType(WalletType.CASPER_WALLET);
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
                      setWalletType(WalletType.CASPER_DASH);
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
              ].map((item) => {
                return (
                  <Flex
                    _hover={{ bg: backgroundSecondary }}
                    gap="20px"
                    cursor={termsAccepted ? "pointer" : "default"}
                    align="center"
                    justify="space-between"
                    padding="14px 24px"
                    borderRadius="8px"
                    onClick={
                      item.disabled
                        ? () => {}
                        : termsAccepted
                          ? item.onClick
                          : handleTermsError
                    }
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

            <CustomCheckbox
              onChange={(val: boolean) => {
                setTermsAccepted(val);
              }}
              error={termsError}
            >
              <Box color={termsError ? "error.500" : "auto"}>
                Accept Terms of Service and Privacy Policy{" "}
              </Box>
              <Box color="error.500"> *</Box>
            </CustomCheckbox>
            <CustomCheckbox
              onChange={(val: boolean) => {
                setMarketingAccepted(val);
              }}
            >
              I agree to receive marketing materials from Mystra
            </CustomCheckbox>

            {walletRegisterError && (
              <Flex flexDir="column" fontFamily="Inter" fontSize="14px">
                <ErrorText>
                  Account already exists.{" "}
                  <Box
                    display="inline"
                    color="white"
                    _hover={{ textDecor: "underline" }}
                    cursor="pointer"
                    onClick={() => {
                      setMode(ConnectMode.LOGIN_WALLET);
                      setWalletRegisterError(false);
                    }}
                  >
                    Switch to login.
                  </Box>
                </ErrorText>
              </Flex>
            )}
          </Flex>
        )}
        {walletType === WalletType.METAMASK && (
          <ProceedView
            walletType={WalletType.METAMASK}
            publicKey={account}
            onProceed={() => handleMetamaskRegister()}
            icon={"/assets/icons/metamask-logo.png"}
          />
        )}

        {walletType === WalletType.CASPER_WALLET && (
          <ProceedView
            walletType={WalletType.CASPER_WALLET}
            publicKey={casperWalletPublicKey}
            onProceed={() => handleCasperWalletRegister()}
            icon={"/assets/icons/casper-wallet.png"}
          />
        )}
        {walletType === WalletType.CASPER_DASH && (
          <ProceedView
            walletType={WalletType.CASPER_DASH}
            publicKey={casperDashPublicKey ?? ""}
            onProceed={() => handleCasperDashRegister()}
            icon={"/assets/icons/casperdash.png"}
          />
        )}
      </Flex>
    </ModalBody>
  );
};
