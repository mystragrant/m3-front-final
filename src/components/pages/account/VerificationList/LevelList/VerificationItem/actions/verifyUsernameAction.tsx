import { Box, Button, Flex, Grid, Input } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { ProcessingAction } from "../../../../../../shared/loaders/processingAction";

export const VerifyUsernameAction = () => {
  const [newUsername, setUsername] = useState<string>("");
  const { updateNickname } = useUserProvider();
  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    setError("");
    setProcessing(true);
    updateNickname(newUsername)
      .then((res) => {
        setSuccess(true);
      })
      .catch((e) => {
        setSuccess(false);
        setError("Invalid or already taken username.");
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const isNicknameValid = useMemo(() => {
    return newUsername.length > 3;
  }, [newUsername]);

  return (
    <>
      <Flex flexDir="column" gap="40px">
        {!processing && !success && (
          <Grid templateColumns="1fr auto" gap="8px">
            <Input onChange={handleChangeUsername} value={newUsername} />
            <Button
              color="black"
              bg="#EFEFEF"
              fontSize="14px"
              fontWeight="400"
              onClick={handleSubmit}
              fontFamily="Inter"
              disabled={!isNicknameValid}
            >
              Set nickname
            </Button>
          </Grid>
        )}

        <ProcessingAction
          success={success}
          successText={"Succesfully set username."}
          processing={processing}
          processingText={"Processing..."}
        />

        {error && (
          <Box color="error.500" fontSize="14px" fontFamily="Inter">
            {error}
          </Box>
        )}
      </Flex>
    </>
  );
};
