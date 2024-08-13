import { Box, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { trimHash } from "../../../utils/utils";
import { CenterContainer } from "../../shared/containers/CenterContainer/centerContainter";

export const CollectionHeader = ({
  name,
  creator,
  iconUrl,
  bannerUrl,
}: {
  name: string;
  creator: string;
  iconUrl: string;
  bannerUrl: string;
}) => {
  const bgColor = useColorModeValue("#111111", "#111111");

  const { textPrimary, textSecondary } = useThemeProvider();

  return (
    <Flex
      h="400px"
      mb="20px"
      zIndex="0"
      bgPos="center"
      bgSize="cover"
      transform="translateY(-50px)"
      bgColor={"#222"}
      bgImage={bannerUrl}
      flexDir="column"
    >
      <CenterContainer noRelative>
        <Flex
          pos="absolute"
          w="100vw"
          bottom="-1px"
          h="100%"
          right="0"
          left="0"
          zIndex="1"
          margin="auto"
          bg={`linear-gradient(180deg, rgba(255,255,255,0) 40%, ${bgColor} 100%)`}
        ></Flex>
        <Flex h="400px" flexDir="column" justifyContent="flex-end" zIndex="2">
          <Flex
            bgPos="center"
            zIndex="4"
            gap="30px"
            justify="flex-start"
            align="center"
          >
            <Grid
              transform="translateY(20px)"
              templateColumns="auto auto"
              gap="30px"
              alignItems="center"
            >
              <Flex
                bgSize="cover"
                bgPos="center"
                borderRadius="8px"
                bg="#333"
                bgImage={iconUrl}
                boxSize="160px"
              ></Flex>
              <Flex
                flexDir="column"
                justifySelf="flex-start"
                gap="4px"
                mb="25px"
              >
                <Box
                  fontSize="30px"
                  fontFamily="Inter"
                  lineHeight="40px"
                  color={textPrimary}
                >
                  {name}
                </Box>
                <Flex
                  align="flex-end"
                  fontFamily="Inter"
                  fontSize="14px"
                  gap="6px"
                >
                  <Flex color={textSecondary}>Creator:</Flex>
                  <Flex color={textPrimary}>{trimHash(creator)}</Flex>
                </Flex>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </CenterContainer>
    </Flex>
  );
};
