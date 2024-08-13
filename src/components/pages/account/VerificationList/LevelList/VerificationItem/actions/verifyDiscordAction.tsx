import {
  Button,
  Flex,
  Grid,
  PinInput,
  PinInputField,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";

import { VerifySelectAction } from "./VerifySelectAction/verifySelectAction";
import { ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import { DISCORD_BOT_LINK } from "../../../../../../../constants";

const enum Stage {
  NONE,
  HAVE_CODE,
  GET_CODE,
}

export const VerifyDiscordAction = ({
  discordCode,
}: {
  discordCode: string | null;
}) => {
  const { assignDiscord, discord_nickname, id, token } = useUserProvider();
  const [sent, setSent] = useState<boolean>(false);
  const [stage, setStage] = useState<Stage>(Stage.NONE);

  const [newEmail, setNewEmail] = useState<string>("");

  const [code, setCode] = useState<string>(discordCode ?? "");

  useEffect(() => {
    if (discordCode) setStage(Stage.HAVE_CODE);
  }, [discordCode]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [loadingCodeSend, setLoadingCodeSend] = useState<boolean>(false);

  const [codeSuccess, setCodeSuccess] = useState<boolean>(false);

  const handleCodeSubmit = () => {
    setLoadingCodeSend(true);

    assignDiscord(code)
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
        {stage == Stage.NONE && (
          <VerifySelectAction
            primaryAction={() =>
              window.open(DISCORD_BOT_LINK, "_blank", "rel=noopener noreferrer")
            }
            secondaryAction={() => setStage(Stage.HAVE_CODE)}
            primaryText="Get verification code"
            secondaryText="I already have code"
          />
        )}

        {stage == Stage.GET_CODE && (
          <>
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
        {stage == Stage.HAVE_CODE && (
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
                  disabled={code.length != 8}
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
                <CheckIcon color="brandSecondary.500" /> Linked Discord account
                succesfully
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
