import { Box, Button, Flex, Input, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useUserProvider } from "../../../../../../../providers/User/userProvider";
import { VerificationItem } from "../verificationItem";
import { CustomModal } from "./customModal";
import { VerificationItemSelected } from "../../../../../../../pages/account/verification";

export const VerifyUsername = ({
  selectItem,
  active,
}: {
  selectItem: (arg: any) => void;
  active: boolean;
}) => {
  const { nickname, updateNickname } = useUserProvider();

  const [newNickname, setNewNickname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string>("");

  const handleVerifyUsername = () => {
    setLoading(true);
    updateNickname(newNickname)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        console.log(e);
        setError("Nickname invalid or taken.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <VerificationItem
        active={active}
        heading={"Set your username"}
        icon={"/assets/icons/verification/user.svg"}
        description="Create your nickname, which will be visible to others. Choose it wisely, as there will be no possibility of changing it later."
        completed={nickname !== ""}
        actionText={"Set nickname"}
        points={100}
        showAction={nickname === ""}
        pointsClaimable={true}
        claimAction={() => {}}
        action={() => selectItem(VerificationItemSelected.NICKNAME)}
        value={nickname === "" ? <Box color="gray">Not set</Box> : nickname}
      />
      <CustomModal
        loading={loading}
        title={"Set nickname"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <Flex flexDir="column" gap="20px">
          <Input
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="Your nickname"
            _focus={{ boxShadow: "none", borderColor: "initial" }}
          />
          <Button
            onClick={handleVerifyUsername}
            disabled={newNickname.length < 3}
            fontWeight="normal"
            h="40px"
            bg="brand.500"
            color="white"
          >
            Save nickname
          </Button>
          {error && <Box color="red">{error}</Box>}
        </Flex>
      </CustomModal>
    </>
  );
};
