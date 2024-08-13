import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../../../../services/mystra-api";
import {
  ProceedView,
  WalletType,
} from "../../../../../../global/TopMenu/ConnectWallet/modes/shared/ProceedView/proceedView";
import { ErrorText } from "../../../../../../shared/typography/errorText";

export const VerifyEVMAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { assignEVMWallet } = useUserProvider();

  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    if (account == "") {
      if ((window as any).ethereum) {
        await (window as any).ethereum.enable();
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        onOpen();
        setAccount(accounts[0]);

        (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0]);
        });
      }
    } else {
      onOpen();
    }
  };

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleMetamaskAuth = () => {
    MystraAPI.getWalletSecret(account).then(async (res) => {
      setError("");
      setSuccess(false);
      let tx;
      onOpen();
      try {
        tx = await (window as any).ethereum.request({
          method: "personal_sign",
          params: [res.data, account],
        });
      } catch (e) {}

      assignEVMWallet(res.data, tx, account)
        .then(() => {
          setSuccess(true);
        })
        .catch((e) => {
          setError("Something went wrong.");
        })
        .finally(() => {
          onClose();
        });
    });
  };

  return (
    <>
      {account == "" && !success && (
        <Button
          color="black"
          bg="#EFEFEF"
          fontSize="14px"
          fontWeight="400"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      )}
      {account && (
        <ProceedView
          walletType={WalletType.METAMASK}
          publicKey={account}
          onProceed={handleMetamaskAuth}
          icon={"/assets/icons/metamask-logo.png"}
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
    </>
  );
};
