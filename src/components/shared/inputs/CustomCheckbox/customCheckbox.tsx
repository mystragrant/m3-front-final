import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";

export const CustomCheckbox = ({
  children,
  onChange,
  checked = false,
  error = false,
  big = false,
}: {
  checked?: boolean;
  children: React.ReactNode;
  onChange: (state: boolean) => any;
  error?: boolean;
  big?: boolean;
}) => {
  const [state, setState] = useState<boolean>(checked);

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const toggle = () => {
    const newState = !state;
    setState(newState);
    onChange(newState);
  };

  const { borderPrimary } = useThemeProvider();

  return (
    <Flex align="center" gap="10px">
      <Box
        padding="2px"
        borderRadius="4px"
        border="1px solid"
        borderColor={error ? "error.500" : textSecondary}
        onClick={toggle}
        cursor="pointer"
      >
        <Box
          borderRadius="2px"
          boxSize="12px"
          bg={state ? "brandSecondary.500" : "transparent"}
        ></Box>
      </Box>
      <Flex
        w="100%"
        fontFamily="Inter"
        color={big ? "white" : textSecondary}
        fontSize={big ? "14px" : "12px"}
      >
        {children}
      </Flex>
    </Flex>
  );
};
