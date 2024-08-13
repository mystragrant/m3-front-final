import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export const RoomItem = ({
  chatName,
  chatIconUrl,
  membersAmount,
  lastMessageTime,
  onClick,
  active,
}: {
  chatName: string;
  chatIconUrl: string;
  membersAmount: number;
  lastMessageTime: string;
  onClick?: () => any;
  active: boolean;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const backgroundColor = useColorModeValue(
    "backgroundSecondary.light",
    "backgroundSecondary.dark",
  );

  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <Flex
      onClick={onClick}
      cursor="pointer"
      bg={active ? backgroundColor : "transparent"}
      justify="space-between"
      gap="12px"
      align="center"
      padding="12px 18px"
      _hover={{ bg: backgroundColor }}
    >
      <Flex align="center" gap="12px">
        <Box
          boxSize="38px"
          justifySelf="flex-start"
          bg="gray"
          borderRadius="50%"
          bgImage={chatIconUrl}
          bgSize="cover"
        />
        <Flex justify="center" justifySelf="flex-start" flexDir="column">
          <Box
            fontWeight="400"
            fontFamily="Inter"
            fontSize="14px"
            color={textPrimary}
          >
            {chatName}
          </Box>
          <Box
            fontSize="12px"
            fontFamily="Inter"
            lineHeight="16px"
            color={textSecondary}
          >
            {membersAmount} members
          </Box>
        </Flex>
      </Flex>
      <Flex fontSize="12px" color={textSecondary} alignSelf={"flex-start"}>
        {lastMessageTime}
      </Flex>
    </Flex>
  );
};
