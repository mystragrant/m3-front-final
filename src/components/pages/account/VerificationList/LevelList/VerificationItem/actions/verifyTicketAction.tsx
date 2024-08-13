import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const VerifyTicketAction = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex flexDir="column" gap="40px">
        <Flex>
          <Button
            color="black"
            bg="#EFEFEF"
            onClick={() => navigate("/buy-ticket")}
            fontSize="14px"
            fontWeight="400"
            fontFamily="Inter"
          >
            Go to Ticket Page
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
