import { Box, Flex, Grid } from "@chakra-ui/react";
import { Calculator } from "../../components/pages/staking/Calculator/calculator";
import { Delegators } from "../../components/pages/staking/Delegators/delegators";
import { MyDelegations } from "../../components/pages/staking/MyDelegations/myDelegations";
import { NodeDetails } from "../../components/pages/staking/NodeDetails/nodeDetails";
import { StakeForm } from "../../components/pages/staking/StakeForm/stakeForm";
import { TopTabs } from "../../components/pages/staking/TopTabs/topTabs";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { TabContainer } from "../../components/shared/containers/tabContainer";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";

export const StakingPage = () => {
  const { backgroundPrimary, borderPrimary } = useThemeProvider();

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid templateColumns=" 1fr 600px" gap="60px">
        <Flex flexDir="column" mt="40px" zIndex="1" pos="relative">
          <StakeForm />
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
          overflowY="scroll"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          flexDir="column"
          maxH="calc(100vh - 74px)"
          pos="sticky"
          top="74px"
          minH="calc(100vh - 74px)"
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          pt="40px"
        >
          <NodeDetails />
          <Delegators />
        </Flex>
      </Grid>
    </PageContainer>
  );
};
