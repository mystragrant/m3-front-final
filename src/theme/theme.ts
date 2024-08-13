import { colors } from "./colors";
import { extendTheme } from "@chakra-ui/react";
import { ButtonStyle } from "./components/buttonStyle";
import { Checkbox } from "./components/checkboxStyle";
import { InputStyle } from "./components/inputStyle";

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: ButtonStyle,
    Input: InputStyle,
    Checkbox,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
