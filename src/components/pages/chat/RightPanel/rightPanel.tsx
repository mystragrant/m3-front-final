import { CheckIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CHAT_SERVER_BASEURL } from "../../../../constants";
import { useEffectOnce } from "../../../../hooks/useEffectOnce";
import { useChatProvider } from "../../../../providers/Chat/chatProvider";
import { trimHash } from "../../../../utils/utils";
import { DropdownItem } from "./DropdownItem/dropdownItem";
import { GroupAvatar } from "./groupAvatar/groupAvatar";

export const RightPanel = ({
  forceRemount,
}: {
  forceRemount: Dispatch<SetStateAction<boolean>>;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const backgroundColor = useColorModeValue(
    "backgroundSecondary.light",
    "backgroundSecondary.dark",
  );

  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const {
    groups,
    groupId,
    groupUserIds,
    users,
    inviteUsers,
    userId,
    changeGroupDescriptionView,
    changeGroupNameView,
  } = useChatProvider();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [idToInvite, setIdToInvite] = useState<number>(-1);

  const handleUserInvite = () => {
    inviteUsers([idToInvite]);
    setInviteCasperAddress("");
    setIdToInvite(-1);
    forceRemount(false);
  };

  const [inviteCasperAddress, setInviteCasperAddress] = useState<string>("");

  useEffect(() => {
    let idToAdd = -1;

    for (const i in users) {
      if (users[i].publicKey == inviteCasperAddress) {
        idToAdd = users[i].id as number;
      }
    }

    setIdToInvite(idToAdd);
  }, [inviteCasperAddress, users]);

  const [editingName, setEditingName] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");

  return (
    <Grid
      templateRows="auto 1fr"
      border="1px solid"
      borderTop="none"
      borderBottom="none"
      borderColor={borderColor}
      onClick={onClose}
    >
      <Flex
        padding="12px 0px 20px"
        borderColor={borderColor}
        flexDir="column"
        gap="14px"
      >
        <Flex
          gap="0px"
          fontWeight="400"
          role="group"
          fontSize="16px"
          color={textPrimary}
        >
          <Input
            mt="7px"
            h="20px"
            pl="20px"
            disabled={!editingName}
            _disabled={{ color: textPrimary }}
            cursor={"text"}
            border={editingName ? "1px solid" : "none"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                axios
                  .post(
                    `${CHAT_SERVER_BASEURL}/api/Chat/GroupUpdate?userId=${userId}&groupId=${groupId}&newName=${lastName}&newDescription=${groups[groupId].description}`,
                  )
                  .then((res) => {
                    changeGroupNameView(groupId, lastName);
                    toast(<Box color="white">Changed name succesfully</Box>);
                  });
                setEditingName(false);
              }
            }}
            _focus={{ boxShadow: "none" }}
            onChange={(e: any) => setLastName(e.target.value)}
            value={
              editingName
                ? lastName
                : groups && groupId
                  ? groups[groupId].name
                  : "Casper chat"
            }
          ></Input>
          {groups &&
            groupId &&
            groups[groupId].adminId == userId &&
            !editingName && (
              <EditIcon
                display="none"
                cursor="pointer"
                onClick={() => {
                  setEditingName(true);
                  setLastName(
                    groups && groupId ? groups[groupId].name : "Casper chat",
                  );
                }}
                _groupHover={{ display: "inline" }}
              />
            )}
        </Flex>
        <Box ml="20px" fontSize="12px" mt="-6px" w="80%" color={textSecondary}>
          {groups && groupId ? groups[groupId].description : "Group lorem"}
        </Box>
      </Flex>
      <Flex padding="0px 0px" flexDir="column" pos="relative">
        {isOpen && (
          <Flex
            bg={backgroundColor}
            pos="absolute"
            bottom="0"
            left="0"
            borderBottomLeftRadius="8px"
            borderBottomRightRadius="8px"
            w="100%"
            padding="10px"
            gap="8px"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Input
              value={inviteCasperAddress}
              onChange={(e) => setInviteCasperAddress(e.target.value)}
              _focus={{ boxShadow: "none", borderColor: borderColor }}
              borderColor={borderColor}
              fontSize="12px"
              h="40px"
              placeholder={"User casper address"}
            />
            <Button
              disabled={
                idToInvite == -1 || groupUserIds[groupId].includes(idToInvite)
              }
              onClick={handleUserInvite}
              boxSize="40px"
              padding="0"
              bg="brand.500"
              color="white"
            >
              +
            </Button>
          </Flex>
        )}
        <Flex flexDir="column">
          <DropdownItem header="Members">
            <Flex flexDir="column" gap="10px">
              {groupUserIds[groupId] &&
                groupUserIds[groupId].map((groupUserId) => {
                  return (
                    <Flex align="center" gap="11px">
                      <Box
                        bgImage="/assets/brand/default-avatar.jpg"
                        boxSize="24px"
                        borderRadius="50%"
                        bgSize="cover"
                      />
                      <Box fontSize="10px">
                        {users[groupUserId] &&
                          trimHash(users[groupUserId].publicKey)}
                      </Box>
                      {users[groupUserId] &&
                        groups[groupId] &&
                        groups[groupId].adminId == users[groupUserId].id && (
                          <Box
                            padding="2px 4px"
                            borderRadius="4px"
                            fontSize="9px"
                            bg={textSecondary}
                          >
                            OWNER
                          </Box>
                        )}
                    </Flex>
                  );
                })}
            </Flex>
          </DropdownItem>
          <DropdownItem header="Group settings"> </DropdownItem>
          <DropdownItem header="Something"> </DropdownItem>

          <DropdownItem header="Options"> </DropdownItem>

          <DropdownItem header="Privacy"> </DropdownItem>
        </Flex>
      </Flex>
    </Grid>
  );
};
