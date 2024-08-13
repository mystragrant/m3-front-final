import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { VerificationInfo } from "../../components/pages/account/verificationInfo/verificationInfo";
import { VerificationList } from "../../components/pages/account/VerificationList/verificationList";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { usePrivatePage } from "../../hooks/usePrivatePage";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { DaoIcon } from "../../components/shared/icons/navigation/daoIcon";
import { ChevronRightIcon, LockIcon, TimeIcon } from "@chakra-ui/icons";
import { StakingIcon } from "../../components/shared/icons/navigation/stakingIcon";
import { BridgeIcon } from "../../components/shared/icons/navigation/bridgeIcon";
import { SwapIcon } from "../../components/shared/icons/navigation/swapIcon";
import { FiatIcon } from "../../components/shared/icons/navigation/fiatIcon";
import { ExplorerIcon } from "../../components/shared/icons/navigation/explorerIcon";

enum Pages {
  STAKING,
  BRIDGE,
  SWAP,
  EXPLORER,
  BUY,
}

interface CreatorStudioRoute {
  pageHref: string;
  needsTicket: boolean;
  label: string;
  name: string;
  icon: string | React.ReactNode;
  page: Pages;
  soon?: boolean;
}

const routes: CreatorStudioRoute[] = [
  {
    pageHref: "/staking",
    needsTicket: false,
    name: "Stake",
    label: "make crypto work for you",
    icon: <StakingIcon customColor="#54E2B7" customSize={22} />,
    page: Pages.STAKING,
  },

  {
    pageHref: "/bridge",
    needsTicket: false,
    name: "Bridge",
    label: "transfer tokens between networks",
    icon: <BridgeIcon customColor="#54E2B7" customSize={22} />,
    page: Pages.BRIDGE,
  },
  {
    pageHref: "/fiat-gateway",
    needsTicket: false,
    name: "Fiat Gateway",
    label: "buy crypto with credit card!",
    icon: <FiatIcon customColor="#54E2B7" customSize={22} />,
    page: Pages.BUY,
  },
  {
    pageHref: "/swap",
    needsTicket: false,
    name: "Dex/Swap",
    label: "trade your tokens!",
    icon: <SwapIcon customColor="#54E2B7" customSize={20} />,
    page: Pages.SWAP,
    soon: true,
  },
  {
    pageHref: "/explorer",
    needsTicket: false,
    name: "Chain Explorer",
    label: "view blockchain from inside!",
    icon: <ExplorerIcon customColor="#54E2B7" />,
    page: Pages.EXPLORER,
    soon: true,
  },
];

export const SubPageTitle = ({
  name,
  description,
  image,
}: {
  name: string;
  description: React.ReactNode;
  image: React.ReactNode;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex fontFamily={"Inter"} flexDir="column">
      <Flex fontSize="40px" fontWeight="bold">
        {name}
      </Flex>
      <Flex fontSize="20px" color={textSecondary}>
        {description}
      </Flex>
      <Flex mt="30px" h="200px" flexDir="column">
        {image}
      </Flex>
    </Flex>
  );
};

