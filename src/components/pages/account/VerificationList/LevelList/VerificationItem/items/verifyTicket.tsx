import { Box } from "@chakra-ui/react";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";

export const VerifyTicket = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { tickets_amount } = useUserProvider();

  return (
    <>
      <VerificationItem
        heading={"Mystra Ticket"}
        icon={"/assets/icons/verification/ticket.svg"}
        description="NFT Ticket needed for DAO/creator platform. Max 100 tickets per wallet, each with assigned points."
        completed={tickets_amount > 0}
        actionText={"Buy ticket"}
        active={active}
        points={0}
        pointsClaimable={true}
        claimAction={() => {}}
        action={() => selectItem(VerificationItemSelected.TICKET)}
        value={
          tickets_amount == 0 ? (
            <Box color="gray">0 tickets</Box>
          ) : (
            tickets_amount + " tickets"
          )
        }
      />
    </>
  );
};
