import { border, Box, Center, Flex, Grid } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { CenterContainer } from "../../../shared/containers/CenterContainer/centerContainter";
import { CardItem } from "./CardItem/cardItem";

export const TopCards = () => {
  const { backgroundPrimary, borderPrimary } = useThemeProvider();

  return (
    <CenterContainer>
      <Flex pos="absolute" w="100%" left="0" top="-150px" flexDir="column">
        <CenterContainer>
          <Box fontSize="20px" mb="20px" fontFamily="Inter">
            Overview
          </Box>
          <Grid
            templateColumns={"1fr 1fr 1fr 1fr 1fr"}
            overflow="hidden"
            templateRows={"1fr 1fr "}
            gridGap="1px"
            border="1px solid"
            borderRadius="8px"
            bg={borderPrimary}
            borderColor={borderPrimary}
          >
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="$0.0319"
                header="CSPR price"
                label="$362,571,163 Market Cap"
              />
            </Grid>
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="11,358,333,964"
                header="Circulating Supply"
                label="94.2% of 12,052,278,664 Total"
              />
            </Grid>
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="100"
                header="Current validators"
                label="121 active bids"
              />
            </Grid>
            <Grid
              gridRow="span 2"
              gridColumn="span 2"
              bg={backgroundPrimary}
            ></Grid>
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="2,102,207"
                header="Block Height"
                label="1 min ago"
              />
            </Grid>
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="10.74%"
                header="APY"
                label="Annual Percentage Yield"
              />
            </Grid>
            <Grid bg={backgroundPrimary}>
              <CardItem
                value="8,978,886,252"
                header="Total stake"
                label="74.51% of Total Supply"
              />
            </Grid>
          </Grid>
        </CenterContainer>
      </Flex>
    </CenterContainer>
  );
};
