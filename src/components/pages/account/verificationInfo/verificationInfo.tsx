import {
  CheckIcon,
  CloseIcon,
  LockIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { VerificationItemSelected } from "../../../../pages/account/verification";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { VerifyCasperAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyCasperAction";
import { VerifyDiscordAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyDiscordAction";
import { VerifyEmailAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyEmailAction";
import { VerifyKYCAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyKYCAction";
import { VerifyEVMAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyMetamaskAction";
import { VerifyStakingAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyStakingAction";
import { VerifyTelegramAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyTelegramAction";
import { VerifyTicketAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyTicketAction";
import { VerifyUsernameAction } from "../VerificationList/LevelList/VerificationItem/actions/verifyUsernameAction";
import { VerifyTelegram } from "../VerificationList/LevelList/VerificationItem/items/verifyTelegram";
import { ItemTemplate } from "./ItemTemplate/itemTemplate";

export const VerificationInfo = ({
  selectedItem,
  codeEmail,
}: {
  selectedItem: VerificationItemSelected | null;
  codeEmail: string | null;
}) => {
  const { textSecondary, backgroundSecondary } = useThemeProvider();

  const item: any = useMemo(() => {
    return {
      [VerificationItemSelected.NICKNAME]: () => (
        <ItemTemplate
          header="Set your username"
          description="Create your nickname, which will be visible to others. Choose it wisely, as there will be no possibility of changing it later.
		"
        >
          <VerifyUsernameAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.EMAIL]: () => (
        <ItemTemplate
          header="Connect your e-mail"
          description="By providing your e-mail, you secure your account in case you lose access, increase the number of ways to log in and use additional options
		"
        >
          <VerifyEmailAction emailCode={codeEmail} />
        </ItemTemplate>
      ),
      [VerificationItemSelected.CASPER]: () => (
        <ItemTemplate
          header="Connect CSPR Wallet"
          description="Increase your login options by connecting your Casper Network Wallet and enjoy additional features"
        >
          <VerifyCasperAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.EVM]: () => (
        <ItemTemplate
          header="Connect EVM Wallet"
          description="Increase your login options by connecting your EVM Wallet and enjoy additional features
		"
        >
          <VerifyEVMAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.KYC]: () => (
        <ItemTemplate
          header="KYC"
          description="Verification is necessary to fully enjoy the resources of the platform. It aims to protect users and their funds.
		"
        >
          <VerifyKYCAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.STAKING]: () => (
        <ItemTemplate
          header="Stake 5000 CSPR on Mystra"
          description="Stake Minimum 5000 CSPR on our node. Points are accumulated from the first day of staking.
		"
        >
          <VerifyStakingAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.TICKET]: () => (
        <ItemTemplate
          header="Get your Mystra Ticket"
          description="NFT Ticket needed for DAO/creator platform. Max 100 tickets per wallet, each with assigned points.
		"
        >
          <VerifyTicketAction />
        </ItemTemplate>
      ),
      [VerificationItemSelected.DISCORD]: () => (
        <ItemTemplate
          header="Connect Discord"
          description="Connect your account so that the points earned for activity on Discord count towards your total score.
		"
        >
          <VerifyDiscordAction discordCode={""} />
        </ItemTemplate>
      ),
      [VerificationItemSelected.TELEGRAM]: () => (
        <ItemTemplate
          header="Connect Telegram"
          description="Connect your account so that the points earned for activity on Telegram count towards your total score.
		"
        >
          <VerifyTelegramAction telegramCode={""} />
        </ItemTemplate>
      ),
      [VerificationItemSelected.TWITTER]: () => (
        <ItemTemplate
          header="Connect Twitter"
          description="Connect your account so that the points earned for activity on Twitter count towards your total score.
		"
        >
          x
        </ItemTemplate>
      ),
    };
  }, [selectedItem]);

  const { borderPrimary } = useThemeProvider();

  return (
    <Flex flexDir="column" gap="0px" pos="sticky" top="136px">
      {selectedItem != null ? (
        item[selectedItem]()
      ) : (
        <ItemTemplate header={"Account Verification"}>
          <Box
            transform="translateY(-40px)"
            fontFamily="Inter"
            fontSize="14px"
            color={textSecondary}
          >
            Verify your account to ensure safety and trustworthiness on the
            platform and to assure other users that they are interacting with
            real individuals. The level of verification required may vary
            depending on the actions you want to perform on the platform
          </Box>

          <Flex flexDir="column" gap="24px">
            <Flex flexDir="column" gap="6px">
              <Flex
                align="center"
                fontFamily="Inter"
                fontSize="16px"
                gap="10px"
              >
                Level 1
              </Flex>
              <Box
                borderLeft="2px solid"
                pl="14px"
                ml="5px"
                borderColor={borderPrimary}
                fontFamily="Inter"
                fontSize="14px"
                color={textSecondary}
              >
                To access the basic platform features, connect your social
                media, wallet, and verify your email address
              </Box>
            </Flex>
            <Flex flexDir="column" gap="6px">
              <Flex
                align="center"
                fontFamily="Inter"
                fontSize="16px"
                gap="10px"
              >
                Level 2
              </Flex>
              <Box
                fontFamily="Inter"
                fontSize="14px"
                color={textSecondary}
                borderLeft="2px solid"
                pl="14px"
                ml="5px"
                borderColor={borderPrimary}
              >
                To access all platform modules except for Launchpad and
                Incubation Hub, a minimum of 5000 CSPR staking on the Mystra
                validator and the purchase of a Mystra NFT Ticket are required
                to complete the second verification stage
              </Box>
            </Flex>
            <Flex flexDir="column" gap="6px">
              <Flex
                align="center"
                fontFamily="Inter"
                fontSize="16px"
                gap="10px"
              >
                Level 3
              </Flex>
              <Box
                borderLeft="2px solid"
                pl="14px"
                ml="5px"
                borderColor={borderPrimary}
                fontFamily="Inter"
                fontSize="14px"
                color={textSecondary}
              >
                To access the third verification stage and unlock full access to
                the Launchpad and Incubation Hub, you must complete the
                necessary verification. Individual users are required to undergo
                KYC verification, while companies must complete KYB verification
              </Box>
            </Flex>
          </Flex>
        </ItemTemplate>
      )}
    </Flex>
  );
};
