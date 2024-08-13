import { Button, Flex, Input, Spinner, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MYSTRA_API_URL } from "../../../../constants";
import { InputWrapper } from "../../../shared/containers/InputWrapper";
import { CustomModal } from "../../account/VerificationList/LevelList/VerificationItem/items/customModal";

export const NFTDetailsButton = () => {
  const settingsModal = useDisclosure();

  const { collectionAddress } = useParams();

  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionBanner, setCollectionBanner] = useState<string>("");
  const [collectionIcon, setCollectionIcon] = useState<string>("");
  const [collectionDescription, setCollectionDescription] =
    useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/collections?collection_contract_hash=${collectionAddress}&page_number=1&page_size=10&order_by=collection_contract_name&order_direction=DESC`,
      )
      .then((res) => {
        const data = res.data.data[0];
        console.log(data);

        setCollectionDescription(
          data.collection_description.length > 0
            ? data.collection_description
            : "No description provided yet.",
        );
        setCollectionDescription(
          data.collection_description.length > 0
            ? data.collection_description
            : "No description provided yet.",
        );
        setCollectionName(
          data.collection_name.length > 0
            ? data.collection_name
            : "Unknown Collection",
        );
        setCollectionBanner(
          data.collection_banner.length > 0
            ? data.collection_banner
            : "Unknown Collection",
        );
        setCollectionIcon(
          data.collection_icon.length > 0
            ? data.collection_icon
            : "Unknown Collection",
        );
      })
      .catch((e) => {});
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setSuccess(false);
    axios
      .post(
        `https://api.testnet.mystra.io/create_collection?contract_hash=${collectionAddress}&collection_name=${collectionName}&collection_description=${collectionDescription}&collection_banner=${collectionBanner}&collection_icon=${collectionIcon}
    `,
      )
      .then(() => setSuccess(true))
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex>
      <CustomModal
        title="Collection settings"
        isOpen={settingsModal.isOpen}
        onClose={settingsModal.onClose}
      >
        <Flex flexDir="column" gap="12px">
          <InputWrapper label="Collection Name">
            <Input
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper label="Collection Description">
            <Input
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper label="Collection Banner URL">
            <Input
              value={collectionBanner}
              onChange={(e) => setCollectionBanner(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper label="Collection Icon URL (square)">
            <Input
              value={collectionIcon}
              onChange={(e) => setCollectionIcon(e.target.value)}
            />
          </InputWrapper>
          <Button
            mt="8px"
            w="200px"
            bg="white"
            color="black"
            fontWeight="normal"
            onClick={() => handleSubmit()}
          >
            {loading ? <Spinner /> : "Save"}
          </Button>
          <Flex>{success && "Success. Refresh page to see results."}</Flex>
        </Flex>
      </CustomModal>
      <Button
        onClick={settingsModal.onOpen}
        fontWeight="normal"
        h="40px"
        mt="12px"
        bg="white"
        color="black"
      >
        Collection settings
      </Button>
    </Flex>
  );
};
