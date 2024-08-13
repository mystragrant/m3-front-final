import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import CountUp from "react-countup";
import { useNavigate } from "react-router";
import { useDashboardProvider } from "../../../../../providers/Dashboard/useDashboard";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import { StakingIconDashboard } from "../../../../shared/icons/dashboard/stakingIcon";

const StatItem = ({
  header,
  value,
  rows = 1,
  cols = 1,
  addon,
}: {
  header: string;
  value: number;
  rows?: number;
  cols?: number;
  addon?: React.ReactNode;
}) => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Flex
      border="1px solid"
      gridColumn={`span ${cols}`}
      gridRow={`span ${rows}`}
      borderColor={borderPrimary}
      pos="relative"
      overflow="hidden"
      role="group"
      borderRadius="8px"
      padding="24px"
      bg="#131313"
      flexDir="column"
    >
      <Flex justify="space-between" zIndex="1">
        <Flex
          color="white"
          lineHeight="100%"
          fontSize="32px"
          fontFamily="Space Mono"
        >
          <CountUp separator="," end={value} />
        </Flex>
        {addon}
      </Flex>
      <Flex
        zIndex="1"
        mt={addon ? "6px" : "10px"}
        fontFamily="Inter"
        fontWeight="400"
        fontSize="14px"
      >
        {header}
      </Flex>
      <Flex
        opacity="0"
        zIndex="0"
        _groupHover={{ opacity: "1" }}
        pos="absolute"
        boxSize="100px"
        bg="brandSecondary.500"
        filter="blur(60px)"
        bottom="-50px"
        transition="0.2s"
      ></Flex>
    </Flex>
  );
};

export const MystraStats = () => {
  const { borderPrimary } = useThemeProvider();

  const {
    users_amount,
    total_tickets,
    cspr_price,
    total_points,
    total_staked,
  } = useDashboardProvider();
  const navigate = useNavigate();

  const { isLogged } = useUserProvider();

  return (
    <Flex flexDir="column" mt="40px" mb="20px">
      <Flex fontSize="20px" mb="14px" fontFamily="Inter" fontWeight="400">
        Mystra stats
      </Flex>
      <Grid
        gap="8px"
        templateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr"
      >
        <StatItem
          header="Total users"
          cols={2}
          value={users_amount}
          addon={
            !isLogged ? (
              <Button
                border="1px solid #515151"
                borderRadius="4px"
                color="white"
                _hover={{
                  bg: "#EFEFEF",
                  borderColor: "#EFEFEF",
                  color: "black",
                }}
                h="36px"
                fontWeight="400"
                onClick={() => navigate("/?register=true")}
              >
                Create Account
              </Button>
            ) : (
              <></>
            )
          }
        />
        <Grid pos="relative" gridColumn={`span ${2}`} gridRow={`span ${2}`}>
          <Grid
            border="1px solid"
            borderRadius="8px"
            pos="relative"
            overflow="hidden"
            h="100%"
            w="100%"
            bg="#131313"
            borderColor={borderPrimary}
          >
            <Flex padding="24px" justify="space-between" flexDir="column">
              <Flex justify="flex-end">
                <Button
                  border="1px solid #515151"
                  borderRadius="4px"
                  color="white"
                  _hover={{
                    bg: "#EFEFEF",
                    borderColor: "#EFEFEF",

                    color: "black",
                  }}
                  role="group"
                  h="36px"
                  fontWeight="400"
                  gap="10px"
                  onClick={() => navigate("/staking")}
                >
                  Go to staking{" "}
                  <Box _groupHover={{ display: "none" }}>
                    <StakingIconDashboard
                      customSize={14}
                      customColor={"white"}
                    />
                  </Box>
                  <Box display="none" _groupHover={{ display: "block" }}>
                    <StakingIconDashboard
                      customSize={14}
                      customColor={"black"}
                    />
                  </Box>
                </Button>
              </Flex>
              <Flex flexDir="column">
                <Flex
                  fontSize="50px"
                  align="center"
                  lineHeight="100%"
                  zIndex="1"
                  fontWeight="400"
                  fontFamily="Space Mono"
                >
                  <Box color="brandSecondary.500">$</Box>
                  <CountUp end={total_staked * cspr_price} separator="," />
                </Flex>
                <Box fontSize="14px" fontFamily="Inter" mt="8px">
                  Total staking value
                </Box>
              </Flex>
            </Flex>
            <Box
              pos="absolute"
              boxSize="300px"
              borderRadius="50%"
              bg="brandSecondary.500"
              opacity="0.2"
              bottom="-80%"
              filter={"blur(50px)"}
              right="0"
              left="0"
              margin="auto"
            ></Box>

            <Image
              src="/assets/brand/star.svg"
              pos="absolute"
              w="20px"
              opacity="0.2"
              bottom="20px"
              right="0"
              left="0"
              margin="auto"
            />

            <Image
              src="/assets/brand/star.svg"
              pos="absolute"
              w="20px"
              opacity="0.2"
              bottom="100px"
              left="40px"
              margin="auto"
            />
            <Image
              src="/assets/brand/star.svg"
              pos="absolute"
              w="20px"
              opacity="0.2"
              bottom="90px"
              right="50px"
              margin="auto"
            />
            <Image
              src="/assets/brand/star.svg"
              pos="absolute"
              w="30px"
              opacity="0.2"
              bottom="120px"
              left="200px"
              margin="auto"
            />
            <Image
              src="/assets/brand/star.svg"
              pos="absolute"
              w="50px"
              opacity="0.1"
              bottom="150px"
              left="70px"
              margin="auto"
            />
          </Grid>
        </Grid>
        <StatItem
          header="NFT Tickets sold"
          cols={2}
          value={total_tickets}
          addon={
            <Button
              border="1px solid #515151"
              borderRadius="4px"
              color="white"
              _hover={{ bg: "#EFEFEF", borderColor: "#EFEFEF", color: "black" }}
              h="36px"
              fontWeight="400"
              onClick={() => navigate("/buy-ticket")}
            >
              Buy Ticket
            </Button>
          }
        />
        <StatItem header="Live mainnet products" cols={1} value={4} />
        <StatItem header="Integrated blockchains" cols={1} value={5} />
        <StatItem
          header="Global User Mystra Points"
          cols={2}
          value={total_points}
        />
      </Grid>
    </Flex>
  );
};
