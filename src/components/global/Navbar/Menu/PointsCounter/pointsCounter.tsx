import { Flex, Box, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import { DiscordIcon } from "../../../../shared/icons/DiscordIcon";
import { TelegramIcon } from "../../../../shared/icons/TelegramIcon";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useUserProvider } from "../../../../../providers/User/userProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { useEffect } from "react";
import { TwitterIcon } from "../../../../shared/icons/TwitterIcon";

const SocialIcon = ({
  icon,
  active,
}: {
  icon: React.ReactNode;
  active: boolean;
}) => {
  return (
    <Box position="relative">
      {icon}
      <Box
        bg={active ? "#5FBE91" : "#7D7D7D"}
        position="absolute"
        right="-2px"
        bottom="0"
        boxSize="6px"
        borderRadius="50%"
      />
    </Box>
  );
};

export const PointsCounter = ({
  isOpen,
  points,
}: {
  isOpen: boolean;
  points: number;
}) => {
  const pointsColor = useColorModeValue("colorPrimary.light", "brand.500");

  const { borderPrimary } = useThemeProvider();

  const { discord_nickname, telegram_nickname, twitter_nickname } =
    useUserProvider();

  const { t } = useTranslation();

  return (
    <Grid
      padding={isOpen ? "14px 25px" : "14px 0px"}
      boxShadow="0px 4px 3px rgba(0, 0, 0, 0.07)"
      borderTop={{ base: "none", md: `1px solid` }}
      borderBottom={{ base: "1px solid", md: `1px solid` }}
      borderBottomColor={{ md: borderPrimary }}
      borderTopColor={{ md: borderPrimary }}
    >
      <Flex
        fontFamily="Changa"
        fontWeight="300"
        fontStyle="normal"
        letterSpacing="0.2em"
        display={{ base: "none", md: "flex" }}
        justifyContent={isOpen ? "space-between" : "center"}
      >
        <Flex flexDir="column" justifyContent={isOpen ? "auto" : "center"}>
          <Box fontSize="9px" textTransform="uppercase">
            {t("navbar.points")}
          </Box>
          <Flex
            justifyContent={isOpen ? "auto" : "center"}
            color={pointsColor}
            fontSize="14px"
            fontWeight="bold"
          >
            <CountUp duration={0.4} end={points} />
          </Flex>
        </Flex>
        {isOpen ? (
          <Flex w="100px" justify="flex-end" alignItems="center" gridGap="15px">
            <SocialIcon
              icon={<TwitterIcon />}
              active={twitter_nickname != ""}
            />
            <SocialIcon
              icon={<DiscordIcon />}
              active={discord_nickname != ""}
            />
            <SocialIcon
              icon={<TelegramIcon />}
              active={telegram_nickname != ""}
            />
          </Flex>
        ) : (
          <Box />
        )}
      </Flex>
    </Grid>
  );
};
