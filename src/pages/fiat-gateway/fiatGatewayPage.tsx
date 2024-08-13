import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { GatewayForm } from "../../components/pages/fiat-gateway/GatewayForm/gatewayForm";

import { useThemeProvider } from "../../providers/Theme/useThemeProvider";

export const FiatGatewayPage = () => {
  const { backgroundPrimary, borderPrimary, textSecondary } =
    useThemeProvider();

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid templateColumns="500px 1fr" gap="80px" pos="relative">
        <Grid zIndex="1" w="100%" templateRows={"auto 1fr"} pos="relative">
          <Flex mt="40px" zIndex="1" flexDir="column">
            <GatewayForm />
            <Flex
              gap="20px"
              mt="60px"
              overflow="hidden"
              pos="relative"
              borderRadius={"8px"}
              padding="20px"
              align="center"
              px="40px"
            >
              <Image w="100px" src="/assets/elements/promo/casper.png" />
              <Flex
                boxSize="300px"
                pos="absolute"
                zIndex="0"
                left="-150px"
                top="100px"
                bottom="0"
                margin="auto"
                bg="white"
                filter="blur(150px)"
                borderRadius="50%"
                opacity="0.2"
              ></Flex>
              <Box fontFamily="Inter" fontSize="14px">
                Discover the best and most affordable Crypto Payment Gateway in
                the market, offering seamless Casper Token purchases with just a{" "}
                <Box color="brandSecondary.500" display="inline">
                  2% Fee
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Box
            boxSize="500px"
            pos="fixed"
            zIndex="-1"
            right="40%"
            top="100px"
            bottom="0"
            margin="auto"
            bg="white"
            filter="blur(150px)"
            borderRadius="50%"
            opacity="0.02"
          ></Box>
        </Grid>

        <Flex
          flexDir="column"
          minH="calc(100vh - 74px)"
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          pos="relative"
          pt="60px"
          px="60px"
        >
          <Flex
            fontSize="38px"
            fontFamily="Inter"
            letterSpacing="-0.64px"
            lineHeight="48px"
          >
            Your Gateway to CSPR: USD, EUR, PLN Accepted!
          </Flex>
          <Box
            mt="20px"
            fontFamily="Inter"
            color={textSecondary}
            fontSize="18px"
          >
            Now, purchase CSPRs effortlessly using three different currencies!
          </Box>
          <Flex mt="40px" align="center" gap="20px">
            <Image h="24px" src="/assets/logos/visa.png" />
            <Image h="34px" src="/assets/logos/mastercard.svg" />
            <Image h="24px" src="/assets/logos/blik.svg" />
            <Image h="55px" src="/assets/logos/gpay.svg" />
            <Image h="55px" src="/assets/logos/applepay.svg" />
          </Flex>
        </Flex>
      </Grid>
    </PageContainer>
  );
};
