import { useDisclosure } from "@chakra-ui/core";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { CustomModal } from "../../../../shared/CustomModal/customModal";
import { PublicGroupSearch } from "../PublicGroupSearch/publicGroupSearch";

export const CreateGroup = ({
  forceRemount,
}: {
  forceRemount: Dispatch<SetStateAction<boolean>>;
}) => {
  const { backgroundTertiary, borderPrimary } = useThemeProvider();

  const buttonBg = useColorModeValue("textPrimary.light", "textPrimary.dark");
  const buttonColor = useColorModeValue(
    "textPrimary.dark",
    "textPrimary.light",
  );

  const { createGroup, groups } = useChatProvider();

  const {
    onOpen: createGroupOnOpen,
    onClose: createGroupOnClose,
    isOpen: createGroupIsOpen,
  } = useDisclosure();

  const {
    onOpen: findGroupOnOpen,
    onClose: findGroupOnClose,
    isOpen: findGroupIsOpen,
  } = useDisclosure();

  const [newGroupName, setNewGroupName] = useState<string>("");
  const [newGroupImageUrl, setNewGroupImageUrl] = useState<string>(" ");
  const [newGroupDescription, setNewGroupDescription] = useState<string>("");

  const [isPublic, setIsPublic] = useState<boolean>(false);
  const handleCreateGroup = async () => {
    const res = await createGroup(
      newGroupName,
      isPublic,
      newGroupDescription,
      newGroupImageUrl,
    );
    if (res.success) {
      toast(<Box color="white"></Box>);
    } else {
    }
    forceRemount((p: any) => !p);
  };

  return (
    <>
      <CustomModal
        header="Browse public groups"
        onOpen={findGroupOnOpen}
        isOpen={findGroupIsOpen}
        onClose={findGroupOnClose}
        body={<PublicGroupSearch />}
      />
      <CustomModal
        onOpen={createGroupOnOpen}
        isOpen={createGroupIsOpen}
        onClose={createGroupOnClose}
        header={"Add new group"}
        body={
          <Flex flexDir="column" gap="12px">
            <Input
              onChange={(e) => setNewGroupName(e.target.value)}
              value={newGroupName}
              placeholder={"New group name"}
            />
            <Input
              onChange={(e) => setNewGroupDescription(e.target.value)}
              value={newGroupDescription}
              placeholder={"New group description"}
              maxLength={100}
            />
            <Checkbox onChange={(e) => setIsPublic(e.target.checked)}>
              Public
            </Checkbox>
            <Button
              bg="brand.500"
              color="white"
              fontSize="14px"
              fontWeight="400"
              onClick={handleCreateGroup}
            >
              Submit
            </Button>
          </Flex>
        }
      />

      <Grid
        gridTemplateColumns="1fr 1fr"
        gap="10px"
        padding="12px"
        borderTop="1px solid"
        borderColor={borderPrimary}
      >
        <Button
          fontWeight="normal"
          fontSize="12px"
          border="1px solid"
          h="30px"
          fontFamily="Inter"
          bg="white"
          color="black"
          borderRadius="4px"
          padding="12px"
          onClick={() => findGroupOnOpen()}
        >
          Join public groups
        </Button>
        <Button
          h="30px"
          borderRadius="4px"
          fontWeight="normal"
          fontSize="12px"
          fontFamily="Inter"
          color="white"
          border="1px solid"
          padding="12px"
          onClick={() => {
            createGroupOnOpen();
          }}
        >
          Create group
        </Button>
      </Grid>
    </>
  );
};
