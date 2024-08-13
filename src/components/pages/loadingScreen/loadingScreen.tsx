import { Box, Flex, Spinner } from "@chakra-ui/react";
import { PageContainer } from "../../shared/containers/pageContainer";

export const LoadingScreen = () => {
  return (
    <PageContainer noBottomMargin noTopMargin>
      <Flex w="100%" h="calc(100vh - 74px)" align="center" justify="center">
        <Spinner />
      </Flex>
    </PageContainer>
  );
};
