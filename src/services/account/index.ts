import { CLPublicKey } from "casper-js-sdk";
import { casperService } from "../../constants";

export const getBalance = async (publicKey: string) => {
  const root = await casperService.getStateRootHash();
  const balanceUref = await casperService.getAccountBalanceUrefByPublicKey(
    root,
    CLPublicKey.fromHex(publicKey),
  );
  const balance = await casperService.getAccountBalance(root, balanceUref);

  return balance;
};
