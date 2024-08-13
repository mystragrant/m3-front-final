export interface Verification {
  email: boolean;
  nickname: boolean;
  kyckyb: boolean;
  discord: boolean;
  telegram: boolean;
  ticket: boolean;
  stake: boolean;
  evm: boolean;
  casper: boolean;
}

export interface IState {
  email: string;
  isLogged: boolean;
  avatar: string;
  id: number;
  csprBalance: number;
  tickets_amount: number;
  evm_jwt: string;
  nickname: string;
  casper_public_key_wallet: string;
  evm_wallet: string;
  verification: Verification;
  points: number;
  discord_connected: boolean;
  telegram_connected: boolean;
  discord_nickname: string;
  twitter_nickname: string;
  telegram_nickname: string;
  web2_token: string;
  cspr_staked_on_mysta_casper_node: number;
  accept_marketing_terms: boolean;
  points_user: {
    telegram: number;
    twitter: number;
    discord: number;
    dao_investments: number;
    dao_governance: number;
    staking: number;
    actions: number;
    tickets: number;
  };
  points_all_users: {
    actions: number;
    staking: number;
    dao_investments: number;
    dao_governance: number;
    telegram: number;
    discord: number;
    twitter: number;
  };
}

export const emptyState: IState = {
  email: "",
  isLogged: false,
  avatar: "/assets/brand/default-avatar.jpg",
  id: -1,
  evm_jwt: "",
  discord_nickname: "",
  telegram_nickname: "",
  twitter_nickname: "",
  nickname: "",
  web2_token: "",
  discord_connected: false,
  cspr_staked_on_mysta_casper_node: 0,
  accept_marketing_terms: false,
  csprBalance: -1,
  tickets_amount: 0,
  telegram_connected: false,
  casper_public_key_wallet: "",
  evm_wallet: "",
  points: 0,
  verification: {
    email: false,
    nickname: false,
    kyckyb: false,
    discord: false,
    telegram: false,
    ticket: false,
    stake: false,
    casper: false,
    evm: false,
  },
  points_user: {
    telegram: 0,
    twitter: 0,
    discord: 0,
    dao_investments: 0,
    dao_governance: 0,
    staking: 0,
    actions: 0,
    tickets: 0,
  },
  points_all_users: {
    actions: 0,
    staking: 0,
    dao_investments: 0,
    dao_governance: 0,
    telegram: 0,
    discord: 0,
    twitter: 0,
  },
};

export const Reducer = (state: IState, updatedProperties: Partial<IState>) => ({
  ...state,
  ...updatedProperties,
});
