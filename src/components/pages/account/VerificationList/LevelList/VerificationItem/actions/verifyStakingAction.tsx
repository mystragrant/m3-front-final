import { Box, Button, Flex } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";

import { useThemeProvider } from "../../../../../../../providers/Theme/useThemeProvider";

export const VerifyStakingAction = () => {
  const { cspr_staked_on_mysta_casper_node } = useUserProvider();
  const { backgroundTertiary, textSecondary } = useThemeProvider();

  return (
    <>
      <Flex flexDir="column" gap="40px">
        <Flex flexDir="column" gap="10px" justify="center ">
          <Flex fontFamily="Inter" fontSize="14px" align="center">
            <Box color={textSecondary}>You already stake&nbsp;</Box>
            <Box fontFamily="Space Mono" mr="2px">
              {cspr_staked_on_mysta_casper_node}
            </Box>
            CSPR
          </Flex>
          <Flex
            w="100%"
            borderRadius="2px"
            h="8px"
            pos="relative"
            bg={backgroundTertiary}
            overflow="hidden"
          >
            <Box
              h="100%"
              bg="brandSecondary.500"
              w={
                cspr_staked_on_mysta_casper_node < 5000
                  ? `${(cspr_staked_on_mysta_casper_node / 5000) * 100}%`
                  : "100%"
              }
            ></Box>
          </Flex>
        </Flex>
        <Flex>
          <Button
            color="black"
            bg="#EFEFEF"
            fontSize="14px"
            fontWeight="400"
            fontFamily="Inter"
          >
            Stake CSPR
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
