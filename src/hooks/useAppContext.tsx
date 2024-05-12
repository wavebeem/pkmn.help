import { createContext, useContext } from "react";
import { CoverageType, Pokemon } from "../misc/data-types";

type PokeballTheme = "premier" | "regular";

export type AppContext = {
  isLoading: boolean;
  coverageTypes: CoverageType[];
  setCoverageTypes: (coverageTypes: CoverageType[]) => void;
  fallbackCoverageTypes: CoverageType[];
  allPokemon: Pokemon[];
  easterEggPokemon: Pokemon | undefined;
  easterEggLoadedID: string;
  pokeballTheme: PokeballTheme;
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
};

const AppContext = createContext<AppContext>({
  isLoading: true,
  coverageTypes: [],
  setCoverageTypes: () => {},
  fallbackCoverageTypes: [],
  allPokemon: [],
  easterEggPokemon: undefined,
  easterEggLoadedID: "",
  pokeballTheme: "premier",
  needsAppUpdate: false,
  updateApp: async () => {},
});

export const AppContextProvider = AppContext.Provider;

export function useAppContext(): AppContext {
  return useContext(AppContext);
}
