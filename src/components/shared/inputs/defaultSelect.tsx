import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Select,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

interface DefaultSelectItem {
  icon?: string;
  label: string;
  value: any;
}

export const DefaultSelect = ({
  items,
  placeholder,
  onChange,
  value,
}: {
  items: DefaultSelectItem[];
  placeholder: string;
  onChange: any;
  value: any;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const selectedItem = useMemo(() => {
    const item = items.find((item) => item.value == value);

    if (item) {
      return item;
    } else {
      return null;
    }
  }, [value]);

  const primaryColor = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const selectBg = useColorModeValue("background.light", "background.dark");

  const { backgroundSecondary, backgroundTertiary } = useThemeProvider();

  const inputBg = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      fontSize="14px"
      h="40px"
      border="1px solid"
      borderRadius="8px"
      borderColor={borderColor}
      align="center"
      bg={inputBg}
      padding="0px 20px"
      tabIndex={0}
      justify="space-between"
      cursor="pointer"
      pos="relative"
      color={primaryColor}
      onClick={onOpen}
      onBlur={onClose}
    >
      <Flex align="center" gap="10px">
        {selectedItem && (
          <CloseIcon
            boxSize="14px"
            padding="2px"
            _hover={{
              opacity: "0.8",
            }}
            onClick={(e: any) => {
              e.stopPropagation();
              onChange("");
            }}
          />
        )}
        {selectedItem ? (
          selectedItem.label.length > 9 ? (
            selectedItem.label.slice(0, 9) + "..."
          ) : (
            selectedItem.label
          )
        ) : (
          <Box color="#73767D">{placeholder}</Box>
        )}
      </Flex>
      <ChevronDownIcon
        onClick={isOpen ? onClose : onOpen}
        color={primaryColor}
      />
      {isOpen && (
        <Flex
          borderRadius="4px"
          border="1px solid"
          borderColor={borderColor}
          maxH="150px"
          top="100%"
          left="0"
          w="100%"
          pos="absolute"
          flexDir="column"
          bg={selectBg}
          overflowY="scroll"
          zIndex="999"
        >
          {items.map((item) => {
            return (
              <Flex
                align="center"
                justifyContent="space-between"
                padding="8px 10px"
                bg={backgroundTertiary}
                gap="6px"
                _hover={{ bg: borderColor }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(item.value);
                  onClose();
                }}
              >
                <Flex align="center" gap="6px">
                  {item.icon && (
                    <Box
                      boxSize="15px"
                      bgSize="cover"
                      bgPos="center"
                      bgImage={item.icon}
                    />
                  )}
                  <Box fontSize="10px">
                    {item.label.length > 24
                      ? item.label.slice(0, 24) + "..."
                      : item.label}
                  </Box>
                </Flex>
                {value == item.value && <CheckIcon boxSize="10px" />}
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
