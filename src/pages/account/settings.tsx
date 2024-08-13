import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangePassword } from "../../components/pages/account/settings/changePassword";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { CustomCheckbox } from "../../components/shared/inputs/CustomCheckbox/customCheckbox";
import { SectionHeader } from "../../components/shared/typography/sectionHeader";
import { usePrivatePage } from "../../hooks/usePrivatePage";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../providers/User/userProvider";

const SettingsMenuItem = ({
  icon = null,
  header,
  value,
  selectedTab,
}: {
  icon?: React.ReactNode;
  header: string;
  value: string;
  selectedTab: string;
}) => {
  const navigate = useNavigate();

  usePrivatePage();

  const { backgroundSecondary, textSecondary, textPrimary } =
    useThemeProvider();

  return (
    <Flex
      bg={selectedTab == value ? backgroundSecondary : "none"}
      onClick={() => navigate("/account/settings?tab=" + value)}
      fontFamily="Inter"
      fontSize="14px"
      pl="20px"
      align="center"
      h="44px"
      justify="space-between"
      gap="20px"
      pos="relative"
      pr="0px"
      cursor="pointer"
    >
      <Flex
        gap="12px"
        align="center"
        color={selectedTab == value ? textPrimary : textSecondary}
      >
        {icon} {header}{" "}
      </Flex>

      {selectedTab == value && (
        <Box justifySelf="flex-end" h="100%" bg="white" w="4px" />
      )}
    </Flex>
  );
};

export const SettingsPage = () => {
  usePrivatePage();

  const { changeAgreements, accept_marketing_terms } = useUserProvider();

  const [newMarketingTerms, setNewMarketingTerms] = useState<boolean>(
    accept_marketing_terms,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<string>("account");

  useEffect(() => {
    setSelectedTab("account");
  }, [searchParams]);

  const handleChangeAgreements = () => {
    setLoading(true);
    changeAgreements(newMarketingTerms, newMarketingTerms)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { borderPrimary } = useThemeProvider();

  return (
    <PageContainer noTopMargin noBottomMargin>
      <Grid templateColumns="300px 1fr" gap="40px">
        <Flex
          flexDir="column"
          borderRight=" 1px solid"
          borderColor={borderPrimary}
        >
          <Flex pt="40px" pos="sticky" top="74px" flexDir="column">
            <Box fontFamily="Inter" fontSize="20px" mb="10px">
              Settings{" "}
            </Box>

            <SettingsMenuItem
              icon={<SettingsIcon />}
              header="Account"
              value="account"
              selectedTab={selectedTab}
            />
          </Flex>
        </Flex>
        <Flex flexDir="column" my="50px">
          {selectedTab == "account" && (
            <>
              {" "}
              <Flex flexDir="column" gap="40px">
                <ChangePassword />

                <Flex flexDir="column" gap="24px">
                  <Grid templateColumns="1fr" gap="24px">
                    <Flex flexDir="column" gap="24px">
                      <SectionHeader>Your Mystra.io agreements</SectionHeader>
                      <Flex flexDir="column" gap="16px">
                        <CustomCheckbox
                          onChange={(checked) => setNewMarketingTerms(checked)}
                          checked={accept_marketing_terms}
                        >
                          Marketing agreement
                        </CustomCheckbox>
                      </Flex>
                    </Flex>
                  </Grid>
                  {accept_marketing_terms != newMarketingTerms && (
                    <Button
                      color="black"
                      fontSize="14px"
                      bg="#EFEFEF"
                      alignSelf="flex-start"
                      w="200px"
                      h="40px"
                      fontWeight="normal"
                      onClick={handleChangeAgreements}
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : "Save"}
                    </Button>
                  )}
                </Flex>
              </Flex>
            </>
          )}
          {/* {selectedTab == "help" && (
            <Flex flexDir="column" gap="14px">
              <DropdownContainer label="How to change my wallet addresses?">
                xD
              </DropdownContainer>
              <DropdownContainer label="How to change my wallet addresses?">
                xD
              </DropdownContainer>
              <DropdownContainer label="How to change my wallet addresses?">
                xD
              </DropdownContainer>
              <DropdownContainer label="How to change my wallet addresses?">
                xD
              </DropdownContainer>
              <DropdownContainer label="How to change my wallet addresses?">
                xD
              </DropdownContainer>
            </Flex>
          )} */}
        </Flex>
      </Grid>
    </PageContainer>
  );
};
