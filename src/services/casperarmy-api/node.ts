import axios from "axios";
import { CASPERARMY_API_BASE_URL } from "../../constants";

const getNodeInfo = async () => {
  return axios.get(`${CASPERARMY_API_BASE_URL}/nodeInfo`);
};

export const CasperArmyNodeAPI = {
  getNodeInfo,
};
