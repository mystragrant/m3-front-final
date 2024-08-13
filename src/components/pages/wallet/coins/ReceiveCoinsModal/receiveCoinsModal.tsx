import { Box, Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import { ethers } from "ethers";
import { ChangeEvent, useMemo, useState } from "react";
import { ERC20_ABI } from "../../../../../pages/buy-ticket/abis";
import { ICoinData } from "../../../../../pages/wallet/coins";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import { buildTransferDeploy } from "../../../../../services/casper";
import { CustomModal } from "../../../../shared/CustomModal/customModal";
import QRCode from "react-qr-code";

export const ReceiveCoinsModal = ({
  isOpen,
  onOpen,
  onClose,
  coinData,
}: {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  coinData: ICoinData;
}) => {
  const { evm_wallet, casper_public_key_wallet } = useUserProvider();

  const walletAddress = useMemo(() => {
    if (coinData.network == "casper" || coinData.network == "casper-test") {
      return casper_public_key_wallet;
    } else {
      return evm_wallet;
    }
  }, [evm_wallet, coinData.network]);

  return (
    <CustomModal
      header={"Receive coins"}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      body={
        <Flex
          flexDir="column"
          borderRadius="16px"
          boxSize="200px"
          align="center"
          justify="center"
        >
          <Box padding="16px" maxW="240px" bg="white" borderRadius="16px">
            <QRCode size={100} value={walletAddress} />
          </Box>
          <Box
            cursor="pointer"
            onClick={() => {
              navigator.clipboard.writeText(walletAddress);
            }}
          >
            Or click to copy address
          </Box>
        </Flex>
      }
    ></CustomModal>
  );
};
