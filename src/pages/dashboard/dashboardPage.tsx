import { News } from "../../components/pages/dashboard/News/news";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { PlatformPromo } from "../../components/pages/dashboard/home/PlatformPromo/platformPromo";
import { PlatformProducts } from "../../components/pages/dashboard/home/PlatformProducts/platformProducts";
import { MystraStats } from "../../components/pages/dashboard/home/MystraStats/mystraStats";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { PromoItem } from "../../components/pages/dashboard/home/PlatformPromo/PromoItem/promoItem";
import { useNavigate } from "react-router";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";

const hotProjects = [
  {
    image: "/assets/images/nft-mocks/gold-bird.png",
    name: "GoldBird",
    follows: 430,
  },
  {
    image: "/assets/images/nft-mocks/bayc.jpg",
    name: "MonKeys",
    follows: 200,
  },
  {
    image: "/assets/images/nft-mocks/bird.png",
    name: "PhoenixBlaster",
    follows: 643,
  },
  {
    image: "/assets/images/nft-mocks/gold-bird.png",
    name: "GoldBird",
    follows: 44,
  },
];
export const DashboardPage = () => {
  const navigate = useNavigate();

  const { borderPrimary } = useThemeProvider();

  return (
    <>
      <PageContainer>
        <PlatformProducts />
        <Grid templateColumns="1fr 400px" mt="60px" gap="100px" pos="relative">
          <News />
          <Flex pos="relative" w="100%">
            <Flex
              pos="sticky"
              w="100%"
              maxH="100vh"
              top="110px"
              flexDir="column"
            >
              <PromoItem
                header={"Invest in Mystra"}
                primaryAction={() => navigate("/buy-ticket")}
                secondaryAction={() => navigate("/buy-ticket")}
                primaryActionText="Learn More"
                secondaryActionText=""
                description="Buy an NFT Ticket and unlock all the platform's possibilities!"
                image={
                  <Image
                    src="/assets/elements/promo/ticket.png"
                    pos="absolute"
                    right="0"
                    w="270px"
                    bottom="0px"
                  />
                }
                color="#9F74FFEE"
              />
              <Flex
                fontSize="18px"
                fontWeight="600"
                fontFamily="Inter"
                mt="20px"
              >
                Might Interest You
              </Flex>
              <Flex flexDir="column" mt="20px" gap="20px">
                {hotProjects.map((item, index) => {
                  return (
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap="16px">
                        <Box
                          boxSize="44px"
                          borderRadius="50%"
                          bgImage={item.image}
                          bgPos="center"
                          bgSize="cover"
                        />
                        <Flex
                          justify="center"
                          lineHeight="110%"
                          fontFamily="Inter"
                          fontSize="16px"
                          flexDir="column"
                        >
                          <Box>{item.name}</Box>
                          <Box fontSize="14px" opacity="0.5">
                            {item.follows} Active users
                          </Box>
                        </Flex>
                      </Flex>
                      <Button
                        border="1px solid"
                        borderRadius="4px"
                        fontSize="12px"
                        fontWeight="300"
                        color="white"
                        borderColor={borderPrimary}
                      >
                        Follow
                      </Button>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </PageContainer>
    </>
  );
};
