import { toMotes } from "./../../helpers/misc/index";
import {
  CLAccountHash,
  CLByteArray,
  CLKey,
  CLPublicKey,
  CLURef,
  CLValueBuilder,
  DeployUtil,
} from "casper-js-sdk";
import { MOTE_RATE } from "../../constants";

export const buildTransferDeploy = (
  fromAccount: CLPublicKey,
  toAccount: CLPublicKey,
  amount: number,
  transferId: number = 0,
  fee: number,
  network: string,
) => {
  const deployParams = new DeployUtil.DeployParams(fromAccount, network);

  const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
    toMotes(amount),
    toAccount,
    null,
    0,
  );
  const payment = DeployUtil.standardPayment(fee * MOTE_RATE);
  const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);

  return deploy;
};
