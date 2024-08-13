import { createContext, useContext, useEffect, useReducer } from "react";
import { IParent } from "../../shared/types";
import { emptyState, IState, Reducer } from "./reducer";

interface IContext extends IState {
  requestConnection: () => Promise<void>;
  sign: (
    deployJson: string,
    signingPublicKeyHex: string,
  ) => Promise<SignatureResponse>;
  signMessage: (
    message: string,
    signingPublicKeyHex: string,
  ) => Promise<SignatureResponse>;
  disconnectFromSite: () => void;
}

const emptyContext: IContext = {
  ...emptyState,
  requestConnection: () => new Promise(() => {}),
  sign: (deployJson: string, signingPublicKeyHex: string) =>
    new Promise(() => null),
  signMessage: (message: string, signingPublicKeyHex: string) =>
    new Promise(() => null),
  disconnectFromSite: () => null,
};

const Context = createContext(emptyContext);

export const CasperWalletProvider = ({ children }: IParent) => {
  const [state, dispatch] = useReducer(Reducer, emptyContext);

  const handleConnectedEvent = (e: any) => {
    const parsedDetail = JSON.parse(e.detail);
    console.log(parsedDetail);
    dispatch({
      activeKey: parsedDetail.activeKey,
      isLocked: parsedDetail.isLocked,
      isConnected: parsedDetail.isConnected,
    });
  };

  const handleDisconnectedEvent = (e: any) => {
    dispatch({
      activeKey: "",
      isLocked: false,
      isConnected: false,
    });
  };

  const handleLockedEvent = (e: any) => {
    dispatch({
      isLocked: true,
    });
  };

  const handleUnlockedEvent = (e: any) => {
    const parsedDetail = JSON.parse(e.detail);
    dispatch({
      activeKey: parsedDetail.activeKey,
      isLocked: parsedDetail.isLocked,
      isConnected: parsedDetail.isConnected,
    });
  };

  const handleActiveKeyChangedEvent = (e: any) => {
    const parsedDetail = JSON.parse(e.detail);
    dispatch({
      activeKey: parsedDetail.activeKey,
      isLocked: parsedDetail.isLocked,
      isConnected: parsedDetail.isConnected,
    });
  };

  useEffect(() => {
    console.log("cw", state);
  }, [state]);

  useEffect(() => {
    window.addEventListener("casper-wallet:unlocked", handleUnlockedEvent);
    window.addEventListener("casper-wallet:locked", handleLockedEvent);
    window.addEventListener("casper-wallet:connected", handleConnectedEvent);
    window.addEventListener(
      "casper-wallet:activeKeyChanged",
      handleActiveKeyChangedEvent,
    );
    window.addEventListener(
      "casper-wallet:disconnected",
      handleDisconnectedEvent,
    );
    return () => {
      window.removeEventListener(
        "casper-wallet:connected",
        handleConnectedEvent,
      );
      window.removeEventListener(
        "casper-wallet:disconnected",
        handleDisconnectedEvent,
      );
      window.removeEventListener(
        "casper-wallet:activeKeyChanged",
        handleActiveKeyChangedEvent,
      );

      window.removeEventListener("casper-wallet:unlocked", handleUnlockedEvent);
      window.removeEventListener("casper-wallet:locked", handleLockedEvent);
    };
  }, []);

  const sign = (deployJson: any, signingPublicKeyHex: string) => {
    return (window as any)
      .CasperWalletProvider()
      .sign(JSON.stringify(deployJson), signingPublicKeyHex);
  };

  const signMessage = (message: string, signingPublicKeyHex: string) => {
    return (window as any)
      .CasperWalletProvider()
      .signMessage(message, signingPublicKeyHex);
  };

  const disconnectFromSite = () => {
    return (window as any).CasperWalletProvider().disconnectFromSite();
  };

  const requestConnection = (): Promise<any> => {
    return (window as any).CasperWalletProvider().requestConnection();
  };

  return (
    <Context.Provider
      value={{
        ...state,
        sign,
        signMessage,
        requestConnection,
        disconnectFromSite,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCasperWallet = () => useContext(Context);
