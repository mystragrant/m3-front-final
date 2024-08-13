import { Box, Flex, Grid } from "@chakra-ui/react";
import { BlocksList } from "../../components/pages/explorer/BlocksList/blocksList";
import { DeploysList } from "../../components/pages/explorer/DeploysList/validatorList";
import { ExplorerHeader } from "../../components/pages/explorer/Header/explorerHeader";
import { TopCards } from "../../components/pages/explorer/TopCards/topCards";
import { ValidatorList } from "../../components/pages/explorer/ValidatorList/validatorList";
import { CenterContainer } from "../../components/shared/containers/CenterContainer/centerContainter";
import { ExplorerThemeProvider } from "../../providers/ExplorerTheme/useExplorerTheme";

export const ExplorerCasperPage = () => {
  return (
    <ExplorerThemeProvider themeColor="#FF3E3E">
      <ExplorerHeader />
      <TopCards />
      <BlocksList />

      <CenterContainer>
        <Grid templateColumns={"1fr 1fr"} gap="16px" mb="40px">
          <ValidatorList />
          <DeploysList />
        </Grid>
      </CenterContainer>
    </ExplorerThemeProvider>
  );
};
