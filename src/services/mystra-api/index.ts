import {
  authLoginEVM,
  getWalletSecret,
  assignEVMWallet,
  getEVMUser,
  registerEVM,
} from "./evm/evm-auth";
import {
  registerEmail,
  loginEmail,
  verifyEmail,
  resetPassword,
  forgotPassword,
  setNicknameWeb2,
  setTitle,
  setBio,
} from "./web2/web2-auth";
import {
  getCasperSignerSeed,
  authLoginSigner,
  registerSigner,
  setNicknameCasper,
  assignCasperWallet,
} from "./signer/casper-signer-auth";
import axios from "axios";
import { MYSTRA_API_URL } from "../../constants";

const updateNicknameEVM = async (
  newNickname: string,
  wallet: string,
  token: string,
) => {
  return axios.put(
    `${MYSTRA_API_URL}/Accounts/UpdateBySiweToken?evm_token=${token}`,
    {
      nickname: newNickname,
      evmWallet: wallet,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

const getPointsNickname = (id: number, token: string) => {
  return axios.put(
    `${MYSTRA_API_URL}/Points/points/addpointsfornickname?user_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

export const getDelegations = (id: number) => {
  return axios.get(`${MYSTRA_API_URL}/delegations/${id}`);
};

const getChangelog = () => {
  return axios.get(`${MYSTRA_API_URL}/ChangeLog`);
};

const getCasperNodeInfo = async () => {
  return axios.get(`${MYSTRA_API_URL}/nodestats`);
};

const getNFTs = async (userId: number) => {
  return axios.get(`${MYSTRA_API_URL}/nft/${userId}`);
};

const getCSPRBalance = async (casperPublicKey: string) => {
  return axios.get(
    `${MYSTRA_API_URL}/CsprNode/GetAccountBalance/${casperPublicKey}`,
  );
};

const getMarketData = async () => {
  return axios.get(`${MYSTRA_API_URL}/get`);
};

const verifyDiscord = (id: number, token: string, code: string) => {
  return axios.put(
    `${MYSTRA_API_URL}/AccountsVerification/discord?user_id=${id}&verification_code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

const verifyTelegram = (id: number, token: string, code: string) => {
  console.log(token);
  return axios.put(
    `${MYSTRA_API_URL}/AccountsVerification/telegram?user_id=${id}&verification_code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

const verifyTwitter = (id: number, token: string, code: string) => {
  console.log(token);
  return axios.put(
    `${MYSTRA_API_URL}/AccountsVerification/twitter?user_id=${id}&verification_code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

const updateEmail = (id: number, email: string, token: string) => {
  return axios.post(
    `${MYSTRA_API_URL}/Accounts/update-web3-email?userId=${id}`,
    { email: email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

const verifyExistingAccountEmail = (
  id: number,
  code: string,
  token: string,
) => {
  return axios.put(
    `${MYSTRA_API_URL}/AccountsVerification/email?user_id=${id}&verification_code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // "text/plain",
      },
    },
  );
};

export const MystraAPI = {
  registerEmail,
  getCasperSignerSeed,
  getCSPRBalance,
  loginEmail,
  getDelegations,
  authLoginSigner,
  getNFTs,
  verifyEmail,
  resetPassword,
  updateEmail,
  verifyExistingAccountEmail,
  forgotPassword,
  getWalletSecret,
  verifyDiscord,
  assignCasperWallet,
  authLoginEVM,
  getEVMUser,
  getCasperNodeInfo,
  updateNicknameEVM,
  getPointsNickname,
  registerEVM,
  setNicknameWeb2,
  registerSigner,
  getChangelog,
  assignEVMWallet,
  getMarketData,
  setBio,
  verifyTwitter,
  verifyTelegram,
  setNicknameCasper,
  setTitle,
};
