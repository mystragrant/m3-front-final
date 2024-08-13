import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Spinner } from "@chakra-ui/react";

export const ProcessingAction = ({
  success,
  processing,
  processingText,
  successText,
}: {
  success: boolean;
  processing: boolean;
  processingText: string;
  successText: string;
}) => {
  return (
    <>
      {success && (
        <Flex
          align="center"
          gap="10px"
          color="brandSecondary.500"
          h="40px"
          fontSize="14px"
          fontFamily="Inter"
        >
          <CheckIcon color="brandSecondary.500" /> {successText}
        </Flex>
      )}
      {processing && (
        <Flex
          align="center"
          gap="10px"
          h="40px"
          fontSize="14px"
          fontFamily="Inter"
        >
          <Spinner boxSize="14px" color="white" /> {processingText}
        </Flex>
      )}
    </>
  );
};
