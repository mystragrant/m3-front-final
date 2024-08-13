import { useState, useEffect, useMemo } from "react";
import BigNumber from "bignumber.js";
import Token from "../../type/Token";
import { useTokenContract } from "../useContract";
import { NATIVE_TOKEN_ADDRESS } from "../../constants";

const useTokenAllowance = (
  token?: Token,
  owner?: string,
  spender?: string,
): BigNumber | undefined => {
  const [allowance, setAllowance] = useState<BigNumber>(new BigNumber(0));
  const tokenContract = useTokenContract(token?.address ?? undefined);

  const fetchAllowance = async () => {
    try {
      if (tokenContract) {
        const _allowance = await tokenContract.methods
          .allowance(owner, spender)
          .call();
        const _allowanceBN = new BigNumber(_allowance);
        setAllowance(_allowanceBN);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (token?.address !== NATIVE_TOKEN_ADDRESS) {
      fetchAllowance();
    }
  }, [token]);

  return useMemo(() => {
    return allowance;
  }, [token, allowance]);
};

export default useTokenAllowance;
