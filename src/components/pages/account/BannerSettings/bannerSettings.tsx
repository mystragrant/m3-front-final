import {
  ArrowBackIcon,
  CloseIcon,
  DownloadIcon,
  EditIcon,
} from "@chakra-ui/icons";
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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
import { CustomModal } from "../../../shared/CustomModal/customModal";

enum UploadStatus {
  NONE,
  UPLOADING,
  DONE,
}

export const BannerSettings = ({
  isOpen,
  onOpen,
  onClose,
  setCurrentBanner,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setCurrentBanner: (val: string) => void;
}) => {
  const [picture, setPicture] = useState<any>(null);

  const { id } = useUserProvider();

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
        url: `${MYSTRA_API_URL}/uploaduserbanner?userId=${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCurrentBanner(response.data);
      setStatus(UploadStatus.DONE);
    } catch (error) {
      console.log("error", error);
      setStatus(UploadStatus.NONE);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setPicture(null);
      }}
      onOpen={onOpen}
      header="Set your banner"
      body={
        <>
          {" "}
          {picture ? (
            <>
              {status == UploadStatus.NONE && (
                <Box
                  h="140px"
                  w="100%"
                  bgImage={picture.picturePreview}
                  bgPos="center"
                  borderRadius="8px"
                  bgSize="cover"
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
                h="140px"
                w="100%"
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
                  gap="10px"
                  pos="absolute"
                >
                  <Image boxSize="30px" src="/assets/icons/download.svg" />
                  <Box
                    textAlign="center"
                    color="#73767D"
                    fontSize="14px"
                    fontFamily="Inter"
                  >
                    Drop files here
                    <br /> or click to upload
                  </Box>
                </Flex>
              </FormLabel>
            </form>
          )}
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
                <Flex flexDir="column" justifySelf="flex-start" fontSize="12px">
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
        </>
      }
    ></CustomModal>
  );
};
