export enum WalletProvider {
  CASPER_SIGNER,
  CASPER_WALLET,
  METAMASK,
  CASPER_DASH,
}

export interface IState {
  metamaskInstalled: boolean;
  casperWalletInstalled: boolean;
  casperSignerInstalled: boolean;
  selectedCasperProvider: WalletProvider | null;
  installedCasperWallets: WalletProvider[];
  selectedWallet: WalletProvider | null;
  selectedCasperPublicKey: string | null;
}

export const emptyState: IState = {
  installedCasperWallets: [],
  metamaskInstalled: false,
  selectedWallet: null,
  casperWalletInstalled: false,
  casperSignerInstalled: false,
  selectedCasperProvider: null,
  selectedCasperPublicKey: null,
};

export const Reducer = (state: IState, updatedProperties: Partial<IState>) => ({
  ...state,
  ...updatedProperties,
});
