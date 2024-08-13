import axios from "axios";
import { MYSTRA_API_URL } from "../../../constants";

export const registerEmail = async (
  email: string,
  password: string,
  confirmPassword: string,
  acceptTerms: boolean,
  acceptMarketing: boolean,
) => {
  return axios.post(`${MYSTRA_API_URL}/Accounts/register`, {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    acceptTerms: acceptTerms,
    acceptMarketingTerms: acceptMarketing,
    title: "string",
    firstName: "string",
    lastName: "string",
  });
};

export const verifyEmail = async (token: string) => {
  return axios.post(`${MYSTRA_API_URL}/Accounts/verify-email`, {
    token: token,
  });
};

export const forgotPassword = async (email: string) => {
  return axios.post(`${MYSTRA_API_URL}/Accounts/forgot-password`, {
    email: email,
  });
};

export const loginEmail = async (email: string, password: string) => {
  return axios.post(`${MYSTRA_API_URL}/Accounts/authenticate`, {
    email: email,
    password: password,
  });
};

export const setNicknameWeb2 = async (
  newNickname: string,
  id: number,
  token: string,
) => {
  return axios.put(
    `${MYSTRA_API_URL}/Accounts/${id}`,
    {
      nickname: newNickname,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const setTitle = async (newTitle: string, id: number, token: any) => {
  return axios.put(
    `${MYSTRA_API_URL}/Accounts/${id}`,
    {
      title: newTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const setBio = async (newTitle: string, id: number, token: any) => {
  return axios.put(
    `${MYSTRA_API_URL}/Accounts/${id}`,
    {
      bio: newTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string,
) => {
  return axios.post(`${MYSTRA_API_URL}/Accounts/reset-password`, {
    token: token,
    password: password,
    confirmPassword: confirmPassword,
  });
};
