import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyTelegram = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { telegram_nickname } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Connect Telegram"}
        icon={"/assets/icons/verification/telegram.svg"}
        description="Connect your account so that the points earned for activity on Telegram count towards your total score."
        completed={telegram_nickname != ""}
        disabled={false}
        actionText={"Connect"}
        points={100}
        active={active}
        action={() => selectItem(VerificationItemSelected.TELEGRAM)}
        pointsClaimable={true}
        claimAction={() => {}}
        showAction={telegram_nickname == ""}
        value={
          telegram_nickname == "" ? (
            <Box color="gray">Not connected</Box>
          ) : (
            telegram_nickname
          )
        }
      />
    </>
  );
};
