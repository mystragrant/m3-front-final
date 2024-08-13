import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useCheckboxGroup,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LeftPanel } from "../../components/pages/chat/LeftPanel/leftPanel";
import { MessageWindow } from "../../components/pages/chat/MessageWindow/messageWindow";
import { RightPanel } from "../../components/pages/chat/RightPanel/rightPanel";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useChatProvider } from "../../providers/Chat/chatProvider";
import {
  useMultiWalletProvider,
  WalletProvider,
} from "../../providers/MultiWalletProvider/multiWalletProvider";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../providers/User/userProvider";
import { trimHash } from "../../utils/utils";
const Delta = require("quill-delta");

export const ChatPage = () => {
  const {
    serverKey,
    groups,
    users,
    messages,
    groupUserIds,
    connection,
    state,
    userId,
    groupId,
    connect,
    sendMessage,
    infoOpen,
    deleteMessage,
    setGroupId,
    createGroup,
    renameGroup,
    inviteUsers,
    leaveGroup,
  } = useChatProvider();

  const [reactQuill, setQuill] = useState<any>(null);

  const { casper_public_key_wallet: casper_wallet } = useUserProvider();
  const { selectedCasperProvider, selectCasperProvider } =
    useMultiWalletProvider();

  const [msg, setMsg] = useState<string>("");

  const [rename, setRename] = useState<string>("");
  const [opGroupId, setOpGroupId] = useState<number>(0);
  const [accountHashSearch, setAccountHashSearch] = useState<string>("");
  const { value, setValue } = useCheckboxGroup();
  const [, forceRemount] = useState<boolean>(false);

  const [modalHeader, setModalHeader] = useState<any>(<></>);
  const [modalBody, setModalBody] = useState<any>(<></>);
  const [modalFooter, setModalFooter] = useState<any>(<></>);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const [alertHeader, setAlertHeader] = useState<any>(<></>);
  const [alertBody, setAlertBody] = useState<any>(<></>);
  const [alertFooter, setAlertFooter] = useState<any>(<></>);
  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();
  const alertCancelRef = React.useRef<any>(undefined);

  useEffectOnce(() => {
    connect();
  });

  const onSend = async () => {
    const srcData: Array<string> = [];
    let plainText: string = msg.trim();
    if (plainText.length === 0) {
      return;
    }
    plainText = plainText.replaceAll("p>", "div>");
    const lastBr = plainText.lastIndexOf("<br>");
    plainText =
      plainText.substring(0, lastBr - 5) + plainText.substring(lastBr + 10);
    let head: number;
    let tail: number;
    if ((head = plainText.indexOf("<img")) >= 0) {
      const tail = plainText.indexOf('">', head) + 2;
      const dimension: any = await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = (err) => {
          reject(err);
        };
        img.src = plainText.substring(head + 10, tail - 2);
        srcData.push(img.src);
      });
      plainText =
        plainText.substring(0, head) +
        `<LazyLoadingImage width={"${dimension.width}px"} height={"${dimension.height}px"} />` +
        plainText.substring(tail);
    }
    sendMessage(plainText, srcData);
  };

  const onImageAdd = () => {
    //quill.getEditor().theme.modules.toolbar.handlers.image();
    (window as any).reactquill = reactQuill;
    const quill = reactQuill.getEditor();
    let fileInput = quill.container.querySelector("input.ql-image[type=file]");
    if (fileInput == null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("style", "display: none;");
      fileInput.setAttribute(
        "accept",
        "image/png, image/gif, image/jpeg, image/bmp, image/x-icon",
      );
      fileInput.classList.add("ql-image");
      fileInput.addEventListener("change", () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const range = quill.getSelection(true);
            const delta = new Delta();
            quill.updateContents(
              delta
                .retain(range.index)
                .delete(range.length)
                .insert({ image: e.target?.result }),
              "user",
            );
            quill.setSelection(range.index + 1, "source");
            fileInput.value = "";
          };
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
      quill.container.appendChild(fileInput);
    }
    fileInput.click();
  };

  const onDelete = async (mid: number) => {
    const result = await deleteMessage(mid);
    if (!result.success) {
    } else {
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSend();
      setMsg("");
    }
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    e.target.style.maxHeight = e.target.scrollHeight + "px";
  };
  const onKeyUp = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    e.target.style.maxHeight = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    if (opGroupId === 0) return;
    setModalHeader(<>{`Rename group ${groups[opGroupId].name}`}</>);
    setModalBody(
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor={"abc"}>New name: </FormLabel>
          <Input value={rename} onChange={(e) => setRename(e.target.value)} />
        </FormControl>
      </Stack>,
    );
    setModalFooter(
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          isDisabled={rename === groups[opGroupId].name}
          colorScheme="teal"
          onClick={async () => {
            closeModal();
            const res = await renameGroup(opGroupId, rename);
            if (res.success === true) {
            } else {
            }

            forceRemount((p) => !p);
          }}
        >
          Save
        </Button>
      </ButtonGroup>,
    );
  }, [opGroupId, rename]);

  useEffect(() => {
    if (groupId === 0) return;
    setModalHeader(<>{`Invite users to ${groups[groupId].name}`}</>);
    setModalBody(
      <>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
          />
          <Input
            variant="flushed"
            placeholder="Search account hash ..."
            value={accountHashSearch}
            onChange={(e) => setAccountHashSearch(e.target.value)}
          />
          <InputRightElement
            cursor={"pointer"}
            children={
              <CloseIcon
                color="gray.400"
                onClick={() => setAccountHashSearch("")}
              />
            }
          />
        </InputGroup>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Account Hash</Th>
              </Tr>
            </Thead>
            <Tbody>
              <CheckboxGroup value={value}>
                {users
                  .filter(
                    (user) =>
                      !groupUserIds[groupId]?.includes(user.id) &&
                      user.accountHash.includes(
                        accountHashSearch.toLowerCase(),
                      ),
                  )
                  .map((user, index) => (
                    <Tr key={index}>
                      <Td>
                        <Checkbox
                          value={user.id}
                          iconColor="white"
                          onChange={(e) => {
                            const idx = value.indexOf(user.id);
                            if (idx >= 0) {
                              const newValue = value;
                              newValue.splice(idx, 1);
                              setValue(newValue);
                            } else setValue([...value, user.id]);
                            forceRemount((prev) => !prev);
                          }}
                        >
                          {trimHash(user.accountHash)}
                        </Checkbox>
                      </Td>
                    </Tr>
                  ))}
              </CheckboxGroup>
            </Tbody>
          </Table>
        </TableContainer>
      </>,
    );
    setModalFooter(
      <>
        <Button colorScheme="blue" mr={3} onClick={onInvite}>
          Proceed
        </Button>
        <Button colorScheme="white" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
      </>,
    );
  }, [groupId, accountHashSearch, value]);

  const {
    backgroundSecondary,
    borderPrimary,
    textSecondary,
    backgroundPrimary,
  } = useThemeProvider();

  const onLeaveGroup = async (gid: number) => {
    setAlertHeader(<>{`Leave ${groups[gid].name}`}</>);
    setAlertBody(<>{`Are you sure? You can't undo this action afterwards.`}</>);
    setAlertFooter(
      <>
        <Button ref={alertCancelRef} variant={"ghost"} onClick={closeAlert}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={async () => {
            closeAlert();
            const res = await leaveGroup(gid);
            if (res.success === true) {
            } else {
            }
            forceRemount((p) => !p);
          }}
          ml={3}
        >
          Proceed
        </Button>
      </>,
    );
    openAlert();
  };

  const onInvite = async () => {
    closeModal();
    const res = await inviteUsers(value as Array<number>);
    if (res.success) {
    } else {
    }
    forceRemount((p) => !p);
  };

  const [showConnectError, setShowConnectError] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <Grid pos="relative">
      {selectedCasperProvider ? (
        <Grid
          templateColumns={"360px 1fr"}
          h="calc(100vh - 74px)"
          maxH="calc(100vh - 74px)"
          pos="relative"
        >
          <LeftPanel forceRemount={forceRemount} />
          <MessageWindow />
        </Grid>
      ) : (
        <Flex
          margin="auto"
          border="1px solid"
          padding="40px"
          borderRadius={"8px"}
          borderBottom="none"
          borderColor={borderPrimary}
          bg={backgroundPrimary}
          flexDir={"column"}
          gap="16px"
          w="600px"
        >
          <Box fontWeight={"bold"} fontSize={"24px"}>
            Select your wallet provider
          </Box>
          <Flex gap="12px" flexDir={"column"}>
            {[
              {
                icon: "/assets/icons/casper-logo.png",
                name: "Casper Wallet",
                soon: false,
                disabled: false,
                onClick: async () => {
                  try {
                    if (casper_wallet != "") {
                      await selectCasperProvider(WalletProvider.CASPER_WALLET);
                    } else {
                      setShowConnectError(true);
                    }
                  } catch (e) {}
                },
              },
              {
                icon: "/assets/icons/casper-dash.png",
                name: "Casper Dash",
                soon: true,
                disabled: false,
                onClick: async () => {
                  try {
                    if (casper_wallet != "") {
                      await selectCasperProvider(WalletProvider.CASPER_DASH);
                    } else {
                      setShowConnectError(true);
                    }
                  } catch (e) {}
                },
              },
              {
                icon: "/assets/icons/metamask-logo.png",
                name: "MetaMask",
                disabled: true,
                soon: true,
                onClick: async () => {},
              },
            ].map((item) => {
              return (
                <Flex
                  cursor={item.disabled ? "default" : "pointer"}
                  _hover={{ bg: item.disabled ? "none" : backgroundSecondary }}
                  gap="4px"
                  key={item.name}
                  align="center"
                  justify="center"
                  flexDir="column"
                  opacity={item.disabled ? "0.5" : "1"}
                  h="100px"
                  borderRadius="8px"
                  onClick={item.onClick}
                  border="1px solid"
                  borderColor={textSecondary}
                >
                  <Image w="20px" src={item.icon} />
                  <Box fontSize="14px">
                    {item.name} {item.soon && "- Coming soon"}
                  </Box>
                </Flex>
              );
            })}
          </Flex>
          {showConnectError && (
            <Flex
              flexDir="column"
              align="flex-start"
              fontSize="14px"
              gap="10px"
            >
              In order to use chat with Casper Wallet you must link casper
              network wallet to your account in Verification Settings
              <Button
                h="40px"
                fontSize="14px"
                color="white"
                bg="brand.500"
                fontWeight="normal"
                onClick={() => {
                  navigate("/account/verification");
                }}
              >
                Link my Casper Network Address
              </Button>
            </Flex>
          )}
        </Flex>
      )}
    </Grid>
  );
};
