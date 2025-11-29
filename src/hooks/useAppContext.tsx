import { createContext, useContext } from "react";
import { CoverageType, Pokemon } from "../misc/data-types";

export type AppContext = {
  isLoading: boolean;
  coverageTypes: CoverageType[];
  setCoverageTypes: (coverageTypes: CoverageType[]) => void;
  fallbackCoverageTypes: CoverageType[];
  allPokemon: Pokemon[];
  easterEggPokemon: Pokemon | undefined;
  easterEggLoadedID: string;
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
  closeMenu: () => void;
};

const AppContext = createContext<AppContext>({
  isLoading: true,
  coverageTypes: [],
  setCoverageTypes: () => {},
  fallbackCoverageTypes: [],
  allPokemon: [],
  easterEggPokemon: undefined,
  easterEggLoadedID: "",
  needsAppUpdate: false,
  updateApp: async () => {},
  closeMenu: () => {},
});

export const AppContextProvider = AppContext.Provider;

export function useAppContext(): AppContext {
  return useContext(AppContext);
}
