import {
  Button,
  Flex,
  Grid,
  Input,
  PinInput,
  PinInputField,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { MystraAPI } from "../../../../../../../services/mystra-api";
import { VerifySelectAction } from "./VerifySelectAction/verifySelectAction";
import { ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";

const enum Stage {
  NONE,
  HAVE_CODE,
  GET_CODE,
}

export const VerifyEmailAction = ({
  emailCode,
}: {
  emailCode: string | null;
}) => {
  const { assignEmail, id, token } = useUserProvider();
  const [sent, setSent] = useState<boolean>(false);
  const [stage, setStage] = useState<Stage>(Stage.NONE);

  const [newEmail, setNewEmail] = useState<string>("");

  const [code, setCode] = useState<string>(emailCode ?? "");

  useEffect(() => {
    if (emailCode) setStage(Stage.HAVE_CODE);
  }, [emailCode]);

  const { onClose } = useDisclosure();

  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [loadingCodeSend, setLoadingCodeSend] = useState<boolean>(false);

  const handleRequestCode = (): Promise<boolean> => {
    setLoadingSend(true);

    return new Promise((resolve, reject) =>
      MystraAPI.updateEmail(id, newEmail, token.value)
        .then(() => {
          setSent(true);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoadingSend(false);
        }),
    );
  };

  const [codeSuccess, setCodeSuccess] = useState<boolean>(false);

  const handleCodeSubmit = () => {
    setLoadingCodeSend(true);

    assignEmail(code)
      .then((res) => {
        onClose();
        setCodeSuccess(true);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingCodeSend(false);
      });
  };

  return (
    <>
      <Flex flexDir="column" gap="20px">
        {stage === Stage.NONE && (
          <VerifySelectAction
            primaryAction={() => setStage(Stage.GET_CODE)}
            secondaryAction={() => setStage(Stage.HAVE_CODE)}
            primaryText="Get verification code"
            secondaryText="I already have code"
          />
        )}

        {stage === Stage.GET_CODE && (
          <>
            {!sent && !loadingSend && (
              <Grid templateColumns="1fr auto" gap="10px">
                <Input
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  placeholder="user@example.com"
                  _focus={{ boxShadow: "none", borderColor: "initial" }}
                />

                <Button
                  onClick={handleRequestCode}
                  disabled={newEmail.length < 3}
                  fontWeight="normal"
                  h="40px"
                  bg="#EFEFEF"
                  paddingX="10px"
                  color="black"
                >
                  {loadingSend ? <Spinner color="black" /> : "Send code"}
                </Button>
              </Grid>
            )}

            {sent && (
              <Flex
                align="center"
                gap="10px"
                color="brandSecondary.500"
                h="40px"
                fontSize="14px"
                fontFamily="Inter"
              >
                <CheckIcon color="brandSecondary.500" /> Code sent to {newEmail}{" "}
              </Flex>
            )}
            {loadingSend && (
              <Flex
                align="center"
                gap="10px"
                h="40px"
                fontSize="14px"
                fontFamily="Inter"
              >
                <Spinner boxSize="14px" color="white" /> Processing...
              </Flex>
            )}
            <Flex
              fontSize="14px"
              fontFamily="Inter"
              align="center"
              cursor="pointer"
              gap="6px"
              _hover={{ textDecor: "underline" }}
              onClick={() => {
                setSent(false);
                setStage(Stage.NONE);
              }}
            >
              I already have code <ArrowBackIcon />
            </Flex>
          </>
        )}
        {stage === Stage.HAVE_CODE && (
          <>
            {!loadingCodeSend && !codeSuccess && (
              <Grid templateColumns={"1fr auto"} gap="10px">
                <Flex gap="4px">
                  <PinInput
                    size={"40px"}
                    value={code}
                    onChange={(e) => {
                      setCode(e);
                    }}
                    focusBorderColor="brandSecondary.500"
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </Flex>
                <Button
                  onClick={handleCodeSubmit}
                  disabled={code.length !== 8}
                  fontWeight="normal"
                  h="40px"
                  bg="#EFEFEF"
                  paddingX="10px"
                  color="black"
                >
                  Verify
                </Button>
              </Grid>
            )}

            {codeSuccess && (
              <Flex
                align="center"
                gap="10px"
                color="brandSecondary.500"
                h="40px"
                fontSize="14px"
                fontFamily="Inter"
              >
                <CheckIcon color="brandSecondary.500" /> Verified email
                succesfully.
              </Flex>
            )}
            {loadingCodeSend && (
              <Flex
                align="center"
                gap="10px"
                h="40px"
                fontSize="14px"
                fontFamily="Inter"
              >
                <Spinner boxSize="14px" color="white" /> Processing...
              </Flex>
            )}
            <Flex
              fontSize="14px"
              fontFamily="Inter"
              align="center"
              cursor="pointer"
              gap="6px"
              _hover={{ textDecor: "underline" }}
              onClick={() => setStage(Stage.NONE)}
            >
              I dont have code yet <ArrowBackIcon />
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
