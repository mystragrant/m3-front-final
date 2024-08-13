import { Calculator } from "../../components/pages/staking/Calculator/calculator";
import { MyDelegations } from "../../components/pages/staking/MyDelegations/myDelegations";

import { PageContainer } from "../../components/shared/containers/pageContainer";
import { usePrivatePage } from "../../hooks/usePrivatePage";

export const MyDelgationsPage = () => {
  usePrivatePage();

  return (
    <PageContainer>
      <MyDelegations />
    </PageContainer>
  );
};
