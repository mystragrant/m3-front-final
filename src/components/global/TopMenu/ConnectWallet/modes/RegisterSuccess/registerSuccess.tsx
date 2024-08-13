import { Button, Flex, ModalBody } from "@chakra-ui/react";

export const RegisterSuccess = ({ onClose }: { onClose: () => any }) => {
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
        Register successful, check your email
        <Button color="white" w="100%" bg="brand.500" onClick={onClose}>
          {" "}
          OK
        </Button>
      </Flex>
    </ModalBody>
  );
};
