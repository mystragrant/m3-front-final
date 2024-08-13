import { useDisclosure } from "@chakra-ui/core";
import { Box, Flex } from "@chakra-ui/react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { ChevronDownIcon } from "../../../shared/icons/chevronDown";

export const DropdownItem = ({
  children,
  header,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  header: string;
  defaultOpen?: boolean;
}) => {
  const { borderPrimary } = useThemeProvider();
  const { isOpen, onOpen, onClose } = useDisclosure(defaultOpen);

  return (
    <Flex
      flexDir="column"
      borderRadius="8px"
      border="1px solid"
      borderColor={borderPrimary}
    >
      <Flex
        cursor="pointer"
        onClick={isOpen ? onClose : onOpen}
        w="100%"
        padding="15px 24px 17px"
        align="center"
        justifyContent="space-between"
      >
        <Box fontSize="14px">{header}</Box>
        <ChevronDownIcon />
      </Flex>
      {isOpen && (
        <Flex padding="0 24px" mb="30px">
          {children}
        </Flex>
      )}
    </Flex>
  );
};
