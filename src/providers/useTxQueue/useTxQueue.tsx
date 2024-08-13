import axios from "axios";
import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserProvider } from "../User/userProvider";

interface TxItem {
  chain: string;
  hash: string;
  value: string;
  contract: string;
  name: string;
  type: TxType;
  finished: boolean;
  userId: number;
  status: boolean;
}

const emptyContext = {
  deleteFromQueue: (hash: string, status: boolean) => {},
  pushToDeleteQueue: (hash: string) => {},
  addToQueue: (
    hash: string,
    name: string,
    value: string,
    chain: string,
    type: TxType,
    contract = "",
  ) => {},
  txQueue: [] as TxItem[],
};

const Context = createContext(emptyContext);

export enum TxType {
  TRANSFER_NFT,
  TRANSFER_ERC,
  TRANSFER,
  STAKE,
  UNSTAKE,
  APPROVE,
}

export const TxQueueProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [txQueue, setTxQueue] = useLocalStorage<TxItem[]>("tx_queue", []);

  const { id } = useUserProvider();

  const [deleteQueue, setDeleteQueue] = useState<string[]>([]);

  const pushToDeleteQueue = (hash: string) => {
    setDeleteQueue((prev) => prev.concat([hash]));
  };

  const deleteFromQueue = useCallback(
    (hash: string, status: boolean = true) => {
      setTxQueue((prev) =>
        prev.map((item) => {
          return item.hash != hash
            ? item
            : { ...item, finished: true, status: status };
        }),
      );

      if (status == false) {
        toast("Tx Error", {
          style: {
            color: "white",
          },
        });
      } else {
        toast("Tx Finished", {
          style: {
            color: "white",
          },
        });
      }
    },
    [txQueue],
  );

  useEffect(() => {
    (async () => {
      if ((window as any).ethereum) {
        const provider = await new ethers.providers.Web3Provider(
          (window as any).ethereum,
          "any",
        );

        for (const tx of txQueue) {
          if (tx.chain != "casper" && tx.chain != "casper-test") {
            const txReceipt = await provider.getTransaction(tx.hash);
            console.log(txReceipt);
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      for (const tx of txQueue) {
        if (
          tx.chain == "casper" ||
          (tx.chain == "casper-test" && tx.finished == false)
        ) {
          axios
            .get(
              `https://api.testnet.casper.mystra.io/deploys/deploys?deploy_hash=${tx.hash}`,
              { headers: { LicenseKey: "1234567890" } },
            )
            .then((res: any) => {
              if (res.data.data.length > 0) {
                if (res.data.data[0].result == true) {
                  deleteFromQueue(tx.hash, true);
                } else {
                  deleteFromQueue(tx.hash, false);
                }
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [txQueue]);

  useEffect(() => {
    const interval = setInterval(() => {
      for (const tx of txQueue) {
        if (deleteQueue.includes(tx.hash)) {
          deleteFromQueue(tx.hash, true);
        }
      }

      setDeleteQueue([]);
    }, 2000);
    return () => clearInterval(interval);
  }, [txQueue, deleteQueue]);

  const addToQueue = (
    hash: string,
    name: string,
    value: string,
    chain: string,
    type: TxType,
    contract = "",
  ) => {
    setTxQueue(
      txQueue.concat([
        {
          hash: hash,
          name: name,
          value: value,
          chain: chain,
          type: type,
          contract: contract,
          userId: id,
          finished: false,
          status: false,
        },
      ]),
    );
  };

  return (
    <Context.Provider
      value={{
        deleteFromQueue,
        addToQueue,
        txQueue,
        pushToDeleteQueue,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTxQueue = () => useContext(Context);
