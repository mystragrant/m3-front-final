import { Flex } from "@chakra-ui/react";
import { DaoHeader } from "../../components/pages/dao/home/DaoHeader/daoHeader";
import { DaoList } from "../../components/pages/dao/home/DaoList/daoList";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";

export const DaoPage = () => {
  const { borderPrimary } = useThemeProvider();

  return (
    <Flex flexDir="column">
      <PageContainer noTopMargin noBottomMargin>
        <Flex flexDir="column" w="100%" zIndex="100">
          <DaoHeader />
        </Flex>
      </PageContainer>
      <Flex flexDir="column" borderTop="1px solid" borderColor={borderPrimary}>
        <PageContainer>
          <DaoList />
        </PageContainer>
      </Flex>
    </Flex>
  );
};
