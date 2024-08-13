import { Flex, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Ranking } from "../../../components/pages/dashboard/leaderboards/Ranking/ranking";
import { PageContainer } from "../../../components/shared/containers/pageContainer";

export const LeaderboardsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <Ranking />
      </PageContainer>
    </>
  );
};
