import { useColorMode, useDisclosure } from "@chakra-ui/core";
import {
  Box,
  Flex,
  Grid,
  Image,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useChatProvider } from "../../../../providers/Chat/chatProvider";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { MessageItem } from "./MessageItem/messageItem";
import { Topbar } from "./TopBar/topbar";
import { LazyLoadingImage } from "./../LazyLoadingImage";
import { useEffect, useRef, useState } from "react";
import { trimHash } from "../../../../utils/utils";
import "react-quill/dist/quill.bubble.css";
import { MessageInput } from "./Input/input";
import ReactQuill from "react-quill";
import { RightPanel } from "../RightPanel/rightPanel";

const Delta = require("quill-delta");

export const MessageWindow = () => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const { groupId, users, messages, groups, sendMessage, lastMsgTime } =
    useChatProvider();

  const [messagesDisplayed, setMessagesDisplayed] = useState<any[]>([]);

  useEffect(() => {
    try {
      let messagesToDisplay: any = [
        JSON.parse(JSON.stringify(messages[groupId][0])),
      ];

      console.log("LENGTH: " + messages[groupId].length);

      for (let i = 1; i < messages[groupId].length; i++) {
        const m = JSON.parse(JSON.stringify(messages[groupId][i]));

        if (
          m.userId == messagesToDisplay[messagesToDisplay.length - 1].userId &&
          new Date(m.time).valueOf() -
            new Date(
              messagesToDisplay[messagesToDisplay.length - 1].time,
            ).valueOf() <
            300000
        ) {
          const item = messagesToDisplay[messagesToDisplay.length - 1];
          item.msg = item.msg + m.msg;

          messagesToDisplay[messagesToDisplay.length - 1] = item;
        } else {
          messagesToDisplay = messagesToDisplay.concat([m]);
        }
      }

      setMessagesDisplayed(messagesToDisplay);
    } catch (e) {
      console.log(e);
      setMessagesDisplayed([]);
    }
  }, [groupId, lastMsgTime]);

  useEffect(() => {
    setTimeout(() => {
      const scroll: any = document.getElementById("chatScroll");
      scroll.scrollTop = scroll.scrollHeight;
    }, 500);
  }, [groupId]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const MessageTag = ({ msg = "" }: { msg: string }) => {
    return <></>;
  };

  const { infoOpen } = useChatProvider();

  return (
    <Grid
      pos="relative"
      templateRows="auto 1fr"
      border="1px solid"
      borderColor={borderColor}
      borderBottom="none"
      borderTop="none"
      overflowY="hidden"
    >
      <Topbar
        chatIconUrl={
          groups && groupId
            ? groups[groupId].photo != "x"
              ? groups[groupId].photo
              : "/assets/brand/chat-mockup.png"
            : "/assets/brand/chat-mockup.png"
        }
        chatName={groups && groupId ? groups[groupId].name : "Unkown name"}
        membersAmount={4}
      />
      <Grid templateColumns={infoOpen ? "1fr 300px" : "1fr"}>
        <Grid gridTemplateRows="1fr auto" pos="relative">
          <Flex overflowY="scroll" flexDir="column" maxH="calc(100vh - 196px)">
            <Flex
              flexDir="column"
              gap="24px"
              paddingX="30px"
              py="30px"
              overflowY="scroll"
              pos="relative"
              id={"chatScroll"}
            >
              {messagesDisplayed &&
                messagesDisplayed.map((item) => (
                  <MessageItem
                    active={true}
                    senderAddress={
                      users[item.userId] ? users[item.userId].publicKey : ""
                    }
                    time={
                      new Date(item.time).getHours() +
                      ":" +
                      (new Date(item.time).getMinutes() < 10 ? "0" : "") +
                      new Date(item.time).getMinutes()
                    }
                    content={<MessageTag msg={item.msg} />}
                    username={`Anonymous #${
                      users[item.userId] ? users[item.userId].userCode : ""
                    }`}
                  />
                ))}
            </Flex>
          </Flex>

          <MessageInput />
        </Grid>
        {infoOpen && <RightPanel forceRemount={() => {}} />}
      </Grid>
    </Grid>
  );
};
