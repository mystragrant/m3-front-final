import { Flex } from "@chakra-ui/react";
import { id } from "ethers/lib/utils";
import { useEffect } from "react";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";
import { RoomItem } from "../RoomItem/roomItem";
import { RoomsTab } from "../RoomsTab/roomsTab";

const uniqueItems = (list: any[], keyFn: any) =>
  list.reduce(
    (resultSet, item) =>
      resultSet.add(typeof keyFn === "string" ? item[keyFn] : keyFn(item)),
    new Set(),
  ).size;

export const Rooms = ({ filter }: { filter?: string }) => {
  const { groups, messages, setGroupId, groupId, users } = useChatProvider();

  useEffect(() => {
    console.log("GRP", groups);
  }, [users]);

  return (
    <>
      <Flex flexDir="column">
        {groups

          .filter((item) =>
            filter ? item.name.toLowerCase().includes(filter) : true,
          )
          .map((item) => {
            return (
              <RoomItem
                key={item.id}
                chatName={item.name}
                chatIconUrl={
                  item.photo
                    ? item.photo != "x"
                      ? item.photo
                      : "/assets/brand/default-avatar.jpg"
                    : "/assets/brand/default-avatar.jpg"
                }
                membersAmount={4}
                active={item.id == groupId}
                lastMessageTime={"12:44"}
                onClick={() => setGroupId(item.id)}
              />
            );
          })}
      </Flex>
    </>
  );
};
