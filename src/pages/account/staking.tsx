import { Flex, Grid } from "@chakra-ui/react";
import { Calculator } from "../../components/pages/staking/Calculator/calculator";
import { Delegators } from "../../components/pages/staking/Delegators/delegators";
import { MyDelegations } from "../../components/pages/staking/MyDelegations/myDelegations";
import { NodeDetails } from "../../components/pages/staking/NodeDetails/nodeDetails";
import { StakeForm } from "../../components/pages/staking/StakeForm/stakeForm";
import { TopTabs } from "../../components/pages/staking/TopTabs/topTabs";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { TabContainer } from "../../components/shared/containers/tabContainer";

export const Staking = () => {
  return (
    <PageContainer>
      <TopTabs />
      <Flex flexDir="column" gap="30px">
        <Grid templateColumns="1fr 1fr" gap="40px">
          <StakeForm />
          <NodeDetails />
        </Grid>
      </Flex>
      <TabContainer
        items={[
          {
            label: "Calculator",
            content: <Calculator />,
          },
          {
            label: "My delegations",
            content: <MyDelegations />,
          },
          {
            label: "Delegators",
            content: <Delegators />,
          },
        ]}
      />
    </PageContainer>
  );
};
