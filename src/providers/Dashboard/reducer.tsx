export interface IState {
  tokens: any[];
  users_amount: number;
  total_tickets: number;
  total_points: number;
  users: any[];
  total_staked: number;
  cspr_price: number;
}

export const emptyState: IState = {
  tokens: [],
  users_amount: 0,
  total_tickets: 0,
  total_staked: 0,
  total_points: 0,
  users: [],
  cspr_price: 0,
};

export const Reducer = (state: IState, updatedProperties: Partial<IState>) => ({
  ...state,
  ...updatedProperties,
});
