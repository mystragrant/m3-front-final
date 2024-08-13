import { MystraAPI } from ".";
import { JWT_TYPES } from "../../providers/User/types";

// We use these because we have different api endpoints for each type of authentication

export const WrappedSetNickname = () => {};

export const WrappedGetUser = (tokenValue: string, tokenType: JWT_TYPES) => {
  if (tokenType == JWT_TYPES.EVM) return MystraAPI.getEVMUser(tokenValue);
  else return MystraAPI.getEVMUser(tokenValue);
};
