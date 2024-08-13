import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import * as signalR from "@microsoft/signalr";

import { CLPublicKey, formatMessageWithHeaders, Signer } from "casper-js-sdk";
import { verifyMessageSignature } from "casper-js-sdk";
import { Buffer } from "buffer";
import { default as CryptoJS } from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";

import { stringToHex } from "web3-utils";
import { CHAT_SERVER_BASEURL } from "../../constants";
import { trimHash } from "../../utils/utils";
import { useUserProvider } from "../User/userProvider";
import { useMultiWalletProvider } from "../MultiWalletProvider/multiWalletProvider";

interface IChatProvider {
  serverKey: string | undefined;
  groups: Array<any>;
  users: Array<any>;
  messages: Array<Array<any>>;
  groupUserIds: Array<Array<number>>;
  connection: any;
  state: string;
  userId: number;
  groupId: number;
  lastMsgTime: number;
  connect: () => void;
  sendMessage: (msg: string, srcData: Array<string>) => Promise<boolean>;
  deleteMessage: (mid: number) => Promise<any>;
  setGroupId: (id: number) => void;
  createGroup: (
    name: string,
    isPublic: boolean,
    description: string,
    imageUrl: string,
  ) => Promise<any>;
  renameGroup: (gid: number, rename: string) => Promise<any>;
  inviteUsers: (userIds: Array<number>) => Promise<any>;
  leaveGroup: (gid: number) => Promise<any>;
  changeGroupAvatarView: (groupId: number, avatar: string) => void;
  changeGroupNameView: (groupId: number, name: string) => void;
  infoOpen: boolean;
  joinGroup: (sharedKey: string, joinGroupId: string) => void;
  toggleInfo: () => void;
  changeGroupDescriptionView: (groupId: number, description: string) => void;
}

