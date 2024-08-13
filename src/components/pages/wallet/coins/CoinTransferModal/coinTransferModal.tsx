import { Box, Button, Flex, Input, Spinner, Tr } from "@chakra-ui/react";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import { ethers } from "ethers";
import { ChangeEvent, useState } from "react";
import { ERC20_ABI } from "../../../../../pages/buy-ticket/abis";
import { ICoinData } from "../../../../../pages/wallet/coins";
import { useMultiWalletProvider } from "../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import {
  TxType,
  useTxQueue,
} from "../../../../../providers/useTxQueue/useTxQueue";
import { buildTransferDeploy } from "../../../../../services/casper";
import { chainIdToName } from "../../../../../utils/parser";
import { CustomModal } from "../../../../shared/CustomModal/customModal";

enum TransferStage {
  START,
  CONFIRM,
  SUCCESS,
}

export const CoinTransferModal = ({
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
  const { casper_public_key_wallet } = useUserProvider();

  const [stage, setStage] = useState<TransferStage>(TransferStage.START);
  const [recipient, setRecipient] = useState<string>(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  );
  const [amount, setAmount] = useState<string>("");

  const { addToQueue } = useTxQueue();

  const { signCasper, putDeployUniversal } = useMultiWalletProvider();

  const handleEthereumTransfer = async () => {
    try {
      setStage(TransferStage.CONFIRM);

      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
      );

      const signer = provider.getSigner();

      const network = await provider.getNetwork();

      //   if (
      //     chainIdToName(network.chainId).toLocaleLowerCase() !=
      //     coinData.network.toLocaleLowerCase()
      //   ) {
      //     alert("Change network first!");
      //     throw Error;
      //   }

      if (coinData.native) {
        const tx = {
          to: recipient,
          value: ethers.utils.parseEther(amount),
        };

        signer
          .sendTransaction(tx)
          .then((res) => {
            setStage(TransferStage.SUCCESS);
            console.log(res);
          })
          .catch((e) => {
            setStage(TransferStage.START);
          });
      } else {
        const tokenContract = new ethers.Contract(
          coinData.address!,
          ERC20_ABI,
          signer,
        );

        tokenContract
          .transfer(recipient, amount)
          .then(() => {
            setStage(TransferStage.SUCCESS);
          })
          .catch((e: any) => {
            setStage(TransferStage.START);
          });
      }
    } catch (e) {
      setStage(TransferStage.START);
    }
  };

  const handleCasperTransfer = () => {
    setStage(TransferStage.CONFIRM);

    const deploy = buildTransferDeploy(
      CLPublicKey.fromHex(casper_public_key_wallet),
      CLPublicKey.fromHex(recipient),
      100,
      0,
      2.5,
      "casper-test",
    );
    const jsonDeploy = DeployUtil.deployToJson(deploy);
    signCasper(jsonDeploy)
      .then((signature: any) => {
        console.log(signature);
        putDeployUniversal(signature, deploy, casper_public_key_wallet).then(
          (signed) => {
            setStage(TransferStage.SUCCESS);
            addToQueue(
              signed,
              "Transfer",
              amount,
              coinData.network,
              TxType.TRANSFER,
            );
          },
        );
      })
      .catch((e: any) => {
        setStage(TransferStage.START);
      });
  };

  const handleTransfer = async () => {
    if (["casper", "casper-test"].includes(coinData.network)) {
      handleCasperTransfer();
    } else if (
      [
        "ethereum",
        "anvil",
        "cronos",
        "mumbai",
        "arbitrum",
        "binance",
        "bsc",
        "polygon",
      ]
    ) {
      handleEthereumTransfer();
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value);
  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRecipient(e.target.value);

  return (
    <CustomModal
      header={"Coin Transfer"}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={() => {
        setStage(TransferStage.START);
        onClose();
      }}
      body={
        <>
          {stage == TransferStage.START && (
            <Flex flexDir="column" gap="16px">
              <Input
                type="text" // Ustawienie typu inputu na number
                placeholder="Enter recipient address..."
                value={recipient}
                onChange={handleRecipientChange}
              />
              <Input
                placeholder={`Enter ${coinData.symbol.toUpperCase()} amount`}
                value={amount}
                onChange={handleAmountChange}
                step="0.0001"
              />
              <Button bg="white" color="black" onClick={handleTransfer}>
                Transfer
              </Button>
            </Flex>
          )}
          {stage == TransferStage.CONFIRM && (
            <Flex align="center" gap="8px">
              <Spinner />
              <Box>Confirm transfer in your wallet</Box>
            </Flex>
          )}
          {stage == TransferStage.SUCCESS && (
            <Box>Success. Your tx is processed on blockchain.</Box>
          )}
        </>
      }
    ></CustomModal>
  );
};
