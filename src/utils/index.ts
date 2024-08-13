/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BigNumber from "bignumber.js";
import { Contract } from "web3-eth-contract";
import axios from "axios";
import networks from "../config/networks.json";
import Token from "../type/Token";
import Network from "../type/Network";
import Transaction from "../type/Transaction";
import { NATIVE_TOKEN_ADDRESS } from "../constants";

export const getContract = (
  address: string,
  abi: AbiItem,
  web3: Web3,
): Contract | null => {
  try {
    // @ts-ignore
    return new web3.eth.Contract(abi, address);
  } catch (error) {
    console.error("Failed to get contract", error);
    return null;
  }
};

export const getTokensFromConfig = async (
  chainId: number | undefined,
): Promise<Token[]> => {
  const tokens: Token[] = [];

  try {
    if (chainId) {
      const network = networks.find((n) => n.chainId === chainId) as Network;
      let tokenList: Token[] = []; // = (await import(`../config/${chainId}.json`)).default as Token[]

      if (network.notEVM) {
        const response = await axios.get(
          "https://raw.githubusercontent.com/dotoracle/casper-contract-hash/master/config.json",
        );

        if (response.status === 200) {
          if (network.isTestnet) {
            tokenList = response.data.testnet.tokens;
          } else {
            tokenList = response.data.mainnet.tokens;
          }
        }
      } else {
        const response2 = await axios.get(
          `https://raw.githubusercontent.com/dotoracle/bridge-addresses/main/tokens/${chainId}.json`,
        );

        if (response2.status === 200) {
          tokenList = response2.data;
          //TODO:
          if (chainId == 5) {
            tokenList[0].name = tokenList[0].symbol = "goerliETH";
            tokenList[1].name = tokenList[1].symbol = "TestToken";
            tokenList[1].address = "0x929E9E7af59b6061f7CE94d7313393dBFee85BCe";
          }
        }
      }

      tokenList.forEach((t) => {
        if (tokens.filter((_t) => _t.address == t.address).length == 0) {
          tokens.push({
            name: t.name,
            address: network.notEVM ? t.contractHash ?? "" : t.address,
            originContractAddress: t.originContractAddress ?? "",
            originChainId: t.originChainId ?? chainId,
            contractHash: t.contractHash ?? "",
            symbol: t.symbol,
            decimals: t.decimals,
            logoURI: t.logoURI,
            minBridge: t.minBridge ?? "0",
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  return tokens;
};

export const formatNumber = (number: number | string | undefined): string => {
  if (!number) {
    return "0";
  }

  const seps = number.toString().split(".");
  seps[0] = seps[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Number(number) % 1 === 0 ? seps[0] : seps.join(".");
};

export const fromWei = (
  number: string | number,
  decimals?: number,
): BigNumber => {
  const _decimals = decimals ? decimals : 18;
  // const result = toBN(number).divRound(toBN(1 * 10 ** _decimals))
  const result = new BigNumber(number).div(new BigNumber(1 * 10 ** _decimals));
  return result;
};

export const toWei = (
  number: string | number,
  decimals?: number,
): BigNumber => {
  const _decimals = decimals ? decimals : 18;
  const result = new BigNumber(number).multipliedBy(
    new BigNumber(1 * 10 ** _decimals),
  );
  return result;
};

export const parseResponseToTransactions = async (
  response: any,
  chainId?: number,
) => {
  const transactions = [] as Transaction[];

  if (!response) {
    return [];
  }

  const currentNetwork = networks.find((n) => n.chainId === chainId) as Network;
  let tokenList: Token[] = []; // = (await import(`../config/${chainId}.json`)).default as Token[]

  if (currentNetwork.notEVM) {
    const tokensResponse = await axios.get(
      "https://raw.githubusercontent.com/dotoracle/casper-contract-hash/master/config.json",
    );

    if (response.status === 200) {
      if (currentNetwork.isTestnet) {
        tokenList = tokensResponse.data.testnet.tokens;
      } else {
        tokenList = tokensResponse.data.mainnet.tokens;
      }
    }
  } else {
    const response2 = await axios.get(
      `https://raw.githubusercontent.com/dotoracle/bridge-addresses/main/tokens/${chainId}.json`,
    );

    if (response2.status === 200) {
      tokenList = response2.data;
      //TODO:
      if (chainId == 5) {
        tokenList[0].name = tokenList[0].symbol = "goerliETH";
        tokenList[1].name = tokenList[1].symbol = "TestToken";
        tokenList[1].address = "0x929E9E7af59b6061f7CE94d7313393dBFee85BCe";
      }
    }
  }

  if (response.transactions && response.total) {
    response.transactions.forEach(async (t: Transaction) => {
      const fromNetwork = networks.find(
        (n) => n.chainId === t.fromChainId,
      ) as Network;
      const toNetwork = networks.find(
        (n) => n.chainId === t.toChainId,
      ) as Network;
      const originNetwork = networks.find(
        (n) => n.chainId === t.originChainId,
      ) as Network;
      const amountFormated = `${formatNumber(
        fromWei(t.amount, t.originDecimals).toNumber(),
      )} ${
        t.originToken == NATIVE_TOKEN_ADDRESS
          ? originNetwork.nativeCurrency.symbol
          : t.originSymbol
      }`;

      let _requestHash = t.requestHash;

      if (
        fromNetwork &&
        fromNetwork.notEVM &&
        _requestHash &&
        _requestHash.substring(0, 2) === "0x"
      ) {
        _requestHash = _requestHash.substring(2, _requestHash.length);
      }
      const requestEllipsis = `${_requestHash.substring(
        0,
        6,
      )}...${_requestHash.substring(_requestHash.length - 4)}`;
      const requestHashUrl = fromNetwork
        ? `${fromNetwork.explorer}${fromNetwork.txUrl}${_requestHash}`
        : "";

      let _claimHash = t.claimHash;

      if (
        toNetwork &&
        toNetwork.notEVM &&
        _claimHash &&
        _claimHash.substring(0, 2) === "0x"
      ) {
        _claimHash = _claimHash.substring(2, _claimHash.length);
      }
      const claimEllipsis = _claimHash
        ? `${_claimHash.substring(0, 6)}...${_claimHash.substring(
            _claimHash.length - 4,
          )}`
        : "";
      const claimHashUrl = toNetwork
        ? `${toNetwork.explorer}${toNetwork.txUrl}${_claimHash}`
        : "";

      let _account = t.account;
      let _accountUrl = `${toNetwork?.explorer}/address/${_account}`;
      if (toNetwork && toNetwork.notEVM) {
        _account = _account.substring(13, 77);
        _accountUrl = `${toNetwork?.explorer}/account/${_account}`;
      }

      // Find contract hash on Casper
      let tokenOnCasper = tokenList.find(
        (_token) =>
          _token.originContractAddress?.toLowerCase() ===
            t.originToken.toLowerCase() &&
          _token?.originChainId === t.originChainId,
      );
      let contractHash = tokenOnCasper?.contractHash;

      // From EVM to Casper
      if (!currentNetwork.notEVM && toNetwork.notEVM) {
        tokenOnCasper = tokenList.find(
          (_token) =>
            _token.address.toLowerCase() === t.originToken.toLowerCase(),
        );
        contractHash = tokenOnCasper?.contractHash;
      }

      transactions.push({
        ...t,
        tokenSymbol:
          t.originToken == NATIVE_TOKEN_ADDRESS
            ? originNetwork.nativeCurrency.symbol
            : t.originSymbol,
        fromNetwork,
        toNetwork,
        originNetwork,
        amountFormated,
        account: _account,
        accountUrl: _accountUrl,
        requestHashLink: {
          networkName: fromNetwork.name,
          explorerLogo: fromNetwork ? fromNetwork.logoURI : "",
          requestHash: requestEllipsis,
          requestHashUrl,
        },
        claimHashLink: {
          networkName: toNetwork.name,
          explorerLogo: toNetwork ? toNetwork.logoURI : "",
          claimHash: claimEllipsis,
          claimHashUrl,
        },
        contractHash: contractHash,
        claimed: typeof t.claimed == "undefined" ? false : t.claimed,
      });
    });

    // localStorage.setItem(`transactions_${account}_${chainId}`, JSON.stringify(transactions))
  }

  return transactions;
};

export const parseResponseToTransactionsAllChain = async (
  response: any,
  isTestnet?: boolean,
) => {
  const _networks = (
    isTestnet
      ? networks.filter((n) => n.isTestnet)
      : networks.filter((n) => !n.isTestnet)
  ) as Network[];
  let transactions: Transaction[] = [];

  for (let i = 0; i < _networks.length; i++) {
    const network = _networks[i];
    const _txns = await parseResponseToTransactions(response, network.chainId);
    const set = new Set(transactions.map((t) => t._id));
    transactions = [...transactions, ..._txns.filter((t) => !set.has(t._id))]; // Array.from(new Set([...transactions, ..._txns]))

    // Sort by date
    transactions = transactions.sort((a, b) => a.requestTime - b.requestTime);
  }

  return transactions;
};

interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => void;
  };
}

export const setupNetwork = async (network: Network): Promise<boolean> => {
  const provider = (window as WindowChain).ethereum;
  const defaultMetamaskChainId = [1, 42];
  const method = defaultMetamaskChainId.includes(network.chainId)
    ? "wallet_switchEthereumChain"
    : "wallet_addEthereumChain";
  const params = defaultMetamaskChainId.includes(network.chainId)
    ? [{ chainId: `0x${network.chainId.toString(16)}` }]
    : [
        {
          chainId: `0x${network.chainId.toString(16)}`,
          chainName: network.name,
          nativeCurrency: {
            name: "BNB",
            symbol: "bnb",
            decimals: 18,
          },
          rpcUrls: [network.rpcURL],
          blockExplorerUrls: [network.explorer],
        },
      ];

  if (provider) {
    try {
      // @ts-ignore
      await provider.request({
        method,
        params,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};

export const toPlainString = (num: any) => {
  return ("" + +num).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join("0") + c + d
        : b + c + d + Array(e - d.length + 1).join("0");
    },
  );
};

export const isDev = process.env.NODE_ENV !== "production";

export const abbrNum = (number: any, decPlaces: number = 2) => {
  const numberStart = number;
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  const abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return numberStart < 1000 ? numberStart.toFixed(2) : number;
};
