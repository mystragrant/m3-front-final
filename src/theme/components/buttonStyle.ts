import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    borderRadius: "8px",
    color: "white",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    sm: {
      h: "44px",
      fontSize: "13px",
      color: "white",
    },
    md: {
      h: "40px",

      padding: "0px 16px",
      fontFamily: "Inter",
      fontSize: "14px",
      _hover: {
        opacity: 0.9,
      },
    },
  },
  variants: {
    "ghost-disabled": {
      bg: "transparent",
      color: "gray.400",
      border: "1px solid",
      borderColor: "gray.500",
    },
    ghost: {
      bg: "transparent",
      color: "black",
      border: "1px solid",
      borderColor: "brand.500",
    },
    ghostDark: ({ colorMode }: { colorMode: string }) => ({
      bg: "transparent",
      color: colorMode == "dark" ? "textPrimary.dark" : "textPrimary.light",
      border: "1px solid",
      borderColor:
        colorMode == "dark" ? "borderColor.dark" : "borderColor.light",
      _hover: {
        bg: colorMode == "dark" ? "borderColor.dark" : "borderColor.light",
      },
      padding: "0px 14px",
      height: "44px",
      fontWeight: "400",
      fontSize: "14px",
      borderRadius: "4px",
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "md",
    colorScheme: "brand",
  },
};
