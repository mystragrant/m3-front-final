import axios from "axios";
import { MYSTRA_API_URL } from "../../../constants";

export const authLoginSigner = async (signature: string, message: string) => {
  return axios.post(
    `${MYSTRA_API_URL}/CasperAuthentication/authenticate`,
    {
      casperEncodedMessage: message,
      signature: signature,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const assignCasperWallet = async (
  signature: string,
  message: string,
  token: string,
  id: number,
) => {
  return axios.post(
    `${MYSTRA_API_URL}/CasperAuthentication/AssignCasperWallet?userId=${id}`,
    {
      casperEncodedMessage: message,
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

export const registerSigner = async (
  terms: boolean,
  marketing: boolean,
  wallet: string,
) => {
  return axios.post(
    `${MYSTRA_API_URL}/CasperAuthentication/registerbycasper`,
    {
      acceptTerms: terms,
      acceptMarketingTerms: marketing,
      casperPublicKeyWallet: wallet,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const getCasperSignerSeed = async (publicKey: string) => {
  return axios.post(
    `${MYSTRA_API_URL}/CasperAuthentication/newcaspermessage`,
    publicKey,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const setNicknameCasper = async (
  newNickname: string,
  wallet: string,
  token: string,
) => {
  return axios.put(
    `${MYSTRA_API_URL}/Accounts/UpdateByCasperToken?casper_token=${token}`,
    {
      nickname: newNickname,
      casperPublicKeyWallet: wallet,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
