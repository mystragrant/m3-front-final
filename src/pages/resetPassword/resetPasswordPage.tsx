import { Button, Flex, Heading, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FormGroup } from "../../components/global/TopMenu/ConnectWallet/modes/shared/FormGroup/formGroup";
import { MystraAPI } from "../../services/mystra-api";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const [queryParameters] = useSearchParams();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const submitRetrieve = () => {
    setLoading(true);
    setError("");
    const token = queryParameters.get("token");

    if (token) {
      MystraAPI.resetPassword(token, password, confirmPassword)
        .then(() => {})
        .catch(() => {
          setError("Something went wrong...");
        })
        .finally(() => {
          setLoading(false);
          setDone(true);
        });
    } else {
      setError("Token invalid");
      setLoading(false);
      setDone(true);
    }
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      {done ? (
        error ? (
          error
        ) : (
          <Flex>Password reset succesfully</Flex>
        )
      ) : (
        <Flex flexDir="column" gap="20px">
          <Heading>Type in new password</Heading>
          <FormGroup title="Email address">
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </FormGroup>
          <Button
            disabled={password.length === 0 || password !== confirmPassword}
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
