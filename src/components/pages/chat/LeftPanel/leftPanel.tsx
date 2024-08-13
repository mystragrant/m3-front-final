import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  Image,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { CreateGroup } from "./CreateGroup/createGroup";
import { RoomItem } from "./RoomItem/roomItem";
import { Rooms } from "./Rooms/rooms";
import { RoomsTab } from "./RoomsTab/roomsTab";

export const LeftPanel = ({
  forceRemount,
}: {
  forceRemount: Dispatch<SetStateAction<boolean>>;
}) => {
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

  const [filterText, setFilterText] = useState<string>("");

  return (
    <Grid
      flexDir="column"
      templateRows="auto 1fr auto"
      border="1px solid"
      pos="relative"
      borderTop="none"
      borderBottom="none"
      borderColor={borderColor}
      borderLeft="none"
      borderRight="none"
      maxH="calc(100vh - 76px)"
    >
      <Grid
        borderBottom="1px solid"
        borderColor={borderColor}
        templateColumns="1fr"
        gap="0px"
        padding="17px 17px"
        alignItems="center"
      >
        <Flex
          border="1px solid"
          borderColor={borderColor}
          borderRadius="8px"
          align="center"
          gap="6px"
          padding="12px 18px"
          mr="8px"
        >
          <SearchIcon boxSize="12px" color={textSecondary} />
          <Input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value.toLowerCase())}
            placeholder="Search"
            padding="0px 6px"
            fontSize="12px"
            h="12px"
            border="none"
            _focus={{ boxShadow: "none" }}
            _placeholder={{ color: textSecondary }}
          />
        </Flex>
      </Grid>
      <Flex flexDir="column" overflow="hidden">
        <Flex
          flexDir="column"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Rooms filter={filterText} />
        </Flex>
      </Flex>
      {<CreateGroup forceRemount={forceRemount} />}
    </Grid>
  );
};
