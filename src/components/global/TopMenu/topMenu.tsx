import { Button, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../providers/User/userProvider";
import { CenterContainer } from "../../shared/containers/CenterContainer/centerContainter";
import { AccountMini } from "./AccountMini/accountMini";
import { ChainFilter } from "./ChainFilter/chainFilter";
import { ConnectButton } from "./ConnectWallet/connectButton";
import { Navigation } from "./Navigation/navigation";
import { TicketIndicator } from "./TicketIndicator/ticketIndicator";
import { TxLoader } from "./TxLoader/txLoader";

export const TopMenu = () => {
  const { borderPrimary, backgroundPrimary } = useThemeProvider();
  const { isLogged } = useUserProvider();

  return (
    <Flex
      height="74px"
      justify="center"
      w="100%"
      flexDir={"column"}
      borderColor={borderPrimary}
      bg={backgroundPrimary}
      borderBottom="1px solid"
      borderBottomColor={borderPrimary}
      pos="sticky"
      zIndex={"1000"}
      top="0"
    >
      <CenterContainer>
        <Flex align={"center"} justify="space-between">
          <Navigation />
          <Flex align="center" gap="35px">
            {isLogged ? (
              <>
                <Flex align="center" gap="6px">
                  <TxLoader />
                  {/* <TicketIndicator /> */}
                  <ChainFilter />
                </Flex>
                <AccountMini menuOpen={true} />
              </>
            ) : (
              <ConnectButton />
            )}
          </Flex>
        </Flex>
      </CenterContainer>
    </Flex>
  );
};
