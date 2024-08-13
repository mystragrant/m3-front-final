import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../../../../services/mystra-api";
import {
  NETWORK,
  WalletSelector,
} from "../../../../../../shared/WalletSelector/walletSelector";
import { WalletProvider } from "../../../../../../../providers/MultiWalletProvider/reducer";
import { useMultiWalletProvider } from "../../../../../../../providers/MultiWalletProvider/multiWalletProvider";
import {
  ProceedView,
  WalletType,
} from "../../../../../../global/TopMenu/ConnectWallet/modes/shared/ProceedView/proceedView";
import { useCasperWallet } from "../../../../../../../providers/CasperWalletProvider/casperWalletProvider";
import { ErrorText } from "../../../../../../shared/typography/errorText";
import { useAccount } from "@casperdash/usewallet";

export const VerifyCasperAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { assignCasperWallet } = useUserProvider();
  const { publicKey: casperDashPublicKey } = useAccount();
  const { activeKey: casperWalletPublicKey } = useCasperWallet();

  const {
    selectedCasperProvider,
    signMessageCasper,
    getCasperKey,
    requestConnection,
    selectCasperProvider,
  } = useMultiWalletProvider();

  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const [pubKey, setPubKey] = useState<string>();

  const handleCasperSignerAuth = async () => {
    try {
      setError("");
      if (selectedCasperProvider != null) {
        const pubKey = await getCasperKey();

        setPubKey(pubKey);

        await MystraAPI.getCasperSignerSeed(pubKey).then(
          async (response: any) => {
            const secretToken = response.data;

            signMessageCasper(secretToken, pubKey)
              .then((signHash: any) => {
                console.log(signHash);
                if (selectedCasperProvider == WalletProvider.CASPER_SIGNER) {
                  assignCasperWallet(secretToken, signHash, pubKey);
                } else {
                  assignCasperWallet(
                    secretToken,
                    selectedCasperProvider == WalletProvider.CASPER_DASH
                      ? signHash
                      : signHash.signatureHex,
                    pubKey,
                  )
                    .then(() => {
                      setSuccess("Linked wallet with account succesfully.");
                      onClose();
                      selectCasperProvider(null);
                    })
                    .catch(() => {
                      setError("Something went wrong.");
                      onClose();
                      selectCasperProvider(null);
                    });
                }
              })
              .catch((e: any) => {
                console.error(e, "Error during signing login message.");
                selectCasperProvider(null);
                setError("Something went wrong.");
              });
          },
        );
      }
    } catch (error) {
      requestConnection();
    }
  };

  const walletType = useMemo(() => {
    if (selectedCasperProvider == WalletProvider.CASPER_WALLET) {
      return WalletType.CASPER_WALLET;
    }

    if (selectedCasperProvider == WalletProvider.CASPER_DASH) {
      return WalletType.CASPER_DASH;
    }

    return WalletType.CASPER_WALLET;
  }, [selectedCasperProvider]);

  return (
    <>
      {selectedCasperProvider == null && !success && (
        <Button
          color="black"
          bg="#EFEFEF"
          fontSize="14px"
          fontWeight="400"
          onClick={onOpen}
        >
          Connect Wallet
        </Button>
      )}
      {selectedCasperProvider == WalletProvider.CASPER_WALLET && (
        <ProceedView
          onProceed={handleCasperSignerAuth}
          icon={"/assets/icons/casper-wallet.png"}
          publicKey={casperWalletPublicKey ?? "Not connected"}
          walletType={walletType}
        />
      )}
      {selectedCasperProvider == WalletProvider.CASPER_DASH && (
        <ProceedView
          onProceed={handleCasperSignerAuth}
          icon={"/assets/icons/casper-dash.png"}
          publicKey={casperDashPublicKey ?? "Not connected"}
          walletType={walletType}
        />
      )}

      <Flex mt="10px">
        {error && <ErrorText>{error}</ErrorText>}
        {success && (
          <Box
            fontSize="14px"
            color="brandSecondary.500"
            fontFamily="Inter"
            fontWeight={"none"}
          >
            {success}
          </Box>
        )}
      </Flex>

      <WalletSelector
        network={NETWORK.CASPER}
        onClose={onClose}
        isOpen={isOpen && selectedCasperProvider == null}
      />
    </>
  );
};
