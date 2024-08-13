import { Box, Button, Flex, Grid, Input, Spinner } from "@chakra-ui/react";
import { DeployUtil } from "casper-js-sdk";
import { ethers } from "ethers";
import { useState } from "react";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import {
  TxType,
  useTxQueue,
} from "../../../../providers/useTxQueue/useTxQueue";
import { CASPER_NFT_TYPES, getTransferDeploy } from "../../../../services/nft";
import { trimHash } from "../../../../utils/utils";
import { CustomModal } from "../../CustomModal/customModal";
import { NETWORK, WalletSelector } from "../../WalletSelector/walletSelector";
import { ERC1155ABI, ERC721ABI } from "./abis";

export const TransferNFTModal = ({
  isOpen,
  onOpen,
  image,
  tokenId,
  name,
  collection,
  network,
  onClose,
  type,
  address,
  onTransfer,
}: {
  isOpen: boolean;
  onOpen: () => void;
  tokenId: any;
  name: string;
  network: any;
  collection: string;
  image: string;
  onClose: () => void;
  type: string;
  address: string;
  onTransfer: () => void;
}) => {
  const { borderPrimary, textSecondary } = useThemeProvider();
  const {
    getCasperKey,
    signCasper,
    selectedCasperProvider,
    requestConnection,

    putDeployUniversal,
  } = useMultiWalletProvider();

  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const [loading, setLoading] = useState<boolean>();

  const { addToQueue, deleteFromQueue, pushToDeleteQueue } = useTxQueue();

  const submitTransfer = async () => {
    let pubKey = " ";

    if (network == "casper" || network == "casper-test") {
      try {
        pubKey = await getCasperKey();

        console.log(pubKey);
        console.log(address);

        let deploy: any;
        try {
          deploy = getTransferDeploy(
            pubKey,
            recipientAddress,
            address,
            tokenId,
            CASPER_NFT_TYPES.CEP47,
          );
        } catch (error) {
          console.log(error);
        }

        console.log(deploy);
        try {
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    console.log(res);
                    onTransfer();
                  })
                  .catch((e) => {});
              })
              .catch((e: any) => {
                console.log(e);
              });
          }
        } catch (e) {
          console.log(e);
        }
      } catch {
        requestConnection();
      }
    } else {
      try {
        setLoading(true);
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];

        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
        );
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          address,
          type == "ERC721" ? ERC721ABI : ERC1155ABI,
          signer,
        );

        if (type == "ERC1155") {
          console.log(account, recipientAddress, tokenId, 1, []);

          const tx = await contract.safeTransferFrom(
            account,
            recipientAddress,
            tokenId,
            1,
            [],
          );

          addToQueue(
            tx.hash,
            "Transfer NFT",
            address,
            network,
            TxType.TRANSFER_NFT,
            address,
          );

          onClose();
          tx.wait().then(() => {
            pushToDeleteQueue(tx.hash);
          });
        } else {
          console.log(account, recipientAddress, tokenId);
          contract.transferFrom(account, recipientAddress, tokenId);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        body={
          <>
            {loading ? (
              <Flex
                w="100%"
                py="70px"
                flexDir="column"
                justify="center"
                align="center"
                gap="10px"
              >
                <Spinner color="brandSecondary.500" />
                <Box>Processing transfer</Box>
              </Flex>
            ) : (
              <>
                <Grid templateColumns="auto 1fr" gap="20px">
                  <Box
                    boxSize="60px"
                    border="1px solid"
                    borderColor={borderPrimary}
                    borderRadius="8px"
                    bgImage={image}
                    bgPos="center"
                    bgSize="cover"
                  ></Box>

                  <Flex justify="center" flexDir="column">
                    <Flex align="center" gap="10px">
                      <Box fontSize="16px" fontFamily="Inter">
                        {name} {type == "ERC1155" ? "" : "#" + tokenId}
                      </Box>{" "}
                    </Flex>
                    <Box>
                      <Box
                        color={textSecondary}
                        fontSize="14px"
                        fontFamily="Space Mono"
                        display="inline"
                      >
                        {collection ?? <Box>{trimHash(address)}</Box>}
                      </Box>
                    </Box>
                  </Flex>
                </Grid>

                <Box m="20px 0px 6px" fontSize="14px" fontFamily="Inter">
                  Recipient address:{" "}
                </Box>
                <Grid templateColumns="1fr auto" gap="10px">
                  <Input
                    fontSize="14px"
                    fontFamily="Space Mono"
                    value={recipientAddress}
                    onChange={(e) => {
                      setRecipientAddress(e.target.value);
                    }}
                  />
                  <Button
                    fontWeight="normal"
                    bg="#EFEFEF"
                    color="black"
                    fontFamily="Inter"
                    onClick={submitTransfer}
                  >
                    Transfer
                  </Button>
                  {(network == "casper" || network == "casper-test") && (
                    <WalletSelector
                      network={NETWORK.CASPER}
                      isOpen={selectedCasperProvider == null}
                      onClose={() => {}}
                    />
                  )}
                </Grid>
              </>
            )}
          </>
        }
        header="Transfer NFT"
      />
    </>
  );
};
