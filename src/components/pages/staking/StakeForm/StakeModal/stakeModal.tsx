import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CASPERARMY_VALIDATOR_ADDRESS } from "../../../../../constants/staking";
import { CardContainer } from "../../../../shared/containers/cardContainer";
import { CustomModal } from "../../../../shared/CustomModal/customModal";
import { IconWithValue } from "../../../../shared/display/IconWithValue/iconWithValue";
import { CsprIcon } from "../../../../shared/icons/CsprIcon";
import { SectionHeader } from "../../../../shared/typography/sectionHeader";
import { StakeStage } from "../stakeForm";
import { ModalInfoItem } from "./ModalInfoItem/modalInfoItem";

export const StakeModal = ({
  isOpen,
  onClose,
  amount,
  fee,
  cancelled,
  stage,
  onSubmit,
  error,
}: {
  isOpen: boolean;
  amount: number;
  fee: number;
  cancelled: boolean;
  stage: StakeStage;
  onClose: () => void;
  onSubmit: () => any;
  error: string;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const bgColor = useColorModeValue("background.light", "background.dark");
  const textColor = useColorModeValue("textPrimary.light", "textPrimary.dark");

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <CustomModal
      isOpen={isOpen}
      hideHeader={stage == StakeStage.SIGN}
      onClose={onClose}
      onOpen={() => {}}
      header={"Confirm deploy"}
      footer={
        stage == StakeStage.NONE ? (
          <>
            <Grid templateColumns="1fr 1fr" gap="8px">
              <Button
                h="50px"
                padding="0"
                border="1px solid"
                borderColor={borderColor}
                _hover={{ opacity: 0.8 }}
                borderRadius="4px"
                fontWeight="normal"
                color="white"
                variant="ghost-dark"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                h="50px"
                padding="0"
                bg="white"
                fontWeight="normal"
                _hover={{ opacity: 0.8 }}
                borderRadius="4px"
                color="black"
                onClick={onSubmit}
              >
                Confirm stake
              </Button>
            </Grid>
            {error && (
              <Box mt="16px" color="red">
                {error}
              </Box>
            )}
          </>
        ) : (
          cancelled && (
            <>
              <Button
                h="50px"
                padding="0"
                bg="brand.500"
                fontWeight="normal"
                _hover={{ opacity: 0.8 }}
                borderRadius="4px"
                color="white"
                onClick={onClose}
              >
                Proceed
              </Button>
            </>
          )
        )
      }
      body={
        <>
          <Flex flexDir="column" gap="16px" padding="0px 0px ">
            {stage == StakeStage.NONE && (
              <>
                <ModalInfoItem
                  label={"CasperArmy Validator address"}
                  item={
                    <Flex justify="space-between">
                      {CASPERARMY_VALIDATOR_ADDRESS.slice(0, 15) +
                        " ... " +
                        CASPERARMY_VALIDATOR_ADDRESS.slice(-15)}
                    </Flex>
                  }
                />
                <ModalInfoItem
                  label={"Amount to delegate"}
                  item={
                    <Flex>
                      <IconWithValue icon={<CsprIcon />} value={amount} />
                    </Flex>
                  }
                />
                <ModalInfoItem
                  label={"Network fee"}
                  item={
                    <Flex>
                      <IconWithValue icon={<CsprIcon />} value={fee} />
                    </Flex>
                  }
                />
              </>
            )}
            {stage != StakeStage.NONE && (
              <Flex
                align="center"
                py="30px"
                flexDir="column"
                gap="10px"
                justify="center"
              >
                {stage != StakeStage.FINISH &&
                  (cancelled ? (
                    <>
                      <CloseIcon w="20px" color="#e74c3c" />
                      <Box mt="10px">Staking process has been cancelled.</Box>
                    </>
                  ) : (
                    <>
                      <Spinner color="brandSecondary.500" />
                      <Box mt="10px">
                        {stage == StakeStage.SIGN
                          ? "Confirm transaction in your wallet window."
                          : "Deploying..."}
                      </Box>
                    </>
                  ))}
                {stage == StakeStage.FINISH && <>Finished.</>}
              </Flex>
            )}
          </Flex>
        </>
      }
    ></CustomModal>
  );
};
