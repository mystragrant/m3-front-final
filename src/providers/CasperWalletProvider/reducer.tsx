export interface IState {
  activeKey: string;
  isConnected: boolean;
  isLocked: boolean;
}

export const emptyState: IState = {
  activeKey: "",
  isConnected: false,
  isLocked: false,
};

export const Reducer = (state: IState, updatedProperties: Partial<IState>) => ({
  ...state,
  ...updatedProperties,
});
