/* eslint-disable */
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { NAVIGATION_ITEMS, Path } from "./items";
import { MarketplaceSearchBar } from "./MarketplaceSearchBar";

const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      end
      className={({ isActive }) => (isActive ? "active-link" : "link")}
      to={to}
    >
      <Box fontSize="14px" fontFamily="Inter" padding="4px 0px">
        {children}
      </Box>
    </NavLink>
  );
};

export const Navigation = () => {
  const { pathname } = useLocation();
  const [header, setHeader] = useState<string | null>();
  const [pathItems, setPathItems] = useState<Path[]>([]);

  const { isLogged } = useUserProvider();

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/news" ||
      pathname === "/buy-ticket" ||
      pathname === "/dashboard/leaderboards" ||
      pathname.split("/")[1] === "users"
    ) {
      setHeader("Dashboard");
      setPathItems(NAVIGATION_ITEMS.dashboard);
    } else if (pathname.split("/")[1] === "marketplace") {
      setHeader("Marketplace");
      setPathItems([]);
    } else if (
      pathname === "/staking" ||
      pathname === "/staking/calculator" ||
      pathname === "/staking/delegations" ||
      pathname === "/staking/ranking"
    ) {
      setHeader("Staking");
      setPathItems(NAVIGATION_ITEMS.staking);
    } else if (pathname === "/explorer/casper") {
      setHeader("Explorer");
      setPathItems(NAVIGATION_ITEMS.dashboard);
    } else if (pathname === "/bridge") {
      setHeader("Bridge");
      setPathItems(NAVIGATION_ITEMS.bridge);
    } else if (pathname === "/fiat-gateway") {
      setHeader("Buy Crypto");
      setPathItems(NAVIGATION_ITEMS.buyCrypto);
    } else if (pathname === "/wallet") {
      setHeader("Wallet");
      setPathItems(NAVIGATION_ITEMS.wallet);
    } else if (
      pathname === "/marketplace" ||
      pathname.split("/")[1] === "marketplace"
    ) {
      setHeader("Account");
      setPathItems(NAVIGATION_ITEMS.account);
    } else if (
      pathname === "/account/verification" ||
      pathname === "/account/settings"
    ) {
      setHeader("Account");
      setPathItems(NAVIGATION_ITEMS.account);
    } else if (
      pathname === "/creator-studio" ||
      pathname === "/creator-studio/nfts"
    ) {
      setHeader("Creator Studio");
      setPathItems(NAVIGATION_ITEMS.dashboard);
    } else if (pathname === "/dao") {
      setHeader("Projects");
      setPathItems(NAVIGATION_ITEMS.projects);
    } else if (pathname === "/tools") {
      setHeader("Crypto Tools");
      setPathItems(NAVIGATION_ITEMS.tools);
    }
  }, [pathname]);

  return (
    <Flex align="center" gap="55px">
      <Box fontSize="24px" fontWeight="400" fontFamily="Inter">
        <Link to={pathItems.length > 0 ? pathItems[0].to : ""}>{header}</Link>
      </Box>
      {header == "Marketplace" && <MarketplaceSearchBar />}
      <Flex align="center" gap="30px">
        {pathItems.map((item) => {
          return item.isLogged === true ? (
            isLogged && <NavItem to={item.to}>{item.name}</NavItem>
          ) : (
            <NavItem to={item.to}>{item.name}</NavItem>
          );
        })}
      </Flex>
    </Flex>
  );
};
