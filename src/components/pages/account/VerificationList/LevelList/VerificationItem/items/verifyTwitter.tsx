import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyTwitter = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { twitter_nickname } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Connect Twitter"}
        active={active}
        icon={"/assets/icons/verification/twitter.svg"}
        description="Connect your account so that the points earned for activity on Twitter count towards your total score."
        completed={twitter_nickname != ""}
        disabled={true}
        actionText={"Coming soon"}
        points={100}
        action={() => selectItem(VerificationItemSelected.TWITTER)}
        pointsClaimable={twitter_nickname == ""}
        claimAction={() => {}}
        value={<Box color="gray">Not connected</Box>}
      />
    </>
  );
};
