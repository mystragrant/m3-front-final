/* eslint-disable prettier/prettier */
import { Box, Button, Spinner, Td, Tr } from "@chakra-ui/react";
import {
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import { useMemo, useState } from "react";
import { casperService, DEPLOY_TTL_MS, NETWORK_NAME } from "../../../../../constants";
import { CASPER_MARKETPLACE_ADDRESS, CASPER_MARKETPLACE_PACKAGE_HASH } from "../../../../../constants/marketplace";
import { toMotes } from "../../../../../helpers/misc";
import { cepStandardToNumber } from "../../../../../helpers/misc/cep";
import { useMultiWalletProvider } from "../../../../../providers/MultiWalletProvider/multiWalletProvider";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import { trimHash } from "../../../../../utils/utils";
import { PriceItem } from "../../PriceItem/priceItem";
import { OfferData } from "../offerList";

const Buffer = require("buffer/").Buffer;


export const OfferItem = ({
  data,
  chain,
  isYours,
  canAccept,
  address,
  tokenId,
  date,
  expirationDate,
  nftStandard,
  onDelete
}: {
  data: OfferData;
  chain: string;
  isYours: boolean;
  canAccept: boolean;
  address: string;
  tokenId: string;
  date: Date,
  expirationDate: Date,
  nftStandard: string,
  onDelete: () => void
}) => {
  const { getCasperKey, signCasper, putDeployUniversal, requestConnection } =
    useMultiWalletProvider();


  const { casper_public_key_wallet } = useUserProvider();


  const [loading, setLoading] = useState<boolean>(false);

  const isOfferYours = useMemo(() => {
    if(casper_public_key_wallet) {


    const account_hash = CLPublicKey.fromHex(casper_public_key_wallet)
      .toAccountHashStr()
      .slice(13).toLocaleLowerCase();


      console.log(account_hash, data.account_hash)
    
      return data.account_hash.toLocaleLowerCase() == account_hash;
    }
  }, [casper_public_key_wallet, data.account_hash]);

    const submitApprove = async () => {
      if(loading) return;
        let pubKey = " ";
        setLoading(true)
        if (chain == "casper" || chain == "casper-test") {
          try {
            pubKey = await getCasperKey();
    
            const hashBytes = Buffer.from(CASPER_MARKETPLACE_PACKAGE_HASH, "hex");
    

            const runtimeArgs = cepStandardToNumber(nftStandard) == 1 ? RuntimeArgs.fromMap({
              operator: CLValueBuilder.key(CLValueBuilder.byteArray(hashBytes)),
              token_id: [CLValueBuilder.i64(tokenId)],
            } as any) : RuntimeArgs.fromMap({
              spender: CLValueBuilder.key(CLValueBuilder.byteArray(hashBytes)),
              token_ids: CLValueBuilder.list([CLValueBuilder.u256(tokenId)]),
            } as any);
    
            const deployParams = new DeployUtil.DeployParams(
              CLPublicKey.fromHex(pubKey),
              NETWORK_NAME,
              1,
              DEPLOY_TTL_MS,
            );
    
            const payment = DeployUtil.standardPayment(toMotes(2.5));
    
            const deploy = DeployUtil.makeDeploy(
              deployParams,
              DeployUtil.ExecutableDeployItem.newStoredContractByHash(
                Uint8Array.from(Buffer.from(address, "hex")),
                "approve",
                runtimeArgs,
              ),
              payment,
            );
    
            try {
              console.log(deploy);
              if (deploy) {
                const deployJson = DeployUtil.deployToJson(deploy);
    
                console.log(deployJson);
    
                signCasper(deployJson)
                  .then((res: any) => {
                    console.log(res);
    
                    putDeployUniversal(res, deploy as any, pubKey)
                      .then((res) => {
                        console.log(res);
    
                        casperService.waitForDeploy(res).then(() => {
                          acceptOffer();
                        });
                      })
                      .catch((e) => {
                        setLoading(false)
                      });
                  })
                  .catch((e: any) => {
                    console.log(e);
                    setLoading(false)
                  });
              }
            } catch (e) {
              console.log(e);
              setLoading(false)
            }
          } catch (e) {
            console.log(e);
            setLoading(false)
            requestConnection();
          }
        }
      };

  const acceptOffer = async () => {
    let pubKey = " ";
    if(loading) return;
    setLoading(true)

    if (chain == "casper" || chain == "casper-test") {
      try {
        pubKey = await getCasperKey();

        const runtimeArgs = RuntimeArgs.fromMap({
          contract_hash: CLValueBuilder.string("contract-" + address),
          token_id: CLValueBuilder.u256(Number(tokenId)),
          offerer: CLValueBuilder.string("account-hash-" + data.account_hash),
          token_standard: CLValueBuilder.u8(cepStandardToNumber(nftStandard))
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS,
        );

        const payment = DeployUtil.standardPayment(toMotes(10));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(CASPER_MARKETPLACE_ADDRESS, "hex")),
            "accept_offer",
            runtimeArgs,
          ),
          payment,
        );

        try {
          console.log(deploy);
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    casperService.waitForDeploy(res).then(() => {
                      setLoading(false)
                      onDelete()
                    });
                  })
                  .catch((e) => {
                    setLoading(false)
                  });
              })
              .catch((e: any) => {
                console.log(e);
                setLoading(false)
              });
          }
        } catch (e) {
          console.log(e);
          setLoading(false)
        }
      } catch (e) {
        console.log(e);
        setLoading(false)
        requestConnection();
      }
    } else {
    }
  };

  const cancelOffer = async () => {
    let pubKey = " ";
    if(loading) return;
    setLoading(true)

    if (chain == "casper" || chain == "casper-test") {
      try {
        pubKey = casper_public_key_wallet;

        const runtimeArgs = RuntimeArgs.fromMap({
          contract_hash: CLValueBuilder.string("contract-" + address),
          token_id: CLValueBuilder.u256(Number(tokenId)),
        } as any);

        const deployParams = new DeployUtil.DeployParams(
          CLPublicKey.fromHex(pubKey),
          NETWORK_NAME,
          1,
          DEPLOY_TTL_MS,
        );


        const payment = DeployUtil.standardPayment(toMotes(10));

        const deploy = DeployUtil.makeDeploy(
          deployParams,
          DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            Uint8Array.from(Buffer.from(CASPER_MARKETPLACE_ADDRESS, "hex")),
            "cancel_offer",
            runtimeArgs,
          ),
          payment,
        );

        try {
          console.log(deploy);
          if (deploy) {
            const deployJson = DeployUtil.deployToJson(deploy);

            console.log(deployJson);

            signCasper(deployJson)
              .then((res: any) => {
                console.log(res);

                putDeployUniversal(res, deploy as any, pubKey)
                  .then((res) => {
                    casperService.waitForDeploy(res).then(() => {
                      setLoading(false)
                      onDelete()
                    });
                  })
                  .catch((e) => {
                    setLoading(false)
                  });
              })
              .catch((e: any) => {
                setLoading(false)
                console.log(e);
              });
          }
        } catch (e) {
          setLoading(false)
          console.log(e);
        }
      } catch (e) {
        console.log(e);
        setLoading(false)
        requestConnection();
      }
    } else {
    }
  };

  return (
    <Tr py="0px" padding='0px ' margin='0px' color="white" >
      <Td py="10px" onClick={onDelete}><PriceItem price={data.offer.toString()} chain={chain} /></Td>
      <Td py="10px"><Box >{date.toDateString()}</Box></Td>
      <Td py="10px"><Box>{expirationDate.toDateString()}</Box></Td>
      <Td py="12px"><Box>{trimHash(data.address)}</Box></Td>
      {canAccept && <Td py="12px"> <Button h='32px' border="1px solid" bg="white" fontWeight="normal"  onClick={submitApprove}>{loading ? <Spinner/> : "Accept"}</Button></Td>}
      {isOfferYours && <Td py="12px"><Button disabled={loading} h='32px' border="1px solid" borderColor="white" color="white" fontWeight="normal"  onClick={cancelOffer}>{loading ? <Spinner/> : "Cancel"}</Button></Td>}
    </Tr>
  );
};
