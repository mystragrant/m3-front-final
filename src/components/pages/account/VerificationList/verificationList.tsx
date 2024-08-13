import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { VerificationItemSelected } from "../../../../pages/account/verification";
import { useUserProvider } from "../../../../providers/User/userProvider";
import { LevelList } from "./LevelList/levelList";
import { VerifyCasper } from "./LevelList/VerificationItem/items/verifyCasper";
import { VerifyDiscord } from "./LevelList/VerificationItem/items/verifyDiscord";
import { VerifyEmail } from "./LevelList/VerificationItem/items/verifyEmail";
import { VerifyEVM } from "./LevelList/VerificationItem/items/verifyEVM";
import { VerifyKYC } from "./LevelList/VerificationItem/items/verifyKYC";
import { VerifyStaking } from "./LevelList/VerificationItem/items/verifyStaking";
import { VerifyTelegram } from "./LevelList/VerificationItem/items/verifyTelegram";
import { VerifyTicket } from "./LevelList/VerificationItem/items/verifyTicket";
import { VerifyUsername } from "./LevelList/VerificationItem/items/verifyUsername";

export const VerificationList = ({
  selectItem,
  selectedItem,
}: {
  selectItem: (arg: any) => void;
  selectedItem: VerificationItemSelected | null;
}) => {
  const { verification } = useUserProvider();

  const items = useMemo(() => {
    return [
      {
        verified: verification.email,
        item: (
          <VerifyEmail
            active={selectedItem === VerificationItemSelected.EMAIL}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.evm,
        item: (
          <VerifyEVM
            active={selectedItem === VerificationItemSelected.EVM}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.casper,
        item: (
          <VerifyCasper
            active={selectedItem === VerificationItemSelected.CASPER}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.nickname,
        item: (
          <VerifyUsername
            active={selectedItem === VerificationItemSelected.NICKNAME}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.discord,
        item: (
          <VerifyDiscord
            active={selectedItem === VerificationItemSelected.DISCORD}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.telegram,
        item: (
          <VerifyTelegram
            active={selectedItem === VerificationItemSelected.TELEGRAM}
            selectItem={selectItem}
          />
        ),
        level: 1,
      },
      {
        verified: verification.ticket,
        item: (
          <VerifyTicket
            active={selectedItem === VerificationItemSelected.TICKET}
            selectItem={selectItem}
          />
        ),
        level: 2,
      },
      {
        verified: verification.stake,
        item: (
          <VerifyStaking
            active={selectedItem === VerificationItemSelected.STAKING}
            selectItem={selectItem}
          />
        ),
        level: 2,
      },
      {
        verified: verification.kyckyb,
        item: (
          <VerifyKYC
            active={selectedItem === VerificationItemSelected.KYC}
            selectItem={selectItem}
          />
        ),
        level: 3,
      },
    ];
  }, [selectedItem, selectItem, verification]);

  return (
    <Flex flexDir="column" gap="60px" w="100%" pos="relative" pb="100px">
      <LevelList
        level={1}
        maxPoints={400}
        itemsLength={6}
        itemsVerified={
          items.filter((item) => item.level === 1 && item.verified).length
        }
        currentPoints={50}
      >
        {items
          .filter((item) => item.level === 1)
          .sort((a, b) => Number(a.verified) - Number(b.verified))
          .map((item) => {
            return item.item;
          })}
      </LevelList>
      <LevelList
        level={2}
        itemsLength={2}
        itemsVerified={
          items.filter((item) => item.level === 2 && item.verified).length
        }
        maxPoints={400}
        currentPoints={50}
      >
        {items
          .filter((item) => item.level === 2)
          .sort((a, b) => Number(a.verified) - Number(b.verified))
          .map((item) => {
            return item.item;
          })}
      </LevelList>
      <LevelList
        level={3}
        itemsLength={1}
        itemsVerified={verification.kyckyb ? 1 : 0}
        maxPoints={2000}
        currentPoints={0}
      >
        {items
          .filter((item) => item.level === 3)
          .sort((a, b) => Number(a.verified) - Number(b.verified))
          .map((item) => {
            return item.item;
          })}
      </LevelList>
    </Flex>
  );
};
