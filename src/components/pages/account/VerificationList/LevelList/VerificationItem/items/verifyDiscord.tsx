import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyDiscord = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { discord_nickname } = useUserProvider();

  return (
    <>
      <>
        <VerificationItem
          heading={"Connect Discord"}
          icon={"/assets/icons/verification/discord.svg"}
          description="Connect your account so that the points earned for activity on Discord count towards your total score."
          completed={discord_nickname != ""}
          disabled={false}
          actionText={"Connect"}
          points={100}
          active={active}
          action={() => selectItem(VerificationItemSelected.DISCORD)}
          pointsClaimable={false}
          claimAction={() => {}}
          showAction={discord_nickname == ""}
          value={
            discord_nickname ? (
              discord_nickname
            ) : (
              <Box color="gray">Not connected</Box>
            )
          }
        />
      </>
    </>
  );
};
