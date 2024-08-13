import { CopyIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import { CASPERARMY_VALIDATOR_ADDRESS } from "../../../../../constants/staking";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";

export const ValidatorAddress = ({ apy }: { apy: number }) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const bgColor = useColorModeValue(
    "backgroundSecondary.light",
    "backgroundSecondary.dark",
  );
  const textSeconadry = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const casperLogoSrc = useColorModeValue(
    "/assets/brand/mystra-black.svg",
    "/assets/brand/mystra-white.svg",
  );

  const {
    backgroundSecondary,
    backgroundTertiary,
    backgroundPrimary,
    textSecondary,
    borderPrimary,
  } = useThemeProvider();

  return (
    <Grid
      h="54px"
      border="1px solid"
      borderColor={borderPrimary}
      borderRadius="8px"
      templateColumns=" auto 1fr"
      overflow="hidden"
    >
      <Flex
        borderRight="1px solid"
        borderColor={borderPrimary}
        align="center"
        px="10px"
        gap="10px"
        pr="20px"
      >
        <Image
          src="/assets/logos/casper-red.png"
          bg="white"
          borderRadius="4px"
          boxSize="28px"
          ml="4px"
        ></Image>
        <Flex
          fontSize="14px"
          justify="center"
          fontFamily="Inter"
          flexDir="column"
        >
          <Box mt="2px" lineHeight="100%">
            Casper Network
          </Box>
          <Flex fontSize="10px" align="flex-end" gap="6px" lineHeight="160%">
            <Box transform="translateY(1px)">APY</Box>
            <Box
              fontWeight="700"
              fontFamily="Space Mono"
              fontSize="12px"
              color="brandSecondary.500"
            >
              {apy.toFixed(2)}%
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg={backgroundTertiary}
        fontSize="14px"
        justify="center"
        fontWeight="400"
        fontFamily="Inter"
        flexDir="column"
        px="14px"
      >
        <Box>Mystra Casper Validator</Box>
        <Box fontFamily="Space Mono" fontSize="12px" color={textSeconadry}>
          {CASPERARMY_VALIDATOR_ADDRESS.slice(0, 15) +
            "..." +
            CASPERARMY_VALIDATOR_ADDRESS.slice(-15)}
        </Box>
      </Flex>
    </Grid>
  );
};
