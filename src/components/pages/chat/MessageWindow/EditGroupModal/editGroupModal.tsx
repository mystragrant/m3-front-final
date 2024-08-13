import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";
import { CustomModal } from "../../../../shared/CustomModal/customModal";
import { GroupAvatar } from "../../RightPanel/groupAvatar/groupAvatar";

export const EditGroupModal = ({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { groups, groupId } = useChatProvider();

  const [picture, setPicture] = useState<any>(null);

  return (
    <CustomModal
      body={
        <Flex flexDir="column">
          <Grid templateColumns="auto 1fr" gap="16px" alignItems="center">
            <GroupAvatar
              forceRemount={() => {}}
              picture={picture}
              setPicture={setPicture}
              avatar={
                groups && groupId
                  ? groups[groupId].photo != "x"
                    ? groups[groupId].photo
                    : "/assets/brand/chat-mockup.png"
                  : "/assets/brand/chat-mockup.png"
              }
            />
            <Input
              h="50px"
              defaultValue={
                groups && groupId ? groups[groupId].name : "Group name"
              }
            />
          </Grid>
          <Textarea
            mt="20px"
            minH="100px"
            maxH="100px"
            defaultValue={
              groups && groupId
                ? groups[groupId].description
                : "Group description"
            }
          />
        </Flex>
      }
      header={"Edit group"}
      footer={
        <Button bg="brand.500" fontWeight="400" fontSize="14px" color="white">
          Save
        </Button>
      }
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    />
  );
};
