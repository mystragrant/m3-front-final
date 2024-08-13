import axios from "axios";
import { CASPERARMY_API_BASE_URL } from "../../constants";

const getLoginSeed = async (publicKey: string) => {
  return axios.get(`${CASPERARMY_API_BASE_URL}/getseed?publicKey=${publicKey}`);
};

const login = async (publicKey: string, token: string) => {
  return axios.get(
    `${CASPERARMY_API_BASE_URL}/login?publicKey=${publicKey}&signature=${token}`,
  );
};

const updateUsername = async (
  publicKey: string,
  token: string,
  newUsername: string,
) => {
  return axios.post(
    `${CASPERARMY_API_BASE_URL}/updateusername?publicKey=${publicKey}&signature=${token}&newUserName=${newUsername}`,
  );
};

export const CasperArmyAPI = {
  login,
  getLoginSeed,
  updateUsername,
};
