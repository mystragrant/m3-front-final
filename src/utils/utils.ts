import { TOKEN_EXPIRATION_TIME_IN_MINUTES } from "../constants";

export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const numberToHex = (chainId: number) => {
  return "0x" + chainId.toString(16);
};

export function timeDifference(previous: any) {
  const msPerMinute = 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const unix = Math.floor(Date.now() / 1000);

  const elapsed = unix - previous;

  console.log(elapsed);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "min ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "mo ago";
  } else {
    return Math.round(elapsed / msPerYear) + "y ago";
  }
}

export const formatTransferFormattedAmount = (value: string): string => {
  const tokenName = value.replace(/[\d\.,]/g, "");
  const amount = Number(value.replace(/[,]+/g, "").split(" ")[0]).toFixed(2);

  const resultAmount = Number(amount) < 0.01 ? "< 0.01" : Number(amount);

  return `${resultAmount} ${tokenName}`;
};

export const trimHash = (value: string) => {
  return value.slice(0, 6) + "…" + value.slice(-4);
};

export const generateExpirationTimestamp = (
  minutes: number = TOKEN_EXPIRATION_TIME_IN_MINUTES,
) => {
  const oldDateObj = new Date();
  const newDateObj = new Date();
  newDateObj.setTime(oldDateObj.getTime() + minutes * 60 * 1000);

  return new Date(newDateObj);
};
