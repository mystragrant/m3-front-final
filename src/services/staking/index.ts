import { MYSTRA_API_URL } from "./../../constants/index";
import { BigNumberish } from "@ethersproject/bignumber";
import {
  DeployUtil,
  RuntimeArgs,
  CLPublicKey,
  CLValueBuilder,
  CLValue,
} from "casper-js-sdk";
import { contractHashes, NETWORK_NAME } from "../../constants";
import { ENTRY_POINT_DELEGATE } from "../../constants/staking";
import { toMotes } from "../../helpers/misc";

/**
 * It creates a deploy that deploys the auction contract.
 * @param baseAccount - The account that will pay for the deploy.
 * @param entryPoint - The name of the function to be called.
 * @param args - The arguments to pass to the entry point.
 * @param paymentAmount - The amount of tokens to send to the contract.
 * @returns The deploy object.
 */
const buildStakeDeploy = (
  baseAccount: CLPublicKey,
  entryPoint: string,
  args: Record<string, CLValue>,
  paymentAmount: BigNumberish,
) => {
  const deployParams = new DeployUtil.DeployParams(baseAccount, NETWORK_NAME);
  const runTimeArgs = RuntimeArgs.fromMap(args);
  const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    contractHashes.auction,
    entryPoint,
    runTimeArgs,
  );
  const payment = DeployUtil.standardPayment(paymentAmount);
  return DeployUtil.makeDeploy(deployParams, session, payment);
};

/**
 * It builds a StakeDeploy transaction with the given parameters
 * @returns The `StakeDeploy` transaction.
 */
export const getStakeDeploy = (
  fromAddress: string,
  validator: string,
  fee: number,
  amount: number,
  entryPoint: string = ENTRY_POINT_DELEGATE,
) => {
  try {
    const fromAccPk = CLPublicKey.fromHex(fromAddress);
    const validatorPk = CLPublicKey.fromHex(validator);
    return buildStakeDeploy(
      fromAccPk,
      entryPoint,
      {
        delegator: fromAccPk,
        validator: validatorPk,
        amount: CLValueBuilder.u512(toMotes(amount)),
      },
      toMotes(fee),
    );
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get stake deploy.`);
  }
};
