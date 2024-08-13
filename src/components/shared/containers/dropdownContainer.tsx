import { useDisclosure } from "@chakra-ui/core";
import { Box, Flex, Grid, Image, useColorModeValue } from "@chakra-ui/react";
import { useThemeProvider } from "../../../providers/Theme/useThemeProvider";
import { ChevronDownIcon } from "../icons/chevronDown";

export const DropdownContainer = ({
  children,
  paddingSize = "24px",
  label,
  done = null,
  small = false,
}: {
  children: React.ReactNode;
  paddingSize?: string;
  label: string;
  done?: null | boolean;
  small?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(true);
  const { textSecondary } = useThemeProvider();

  const dropdownBgColor = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );
  const textColor = useColorModeValue(
    "colorPrimary.light",
    "colorPrimary.dark",
  );
  const borderColor = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  const { backgroundSecondary, backgroundTertiary } = useThemeProvider();

  return (
    <Grid
      gap="0px"
      borderRadius="8px"
      border="1px solid"
      borderColor={borderColor}
      fontFamily="Sora, sans-serif"
    >
      <Flex
        px="20px"
        py="14px"
        fontSize="14px"
        fontFamily="Inter"
        w="100%"
        justifyContent="space-between"
        fontWeight="400"
        align="center"
        cursor="pointer"
        onClick={isOpen ? onClose : onOpen}
      >
        <Flex gap="20px" align="center">
          {done != null && (
            <Image
              boxSize="20px"
              src={`/assets/icons/${
                done ? "check-circle.svg" : "x-circle.svg"
              }`}
            />
          )}
          <Box color={textColor}>{label}</Box>
        </Flex>
        <Box transform={`rotate(${isOpen ? 0 : 180}deg)`}>
          <ChevronDownIcon />
        </Box>
      </Flex>
      {!isOpen && (
        <Flex
          px={paddingSize}
          color={textSecondary}
          fontSize="14px"
          py="14px"
          flexDir="column"
        >
          {children}
        </Flex>
      )}
    </Grid>
  );
};
