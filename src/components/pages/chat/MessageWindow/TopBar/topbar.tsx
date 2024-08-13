import { useDisclosure } from "@chakra-ui/core";
import { EditIcon, QuestionOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useChatProvider } from "../../../../../providers/Chat/chatProvider";
import { useThemeProvider } from "../../../../../providers/Theme/useThemeProvider";
import { EditGroupModal } from "../EditGroupModal/editGroupModal";

export const Topbar = ({
  chatIconUrl,
  chatName,
  membersAmount,
}: {
  chatIconUrl: string;
  chatName: string;
  membersAmount: number;
}) => {
  const { toggleInfo, infoOpen, groupId, groups, userId } = useChatProvider();

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );
  const backgroundColor = useColorModeValue(
    "backgroundTertiary.light",
    "backgroundTertiary.dark",
  );

  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const { borderPrimary } = useThemeProvider();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={backgroundColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      zIndex="1"
      h="64px"
      w="100%"
      justifyContent="space-between"
      borderTopRightRadius="inherit"
      borderTopLeftRadius="inherit"
      padding="0px 28px"
    >
      <EditGroupModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <Flex gap="12px" align="center">
        <Box
          boxSize="44px"
          border="1px solid"
          borderColor={borderPrimary}
          bg="gray"
          borderRadius="50%"
          bgImage={chatIconUrl}
          bgSize="cover"
        />
        <Flex justify="center" flexDir="column">
          <Box
            fontWeight="400"
            fontFamily="Inter"
            fontSize="16px"
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
      <Flex align="center" gap="16px">
        <Flex align="center">
          <SettingsIcon
            cursor="pointer"
            color={infoOpen ? "brandSecondary.500" : textPrimary}
            onClick={toggleInfo}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
