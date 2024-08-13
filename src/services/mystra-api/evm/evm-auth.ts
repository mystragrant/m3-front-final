import axios from "axios";
import { MYSTRA_API_URL } from "../../../constants";

export const authLoginEVM = async (signature: string, message: string) => {
  return axios.post(
    `${MYSTRA_API_URL}/SiweAuthentication/authenticate`,
    {
      siweEncodedMessage: message,
      signature: signature,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const assignEVMWallet = async (
  signature: string,
  message: string,
  token: string,
  id: number,
) => {
  return axios.post(
    `${MYSTRA_API_URL}/SiweAuthentication/AssignEvmWallet?userId=${id}`,
    {
      siweEncodedMessage: message,
      signature: signature,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const getWalletSecret = async (address: string) => {
  return axios.post(
    `${MYSTRA_API_URL}/SiweAuthentication/newsiwemessage`,
    address,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const getEVMUser = async (token: string) => {
  return axios.get(`${MYSTRA_API_URL}/Accounts/GetBySiweToken/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerEVM = async (
  acceptTerms: boolean,
  acceptMarketing: boolean,
  wallet: string,
) => {
  return axios.post(
    `${MYSTRA_API_URL}/SiweAuthentication/registerbysiwe`,
    {
      acceptTerms: acceptTerms,
      acceptMarketingTerms: acceptMarketing,
      evmWallet: wallet,
    },
    {},
  );
};
