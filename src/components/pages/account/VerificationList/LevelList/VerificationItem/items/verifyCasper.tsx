import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { trimHash } from "../../../../../../../utils/utils";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyCasper = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { casper_public_key_wallet } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Connect CSPR Wallet"}
        icon={"/assets/icons/verification/casper.svg"}
        description="Increase your login options by connecting your Casper Network Wallet and enjoy additional features"
        completed={casper_public_key_wallet != ""}
        actionText={"Connect wallet"}
        showAction={casper_public_key_wallet == ""}
        active={active}
        points={100}
        action={() => selectItem(VerificationItemSelected.CASPER)}
        pointsClaimable={true}
        claimAction={() => {}}
        value={
          casper_public_key_wallet == "" ? (
            <Box color="gray">Not connected</Box>
          ) : (
            trimHash(casper_public_key_wallet)
          )
        }
      />
    </>
  );
};
