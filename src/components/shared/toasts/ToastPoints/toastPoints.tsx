import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export const ToastPoints = ({
  closeToast,
  toastProps,
  description,
  amount,
}: {
  closeToast: any;
  toastProps: any;
  description: string;
  amount: number;
}) => {
  const bgColor = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );

  return (
    <Flex gap="20px">
      <Box
        padding="1px"
        bg={
          "linear-gradient(168.6deg, rgba(255, 235, 235, 0.22) 18.9%, rgba(255, 235, 235, 0) 84.13%)"
        }
        borderRadius="50%"
      >
        <Flex
          boxSize="60px"
          fontSize="22px"
          fontFamily="Sora"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          border="1px solid #FFEBEB22"
          bg={bgColor}
        >
          <Box
            bg="linear-gradient(116.89deg, #964BF7 33.47%, #2FB88E 74.22%)"
            backgroundClip="text"
            fill="transparent"
            mr="2px"
          >
            +{amount}
          </Box>
        </Flex>
      </Box>
      <Flex flexDir="column" color="white" gap="0px" justify="center">
        <Box fontSize="18px">You have got {amount} points!</Box>
        <Box fontSize="14px" color="#73767D">
          {description}
        </Box>
      </Flex>
    </Flex>
  );
};
