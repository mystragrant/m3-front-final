import { Box, Button, Flex, Heading, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { FormGroup } from "../../components/global/TopMenu/ConnectWallet/modes/shared/FormGroup/formGroup";
import { MystraAPI } from "../../services/mystra-api";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const submitRetrieve = () => {
    setLoading(true);

    MystraAPI.forgotPassword(email)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setDone(true);
      });
  };

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <Flex h="100vh" align="center" justify="center">
      {done ? (
        <Flex>
          Check email &nbsp;
          <Box display="inline" fontWeight="bold">
            {email}
          </Box>
          &nbsp; to reset your password
        </Flex>
      ) : (
        <Flex flexDir="column" gap="20px">
          <Heading>Forgot password?</Heading>
          <FormGroup title="Email address">
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormGroup>
          <Button
            disabled={!validateEmail(email)}
            onClick={submitRetrieve}
            color="white"
            h="50px"
            fontSize="14px"
            bg="brand.500"
          >
            {loading ? <Spinner /> : "Retrieve password"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
