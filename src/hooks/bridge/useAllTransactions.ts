/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useSWR from "swr";
import {
  REACT_APP_API_URL,
  REACT_APP_TEST_API_URL,
  isTestnet,
} from "../../constants";
import Network from "../../type/Network";

export const useAllTransactions = (
  account?: string | null | undefined,
  currentNetwork?: Network | undefined,
  limit?: number,
  onlyMyTxn?: boolean,
): any => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const API_URL = isTestnet ? REACT_APP_TEST_API_URL : REACT_APP_API_URL;
  const { data, error } = useSWR(
    account && currentNetwork
      ? `${API_URL}/history?limit=0&page=1` //`${process.env.REACT_APP_API_URL}/transactions/${account.toLowerCase()}/${currentNetwork?chainId}?limit=${limit ?? 20}`
      : null,
    fetcher,
    {
      refreshInterval: 60000,
      refreshWhenHidden: true,
    },
  );
  return { data, error };
};
