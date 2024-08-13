import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../../../../providers/Theme/useThemeProvider";
import { MystraAPI } from "../../../../../../services/mystra-api";
import { WalletIcon } from "../../../../../shared/icons/navigation/walletIcon";
import { CustomCheckbox } from "../../../../../shared/inputs/CustomCheckbox/customCheckbox";
import { ConnectMode } from "../../connectButton";
import { ConnectHeading } from "../shared/ConnectHeading/connectHeading";
import { FormGroup } from "../shared/FormGroup/formGroup";
import { OrDivider } from "../shared/OrDivider/orDivider";
import { SwitchMode } from "../SwitchMode/switchMode";

export const RegisterPopup = ({ setMode }: { setMode: any }) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [marketingAgree, setMarketingAgree] = useState<boolean>(false);
  const [termsAgree, setTermsAgree] = useState<boolean>(false);

  const handleEmailChange = (e: any) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const submitRegister = () => {
    setLoading(true);
    MystraAPI.registerEmail(
      emailInput,
      passwordInput,
      passwordInput,
      termsAgree,
      marketingAgree,
    )
      .then((res) => {
        setMode(ConnectMode.REGISTER_SUCCESS);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      submitRegister();
    }
  };

  const { borderPrimary, textSecondary } = useThemeProvider();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ModalBody display="grid" gridTemplateColumns="1fr" padding="0px" w="100%">
      <Flex
        gridTemplateColumns="1fr"
        flexDir="column"
        padding="57px 61px"
        gap="17px"
      >
        <Flex justifyContent="space-between" align="flex-start" w="100%">
          <ConnectHeading>Create account</ConnectHeading>
          <SwitchMode
            topText={"You have account?"}
            bottomText={"Go to login"}
            onClick={() => setMode(ConnectMode.LOGIN)}
          />
        </Flex>
        <FormGroup title="Email address">
          <Input
            disabled={loading}
            onKeyDown={handleEnterKey}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup title="Password">
          <InputGroup>
            <Input
              disabled={loading}
              onKeyDown={handleEnterKey}
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
            />
            <InputRightElement pr="4px">
              <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                {showPassword ? (
                  <ViewOffIcon color="white" />
                ) : (
                  <ViewIcon color="white" opacity="0.6" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormGroup>
        <Flex flexDir="column" gap="10px">
          <CustomCheckbox
            onChange={(val: boolean) => {
              setTermsAgree(val);
            }}
          >
            Accept Terms of Service and Privacy Policy{" "}
            <Box color="error.500"> *</Box>
          </CustomCheckbox>
          <CustomCheckbox
            onChange={(val: boolean) => {
              setMarketingAgree(val);
            }}
          >
            I agree to receive marketing materials from Mystra
          </CustomCheckbox>
        </Flex>

        <Button
          mt="14px"
          bg="white"
          fontWeight="400"
          fontFamily="Inter"
          color="black"
          onClick={submitRegister}
        >
          {loading ? <Spinner /> : "Create an account"}
        </Button>
        <Flex flexDir="column" gap="18px" mt="10px">
          <OrDivider />
          <Button
            color={"white"}
            border="1px solid"
            fontFamily="Inter"
            gap="10px"
            fontWeight="400"
            _hover={{ bg: borderPrimary }}
            borderColor={textSecondary}
            onClick={() => setMode(ConnectMode.REGISTER_WALLET)}
          >
            Register with wallet <WalletIcon />
          </Button>
        </Flex>
      </Flex>
    </ModalBody>
  );
};
