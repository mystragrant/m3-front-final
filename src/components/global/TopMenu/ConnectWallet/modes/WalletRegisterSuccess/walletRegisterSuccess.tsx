import { Button, Flex, ModalBody } from "@chakra-ui/react";
import { ConnectMode } from "../../connectButton";

export const WalletRegisterSuccess = ({
  setMode,
  onClose,
}: {
  setMode: any;
  onClose: () => any;
}) => {
  return (
    <ModalBody
      margin="auto"
      display="grid"
      gridTemplateColumns="1fr auto"
      padding="0px"
      w="100%"
    >
      <Flex
        gridTemplateColumns="1fr"
        flexDir="column"
        justify="center"
        align="center"
        padding="57px 61px"
        gap="50px"
      >
        Register successful, sign in with your wallet now
        <Button
          color="white"
          w="100%"
          bg="brand.500"
          onClick={() => setMode(ConnectMode.LOGIN_WALLET)}
        >
          {" "}
          Proceed to login
        </Button>
      </Flex>
    </ModalBody>
  );
};