export const ToolsPage = () => {
  const { backgroundPrimary, borderPrimary, textSecondary } =
    useThemeProvider();

  const [currentPage, setCurrentPage] = useState<Pages | null>(null);

  const navigate = useNavigate();

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid templateColumns=" 1fr 600px" gap="80px">
        <Flex flexDir="column" mt="40px" zIndex="1" pos="relative">
          <Box fontSize="30px">What to do?</Box>
          <Flex flexDir="column" mt="20px">
            {routes.map((route) => {
              return (
                <Box
                  onClick={
                    route.soon ? () => {} : () => navigate(route.pageHref)
                  }
                  cursor={route.soon ? "default" : "pointer"}
                  opacity={route.soon ? "0.5" : "1"}
                >
                  <Flex
                    py="6px"
                    flexDir="column"
                    onMouseEnter={() => setCurrentPage(route.page)}
                    onMouseLeave={() =>
                      setCurrentPage((prev) =>
                        prev != route.page ? prev : null,
                      )
                    }
                  >
                    <Flex
                      border="1px solid"
                      borderColor={borderPrimary}
                      gap="20px"
                      align="center"
                      px="30px"
                      justify="space-between"
                      py="20px"
                      borderRadius="8px"
                      bg="rgba(0,0,0,0.2)"
                      _hover={{ bg: "rgba(0,0,0,0.05)" }}
                    >
                      <Flex align="center" gap="20px">
                        <Flex align="center" justify="center" w="24px">
                          {route.icon}
                        </Flex>
                        <Flex fontFamily="Inter" fontSize="16px">
                          <Box fontWeight="bold">{route.name}</Box>{" "}
                          &nbsp;-&nbsp;
                          <Box>{route.label}</Box>
                        </Flex>
                      </Flex>
                      {route.soon ? (
                        <Flex
                          align="center"
                          gap="4px"
                          fontSize="12px"
                          fontWeight="300"
                          textTransform="uppercase"
                        >
                          <TimeIcon h="20px" /> Soon
                        </Flex>
                      ) : (
                        <ChevronRightIcon boxSize="20px" />
                      )}
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
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
            pointerEvents="none"
            filter="blur(150px)"
            borderRadius="50%"
            opacity="0.03"
          ></Box>
        </Flex>
        <Flex
          flexDir="column"
          minH="calc(100vh - 74px)"
          maxH="calc(100vh - 74px)"
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          pos="relative"
          justify="center"
          px="60px"
        >
          {currentPage == null && (
            <>
              <Flex
                fontFamily="Plus Jakarta Sans"
                lineHeight={"110%"}
                fontSize="43px"
                pos="relative"
                color="rgba(255,255,255,0.8)"
                maxW="390px"
                alignSelf={"flex-start"}
              >
                <Box>
                  All{" "}
                  <Box fontWeight="bold" color="white" display={"inline"}>
                    {" "}
                    tools you need{" "}
                  </Box>
                  in Crypto Journey!
                </Box>
                <Image
                  src="/assets/brand/planet-green.png"
                  pos="absolute"
                  maxW="190px"
                  top="-80px"
                  right="-80px"
                  zIndex={-1}
                />
                <Image
                  src="/assets/brand/star-white.svg"
                  pos="absolute"
                  w="60px"
                  top="-14px"
                  right="-50px"
                  zIndex={-1}
                />
                <Image
                  src="/assets/brand/star-white.svg"
                  pos="absolute"
                  w="15px"
                  top="-40px"
                  right="10px"
                  zIndex={-1}
                />
              </Flex>
              <Flex align="center" gap="20px" h="40px" mt="80px">
                <Image src="/assets/icons/hover-modules.svg" />
                <Box
                  color={textSecondary}
                  maxW="220px"
                  fontFamily="Inter"
                  fontSize="16px"
                >
                  <Box fontWeight="bold" color="white" display="inline">
                    Hover over buttons
                  </Box>{" "}
                  on left to learn details.
                </Box>
              </Flex>
            </>
          )}
          {currentPage == Pages.STAKING && (
            <SubPageTitle
              name={"Staking"}
              description={
                "Deposit your funds for how much time you want and receive passive income in crypto!"
              }
              image={<Image src="/assets/elements/staking-element.svg" />}
            />
          )}
          {currentPage == Pages.BRIDGE && (
            <SubPageTitle
              name={"Bridge"}
              description={
                "Crypto assets are split between many networks, here you can safely transfer between them!"
              }
              image={<Image src="/assets/elements/bridge-element.svg" />}
            />
          )}
          {currentPage == Pages.SWAP && (
            <SubPageTitle
              name={"Dex & Swap"}
              description={
                "Safely trade your coins in seconds with decentralized exchange!"
              }
              image={<Image src="/assets/elements/dex-element.svg" />}
            />
          )}
          {currentPage == Pages.EXPLORER && (
            <SubPageTitle
              name={"Chain Explorer"}
              description={
                "Track and verify blockchain data like user transaction history or Network stats."
              }
              image={<Image src="/assets/elements/explorer-element.svg" />}
            />
          )}
          {currentPage == Pages.BUY && (
            <SubPageTitle
              name={"Fiat Gateway"}
              description={
                "Buy crypto in minutes safely using Credit Card, Apple Pay, GPay and more!"
              }
              image={<Image src="/assets/elements/buy-element.svg" />}
            />
          )}
        </Flex>
      </Grid>
    </PageContainer>
  );
};
