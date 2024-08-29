/* eslint-disable */

import { Box, Button, Flex, Grid, Input, Spinner, Textarea, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";
import {
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { ethers } from "ethers";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { CustomModal } from "../../components/shared/CustomModal/customModal";
import { MultichainIcon } from "../../components/shared/display/MultichainIcon/multichainIcon";
import { CustomSelect } from "../../components/shared/inputs/CustomSelect/customSelect";
import { casperService, DEPLOY_TTL_MS, MYSTRA_API_URL, NETWORK_NAME } from "../../constants";
import {
  STUDIO_CEP78_CONTRACT_HASH,
  STUDIO_CONTRACT_HASH,
} from "../../constants/studio";
import { toMotes } from "../../helpers/misc";
import { useMultiWalletProvider } from "../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { NFTCreatorABI } from "./abis";
import { NFTBytecode } from "./nftbytecode";

const Buffer = require("buffer/").Buffer;

interface CreatorStudioRoute {
  pageHref: string;
  needsTicket: boolean;
  label: string;
  icon: string;
}

const FieldWithLabel = ({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex flexDir="column" gap="8px">
      <Box>{header}</Box>
      {children}
    </Flex>
  );
};

export const CreatorStudioNFtsPage = () => {
  const { backgroundPrimary, borderPrimary } = useThemeProvider();

  const [chainId, setChainId] = useState<any>("casper-test");
  const [type, setType] = useState<string>("cep47");

  const [collectionName, setCollectionName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const { getCasperKey, signCasper, putDeployUniversal } =
    useMultiWalletProvider();

  const mint = async () => {
    if (chainId == "casper" || chainId == "casper-test") {
      let pubKey = " ";

      try {
        pubKey = await getCasperKey();


        let runtimeArgs;
        let studioAddress;

        if (type == "cep47") {
          const map = CLValueBuilder.map([
            [CLValueBuilder.string("asset"), CLValueBuilder.string(url)],
            [
              CLValueBuilder.string("description"),
              CLValueBuilder.string(description),
            ],
            [
              CLValueBuilder.string("name"),
              CLValueBuilder.string(collectionName),
            ],
          ]);

          runtimeArgs = RuntimeArgs.fromMap({
            amount: CLValueBuilder.u512(toMotes(10)),
            token_metas: CLValueBuilder.list([map]),
            token_ids: CLValueBuilder.list([CLValueBuilder.u256(Math.floor(Math.random() * 1000))]),
            recipient: CLValueBuilder.key(CLPublicKey.fromHex(pubKey)),
          } as any);

          studioAddress = STUDIO_CONTRACT_HASH;
          console.log(pubKey);
        } else {
          let map = {
            token_uri: url,
            name: collectionName,
            asset: url
          } 
          // `{"asset": "${url}", "description": "${description}", "name": "${collectionName}"}`;

          runtimeArgs = RuntimeArgs.fromMap({
            amount: CLValueBuilder.u512(toMotes(10)),
            token_meta_data: CLValueBuilder.string(JSON.stringify(map)),
            token_owner: CLValueBuilder.key(CLPublicKey.fromHex(pubKey)),
          } as any);

          studioAddress = STUDIO_CEP78_CONTRACT_HASH;
        }

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS
        );

        const payment = DeployUtil.standardPayment(toMotes(10));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(studioAddress, "hex")),
            "mint",
            runtimeArgs
          ),
          payment
        );

        try {
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    console.log(res);

                    casperService.waitForDeploy(res).then((r) => {
                      console.log(r);
                    });
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
      } catch (e) {
        console.log(e);
      }
    } else {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      const factory = new ethers.ContractFactory(
        NFTCreatorABI,
        NFTBytecode,
        provider.getSigner()
      );

    }
  };

  const [imageCreation, setImageCreation] = useState<boolean>(false);
  const [imageCreationError, setImageCreationError] = useState<boolean>(false);

  const [prompt, setPrompt] = useState<string>("")

  const generateImage = () => {
    if(imageCreation) return;

    setImageCreation(true);
    setImageCreationError(false)


    axios.post(`${MYSTRA_API_URL}/generate-ai-image?image_text_description='${prompt}
    '`, {timeout: 360000}).then((res) => {
      console.log(res);
      setUrl(res.data.data[0].url);
      }).catch((e) => {
        console.log(e);
        setImageCreationError(true)
    }).finally(() => {
      setImageCreation(false);
      setPrompt("");
    })
  }

  const generateModal = useDisclosure();

  return (
    <PageContainer noBottomMargin noTopMargin>
      <CustomModal isOpen={generateModal.isOpen} header="AI Image generation" footer={<Button bg="white" disabled={imageCreation  || prompt.length == 0 } opacity={(imageCreation || prompt.length == 0) ? "0.5" : "1"}  onClick={generateImage}>{imageCreation ? <Spinner color="black"/> :"Generate"}</Button>} onClose={generateModal.onClose} onOpen={generateModal.onOpen}
          body={<>
          <FieldWithLabel header="Your prompt">
              <Textarea placeholder="For example: happy ghost" value={prompt} disabled={imageCreation } onChange={(e) => setPrompt(e.target.value)}/>
            </FieldWithLabel></>}
      /> 
      <Grid templateColumns="500px 1fr" gap="80px" pos="relative">
        <Flex my="40px" zIndex="1" pos="relative" flexDir="column">
          <Box fontSize="30px">Create your NFTs!</Box>
          <Flex flexDir="column" gap="20px" mt="20px">
            <FieldWithLabel header="Target Network">
              <CustomSelect
                onChange={(val) => setChainId(val)}
                heading={"Select Target Network"}
                selectedValue={chainId}
                small
                items={[
                  {
                    value: "casper-test",
                    icon: "/assets/icons/erc20/casper.svg",
                    label: "Casper Testnet",
                  },
                ]}
              />
              
            </FieldWithLabel>
            <FieldWithLabel header="Standard">
              <CustomSelect
                onChange={(val) => setType(val)}
                heading={"Select Token Standard"}
                selectedValue={type}
                small
                items={[
                  {
                    value: "cep47",
                    icon: "/assets/icons/erc20/casper.svg",
                    label: "CEP47",
                  },
                  {
                    value: "cep78",
                    icon: "/assets/icons/erc20/casper.svg",
                    label: "CEP78",
                  },
                ]}
              />
              
            </FieldWithLabel>
            <FieldWithLabel header="Name">
              <Input
                onChange={(e) => setCollectionName(e.target.value)}
                value={collectionName}
                h="50px"
                placeholder="e.g. My Cat"
              />
            </FieldWithLabel>
            <FieldWithLabel header="Description">
              <Textarea
                maxH="100px"
                minH="100px"
                h="100px"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="e.g. My Cat"
              />
            </FieldWithLabel>
            <Grid alignItems="end" templateColumns={"1fr 100px"} gap='12px'>
            <FieldWithLabel header="Image URL">
              <Input
                h="50px"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder="e.g. My Cat"
              />
            </FieldWithLabel>  
            <Button onClick={generateModal.onOpen} bg="white" h='50px'>AI</Button>
            </Grid>
          
            <Button
              onClick={mint}
              fontWeight={"normal"}
              h="50px"
              mt="20px"
              bg="white"
            >
              Mint your NFT
            </Button>
          </Flex>
          <Box
            boxSize="500px"
            pos="fixed"
            zIndex="-1"
            right="40%"
            top="100px"
            bottom="0"
            margin="auto"
            bg="white"
            pointerEvents="none"
            filter="blur(150px)"
            borderRadius="50%"
            opacity="0.03"
          ></Box>
        </Flex>
        <Flex
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          align="center"
          top="74px"
          maxH="calc(100vh - 74px)"
          pos="sticky"
          pt="60px"
          flexDir="column"
          px="60px"
        >
          <Flex textAlign="center" fontSize="40px">
            NFT Overview
          </Flex>
          <Box
            boxSize="200px"
            pos="absolute"
            zIndex="-1"
            left="0"
            right="0"
            top="100px"
            bottom="0"
            margin="auto"
            bg="white"
            pointerEvents="none"
            filter="blur(100px)"
            borderRadius="50%"
            opacity="0.4"
          />
          <Box
            mt="40px"
            border="1px solid"
            borderColor={borderPrimary}
            bgColor={"rgba(0, 0, 0, 0.25)"}
            borderRadius="16px"
            w="300px"
            pos="relative"
          >
            <Box boxSize="30px" pos="absolute" left="12px" top="12px">
              <MultichainIcon chain={chainId.toString()} size={40} />
            </Box>
            <Box
              margin="20px"
              boxSize="258px"
              borderRadius="8px"
              bgImage={url}
              bgSize="cover"
              bgPos="center"
            />
            <Flex fontSize="20px" p="20px" pt="0px">
              {collectionName.length > 0 ? collectionName : "Your NFT"}
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </PageContainer>
  );
};
