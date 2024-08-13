import { ERC20Token } from "./useERC20WalletProvider";

export interface IState {
  allTokens: ERC20Token[];
}

export const emptyState: IState = {
  allTokens: [],
};

export const Reducer = (state: IState, updatedProperties: Partial<IState>) => ({
  ...state,
  ...updatedProperties,
});
