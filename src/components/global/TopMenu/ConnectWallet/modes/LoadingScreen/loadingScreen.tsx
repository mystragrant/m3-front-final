import { Box, ModalBody, Spinner } from "@chakra-ui/react";

export const LoadingScreen = () => {
  return (
    <ModalBody
      margin="auto"
      display="flex"
      padding="100px 0px"
      alignItems="center"
      flexDir="column"
      gap="20px"
      justifyContent="center"
    >
      <Spinner color="brandSecondary.500" />
      <Box>Confirm sign in your wallet.</Box>
    </ModalBody>
  );
};
