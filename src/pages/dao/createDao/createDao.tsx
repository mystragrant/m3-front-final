import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { PageContainer } from "../../../components/shared/containers/pageContainer";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const CreateDaoPage = () => {
  const [step, setStep] = useState<number>(0);
  const [maxSteps, setMaxSteps] = useState<number>(2);

  const { textSecondary } = useThemeProvider();

  return (
    <PageContainer>
      <Flex flexDir="column" align="center" margin="0 auto">
        <Flex flexDir="column" align="center" fontFamily="Inter">
          <Box fontSize="54px">Create DAO</Box>
          <Box fontSize="20px">
            Your DAO is the place for your projects and community.
          </Box>
          <Box color={textSecondary}>
            Create a DAO to be able to develop projects.
          </Box>
        </Flex>
        <Flex gap="6px" my="44px">
          {Array.from({ length: maxSteps }).map((item, index) => {
            const active = index <= step;

            return (
              <Flex
                borderRadius="1px"
                bg={active ? "brandSecondary.500" : "#171717"}
                h="4px"
                border="1px solid"
                borderColor={active ? "brandSecondary.500" : "#262626"}
                w="42px"
              ></Flex>
            );
          })}
        </Flex>
      </Flex>
    </PageContainer>
  );
};
