import {
  Button,
  Flex,
  Input,
  Link,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";
import { JWT_TYPES } from "../../../../../../providers/User/types";
import { useUserProvider } from "../../../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../../../services/mystra-api";
import { validateEmail } from "../../../../../../utils/validation";
import { WalletIcon } from "../../../../../shared/icons/navigation/walletIcon";
import { CustomCheckbox } from "../../../../../shared/inputs/CustomCheckbox/customCheckbox";
import { ConnectMode } from "../../connectButton";
import { ConnectHeading } from "../shared/ConnectHeading/connectHeading";
import { FormGroup } from "../shared/FormGroup/formGroup";
import { OrDivider } from "../shared/OrDivider/orDivider";
import { SwitchMode } from "../SwitchMode/switchMode";

export const LoginPopup = ({
  setMode,
  onClose,
}: {
  setMode: any;
  onClose: () => any;
}) => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { loginUser } = useUserProvider();
  const { textSecondary } = useThemeProvider();

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      submitLogin();
    }
  };

  const handleLoginChange = (e: any) => {
    setLoginInput(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const submitLogin = () => {
    setError("");

    if (loginInput === "") {
      setError("E-mail not provided.");
      return;
    }

    if (!validateEmail(loginInput)) {
      setError("Invalid e-mail address.");
      return;
    }

    if (passwordInput === "") {
      setError("Password not provided.");
      return;
    }

    setLoading(true);

    MystraAPI.loginEmail(loginInput, passwordInput)
      .then((res) => {
        loginUser(res.data, JWT_TYPES.WEB2);
        onClose();
      })
      .catch(() => {
        setError("Invalid login data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { borderPrimary } = useThemeProvider();

  return (
    <ModalBody
      display="grid"
      gridTemplateColumns="1fr auto"
      padding="0px"
      w="100%"
    >
      <Flex
        gridTemplateColumns="1fr"
        flexDir="column"
        padding="57px 61px"
        h="100%"
        gap="17px"
      >
        <Flex justifyContent="space-between" align="flex-start" w="100%">
          <ConnectHeading>Hello 👋</ConnectHeading>
          <SwitchMode
            topText={"You don't have account?"}
            bottomText={"Create account"}
            onClick={() => setMode(ConnectMode.REGISTER)}
          />
        </Flex>
        <FormGroup title="Email address">
          <Input
            borderColor={
              error === "E-mail not provided." ||
              error === "Invalid e-mail address."
                ? "error.500"
                : borderPrimary
            }
            disabled={loading}
            onKeyDown={handleEnterKey}
            fontSize="14px"
            fontFamily="Inter"
            type="email"
            onChange={handleLoginChange}
          />
        </FormGroup>
        <FormGroup
          title="Password"
          addon={
            <Link tabIndex={-1} href="/forgot-password" color={textSecondary}>
              Forgot account?
            </Link>
          }
        >
          <Input
            disabled={loading}
            onKeyDown={handleEnterKey}
            fontSize="14px"
            fontFamily="Inter"
            borderColor={
              error === "Password not provided." ? "error.500" : borderPrimary
            }
            type="password"
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <CustomCheckbox
          onChange={(val: boolean) => {
            console.log(val);
          }}
        >
          Remember me
        </CustomCheckbox>
        <Button
          mt="10px"
          bg="#EFEFEF"
          fontFamily="Inter"
          fontWeight="400"
          color="black"
          onClick={submitLogin}
        >
          {loading ? <Spinner /> : "Login"}
        </Button>
        <Flex align="center" h="15px" fontSize="12px" color="error.500">
          {error}
        </Flex>
        <Flex flexDir="column" gap="18px" mt="10px">
          <OrDivider />
          <Button
            color={"white"}
            border="1px solid"
            fontFamily="Inter"
            fontWeight="400"
            gap="10px"
            _hover={{ bg: borderPrimary }}
            borderColor={textSecondary}
            onClick={() => setMode(ConnectMode.LOGIN_WALLET)}
          >
            Connect with wallet <WalletIcon />
          </Button>
        </Flex>
      </Flex>
    </ModalBody>
  );
};
