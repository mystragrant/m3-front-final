import { Box } from "@chakra-ui/react";
import { VerificationItem } from "../verificationItem";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyKYC = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  return (
    <>
      <VerificationItem
        heading={"KYC / KYB"}
        icon={"/assets/icons/verification/kyc.svg"}
        description="Verification is necessary to fully enjoy the resources of the platform. It aims to protect users and their funds."
        completed={false}
        active={active}
        disabled={true}
        actionText={"Coming soon"}
        points={0}
        action={() => selectItem(VerificationItemSelected.KYC)}
        pointsClaimable={true}
        claimAction={() => {}}
        value={<Box color="gray">Not verified</Box>}
      />
    </>
  );
};
