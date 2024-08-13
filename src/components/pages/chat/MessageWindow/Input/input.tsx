import { Box, Flex, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";

import "react-quill/dist/quill.bubble.css";

import ReactQuill from "react-quill";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useDisclosure } from "@chakra-ui/core";
import { LinkIcon } from "@chakra-ui/icons";

const Delta = require("quill-delta");

export const MessageInput = () => {
  const onKeyDown = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    e.target.style.maxHeight = e.target.scrollHeight + "px";
  };
  const onKeyUp = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    e.target.style.maxHeight = e.target.scrollHeight + "px";
  };

  const { groupId, users, messages, groups, sendMessage } = useChatProvider();

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = async () => {
    const res = await sendMessage(newMessage, []);
    if (res) {
      setNewMessage("");
      setTimeout(() => {
        const scroll: any = document.getElementById("chatScroll");
        scroll.scrollTop = scroll.scrollHeight;
      }, 100);
    }
  };

  const [reactQuill, setQuill] = useState<any>(null);

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

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const backgroundColor = useColorModeValue(
    "backgroundTertiary.light",
    "backgroundTertiary.dark",
  );

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const { backgroundPrimary } = useThemeProvider();

  return (
    <Flex
      bg={useColorModeValue(
        "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 47%)",
        "linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 1) 47%)",
      )}
      bottom="0px"
      left="0px"
      right="0px"
    >
      <Grid
        bg={backgroundPrimary}
        w="100%"
        maxH="150px"
        transition="0.2s"
        templateColumns="1fr auto auto"
        borderBottomRadius="8px"
        borderTop="1px solid"
        borderColor={borderColor}
        alignItems="center"
      >
        {/* <Input
            border="none"
            value={newMessage}
            ml="10px"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            padding="none"
            h="12px"
            fontSize="12px"
            _focus={{ boxShadow: "none" }}
            _placeholder={{ color: textSecondary }}
            placeholder="Your message"
          /> */}
        <Grid overflowY="scroll">
          <ReactQuill
            theme="bubble"
            placeholder={"Type your message..."}
            value={newMessage}
            onChange={(m) => {
              setNewMessage(m);
              if (m === "<p><br></p>") setNewMessage("");
            }}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            ref={(e) => {
              setQuill(e);
            }}
          />
        </Grid>
        <Flex align="flex-end" h="100%" paddingY="10px" paddingX="5px">
          <Flex
            _hover={{ opacity: 0.8 }}
            cursor="pointer"
            boxSize="36px"
            mr="10px"
            align="center"
            justify="center"
            pos="relative"
            onClick={onImageAdd}
          >
            {/*<Flex flexDir="column" gap="3px" align="center">
            <Box bg={textPrimary} boxSize="3px" borderRadius="50%" />
            <Box bg={textPrimary} boxSize="3px" borderRadius="50%" />
            <Box bg={textPrimary} boxSize="3px" borderRadius="50%" />
		</Flex>*/}
            <LinkIcon />
          </Flex>

          <Flex
            align="center"
            borderRadius="6px"
            mr="6px"
            justify="center"
            padding="0px 4px"
            boxSize="36px"
            onClick={handleSendMessage}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            bg="brand.500"
          >
            <Image boxSize="14px" src="/assets/icons/send.svg" />
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};
