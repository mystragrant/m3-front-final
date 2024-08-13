import { useColorMode } from "@chakra-ui/core";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { CustomModal } from "../../CustomModal/customModal";

interface CustomSelectItem {
  value: any;
  icon: string;
  label: string;
}

export const CustomSelect = ({
  onChange,
  items,
  heading,
  selectedValue,
  small = false,
  description,
  noIcons = false,
  disabled = false,
  isActive = false,
}: {
  onChange: (value: any) => void;
  items: CustomSelectItem[];
  heading: string;
  selectedValue: any;
  small?: boolean;
  description?: string;
  noIcons?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const bgColor = useColorModeValue("background.light", "background.dark");

  const selectionColor = useColorModeValue("#ddd", "#333");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedItem = useMemo(() => {
    const item = items.find((item) => item.value == selectedValue);

    if (item) {
      return item;
    } else {
      return {
        icon: "x",
        label: heading,
        value: 0,
      };
    }
  }, [selectedValue]);

  const activeColor = useColorModeValue("rgba(0,0,0,0.3)", "textPrimary.dark");
  const secondaryColor = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  return (
    <>
      <Flex
        padding={small ? "10px 17px" : "20px 17px"}
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.04)"
        border="1px solid"
        bg="#1A1B1C"
        borderColor={isActive ? activeColor : borderColor}
        borderRadius="8px"
        cursor={disabled ? "default" : "pointer"}
        onClick={disabled ? () => {} : onOpen}
        opacity={disabled ? "0.4" : "1"}
        align="center"
        justifyContent="space-between"
      >
        <Flex gap="15px" align="center">
          {!noIcons && (
            <Flex justify="center" w="37px">
              <Box
                boxSize={small ? "27px" : "37px"}
                bgImage={selectedItem?.icon}
                bgSize="cover"
                bgPos="center"
                border="1px solid"
                borderRadius="50%"
                borderColor={borderColor}
              />
            </Flex>
          )}
          <Flex
            fontSize={small ? "14px" : "16px"}
            color={selectedItem.value == 0 ? "gray" : "auto"}
            flexDir="column"
          >
            <Box>{selectedItem?.label}</Box>
            {description && (
              <Box color={secondaryColor} fontSize="9px">
                {description.slice(0, 16) + "..." + description.slice(-14)}
              </Box>
            )}
          </Flex>
        </Flex>
        <ChevronDownIcon boxSize="20px" />
        <CustomModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          header={heading}
          body={
            <Flex
              padding="0"
              maxH="600px"
              pos="relative"
              overflowY="scroll"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Flex
                flexDir="column"
                h="60vh"
                w="100%"
                gap="3px"
                pos="relative"
                justifyContent="stretch"
              >
                {items.map((item) => {
                  return (
                    <Flex
                      gap="20px"
                      align="center"
                      key={item.value}
                      padding="14px"
                      pos="relative"
                      _hover={{ bg: selectionColor }}
                      borderRadius="8px"
                      cursor="pointer"
                      bg={selectedValue == item.value ? selectionColor : "auto"}
                      onClick={() => {
                        onChange(item.value);
                        onClose();
                      }}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        w="100%"
                      >
                        <Flex align="center" gap="20px">
                          {!noIcons && (
                            <Box
                              boxSize="37px"
                              bgSize="cover"
                              bgPos="center"
                              bgImage={item.icon}
                            />
                          )}
                          <Box fontSize="16px">{item.label}</Box>
                        </Flex>
                        {selectedValue == item.value && <CheckIcon mr="10px" />}
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          }
        ></CustomModal>
      </Flex>
    </>
  );
};
