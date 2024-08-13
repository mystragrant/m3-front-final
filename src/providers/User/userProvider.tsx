import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { MYSTRA_API_URL } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { MystraAPI } from "../../services/mystra-api";
import { generateExpirationTimestamp } from "../../utils/utils";
import { emptyState, IState, Reducer } from "./reducer";
import { JWT_TYPES } from "./types";

interface IContext extends IState {
  loginUser: (data: any, type: JWT_TYPES) => void;
  addStakeOnMystraNode: (amount: number) => void;
  logout: () => void;
  saveUserData: (data: any) => void;
  changeAvatar: (url: string) => void;
  updateNickname: (newNickname: string) => Promise<any>;
  changePassword: (password: string, confirmPassword: string) => Promise<any>;
  changeAgreements: (marketing: boolean, chatLink: boolean) => Promise<any>;
  assignDiscord: (code: string) => Promise<any>;
  assignTelegram: (code: string) => Promise<any>;
  assignTwitter: (code: string) => Promise<any>;
  assignEVMWallet: (
    message: string,
    signature: string,
    wallet: string,
  ) => Promise<any>;
  assignEmail: (code: string) => Promise<any>;
  assignCasperWallet: (
    message: string,
    signature: string,
    wallet: string,
  ) => Promise<any>;
  token: any;
}

const emptyContext: IContext = {
  ...emptyState,
  loginUser: (data: any, type: JWT_TYPES) => null,
  addStakeOnMystraNode: (amount: number) => null,
  logout: () => null,
  saveUserData: (data: any) => null,
  changeAvatar: (url: string) => null,
  assignDiscord: (code: string) => new Promise(() => {}),
  assignTelegram: (code: string) => new Promise(() => {}),
  assignTwitter: (code: string) => new Promise(() => {}),
  updateNickname: (newNickname: string) => new Promise(() => {}),
  changePassword: (password: string, confirmPassword: string) =>
    new Promise(() => {}),
  changeAgreements: (marketing: boolean, chatLink: boolean) =>
    new Promise(() => {}),
  assignEVMWallet: (message: string, signature: string, wallet: string) =>
    new Promise(() => {}),
  assignCasperWallet: (message: string, signature: string, wallet: string) =>
    new Promise(() => {}),
  assignEmail: (code: string) => new Promise(() => {}),
  token: {},
};

