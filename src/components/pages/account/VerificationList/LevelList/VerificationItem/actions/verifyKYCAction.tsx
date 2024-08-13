import { Button, Flex } from "@chakra-ui/react";

export const VerifyKYCAction = () => {
  return (
    <Flex flexDir="column" gap="40px">
      <Flex>
        <Button
          color="black"
          bg="#EFEFEF"
          fontSize="14px"
          fontWeight="400"
          fontFamily="Inter"
          disabled={true}
        >
          Coming Soon
        </Button>
      </Flex>
    </Flex>
  );
};
