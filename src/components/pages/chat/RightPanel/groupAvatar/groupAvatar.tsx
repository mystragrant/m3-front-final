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

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import { CHAT_SERVER_BASEURL } from "../../../../../constants";
import { SectionHeader } from "../../../../shared/typography/sectionHeader";
import "react-image-crop/dist/ReactCrop.css";

import { useChatProvider } from "../../../../../providers/Chat/chatProvider";

enum UploadStatus {
  NONE,
  UPLOADING,
  DONE,
}

export const GroupAvatar = ({
  avatar,
  forceRemount,
  setPicture,
  picture,
}: {
  avatar: string;
  forceRemount: Dispatch<SetStateAction<boolean>>;
  setPicture: Dispatch<SetStateAction<any>>;
  picture: any;
}) => {
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
    onClose();
  };

  const { userId, groupId, groups, changeGroupAvatarView } = useChatProvider();

  const handleImageSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    setStatus(UploadStatus.UPLOADING);

    // formData.append("file", picture.pictureAsFile);

    try {
      const response = await axios({
        method: "post",
        url: `${CHAT_SERVER_BASEURL}/GroupPhotoUpdate?userId=${userId}&groupId=${groupId}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        changeGroupAvatarView(groupId, res.data);

        forceRemount(false);
      });

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
        {groups && groupId && groups[groupId].adminId == userId && (
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
        )}
        <Image
          boxSize="71px"
          borderRadius="50%"
          src={picture ? picture.picturePreview : avatar}
        />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
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
            <SectionHeader>Upload group avatar</SectionHeader>
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
                  <Flex>
                    <Box
                      boxSize="260px"
                      cursor="pointer"
                      onClick={() => setPicture(null)}
                      bgImage={picture.picturePreview}
                      bgSize="cover"
                      bgPos="center"
                      borderRadius="50%"
                    />
                  </Flex>
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

            <Flex
              mt="20px"
              flexDir="column"
              justifySelf="flex-start"
              fontSize="12px"
            >
              <Flex>
                <Box color="#73767D">Accepted extensions:</Box>&nbsp;JPG, JPEG,
                PNG.
              </Flex>
              <Flex>
                <Box color="#73767D">Maximum file size:</Box>&nbsp;1MB
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
