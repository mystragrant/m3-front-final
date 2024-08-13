import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

export const DropdownItem = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDir="column"
      w="100%"
      borderTop="1px solid"
      borderColor="rgba(255,255,255,0.03)"
    >
      <Flex
        justify="space-between"
        px="20px"
        onClick={isOpen ? onClose : onOpen}
        py="10px"
        align="center"
        _hover={{ bg: "rgba(255,255,255,0.05)" }}
        cursor="pointer"
      >
        <Box fontSize="12px" fontFamily="Inter">
          {header}
        </Box>{" "}
        {!isOpen ? (
          <ChevronDownIcon boxSize="20px" />
        ) : (
          <ChevronUpIcon boxSize="20px" />
        )}
      </Flex>
      {isOpen && <Flex flexDir="column">{children}</Flex>}
    </Flex>
  );
};
