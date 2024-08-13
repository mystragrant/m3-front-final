import { ComponentStyleConfig } from "@chakra-ui/react";

export const InputStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    borderRadius: "8px",
    color: "white",
    fontFamily: "Inter",
    field: {
      fontFamily: "Inter",
      fontSize: "14px",
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    md: {
      fontFamily: "Inter",
      fontSize: "40px",
    },
  },

  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "md",
    colorScheme: "brand",
  },
};
