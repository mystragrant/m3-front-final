import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export const LoginBlockOverlay = ({ blocked }: { blocked: boolean }) => {
  const overlayColor = useColorModeValue("rgba(0,0,0,0.35)", "rgba(0,0,0,0.7)");

  return blocked ? (
    <Flex
      align="center"
      justify="center"
      bg={overlayColor}
      zIndex="10"
      w="100%"
      h="100%"
      borderRadius="inherit"
      pos="absolute"
      left="0"
      right="0"
      backdropFilter={"blur(50px)"}
    >
      <Box
        color="white"
        fontWeight="bold"
        fontSize="20px"
        maxW="300px"
        textAlign="center"
      >
        {" "}
        Login with CasperSigner to use this module
      </Box>
    </Flex>
  ) : (
    <></>
  );
};
