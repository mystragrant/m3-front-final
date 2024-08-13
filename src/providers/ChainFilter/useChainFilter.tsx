import { useColorModeValue } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IParent } from "../../shared/types";

const emptyContext = {
  availableChains: [] as string[],
  toggleChain: (chainId: string) => {},
};

const defaultChains = ["1", "56", "casper", "137"];

const Context = createContext(emptyContext);

export const ChainFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [availableChains, setAvailableChains] = useLocalStorage(
    "chain_filters",
    defaultChains,
  );

  const toggleChain = (chainId: string) => {
    if (availableChains.includes(chainId)) {
      setAvailableChains((prev) => prev.filter((chain) => chain != chainId));
    } else {
      setAvailableChains((prev) => prev.concat([chainId]));
    }
  };

  return (
    <Context.Provider
      value={{
        availableChains,
        toggleChain,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChainFilter = () => useContext(Context);
