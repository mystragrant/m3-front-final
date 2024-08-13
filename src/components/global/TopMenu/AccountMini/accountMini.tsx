import {
  Box,
  Flex,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

export const AccountMini = ({ menuOpen }: { menuOpen: boolean }) => {
  const { avatar, logout, nickname, points, tickets_amount } =
    useUserProvider();

  const { backgroundPrimary } = useThemeProvider();

  const navigate = useNavigate();

  const { onOpen } = useDisclosure();

  return (
    <Grid
      h={{ base: "46px", md: "46px" }}
      templateColumns={"auto 46px"}
      gridGap={menuOpen ? "15px" : "0px"}
    >
      <Flex justifyContent="center" alignItems="flex-end" flexDir="column">
        <Flex
          justify="flex-end"
          fontFamily="Inter"
          fontWeight="400"
          fontSize="14px"
          minW="100px"
          maxW="100px"
        >
          {nickname.length !== 0 ? nickname : "Newcomer"}
        </Flex>
        <Flex
          fontFamily="Sora"
          gap="3px"
          color="gray"
          align="center"
          fontSize="12px"
        >
          <Box color="brandSecondary.500">{points}</Box>
          <Image w="12px" src="assets/brand/star.svg" />
        </Flex>
      </Flex>
      <Menu>
        <MenuButton
          alignItems="center"
          justifyContent="center"
          display="flex"
          w={"46px"}
          h={"46px"}
          cursor="pointer"
          onClick={onOpen}
          transition="0.1s"
          pos="relative"
          borderRadius="50%"
          border="1.5px solid"
          borderColor={tickets_amount <= 0 ? "brandSecondary.500" : "#3D3D3D"}
        >
          <Flex
            display="flex"
            cursor="pointer"
            ml="10px"
            bg={backgroundPrimary}
            alignItems="center"
            justifyItems="center"
            boxSize="14px"
            border="1px solid white"
            right="0px"
            borderColor={"white"}
            pos="absolute"
            bottom="0px"
            borderRadius="50%"
          >
            <ChevronDownIcon w="10px" ml="1px" color="white" />
          </Flex>

          <Image
            boxSize={{ base: "36px", md: "34px" }}
            src={avatar}
            borderRadius="50%"
            ml="4.5px"
          />
        </MenuButton>
        <MenuList
          paddingY="0px"
          mt="4px"
          fontSize="14px"
          fontFamily="Inter"
          zIndex="5000"
          bg={backgroundPrimary}
        >
          <MenuItem onClick={() => navigate("/account/settings?tab=general")}>
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Grid>
  );
};