const Context = createContext(emptyContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, emptyContext);

  const [userData, setUserData] = useLocalStorage("user_data_cache", {});

  const [initialCheck, setInitialCheck] = useState<boolean>(false);

  const [token, setToken] = useLocalStorage("mystra_token", {
    type: "",
    value: "",
    expirationDate: new Date(),
  });

  const [last_casper_wallet, set_last_casper_wallet] = useLocalStorage(
    "last_casper_wallet",
    "",
  );

  useEffect(() => {
    set_last_casper_wallet(state.casper_public_key_wallet);
  }, [state.casper_public_key_wallet]);

  const logout = () => {
    dispatch({ isLogged: false });

    localStorage.removeItem("mystra_token");
    localStorage.removeItem("user_data_cache");
    window.location.reload();
  };

  useEffect(() => {
    if (userData) {
      const currentDate = new Date();
      const expirationDate = new Date(token.expirationDate);

      if (
        token.value != "" &&
        expirationDate.getTime() < currentDate.getTime()
      ) {
        logout();
      } else if (JSON.stringify(userData) !== "{}" && initialCheck === false) {
        saveUserData(userData);
        setInitialCheck(true);
      }
    }
  }, [userData]);

  const addStakeOnMystraNode = (amount: number) => {
    dispatch({
      cspr_staked_on_mysta_casper_node:
        state.cspr_staked_on_mysta_casper_node + amount,
    });
  };

  const updateNickname = (newNickname: string) => {
    return new Promise((resolve, reject) => {
      MystraAPI.setNicknameWeb2(newNickname, state.id, token.value)
        .then((res) => {
          dispatch({ nickname: newNickname });

          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsfornickname?user_id=${state.id}`,

              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              },
            )
            .then((res) => {
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  };

  const assignDiscord = (code: string) => {
    return new Promise((resolve, reject) => {
      MystraAPI.verifyDiscord(state.id, token.value, code)
        .then((res) => {
          dispatch({
            discord_nickname: res.data[0].discord_username,
          });
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforconnectdiscord?user_id=${state.id}`,
            )
            .then((res) => {
              console.log(res);
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  };

  const assignTwitter = (code: string) => {
    return new Promise((resolve, reject) => {
      MystraAPI.verifyTwitter(state.id, token.value, code)
        .then((res) => {
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforconnecttweeter?user_id=${state.id}`,
            )
            .then((res) => {
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  };

  const assignTelegram = (code: string) => {
    return new Promise((resolve, reject) => {
      MystraAPI.verifyTelegram(state.id, token.value, code)
        .then((res) => {
          console.log(res);
          dispatch({
            telegram_nickname: res.data[0].telegram_username,
          });
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforconnecttelegram?user_id=${state.id}`,
            )
            .then((res) => {
              console.log(res);
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  };

  const assignEVMWallet = (
    message: string,
    signature: string,
    wallet: string,
  ) => {
    return new Promise((resolve, reject) => {
      MystraAPI.assignEVMWallet(signature, message, token.value, state.id)

        .then((res) => {
          dispatch({ evm_wallet: wallet });
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforevmwallet?user_id=${state.id}`,

              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              },
            )
            .then((res) => {
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  };

  const assignEmail = (code: string) => {
    return new Promise((resolve, reject) => {
      MystraAPI.verifyExistingAccountEmail(state.id, code, token.value)

        .then((res) => {
          dispatch({ email: res.data[0].email });
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforemail?user_id=${state.id}`,

              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              },
            )
            .then((res) => {
              if (res.data.message > 0) {
                dispatch({
                  points_user: {
                    ...state.points_user,
                    actions: state.points_user.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  };

  const assignCasperWallet = (
    message: string,
    signature: string,
    wallet: string,
  ) => {
    return new Promise((resolve, reject) => {
      MystraAPI.assignCasperWallet(signature, message, token.value, state.id)

        .then((res) => {
          dispatch({ casper_public_key_wallet: wallet });
          axios
            .put(
              `${MYSTRA_API_URL}/Points/points/addpointsforcasperwallet?user_id=${state.id}`,

              {
                headers: {
                  Authorization: `Bearer ${token.value}`,
                },
              },
            )
            .then((res) => {
              if (res.data.message > 0) {
                dispatch({
                  points_all_users: {
                    ...state.points_all_users,
                    actions: state.points_all_users.actions + res.data.message,
                  },
                });
              }
            });
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  };

  const changePassword = (password: string, confirmPassword: string) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${MYSTRA_API_URL}/Accounts/${state.id}`,
          {
            password: password,
            confirmPassword: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          },
        )
        .then((res) => {
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    });
  };

  const changeAgreements = (marketing: boolean, chatLink: boolean) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${MYSTRA_API_URL}/Accounts/${state.id}`,
          {
            acceptMarketingTerms: marketing,
          },
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          },
        )
        .then((res) => {
          resolve(true);
          dispatch({ accept_marketing_terms: marketing });
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const loginUser = (data: any, tokenType: JWT_TYPES) => {
    let tokenValue;

    if (tokenType == JWT_TYPES.EVM) {
      tokenValue = data.evm_token;
    } else if (tokenType == JWT_TYPES.WEB2) {
      tokenValue = data.jwtToken;
    } else {
      tokenValue = data.casper_token;
    }

    if (tokenValue !== "") {
      const oldDateObj = new Date();
      const newDateObj = new Date();
      newDateObj.setTime(oldDateObj.getTime() + 2 * 60 * 1000);

      setToken({
        type: tokenType,
        value: tokenValue,
        expirationDate: generateExpirationTimestamp(),
      });

      saveUserData(data);
    }
  };

  const saveUserData = (data: any) => {
    console.log(data);
    console.log(state);

    console.log(data.points_platform_actions_user);
    console.log(state.points_user.actions);
    try {
      dispatch({
        isLogged: true,
        email: data.email ?? state.email,
        avatar: data.avatar ?? state.avatar,
        nickname: data.nickname ?? state.nickname,
        id: data.id ?? -1,
        evm_jwt: data.evm_token ?? state.evm_jwt,
        evm_wallet: data.evm_wallet ?? state.evm_wallet,
        telegram_nickname:
          data.telegram_user_name ??
          data.telegram_nickname ??
          state.telegram_nickname,
        twitter_nickname:
          data.twitter_user_name ??
          data.twitter_nickname ??
          state.twitter_nickname,
        discord_nickname:
          data.discord_user_name ??
          data.discord_nickname ??
          state.discord_nickname,
        web2_token: data.jwtToken ?? state.web2_token,
        accept_marketing_terms:
          data.accept_marketing_terms ?? state.accept_marketing_terms,
        casper_public_key_wallet:
          data.casper_public_key_wallet ?? state.casper_public_key_wallet,
        cspr_staked_on_mysta_casper_node:
          data.cspr_staked_on_mysta_casper_node ??
          state.cspr_staked_on_mysta_casper_node,
        tickets_amount:
          data.tickets_amount ??
          data.callup_tickets_on_casper +
            data.callup_tickets_on_ethereum +
            data.callup_tickets_on_binance +
            data.callup_tickets_on_polygon,
        verification: {
          email: data.email != "",
          nickname: data.nickname != "",
          kyckyb: false,
          discord: false,
          telegram: false,
          ticket: false,
          evm: data.evm_wallet != "",
          casper: data.casper_public_key_wallet != "",
          stake: false,
        },
        telegram_connected:
          data.telegram_user_id != 0 ?? data.telegram_connected,
        discord_connected: data.discord_user_id != 0 ?? data.discord_connected,
        points_user: {
          telegram:
            data.points_telegram_user ??
            data.points_user.telegram ??
            state.points_user.telegram,
          twitter:
            data.points_tweeter_user ??
            data.points_user.twitter ??
            state.points_user.twitter,
          discord:
            data.points_discord_user ??
            data.points_user.discord ??
            state.points_user.discord,
          staking:
            data.points_staking_user ??
            data.points_user.staking ??
            state.points_user.staking,
          dao_governance:
            data.points_dao_governance_user ??
            data.points_user.dao_governance ??
            state.points_user.dao_governance,
          dao_investments:
            data.points_dao_investments_user ??
            data.points_user.dao_investments ??
            state.points_user.dao_investments,
          tickets: data.tickets_amount
            ? data.tickets_amount * 100
            : state.points_user.tickets ?? data.points_user.tickets,
          actions:
            data.points_platform_actions_user ??
            data.points_user.actions ??
            state.points_user.actions,
        },
        points_all_users: {
          telegram:
            data.points_telegram_total ??
            data.points_all_users.telegram ??
            state.points_all_users.telegram,
          discord:
            data.points_discord_total ??
            state.points_all_users.discord ??
            state.points_all_users.discord,
          twitter:
            data.points_tweeter_total ??
            state.points_all_users.twitter ??
            state.points_all_users.twitter,
          dao_investments:
            data.points_dao_investments_total ??
            data.points_all_users.dao_investments ??
            state.points_all_users.dao_investments,
          dao_governance:
            data.points_dao_governance_total ??
            data.points_all_users.dao_governance ??
            state.points_all_users.dao_governance,

          staking: data.points_staking_total ?? state.points_all_users.staking,
          actions:
            data.points_platform_actions_total ??
            state.points_all_users.actions ??
            state.points_all_users.actions,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const sum =
      state.points_user.staking +
      state.points_user.actions +
      state.points_user.discord +
      state.points_user.telegram +
      state.points_user.twitter +
      state.points_user.dao_governance +
      state.points_user.dao_governance +
      state.points_user.tickets;

    dispatch({
      points: sum,
    });
  }, [state.points_user]);

  useEffect(() => {
    if (state.isLogged) setUserData(state);
    console.log(state);
  }, [state]);

  const changeAvatar = (url: any) => {
    dispatch({
      avatar: url,
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        addStakeOnMystraNode,
        saveUserData,
        assignCasperWallet,
        changePassword,
        changeAgreements,
        logout,
        assignTelegram,
        assignTwitter,
        assignDiscord,
        changeAvatar,
        token,
        updateNickname,
        assignEmail,
        assignEVMWallet,
        loginUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserProvider = () => useContext(Context);
