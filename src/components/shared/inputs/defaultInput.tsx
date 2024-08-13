import { WarningIcon } from "@chakra-ui/icons";
import {
  AlertIcon,
  Box,
  Flex,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";

export const DefaultInput = ({
  onChange,
  placeholder = "",
  value,
  type = "text",
  icon,
  disabled = false,
  isActive = false,
  error,
}: {
  onChange: (value: any) => void;
  placeholder?: string;
  value: any;
  type?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  error?: string | null;
}) => {
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const activeColor = useColorModeValue("rgba(0,0,0,0.3)", "textPrimary.dark");

  const bgColor = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );
  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const { backgroundTertiary } = useThemeProvider();

  const [touched, setTouched] = useState<boolean>(false);

  return (
    <Flex pos="relative">
      <Input
        placeholder={placeholder}
        type={type}
        _focus={{
          boxShadow: "none",
          outline: "none",
          borderColor: isActive ? activeColor : borderColor,
        }}
        value={value}
        pl={icon ? "60px" : "20px"}
        border="1px solid"
        bg={backgroundTertiary}
        borderRadius="8px"
        _placeholder={{ color: "#73767D" }}
        fontSize="14px"
        cursor={disabled ? "" : "auto"}
        opacity={disabled ? "0.4" : "1"}
        disabled={disabled}
        _hover={{ borderColor: disabled ? borderColor : "auto" }}
        borderColor={isActive ? activeColor : borderColor}
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        onBlur={() => setTouched(true)}
      />
      {error && touched && (
        <>
          <Tooltip label={error ?? ""}>
            <Flex
              pos="absolute"
              h="100%"
              w="60px"
              right="0"
              align="center"
              justify="center"
              zIndex="1"
              bg={bgColor}
            >
              <Flex boxSize="40px" align="center" justify="center">
                <WarningIcon color="brand.500" />
              </Flex>
            </Flex>
          </Tooltip>
        </>
      )}
      {icon && (
        <Flex
          h="40px"
          w="70px"
          pos="absolute"
          zIndex="1"
          align="center"
          color="white"
          justify="center"
        >
          {icon}
        </Flex>
      )}
    </Flex>
  );
};
