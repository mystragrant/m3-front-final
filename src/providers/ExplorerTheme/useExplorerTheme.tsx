import { useColorModeValue } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { IParent } from "../../shared/types";

const emptyContext = {
  themeColor: "",
};

const Context = createContext(emptyContext);

export const ExplorerThemeProvider = ({
  children,
  themeColor,
}: {
  children: React.ReactNode;
  themeColor: string;
}) => {
  return (
    <Context.Provider
      value={{
        themeColor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useExplorerTheme = () => useContext(Context);
