import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { MYSTRA_API_URL } from "../../constants";
import { IParent } from "../../shared/types";
import { useUserProvider } from "../User/userProvider";

import { emptyState, IState, Reducer } from "./reducer";

export interface ERC20Token {
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
}

interface IContext extends IState {}

const emptyContext: IContext = {
  ...emptyState,
};

const Context = createContext(emptyContext);

export const casperlabsHelper = (window as any).casperlabsHelper;

export const ERC20WalletProvider = ({ children }: IParent) => {
  const [state, dispatch] = useReducer(Reducer, emptyContext);
  const { id, isLogged } = useUserProvider();

  useEffect(() => {
    if (isLogged) {
      try {
        axios.get(`${MYSTRA_API_URL}/erc20/${id}`).then((res) => {
          console.log(res.data);

          dispatch({
            allTokens: res.data,
          });
        });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    console.log("allTokens", state.allTokens);
  }, [state.allTokens]);

  return (
    <Context.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useERC20WalletProvider = () => useContext(Context);
