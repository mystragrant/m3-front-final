import { Flex } from "@chakra-ui/react";
import { useERC20WalletProvider } from "../../../../providers/ERCWalletProvider/useERC20WalletProvider";
import { TokenItem } from "./TokenItem/tokenItem";

export const ERC20TokensList = () => {
  const { allTokens } = useERC20WalletProvider();

  return (
    <Flex flexDir="column" gap="8px">
      {allTokens.map(() => {
        return (
          <TokenItem
            name={"Casper"}
            symbol={"CSPR"}
            network="Casper"
            balance="1503.50"
            decimals={18}
          />
        );
      })}
    </Flex>
  );
};
