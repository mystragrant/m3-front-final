import { Box, Flex, Grid } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const ProjectAvatar = ({
  url,
  chainId,
  borderSize = 0,
  bgColor = "white",
  size,
}: {
  url: string;
  chainId: string;
  bgColor?: string;
  borderSize?: number;
  size: number;
}) => {
  return (
    <Flex
      boxSize={size}
      bgImage={url}
      bgSize="cover"
      bgPos="center"
      borderRadius="50%"
      borderWidth={borderSize}
      borderColor={bgColor}
    ></Flex>
  );
};

export const ProjectSquareItem = ({
  bgImage,
  avatar,
  chainId,
  name,
  verified,
  text,
}: {
  bgImage: string;
  avatar: string;
  chainId: string;
  name: string;
  verified: boolean;
  text: string;
}) => {
  const { borderPrimary, backgroundPrimary } = useThemeProvider();

  return (
    <Grid
      templateRows="70px 1fr"
      pb="20px"
      border="1px solid"
      borderColor={borderPrimary}
      borderRadius={"8px"}
    >
      <Box
        borderTopRadius={"inherit"}
        bgImage={bgImage}
        bgSize="cover"
        bgPos="center"
        pos="relative"
      >
        <Box pos="absolute" left="16px" bottom="-26px">
          <ProjectAvatar
            size={12}
            borderSize={4}
            bgColor={backgroundPrimary}
            chainId="1"
            url={avatar}
          />
        </Box>
      </Box>
      <Flex flexDir="column" pt="30px" px="20px">
        <Flex align="center" fontFamily="Inter" fontSize="14px" gap="6px">
          {name}
          {verified && (
            <CheckCircleIcon
              bg="white"
              borderRadius="50%"
              w="11px"
              h="11px"
              color="brandSecondary.500"
            />
          )}
        </Flex>
        <Flex
          fontSize="14px"
          opacity={"0.7"}
          mt="6px"
          fontFamily="Inter"
          lineHeight={"120%"}
        >
          {" "}
          {text}
        </Flex>
      </Flex>
    </Grid>
  );
};

export const FeaturedProjects = () => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Flex
      flexDir="column"
      py="40px"
      borderBottom="1px solid"
      borderColor={borderPrimary}
      px="50px"
    >
      <Flex justify="space-between" align="center">
        <Box fontFamily="Inter" fontSize="18px">
          Featured Projects
        </Box>

        <Box textDecor={"underline"} fontFamily="Inter" fontSize="14px">
          More projects
        </Box>
      </Flex>
      <Grid mt="30px" templateColumns={"1fr 1fr 1fr"} gap="20px">
        <ProjectSquareItem
          avatar="/assets/images/nft-mocks/bird.png"
          bgImage="/assets/images/nft-mocks/space.png"
          text=" Building a safe haven for two of crypto's most innovative projects."
          chainId="1"
          verified={true}
          name="PhoenixBlaster"
        />
        <ProjectSquareItem
          avatar="/assets/images/nft-mocks/whale.png"
          bgImage="/assets/images/nft-mocks/banner.png"
          text="We are very whalesome project, powered by ocean."
          chainId="1"
          verified={true}
          name="Whalesome"
        />
        <ProjectSquareItem
          avatar="/assets/images/nft-mocks/bayc.jpg"
          bgImage="/assets/images/nft-mocks/obrazek.png"
          text="Stealing your private keys on our exclusive boat club"
          chainId="1"
          verified={true}
          name="MonKeys"
        />
      </Grid>
    </Flex>
  );
};