export const defaultMarket: IChatProvider = {
  serverKey: undefined,
  groups: [],
  users: [],
  messages: [],
  infoOpen: false,
  toggleInfo: () => {},
  groupUserIds: [],
  connection: undefined,
  state: "",
  userId: 0,
  groupId: 0,
  lastMsgTime: 0,
  connect: () => {},
  sendMessage: () => new Promise(() => null),
  deleteMessage: () => new Promise((r) => r(null)),
  setGroupId: () => {},
  createGroup: () => new Promise((r) => r(null)),
  renameGroup: () => new Promise((r) => r(null)),
  inviteUsers: () => new Promise((r) => r(null)),
  leaveGroup: () => new Promise((r) => r(null)),
  changeGroupAvatarView: (groupId: number, avatar: string) => null,
  changeGroupNameView: (groupId: number, name: string) => null,
  joinGroup: (sharedKey: string, joinGroupId: string) => null,
  changeGroupDescriptionView: (groupId: number, description: string) => null,
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { signMessageCasper, requestConnection } = useMultiWalletProvider();

  const { token, casper_public_key_wallet } = useUserProvider();

  const [serverKey, setServerKey] = useState<string>();
  const [groups, setGroups] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);

  const [messages, setMessages] = useState<Array<Array<any>>>([]);
  const [groupUserIds, setGroupUserIds] = useState<Array<Array<number>>>([]);
  const [connection, setConnection] = useState<any>();
  const [state, setState] = useState<string>("disconnected");
  const [userId, setUserId] = useState<number>(0);
  const [groupId, setGroupId] = useState<number>(0);
  const [lastTimestamp, forceRemount] = useState<number>(0);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  useEffectOnce(() => {
    window.Buffer = Buffer;
    window.CryptoJS = CryptoJS;
  });

  useEffect(() => {
    connect();
  }, [casper_public_key_wallet]);

  const toggleInfo = () => {
    setInfoOpen((prev: boolean) => !prev);
  };

  const initGroups = (data: Array<any>) => {
    const groupsData = [];
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) continue;
      groupsData[data[i].id] = data[i];
    }
    console.log(groupsData);
    setGroups(groupsData);
  };

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  const initUsers = (data: Array<any>) => {
    const usersData = [];
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) continue;
      usersData[data[i].id] = data[i];
    }
    setUsers(usersData);
  };

  const changeGroupAvatarView = (groupId: number, avatar: string) => {
    const newGroups = groups;

    for (const i in newGroups) {
      if (newGroups[i].id == groupId) {
        newGroups[i].photo = avatar;
      }
    }

    setGroups(newGroups);
    forceRemount(Date.now());
  };

  const changeGroupNameView = (groupId: number, name: string) => {
    const newGroups = groups;

    for (const i in newGroups) {
      if (newGroups[i].id == groupId) {
        newGroups[i].name = name;
      }
    }

    setGroups(newGroups);
    forceRemount(Date.now());
  };

  const changeGroupDescriptionView = (groupId: number, description: string) => {
    const newGroups = groups;

    for (const i in newGroups) {
      if (newGroups[i].id == groupId) {
        newGroups[i].description = description;
      }
    }

    setGroups(newGroups);
    forceRemount(Date.now());
  };

  const connect = async () => {
    let uid = 0;

    try {
      if (!casper_public_key_wallet) {
        return;
      }
      const endPoints: Array<string> = [
        "/api/Chat/GetUserId",
        "/api/Chat/GetUserGroups",
        "/api/Chat/GetUsers",
      ];
      let groupData: Array<any> = [];
      for (let i = 0; i < endPoints.length; i++) {
        let params: any;
        let headers: any;
        switch (i) {
          case 0:
            params = "?publicKey=" + casper_public_key_wallet;
            break;
          case 1:
            params = "?userId=" + uid;
            break;
          case 2:
            params = "";
            break;
          default:
            break;
        }

        const response = await axios.get(
          CHAT_SERVER_BASEURL + endPoints[i] + params,
        );
        if (response.status !== 200) {
          console.error(response.statusText);
          return;
        }
        switch (i) {
          case 0:
            setUserId(response.data.id);
            uid = response.data.id;
            break;
          case 1:
            groupData = response.data;
            groupData.sort((a, b) => a.id - b.id);
            initGroups(groupData);
            // setGroupId(groupData[0].id ?? 0);
            setGroupId(groupData[0]?.id ?? 0);
            break;
          case 2:
            initUsers(response.data);
            break;
          default:
            break;
        }
      }

      for (let i = 0; i < groupData.length; i++) {
        const response = await axios.get(
          CHAT_SERVER_BASEURL + "/api/Chat/GetGroupMessages",
          {
            params: {
              groupId: groupData[i].id,
            },
          },
        );
        if (response.status !== 200) {
          console.error(response.statusText);
          return;
        }
        const e_msgs = response.data;
        const d_msgs = e_msgs.map((msg: any) => {
          const plainText = CryptoJS.AES.decrypt(
            msg.cipher,
            CryptoJS.enc.Base64.parse(groupData[i].sharedKey),
            { iv: CryptoJS.enc.Base64.parse(msg.iv) },
          ).toString(CryptoJS.enc.Utf8);
          return {
            id: msg.id,
            userId: msg.userId,
            msg: plainText,
            deleted: msg.deleted,
            time: msg.messageCreateDate,
          };
        });
        setMessages((prevMsgs) => {
          const newMsgs = prevMsgs;
          newMsgs[groupData[i].id] = d_msgs;
          return newMsgs;
        });
      }
      for (let i = 0; i < groupData.length; i++) {
        if (groupData[i].isPublic) continue;
        const response = await axios.get(
          CHAT_SERVER_BASEURL + "/api/Chat/GetGroupUserIds",
          {
            params: {
              groupId: groupData[i].id,
            },
          },
        );
        if (response.status !== 200) {
          console.error(response.statusText);
          return;
        }
        const ids = response.data;
        setGroupUserIds((prevIds) => {
          const newIds = prevIds;
          newIds[groupData[i].id] = ids;
          return newIds;
        });
      }
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://apichat.mystra.io:5011/chat", {
          // skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .build();
      setConnection(conn);
      conn.on("HandShake", onHandShake);
      await conn.start().catch((err) => {
        console.error(err);
        setState("connection failed");
        return;
      });
      setState("connected to websocket");

      await conn.invoke("HandShake", uid);
    } catch (err) {
      console.error(err);
    }
  };

  const onHandShake = (serverPK: string) => {
    setServerKey(serverPK);
    connection?.on(
      "ReceiveMessage",
      (gid: number, uid: number, mid: number, iv: string, cipher: string) => {
        onRecv(gid, uid, mid, iv, cipher);
      },
    );
    connection?.on("DeleteMessage", (gid: number, uid: number, mid: number) => {
      onDelMsg(gid, uid, mid);
    });
    connection?.on("NewEvent", (eventType: string, eventStr: string) =>
      onEvent(eventType, eventStr),
    );
  };

  const onSend = async (plainText: string, srcData: Array<string>) => {
    if (casper_public_key_wallet && serverKey) {
      try {
        const payload = JSON.stringify({
          gid: groupId,
          uid: userId,
          pTx: plainText,
        });

        alert(groupId + "" + userId + groups[groupId]?.sharedKey);
        const iv = CryptoJS.lib.WordArray.random(16);
        const cipherText = CryptoJS.AES.encrypt(
          payload,
          CryptoJS.enc.Base64.parse(groups[groupId]?.sharedKey),
          { iv },
        ).toString();

        const hash = CryptoJS.SHA256(cipherText).toString().toUpperCase();
        let signature: any = await signMessageCasper(
          hash,
          casper_public_key_wallet,
        );

        if (!signature.signature) {
          signature = {
            cancelled: false,
            signature: Uint8Array.from(Buffer.from(signature, "hex")),
            signatureHex: signature,
          };
        }
        console.log(signature);

        const capsule: string = JSON.stringify({
          enc: cipherText,
          sgn: signature,
        });

        axios
          .post(CHAT_SERVER_BASEURL + ":5011" + `/api/Chat/NewMessage`, {
            groupId,
            userId,
            iv: iv.toString(CryptoJS.enc.Base64),
            capsule,
            srcData,
          })
          .then((res) => {
            console.log(res.status);
            switch (res.status) {
              case 204:
                console.error("Group name coincides");
            }
          })
          .catch(() => {
            console.error("Error sending new message.");
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const joinGroup = async (sharedKey: string, joinGroupId: string) => {
    if (casper_public_key_wallet && serverKey) {
      try {
        const payload = JSON.stringify({
          gid: joinGroupId,
          uid: userId,
          pTx: "Hello",
        });

        alert(joinGroupId + "" + userId + groups[groupId]?.sharedKey);
        const iv = CryptoJS.lib.WordArray.random(16);
        const cipherText = CryptoJS.AES.encrypt(
          payload,
          CryptoJS.enc.Base64.parse(sharedKey),
          { iv },
        ).toString();

        const hash = CryptoJS.SHA256(cipherText).toString().toUpperCase();
        let signature: any = await signMessageCasper(
          hash,
          casper_public_key_wallet,
        );

        if (!signature.signature) {
          signature = {
            cancelled: false,
            signature: Uint8Array.from(Buffer.from(signature, "hex")),
            signatureHex: signature,
          };
        }
        console.log(signature);

        const capsule: string = JSON.stringify({
          enc: cipherText,
          sgn: signature,
        });

        const srcData = Array.from([]);

        axios
          .post(CHAT_SERVER_BASEURL + ":5011" + `/api/Chat/NewMessage`, {
            joinGroupId,
            userId,
            iv: iv.toString(CryptoJS.enc.Base64),
            capsule,
            srcData,
          })
          .then((res) => {
            console.log(res.status);
            switch (res.status) {
              case 204:
                console.error("Group name coincides");
            }
          })
          .catch(() => {
            console.error("Error sending new message.");
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onRecv = useCallback(
    async (
      gid: number,
      uid: number,
      mid: number,
      iv: string,
      cipher: string,
    ) => {
      try {
        const plain = CryptoJS.AES.decrypt(
          cipher,
          CryptoJS.enc.Base64.parse(groups[gid]?.sharedKey),
          {
            iv: CryptoJS.enc.Base64.parse(iv),
          },
        ).toString(CryptoJS.enc.Utf8);

        setMessages((prevMsgs) => {
          const newMsgs = prevMsgs;
          const groupMsgs = prevMsgs[gid] ?? [];
          const date = new Date();
          date.setHours(date.getHours() - 2);

          groupMsgs.push({
            id: mid,
            userId: uid,
            msg: plain,
            deleted: false,
            time: date,
          });

          newMsgs[gid] = groupMsgs;
          return newMsgs;
        });

        forceRemount(Date.now());

        return () => {};
      } catch (err) {
        console.error(err);
      }
    },
    [groups, lastTimestamp],
  );

  const onDelMsg = async (gid: number, uid: number, mid: number) => {
    try {
      setMessages((prevMsgs) => {
        const newMsgs = prevMsgs;
        const groupMsgs = prevMsgs[gid] ?? [];
        groupMsgs.find((v) => v.id === mid).deleted = true;
        groupMsgs.find((v) => v.id === mid).msg = "Deleted message";
        return newMsgs;
      });
      forceRemount(Date.now());
      return () => {};
    } catch (err) {
      console.error(err);
    }
  };

  const onEvent = async (eventType: string, eventStr: string) => {
    try {
      const eventData = JSON.parse(eventStr);

      switch (eventType) {
        case "CREATE_GROUP":
          {
            const newGroup = eventData;
            initGroups([...groups, newGroup]);
            if (!newGroup.isPublic && newGroup.adminId === userId) {
              setGroupUserIds((prevIds) => {
                const newIds = prevIds;
                newIds[newGroup.id] = [...(newIds[newGroup.id] ?? []), userId];
                return newIds;
              });
            }
            forceRemount(Date.now());
          }
          break;
        case "RENAME_GROUP":
          {
            const gid = eventData.groupId;
            const name = eventData.newName;
            setGroups((prevGroups) => {
              const newGroups = prevGroups;

              newGroups[gid].name = name;
              return newGroups;
            });
          }
          break;
        case "LEAVE_GROUP":
          {
            const gid = eventData.groupId;
            const uid = eventData.userId;
            if (uid === userId) break;
            setGroupUserIds((prevIds) => {
              const newIds = prevIds;
              newIds[gid] = newIds[gid].splice(
                newIds[gid].findIndex((id) => id === uid),
                1,
              );

              return newIds;
            });
          }
          break;
        // TODO:
        case "JOIN_GROUP":
          {
            const gid = eventData.groupId;
            const userIds = eventData.userIds;
            setGroupUserIds((prevIds) => {
              const newIds = prevIds;
              newIds[gid] = [...(newIds[gid] ?? []), ...userIds];
              return newIds;
            });
          }
          break;
        case "USER_ONLINE":
          break;
        case "USER_OFFLINE":
          break;
        default:
          console.warn(`Unkonwn event type: ${eventType}`);
          console.warn(`Event data: ${eventStr}`);
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (msg: string, srcData: Array<string>) => {
    await onSend(msg, srcData);
    return true;
  };

  const deleteMessage = async (mid: number) => {
    const response = await axios.post(
      CHAT_SERVER_BASEURL +
        `/api/Chat/DeleteMessage?userId=${userId}&groupId=${groupId}&msgId=${mid}`,
    );
    if (response.status !== 200) {
      if (response.status === 204) {
        return { success: false, error: "Something went wrong." };
      }
      return { success: false, error: "Connection failed." };
    }
    return response.data;
  };

  const createGroup = async (
    name: string,
    isPublic: boolean,
    description: string,
    imageUrl: string,
  ) => {
    const response = await axios.post(
      CHAT_SERVER_BASEURL +
        ":5011" +
        "/api/Chat/GroupCreate?userId=" +
        userId +
        "&connId=" +
        connection.connectionId,
      {
        name: name,
        isPublic: isPublic,
        photo: imageUrl,
        description: description,
      },
    );
    if (response.status !== 200) {
      if (response.status === 204) {
        return "Group name coincides.";
      }
      return "Connection failed.";
    }
    return response.data;
  };

  const renameGroup = async (gid: number, rename: string) => {
    const response = await axios.post(
      CHAT_SERVER_BASEURL +
        `/api/Chat/GroupUpdate?userId=${userId}&groupId=${gid}&newName=${rename}`,
    );
    if (response.status !== 200) {
      return { success: false, error: "Connection failed." };
    }
    return response.data;
  };

  const inviteUsers = async (userIds: Array<number>) => {
    if (userIds.length === 0) return;
    const response = await axios.post(
      CHAT_SERVER_BASEURL +
        `/api/Chat/InviteUsers?groupId=${groupId}&adminId=${userId}`,
      userIds,
    );
    if (response.status !== 200) {
      return { success: false, error: "Connection failed." };
    }
    return response.data;
  };

  const leaveGroup = async (gid: number) => {
    const response = await axios.post(
      CHAT_SERVER_BASEURL +
        `/api/Chat/LeaveGroup?groupId=${gid}&userId=${userId}`,
    );
    if (response.status !== 200) {
      if (response.status === 204) {
        return "Invite failed";
      }
      return "Connection failed.";
    }
    if (response.data.success) {
      setGroups((prevGroups) => {
        const newGroups = prevGroups;
        newGroups.splice(
          newGroups.findIndex((g) => {
            return g?.id === gid;
          }),
          1,
        );
        return newGroups;
      });
      setMessages((prevMsgs) => {
        const newMsgs = prevMsgs;
        newMsgs[gid] = [];
        return newMsgs;
      });
      setGroupUserIds((prevIds) => {
        const newIds = prevIds;
        newIds[gid] = [];
        return newIds;
      });
    }
    return response.data;
  };

  const onlyUnique = (value: any, index: number, self: Array<any>) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    connection?.on(
      "ReceiveMessage",
      (gid: number, uid: number, mid: number, iv: string, cipher: string) => {
        onRecv(gid, uid, mid, iv, cipher);
      },
    );
    connection?.on("DeleteMessage", (gid: number, uid: number, mid: number) => {
      onDelMsg(gid, uid, mid);
    });
    connection?.on("NewEvent", (eventType: string, eventStr: string) =>
      onEvent(eventType, eventStr),
    );

    return () => {
      connection?.off("ReceiveMessage");
      connection?.off("DeleteMessage");
      connection?.off("NewEvent");
    };
  }, [serverKey, onRecv, onEvent, onDelMsg]);

  return (
    <ChatContext.Provider
      value={{
        serverKey,
        groups,
        users,
        messages,
        groupUserIds,
        changeGroupDescriptionView,
        changeGroupNameView,
        changeGroupAvatarView,
        connection,
        state,
        userId,
        groupId,
        lastMsgTime: lastTimestamp,
        connect,
        sendMessage,
        deleteMessage,
        toggleInfo,
        infoOpen,
        setGroupId,
        createGroup,
        renameGroup,
        joinGroup,
        inviteUsers,
        leaveGroup,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatContext = React.createContext<IChatProvider>(defaultMarket);

export const useChatProvider = () => {
  return React.useContext(ChatContext);
};

const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [, refresh] = useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    refresh(1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};
