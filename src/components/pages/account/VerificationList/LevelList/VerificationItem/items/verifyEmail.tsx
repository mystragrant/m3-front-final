import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyEmail = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { email } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Connect e-mail"}
        icon={"/assets/icons/verification/mail.svg"}
        description="By providing your e-mail, you secure your account in case you lose access, increase the number of ways to log in and use additional options"
        completed={email != ""}
        actionText={"Verify email"}
        points={100}
        disabled={false}
        active={active}
        showAction={email == ""}
        pointsClaimable={true}
        claimAction={() => {}}
        action={() => selectItem(VerificationItemSelected.EMAIL)}
        value={email == "" ? <Box color="gray">Not set</Box> : email}
      />
    </>
  );
};

{
}
