import { Box, Flex, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { VerificationInfo } from "../../components/pages/account/verificationInfo/verificationInfo";
import { VerificationList } from "../../components/pages/account/VerificationList/verificationList";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { usePrivatePage } from "../../hooks/usePrivatePage";
import { PageContainer } from "../../components/shared/containers/pageContainer";

export enum VerificationItemSelected {
  NICKNAME,
  EMAIL,
  EVM,
  CASPER,
  TELEGRAM,
  DISCORD,
  TWITTER,
  TICKET,
  STAKING,
  KYC,
}

export const VerificationPage = () => {
  const [selected, setSelected] = useState<VerificationItemSelected | null>(
    null,
  );

  usePrivatePage();

  const [queryParameters] = useSearchParams();

  const [emailCode, setEmailCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const paramCode = queryParameters.get("emailCode");
      if (paramCode) {
        if (paramCode?.length > 7) {
          setSelected(VerificationItemSelected.EMAIL);
          setEmailCode(paramCode);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [queryParameters]);

  const { backgroundPrimary, borderPrimary } = useThemeProvider();

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid templateColumns="500px 1fr" gap="80px">
        <Flex flexDir="column" mt="60px" zIndex="1" pos="relative">
          <VerificationList selectedItem={selected} selectItem={setSelected} />
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
          flexDir="column"
          minH="calc(100vh - 74px)"
          zIndex="1"
          bg={backgroundPrimary}
          borderLeft="1px solid"
          borderColor={borderPrimary}
          pos="relative"
          pt="60px"
          px="60px"
        >
          <VerificationInfo selectedItem={selected} codeEmail={emailCode} />
        </Flex>
      </Grid>
    </PageContainer>
  );
};
