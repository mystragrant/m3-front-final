import { Box, Button, Flex, Grid, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { FormGroup } from "../../../global/TopMenu/ConnectWallet/modes/shared/FormGroup/formGroup";
import { SectionHeader } from "../../../shared/typography/sectionHeader";

export const ChangePassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { email, changePassword } = useUserProvider();

  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePassword = () => {
    setLoading(true);
    changePassword(password, confirmPassword)
      .then(() => {
        setConfirmPassword("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex flexDir="column" gap="16px">
      <SectionHeader>Password</SectionHeader>
      <Box mb="-8px" />
      <Grid templateColumns="1fr 1fr" gap="16px">
        <FormGroup title="New password">
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <FormGroup title="Confirm password">
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
      </Grid>

      <Button
        h="40px"
        alignSelf="flex-start"
        bg="#EFEFEF"
        color="black"
        fontSize="14px"
        fontWeight="400"
        onClick={handleChangePassword}
        disabled={
          email == "" ||
          loading ||
          password != confirmPassword ||
          password.length < 8
        }
      >
        {loading ? <Spinner /> : "Change password"}
      </Button>
      {email == "" && (
        <Box fontSize="12px">
          Connect your email in verification tab to be able to change password
        </Box>
      )}
    </Flex>
  );
};
