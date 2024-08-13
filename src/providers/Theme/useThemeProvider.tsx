import { useColorModeValue } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { IParent } from "../../shared/types";

const emptyContext = {
  textPrimary: "",
  textSecondary: "",
  textTertiary: "",
  backgroundPrimary: "",
  backgroundSecondary: "",
  backgroundTertiary: "",
  borderPrimary: "",
};

const Context = createContext(emptyContext);

export const ThemeProvider = ({ children }: IParent) => {
  const backgroundPrimary = useColorModeValue(
    "background.light",
    "background.dark",
  );
  const backgroundSecondary = useColorModeValue(
    "backgroundSecondary.light",
    "backgroundSecondary.dark",
  );
  const backgroundTertiary = useColorModeValue(
    "backgroundTertiary.light",
    "backgroundTertiary.dark",
  );

  const textPrimary = useColorModeValue(
    "textPrimary.light",
    "textPrimary.dark",
  );

  const textSecondary = useColorModeValue(
    "textSecondary.light",
    "textSecondary.dark",
  );

  const textTertiary = useColorModeValue(
    "textTertiary.light",
    "textTertiary.dark",
  );

  const borderPrimary = useColorModeValue(
    "borderColor.light",
    "borderColor.dark",
  );

  return (
    <Context.Provider
      value={{
        backgroundPrimary,
        backgroundSecondary,
        backgroundTertiary,
        textPrimary,
        textSecondary,
        textTertiary,
        borderPrimary,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useThemeProvider = () => useContext(Context);
