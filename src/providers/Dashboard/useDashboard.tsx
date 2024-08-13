import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { IParent } from "../../shared/types";
import { timeout } from "../../utils/utils";

import { emptyState, IState, Reducer } from "./reducer";
import axios from "axios";
import { MYSTRA_API_URL } from "../../constants";
import { MystraAPI } from "../../services/mystra-api";

interface IContext extends IState {}

const emptyContext: IContext = {
  ...emptyState,
};

const Context = createContext(emptyContext);

export const casperlabsHelper = (window as any).casperlabsHelper;

export const DashboardProvider = ({ children }: IParent) => {
  const [state, dispatch] = useReducer(Reducer, emptyContext);

  useEffect(() => {
    axios
      .get(`${MYSTRA_API_URL}/Accounts/GeAllDasboardData`)
      .then((res) => {
        dispatch({
          total_points: res.data.total_points,
          total_staked: res.data.total_staked,
          total_tickets: res.data.total_tickets,
          users_amount: res.data.total_accounts,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    MystraAPI.getMarketData()
      .then((res: any) => {
        const casperTokenData = res.data.find((token: any) => {
          return token.id == "casper-network";
        });

        dispatch({
          tokens: res.data,
          cspr_price: Number(
            casperTokenData.current_price.replaceAll(",", "."),
          ),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

export const useDashboardProvider = () => useContext(Context);
