import Big from "big.js";
import { BigNumber } from "ethers";
import { MOTE_RATE } from "../../constants";

export const toMotes = (amount: number) => {
  try {
    const bigAmount = Big(amount)
      .times(MOTE_RATE)
      .round(0, Big.roundDown)
      .toString();
    return BigNumber.from(bigAmount);
  } catch (error) {
    return "-";
  }
};

export const fromMotes = (amount: number) => {
  try {
    const bigAmount = Big(amount).div(MOTE_RATE).toString();

    return bigAmount;
  } catch (error) {
    return "-";
  }
};

export const formatTimeDifference = (targetTimestamp: number): string => {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return "Ended.";
  }

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (remainingHours > 0) {
    parts.push(`${remainingHours}h`);
  }
  if (remainingMinutes > 0 && days == 0) {
    parts.push(`${remainingMinutes}min`);
  }

  return parts.join(" ");
};
