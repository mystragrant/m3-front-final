import { ArrowBackIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import { useEffect, useRef } from "react";
import { useState } from "react";

import "react-image-crop/dist/ReactCrop.css";
import { MYSTRA_API_URL } from "../../../../constants";
import { useUserProvider } from "../../../../providers/User/userProvider";

enum UploadStatus {
  NONE,
  UPLOADING,
  DONE,
}

export const AvatarSettings = () => {
  const [picture, setPicture] = useState<any>(null);

  const { id, changeAvatar, avatar } = useUserProvider();

  const [status, setStatus] = useState<UploadStatus>(UploadStatus.NONE);

  const pictureChanged = (e: any) => {
    setStatus(UploadStatus.NONE);
    setPicture({
      /* contains the preview, if you want to show the picture to the user
             you can access it with this.state.currentPicture
         */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0],
    });
  };

  useEffect(() => {
    console.log(picture);
  }, [picture]);

  const handleImageSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    setStatus(UploadStatus.UPLOADING);

    formData.append("file", picture.pictureAsFile);

    try {
      const response = await axios({
        method: "post",
        url: `${MYSTRA_API_URL}/uploadavatar?userId=${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      changeAvatar(response.data);
      setStatus(UploadStatus.DONE);
    } catch (error) {
      console.log("error", error);
      setStatus(UploadStatus.NONE);
    }
  };

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("background.light", "background.dark");

  return (
    <Flex gap="34px" position="relative">
      <Flex role="group" pos="relative">
        <Flex
          cursor="pointer"
          align="center"
          justify="center"
          display="none"
          bg="rgba(0,0,0,0.4)"
          w="100%"
          h="100%"
          borderRadius="50%"
          pos="absolute"
          _groupHover={{ display: "flex" }}
          onClick={onOpen}
        >
          <EditIcon boxSize="20px" />
        </Flex>
        <Image boxSize="92px" borderRadius="50%" src={avatar} />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPicture(null);
        }}
      >
        <ModalOverlay />
        <ModalContent bg={bgColor} padding="15px 20px" maxW="350px">
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb="15px"
          >
            <Box fontSize="20px">Upload avatar</Box>
            <CloseIcon
              cursor="pointer"
              onClick={() => {
                onClose();
                setPicture(null);
                setStatus(UploadStatus.NONE);
              }}
              boxSize="16px"
              padding="2px"
            />
          </ModalHeader>
          <ModalBody>
            {picture ? (
              <>
                {status == UploadStatus.NONE && (
                  <Image
                    boxSize="260px"
                    src={picture.picturePreview}
                    borderRadius="50%"
                  />
                )}
                {status == UploadStatus.UPLOADING && (
                  <Flex boxSize="260px" align="center" justify="center">
                    <Spinner color="brand.500" boxSize="60px" />
                  </Flex>
                )}
                {status == UploadStatus.DONE && (
                  <Flex
                    boxSize="260px"
                    gap="20px"
                    align="center"
                    flexDir="column"
                    justify="center"
                    color="#73767D"
                  >
                    <Flex>
                      <Image src="/assets/icons/big-check.svg" />
                      <Image
                        pos="absolute"
                        filter="blur(20px)"
                        src="/assets/icons/big-check.svg"
                      />
                    </Flex>
                    Upload complete.
                  </Flex>
                )}
              </>
            ) : (
              <form>
                <FormLabel
                  htmlFor="fileInput"
                  bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 38, 38, 0) 32.29%, #262626 100%);"
                  cursor="pointer"
                  boxSize="260px"
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px dashed #7D7D7D"
                >
                  <Input
                    name="fileInput"
                    cursor="pointer"
                    opacity="0"
                    h="100%"
                    type="file"
                    onChange={pictureChanged}
                  />
                  <Flex
                    pointerEvents="none"
                    align="center"
                    flexDir="column"
                    gap="20px"
                    pos="absolute"
                  >
                    <Image src="/assets/icons/download.svg" />
                    <Box textAlign="center" color="#73767D" fontSize="16px">
                      Drop files here
                      <br /> or click to upload
                    </Box>
                  </Flex>
                </FormLabel>
              </form>
            )}
            {/* {
                <Flex
                  borderRadius="8px"
                  align="center"
                  justify="center"
                  border="4px dashed"
                  borderColor={borderColor}
                  padding="100px 40px"
                  mb="20px"
                >
                  <DownloadIcon color={borderColor} boxSize="60px" />
                </Flex>
              } */}
            <Flex h="40px" mt="30px" align="center">
              {picture ? (
                <>
                  {status == UploadStatus.NONE && (
                    <Grid templateColumns="1fr 1fr " gap="8px" w="100%">
                      <Button
                        onClick={() => {
                          setPicture(null);
                          setStatus(UploadStatus.NONE);
                        }}
                        color="white"
                        h="40px"
                        fontSize="12px"
                        border="1px solid #494949"
                        padding="auto 20px"
                        gap="4px"
                        _hover={{
                          bg: "white",
                          color: "black",
                        }}
                      >
                        <ArrowBackIcon />
                        Back
                      </Button>
                      <Button
                        disabled={!picture?.picturePreview}
                        onClick={handleImageSubmit}
                        bg="brand.500"
                        color="white"
                        h="40px"
                        fontSize="12px"
                        padding="auto 20px"
                      >
                        Save
                      </Button>
                    </Grid>
                  )}
                  {status == UploadStatus.DONE && (
                    <Grid w="100%">
                      <Button
                        disabled={!picture?.picturePreview}
                        onClick={() => {
                          setPicture(null);
                          setStatus(UploadStatus.NONE);
                          onClose();
                        }}
                        bg="brand.500"
                        color="white"
                        h="40px"
                        fontSize="12px"
                        padding="auto 20px"
                      >
                        Continue
                      </Button>
                    </Grid>
                  )}
                </>
              ) : (
                picture == null && (
                  <Flex
                    flexDir="column"
                    justifySelf="flex-start"
                    fontSize="12px"
                  >
                    <Flex>
                      <Box color="#73767D">Accepted extensions:</Box>&nbsp;JPG,
                      JPEG, PNG.
                    </Flex>
                    <Flex>
                      <Box color="#73767D">Maximum file size:</Box>&nbsp;1MB
                    </Flex>
                  </Flex>
                )
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
