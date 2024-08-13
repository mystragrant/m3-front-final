import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CHAT_SERVER_BASEURL } from "../../../../../constants";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

interface Group {
  id: string;
  name: string;
  photo: string;
  description: string;
  sharedKey: string;
}

export const PublicGroupSearch = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const { textSecondary } = useThemeProvider();

  const [page, setPage] = useState<number>();

  useEffect(() => {
    axios
      .get(
        `${CHAT_SERVER_BASEURL}/api/Chat/GetAllPublicGroups?page_size=7&pageNumber=2`,
      )
      .then((res) => {
        console.log(res.data);
        setGroups(
          res.data.map((item: any) => {
            return {
              photo: item.photo,
              id: item.id,
              description: item.description,
              name: item.name,
              sharedKey: item.sharedKey,
            };
          }),
        );
      })
      .catch((e) => {});
  }, []);

  const { joinGroup } = useChatProvider();

  return (
    <Flex flexDir="column" gap="16px">
      {groups.map((group) => {
        return (
          <Grid templateColumns="40px 1fr auto" alignItems="center" gap="10px">
            <Box
              bgColor="gray"
              bgImage={group.photo}
              boxSize="40px"
              borderRadius="50%"
            ></Box>
            <Flex
              flexDir="column"
              justify="center"
              fontFamily="Inter"
              fontSize="14px"
            >
              <Box>{group.name}</Box>
              <Box color={textSecondary} fontSize="12px">
                {group.description.length > 0
                  ? group.description
                  : "No description"}
              </Box>
            </Flex>
            <Button
              color="white"
              bg="none"
              h="30px"
              border="1px solid #EFEFEF"
              _hover={{ bg: "#EFEFEF", color: "black" }}
              fontSize="14px"
              fontFamily="Inter"
              fontWeight="400"
              borderRadius="4px"
              onClick={() => {
                alert(group.sharedKey + group.id);
                joinGroup(group.sharedKey, group.id);
              }}
            >
              Join
            </Button>
          </Grid>
        );
      })}
    </Flex>
  );
};
