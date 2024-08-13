import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TimeIcon } from "@chakra-ui/icons";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { DaoIcon } from "../../components/shared/icons/navigation/daoIcon";
import { GuildIcon } from "../../components/shared/icons/navigation/Guilds";
import { IncubationIcon } from "../../components/shared/icons/navigation/Incubation";
import { NFTIcon } from "../../components/shared/icons/navigation/nft";
import { ProjectsIcon } from "../../components/shared/icons/navigation/Projects";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
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
  soon: boolean;
}

const routes: CreatorStudioRoute[] = [
  {
    pageHref: "/creator-studio/nfts",
    needsTicket: false,
    name: "NFTs",
    label: "make highly customizable collections",
    icon: <NFTIcon customColor="#F6851B" customSize={22} />,
    page: Pages.STAKING,
    soon: false,
  },

  {
    pageHref: "/bridge",
    needsTicket: false,
    name: "Coins",
    label: "craft your own customizable tokens",
    icon: <ProjectsIcon customColor="#F6851B" customSize={22} />,
    page: Pages.BRIDGE,
    soon: true,
  },
  {
    pageHref: "/swap",
    needsTicket: false,
    name: "Incubate Project",
    label: "kickstart your idea with Mystra!",
    icon: <IncubationIcon customColor="#F6851B" customSize={20} />,
    page: Pages.SWAP,
    soon: true,
  },
  {
    pageHref: "/explorer",
    needsTicket: false,
    name: "DAO",
    label: "your decentralized community!",
    icon: <DaoIcon customSize={22} customColor="#F6851B" />,
    page: Pages.EXPLORER,
    soon: true,
  },
  {
    pageHref: "/fiat-gateway",
    needsTicket: false,
    name: "Guild",
    label: "create venture capital with other people!",
    icon: <GuildIcon customColor="#F6851B" customSize={22} />,
    page: Pages.BUY,
    soon: true,
  },
];

export const CreatorStudioPage = () => {
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
                      <Flex
                        align="center"
                        gap="4px"
                        fontSize="12px"
                        fontWeight="300"
                        textTransform="uppercase"
                      >
                        <TimeIcon h="20px" /> Soon
                      </Flex>
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
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          pos="relative"
          justify="center"
          px="60px"
        >
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
                Discover the{" "}
                <Box fontWeight="bold" color="white" display={"inline"}>
                  {" "}
                  Creator Studio{" "}
                </Box>
              </Box>
              <Image
                src="/assets/brand/planet-orange.png"
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
        </Flex>
      </Grid>
    </PageContainer>
  );
};
