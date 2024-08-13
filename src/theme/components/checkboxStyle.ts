export const Checkbox = {
  baseStyle: ({ colorMode }: { colorMode: any }) => ({
    control: {
      bg:
        colorMode == "dark" ? "inputBackground.dark" : "inputBackground.light",
      _checked: {
        bg: "brand.500",
        color: "transparent",
      },
    },
    _hover: {
      bg: "blue",
    },
  }),
};
