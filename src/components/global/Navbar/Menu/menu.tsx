import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { CartIcon } from "../../../shared/icons/navigation/cartIcon";
import { ChatIcon } from "../../../shared/icons/navigation/chatIcon";
import { CreatorIcon } from "../../../shared/icons/navigation/Creator";
import { DashboardIcon } from "../../../shared/icons/navigation/dashboardIcon";
import { FiatIcon } from "../../../shared/icons/navigation/fiatIcon";
import { GuildIcon } from "../../../shared/icons/navigation/Guilds";
import { ProjectsIcon } from "../../../shared/icons/navigation/Projects";
import { UserIcon } from "../../../shared/icons/navigation/userIcon";
import { WalletIcon } from "../../../shared/icons/navigation/walletIcon";
import { WrenchIcon } from "../../../shared/icons/navigation/WrenchIcon";
import { MenuItem } from "./MenuItem/menuItem";

const Separator = ({
  label,
  menuOpen,
}: {
  label: string;
  menuOpen: boolean;
}) => {
  const { borderPrimary, textSecondary } = useThemeProvider();

  return (
    <Flex
      pt="20px"
      align="center"
      justify={menuOpen ? "flex-start" : "center"}
      lineHeight={"100%"}
      pl={menuOpen ? "20px" : "0px"}
      borderTop="1px solid"
      transition="none"
      color={textSecondary}
      fontFamily="Space Mono"
      mt="10px"
      pb="14px"
      borderColor={borderPrimary}
      fontSize="9px"
      textTransform={"uppercase"}
    >
      {label}
    </Flex>
  );
};

export const Menu = ({ menuOpen }: { menuOpen: boolean }) => {
  const { isLogged } = useUserProvider();

  return (
    <Box mt="10px">
      <MenuItem
        disabled={false}
        content="Dashboard"
        href="/"
        menuOpen={menuOpen}
        icon={<DashboardIcon />}
      />

      <MenuItem
        disabled={false}
        href={"/tools"}
        menuOpen={menuOpen}
        content="Crypto&nbsp;Tools"
        icon={<WrenchIcon />}
      />
      <MenuItem
        disabled={false}
        href={"/creator-studio"}
        menuOpen={menuOpen}
        content="Creator&nbsp;Studio"
        icon={<CreatorIcon />}
      />
      <MenuItem
        disabled={true}
        href={"/dao"}
        menuOpen={menuOpen}
        content="Projects"
        icon={<ProjectsIcon />}
      />
      <MenuItem
        disabled={true}
        href={"/guilds"}
        menuOpen={menuOpen}
        content="Guilds"
        icon={<GuildIcon customSize={18} customColor="white" />}
      />
      <MenuItem
        menuOpen={menuOpen}
        href="/marketplace"
        content="Marketplace"
        disabled={false}
        icon={<CartIcon />}
      />
      {isLogged && <Separator label={"USER"} menuOpen={menuOpen} />}
      {isLogged && (
        <MenuItem
          disabled={false}
          content="Account"
          href="/account/verification"
          menuOpen={menuOpen}
          icon={<UserIcon />}
        />
      )}

      {isLogged && (
        <MenuItem
          disabled={false}
          content="Wallet"
          href="/wallet"
          menuOpen={menuOpen}
          icon={<WalletIcon />}
        />
      )}
      {isLogged && (
        <MenuItem
          disabled={true}
          content="Chat"
          menuOpen={menuOpen}
          href="/chat"
          icon={<ChatIcon />}
        />
      )}

      <MenuItem
        disabled={false}
        menuOpen={menuOpen}
        content="Buy&nbsp;Crypto"
        href={"/fiat-gateway"}
        icon={<FiatIcon />}
      />

      {/* <MenuItem
        disabled={true}
        menuOpen={menuOpen}
        content="Dex"
        icon={<SwapIcon />}
      /> */}

      {/* <MenuItem
        disabled={true}
        content="Help"
        menuOpen={menuOpen}
        href="/help"
        icon={<HelpIcon />}
      /> */}
    </Box>
  );
};
