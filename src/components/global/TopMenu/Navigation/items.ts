export interface Path {
  to: string;
  name: string;
  isLogged?: boolean;
}

export const NAVIGATION_ITEMS = {
  dashboard: [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/changelog",
      name: "Changelog",
    },
    {
      to: "/dashboard/leaderboards",
      name: "Ranking",
    },
    {
      to: "/buy-ticket",
      name: "Ticket",
    },
  ],
  staking: [
    {
      to: "/staking",
      name: "Stake",
    },
    {
      to: "/staking/delegations",
      name: "My delegations",
      isLogged: true,
    },

    {
      to: "/staking/calculator",
      name: "Calculator",
    },
  ],
  bridge: [
    {
      to: "/bridge",
      name: "Home",
    },
  ],
  account: [
    {
      to: "/account/verification",
      name: "Verification",
    },
    {
      to: "/account/settings?tab=general",
      name: "Settings",
    },
    {
      to: "/account/me",
      name: "My Profile",
    },
  ],
  projects: [
    {
      to: "/dao",
      name: "Discover",
    },
    {
      to: "/launchpad",
      name: "Invest / Launchpad",
    },
    {
      to: "/account/me",
      name: "Create",
    },
  ],
  marketplace: [
    {
      to: "/marketplace",
      name: "Home",
    },
  ],
  tools: [
    {
      to: "/tools",
      name: "Home",
    },
  ],
  buyCrypto: [
    {
      to: "/fiat-gateway",
      name: "Home",
    },
  ],
  wallet: [
    {
      to: "/wallet/nft",
      name: "NFT",
    },
  ],
};
