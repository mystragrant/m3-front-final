import {
  Box,
  Flex,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "../../../../shared/icons/chevronDown";

export const RoomsTab = ({
  label,
  unreadMessages,
  children,
  icon = null,
}: {
  label: string;
  unreadMessages: number;
  children: React.ReactNode;
  icon?: string | null;
}) => {
  const textColor = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDir="column"
      padding="0px 0px 0px"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex
        margin="17px 11px"
        color={textColor}
        fontSize="12px"
        cursor="pointer"
        textTransform="uppercase"
        padding="0px 8px"
        justifyContent="space-between"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <Flex align="center" gap="6px">
          {label}
          {icon && <Image src={icon} />}
        </Flex>
        <Flex align="center" gap="12px">
          {unreadMessages > 0 && (
            <Box
              color="white"
              bg="green"
              borderRadius="60px"
              padding="1px 10px"
            >
              {unreadMessages}
            </Box>
          )}
          <Box transform={`rotate(${isOpen ? "180deg" : "0deg"})`}>
            <ChevronDownIcon customColor={"#73767D"} />
          </Box>
        </Flex>
      </Flex>
      {isOpen && (
        <Flex flexDir="column" marginBottom="10px">
          {children}
        </Flex>
      )}
    </Flex>
  );
};
