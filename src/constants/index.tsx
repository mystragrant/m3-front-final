import {
  CasperClient,
  CasperServiceByJsonRPC,
  CLPublicKey,
  DeployUtil,
} from "casper-js-sdk";

const Buffer = require("buffer/").Buffer;

export const NetworkContextName = "NETWORK";
export const DEPLOY_TTL_MS = 1800000;

//Create Casper client and service to interact with Casper node.
const nodeURL =
  process.env.REACT_APP_ENVIRONMENT == "testnet"
    ? "https://cspr-testnet.mystra.io:7778"
    : "http://node.casperarmy.org:7777/rpc";
export const casperService = new CasperServiceByJsonRPC(nodeURL);
export const casperClient = new CasperClient(nodeURL);

export const connectorLocalStorageKey = "connectorId";
export const NATIVE_TOKEN_ADDRESS =
  "0x1111111111111111111111111111111111111111";
export const REACT_APP_CHAIN_ID = 1;
export const REACT_APP_RPC_URL =
  "https://infura.io/v3/468031fc706e435eb5f32f89a4077d56";
export const REACT_APP_API_URL = "https://bridge-mainnet.dotoracle.network";
export const REACT_APP_TEST_API_URL = "https://api.dotoracle.network";

export const CASPER_BLOCK_EXPLORER_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT == "testnet"
    ? "https://testnet.cspr.live"
    : "https://scansper.com";

export const NETWORK_NAME =
  process.env.REACT_APP_ENVIRONMENT == "testnet" ? "casper-test" : "casper";

export const isTestnet = process.env.REACT_APP_ENVIRONMENT == "testnet";

export const CASPERARMY_API_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT == "testnet"
    ? "https://apiv1.casperarmy.org"
    : "https://apiv1.casperarmy.org";

export const MYSTRA_API_URL =
  process.env.REACT_APP_ENVIRONMENT == "testnet"
    ? "https://api.testnet.mystra.io"
    : "https://api.mystra.io";

export const MOTE_RATE = 1000000000;

export const contractHashes = {
  auction: Uint8Array.from(
    Buffer.from(
      "93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2",
      "hex",
    ),
  ),
};

export const IS_TESTNET = process.env.REACT_APP_ENVIRONMENT == "testnet";

export const CHAT_SERVER_BASEURL = "https://apichat.mystra.io";

export const TOKEN_EXPIRATION_TIME_IN_MINUTES = 20;

export const DISCORD_BOT_LINK =
  "https://discord.com/api/oauth2/authorize?client_id=1130820924338343957&permissions=345744989184&scope=bot";
export const TELEGRAM_BOT_LINK = "https://t.me/mystra_bot?start=connect";

console.log("testnet", process.env);

export const ARI10_GATEWAY_URL = "https://gateway.ari10.com";

export const ARI10_WIDGET_ID = "c2688a64-4715-4f93-98b0-513a20711720";
