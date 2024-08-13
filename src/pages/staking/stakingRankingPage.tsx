import { Flex, Grid } from "@chakra-ui/react";
import { Delegators } from "../../components/pages/staking/Delegators/delegators";
import { NodeDetails } from "../../components/pages/staking/NodeDetails/nodeDetails";
import { PageContainer } from "../../components/shared/containers/pageContainer";

export const StakingRankingPage = () => {
  return (
    <PageContainer>
      <Grid pos="relative" templateColumns="1fr 1fr" gap="40px">
        <Flex flexDir="column">
          <Flex flexDir="column" pos="sticky" top="116px">
            <NodeDetails />
          </Flex>
        </Flex>
        <Delegators />
      </Grid>
    </PageContainer>
  );
};
