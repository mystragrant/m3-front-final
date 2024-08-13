import { Box, Flex, Grid, Image, border } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

const ChatItem = () => {
  const {
    backgroundSecondary,
    textSecondary,
    backgroundTertiary,
    borderPrimary,
  } = useThemeProvider();

  return (
    <Grid
      w="300px"
      h="350px"
      bg={"#171717"}
      border="1px solid"
      borderBottom="none"
      borderColor={borderPrimary}
      templateRows="50px 1fr 60px"
      borderTopRadius="10px"
    >
      <Flex
        borderTopRadius="10px"
        justify="space-between"
        align={"center"}
        bg="#1E1E1E"
        borderBottom="1px solid"
        borderColor={borderPrimary}
        px="20px"
      >
        <Flex align="center" gap="14px">
          <Box
            boxSize="32px"
            bg="rgba(0,0,0,0.2)"
            border="1px solid"
            borderColor={borderPrimary}
            borderRadius="50%"
          />
          <Flex justify="center" flexDir="column">
            <Box
              fontWeight="medium"
              lineHeight={"110%"}
              fontFamily="Inter"
              fontSize="14px"
            >
              WhoCares44
            </Box>
            <Box
              lineHeight="120%"
              fontWeight="medium"
              fontFamily="Inter"
              fontSize="11px"
              color={textSecondary}
            >
              Active 2h ago
            </Box>
          </Flex>
        </Flex>
        <Flex align="center" gap="10px">
          <Image src="/assets/icons/minus.svg" />{" "}
          <Image src="/assets/icons/close.svg" />
        </Flex>
      </Flex>
    </Grid>
  );
};

export const FloatingChat = () => {
  const {
    backgroundSecondary,
    textSecondary,
    backgroundTertiary,
    borderPrimary,
  } = useThemeProvider();

  return (
    <Flex pos="fixed" zIndex={"99"} bottom="0" right="40px" gap="20px">
      {/* <ChatItem />
      <Flex flexDir="column" mb="20px" gap="20px" justify="flex-end">
        {[1, 2, 3, 4, 5].map(() => {
          return (
            <Box
              boxSize="50px"
              bg="rgba(0,0,0,0.2)"
              border="1px solid"
              borderColor={borderPrimary}
              borderRadius="50%"
            />
          );
        })}
      </Flex> */}
    </Flex>
  );
};
