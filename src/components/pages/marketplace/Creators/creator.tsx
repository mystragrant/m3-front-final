import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { CardContainer } from "../../../shared/containers/cardContainer";

export const Creator = ({
  nftAmount,
  collections,
  name,
  avatar,
  verified,
  background,
}: {
  nftAmount: number;
  collections: number;
  name: string;
  avatar: string;
  verified: boolean;
  background: string;
}) => {
  return (
    <CardContainer paddingSize={0}>
      <Grid h="280px" gridTemplateRows="1fr 1fr" borderRadius="inherit">
        <Box
          bgImage={background}
          bgPos="center"
          bgSize="cover"
          borderTopLeftRadius="inherit"
          borderTopRightRadius="inherit"
        />
        <Grid
          textAlign="center"
          position="relative"
          alignItems="flex-start"
          justifyContent="center"
          borderRadius="inherit"
          gridGap="20px"
          color="black"
        >
          <Box
            position="absolute"
            left="0"
            top="-40px"
            right="0"
            margin=" 0 auto"
            w="69px"
          >
            <Box position="relative">
              <Image
                src={avatar}
                boxSize="65px"
                border="2px solid white"
                borderRadius="50%"
              />
              {verified && (
                <Image
                  pos="absolute"
                  right="15%"
                  bottom="4px"
                  src="/assets/icons/verified.svg"
                />
              )}
            </Box>
          </Box>
          <Flex m="40px" gap="10px" flexDir="column" textAlign="center">
            <Box lineHeight="120%" fontSize="17px" fontWeight="700">
              {name}
            </Box>
            <Flex fontSize="13px" color="#787878" flexDir="column">
              <Box>{nftAmount} NFTs</Box>
              <Box>{collections} Collections</Box>
            </Flex>
          </Flex>

          <Flex
            justify="center"
            align="center"
            w="33px"
            h="30px"
            bg="black"
            position="absolute"
            bottom="-15px"
            borderRadius="4px"
            left="0"
            right="0"
            margin="auto"
          >
            <Image src="/assets/icons/arrow-right.svg" />
          </Flex>
        </Grid>
      </Grid>
    </CardContainer>
  );
};
