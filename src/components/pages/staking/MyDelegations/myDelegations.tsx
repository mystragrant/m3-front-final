import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../services/mystra-api";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../../utils/utils";
import { CsprIcon } from "../../../shared/icons/CsprIcon";
import {
  CSPR_AUCTION_DELEGATE_FEE,
  CSPR_AUCTION_UNDELEGATE_FEE,
  ENTRY_POINT_DELEGATE,
  ENTRY_POINT_UNDELEGATE,
} from "../../../../constants/staking";
import { getStakeDeploy } from "../../../../services/staking";
import { DeployUtil } from "casper-js-sdk";
import { casperClient, isTestnet } from "../../../../constants";
import { useMultiWalletProvider } from "../../../../providers/MultiWalletProvider/multiWalletProvider";
import { MultichainIcon } from "../../../shared/display/MultichainIcon/multichainIcon";
import {
  NETWORK,
  WalletSelector,
} from "../../../shared/WalletSelector/walletSelector";
import {
  TxType,
  useTxQueue,
} from "../../../../providers/useTxQueue/useTxQueue";

export const MyDelegations = () => {
  const [delegations, setDelegations] = useState<any[]>([]);
  const { id } = useUserProvider();

  const { borderPrimary, textSecondary } = useThemeProvider();

  const {
    signCasper,
    putDeployUniversal,
    getCasperKey,
    requestConnection,
    selectedCasperProvider,
  } = useMultiWalletProvider();

  useEffect(() => {
    MystraAPI.getDelegations(id).then((res: any) => {
      console.log(res.data.data);
      setDelegations(res.data.data);
    });
  }, []);

  const { addToQueue } = useTxQueue();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleUndelegate = async (validator: string, stakeAmount: number) => {
    let pubKey = "";

    if (!selectedCasperProvider) {
      onOpen();
      return;
    }

    try {
      pubKey = await getCasperKey();

      console.log(
        pubKey,
        validator,
        CSPR_AUCTION_UNDELEGATE_FEE,
        stakeAmount,
        ENTRY_POINT_UNDELEGATE,
      );

      const deploy = await getStakeDeploy(
        pubKey,
        validator,
        CSPR_AUCTION_UNDELEGATE_FEE,
        stakeAmount,
        ENTRY_POINT_UNDELEGATE,
      );

      const deployJson = DeployUtil.deployToJson(deploy);

      signCasper(deployJson).then(async (signature: any) => {
        const deployObject = DeployUtil.deployFromJson(signature);

        putDeployUniversal(signature, deploy, pubKey)
          .then((signed) => {
            addToQueue(
              signed,

              "Undelegate CSPR",
              stakeAmount.toString(),
              isTestnet ? "casper-test" : "casper",
              TxType.UNSTAKE,
            );
          })
          .catch((e) => {});
      });
    } catch (e) {
      requestConnection();
    }
  };

  return (
    <Flex>
      <TableContainer
        w="100%"
        borderRadius="8px"
        border="1px solid"
        borderColor={borderPrimary}
      >
        <Table variant="simple" borderColor={borderPrimary}>
          <Thead borderColor={borderPrimary}>
            <Tr borderColor={borderPrimary}>
              {["No.", "Validator address", "Amount", "Action"].map((item) => {
                return (
                  <Th
                    fontWeight="400"
                    fontSize="14px"
                    color={textSecondary}
                    borderColor={borderPrimary}
                    textTransform="none"
                  >
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody borderColor={borderPrimary}>
            {delegations.length > 0 ? (
              delegations.map((item, index) => {
                return (
                  <Tr fontSize="14px" borderColor={borderPrimary}>
                    <Td borderColor={borderPrimary}>{index + 1}</Td>
                    <Td borderColor={borderPrimary}>
                      {item.validator.slice(0, 15)}...
                      {item.validator.slice(-15)}
                    </Td>
                    <Td borderColor={borderPrimary}>
                      <Flex align="center" gap="6px">
                        {item.staked_amount}{" "}
                        <MultichainIcon chain="casper" size={16} />
                      </Flex>
                    </Td>
                    <Td borderColor={borderPrimary}>
                      <Button
                        fontSize="14px"
                        bg="white"
                        color="black"
                        fontFamily="Inter"
                        fontWeight="400"
                        onClick={() =>
                          handleUndelegate(item.validator, item.staked_amount)
                        }
                      >
                        Undelegate
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Box padding="24px" fontSize="14px">
                No active delegations
              </Box>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <WalletSelector
        network={NETWORK.CASPER}
        isOpen={isOpen && !selectedCasperProvider}
        onClose={onClose}
      />
    </Flex>
  );
};
