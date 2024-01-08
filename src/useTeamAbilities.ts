import * as React from "react";
import { AbilityName } from "./data-types";

const key = "team_abilities";

// Not safe for SSR due to reading localStorage inside the useState callback...
// Oh well. Hope that's not a problem later...
export function useTeamAbilities(): [
  AbilityName[],
  (teamTypes: AbilityName[]) => void
] {
  const [teamAbilities, internalSet] = React.useState<AbilityName[]>(() => {
    const string = localStorage.getItem(key);
    if (string) {
      const array: (AbilityName | null)[] = JSON.parse(string);
      return array.map((a) => a || "none");
    }
    return [];
  });

  const setTeamAbilities = React.useCallback((teamAbilities: AbilityName[]) => {
    // Use Array.from to remove holes in the array & replace holes with "none"
    const value = Array.from(teamAbilities).map((a) => a || "none");
    const json = JSON.stringify(value);
    internalSet(value);
    localStorage.setItem(key, json);
  }, []);

  return [teamAbilities, setTeamAbilities];
}
