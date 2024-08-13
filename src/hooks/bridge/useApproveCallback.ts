import { useMemo, useCallback, useContext } from "react";
import BigNumber from "bignumber.js";
import useTokenAllowance from "./useTokenAllowance";
import { useTokenContract } from "../useContract";
import Token from "../../type/Token";
import { NATIVE_TOKEN_ADDRESS } from "../../constants";
import { numberToHex } from "../../utils/utils";
import { useUserProvider } from "../../providers/User/userProvider";

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  APPROVED = "APPROVED",
}

export const useApproveCallback = (
  amountToApprove?: BigNumber,
  token?: Token,
  chainId?: number,
  spender?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [ApprovalState, (infinity?: boolean) => Promise<any>] => {
  const { evm_wallet } = useUserProvider();

  const currentAllowance = useTokenAllowance(
    token,
    evm_wallet ?? undefined,
    spender,
  );

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // native token
    if (token?.address === NATIVE_TOKEN_ADDRESS) return ApprovalState.APPROVED;

    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;

    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance || amountToApprove.toString() === "0")
      return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(amountToApprove)
      ? ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, spender]);

  const tokenContract = useTokenContract(token?.address);

  const approve = useCallback(
    async (infinity?: boolean): Promise<void> => {
      if (approvalState !== ApprovalState.NOT_APPROVED) {
        console.error("approve was called unnecessarily");
        return;
      }

      if (!token) {
        console.error("no token");
        return;
      }

      if (!tokenContract) {
        console.error("tokenContract is null");
        return;
      }

      if (!chainId) {
        console.error("no chain id");
        return;
      }

      if (!amountToApprove) {
        console.error("missing amount to approve");
        return;
      }

      if (!spender) {
        console.error("no spender");
        return;
      }

      const infiniteAmount = new BigNumber(2 ** 255 - 1);

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      return tokenContract.methods
        .approve(
          spender,
          infinity ? infiniteAmount.toString(10) : amountToApprove.toString(10),
        )
        .send({ /*chainId: numberToHex(chainId),*/ from: accounts[0] });
    },
    [approvalState, token, tokenContract, amountToApprove, spender],
  );

  return [approvalState, approve];
};
