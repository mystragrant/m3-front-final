import { Box } from "@chakra-ui/react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { trimHash } from "../../../../../../../utils/utils";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyEVM = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { evm_wallet } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Connect EVM Wallet"}
        icon={
          evm_wallet == ""
            ? "/assets/icons/verification/ethereum.svg"
            : "/assets/icons/verification/ethereum-brand.svg"
        }
        description="Increase your login options by connecting your EVM Wallet and enjoy additional features"
        completed={evm_wallet != ""}
        actionText={"Connect wallet"}
        showAction={evm_wallet == ""}
        points={100}
        active={active}
        action={() => selectItem(VerificationItemSelected.EVM)}
        pointsClaimable={true}
        claimAction={() => {}}
        value={
          evm_wallet == "" ? (
            <Box color="gray">Not connected</Box>
          ) : (
            trimHash(evm_wallet)
          )
        }
      />
    </>
  );
};
