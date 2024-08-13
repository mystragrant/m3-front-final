import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";

import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyStaking = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { cspr_staked_on_mysta_casper_node: staked_amount } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Stake on Mystra Node"}
        icon={"/assets/icons/verification/staking.svg"}
        description="Stake Minimum 5000 CSPR on our node. Points are accumulated from the first day of staking."
        completed={staked_amount >= 5000}
        actionText={"Stake CSPR"}
        points={0}
        action={() => selectItem(VerificationItemSelected.STAKING)}
        pointsClaimable={true}
        active={active}
        claimAction={() => {}}
        value={
          staked_amount < 5000 ? (
            <Box color="gray">{staked_amount} CSPR Staked</Box>
          ) : (
            staked_amount + " CSPR Staked"
          )
        }
      />
    </>
  );
};
