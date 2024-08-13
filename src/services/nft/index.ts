import { Buffer } from "buffer";
import {
  CLKey,
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { DEPLOY_TTL_MS, NETWORK_NAME } from "../../constants";
import { toMotes } from "../../helpers/misc";

export enum CASPER_NFT_TYPES {
  CEP47,
  CEP78,
}

export const getTransferDeploy = (
  publicKey: string,
  recipient: string,
  nftContract: string,
  tokenId: string,
  type: CASPER_NFT_TYPES,
) => {
  try {
    console.log(recipient, typeof recipient);
    console.log("xd");

    const recipientPK = CLPublicKey.fromHex(recipient.toString());

    const pbKey = CLPublicKey.fromHex(publicKey);
    const mapping: any = {
      recipient: new CLKey(recipientPK),
    };

    let entryPoint = "transfer";
    if (type == CASPER_NFT_TYPES.CEP47) {
      mapping["token_ids"] = CLValueBuilder.list([
        CLValueBuilder.u256(tokenId),
      ]);
    } else {
      entryPoint = "transfer_token";
      mapping["token_id"] = CLValueBuilder.string(tokenId);
    }

    const runtimeArgs = RuntimeArgs.fromMap(mapping);

    const deployParams = new DeployUtil.DeployParams(
      pbKey,
      NETWORK_NAME,
      1,
      DEPLOY_TTL_MS,
    );

    const payment = DeployUtil.standardPayment(toMotes(2.5));

    const res = DeployUtil.makeDeploy(
      deployParams,
      DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        Uint8Array.from(Buffer.from(nftContract, "hex")),
        entryPoint,
        runtimeArgs,
      ),
      payment,
    );

    console.log(res);

    return res;
  } catch (error) {
    console.error(error);
  }
};
