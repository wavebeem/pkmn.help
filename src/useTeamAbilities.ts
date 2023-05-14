import * as React from "react";
import { AbilityName } from "./data-types";

const key = "team_abilities";

// Not safe for SSR due to reading localStorage inside the useState callback...
// Oh well. Hope that's not a problem later...
export function useTeamAbilities(): [
  AbilityName[],
  (teamTypes: AbilityName[]) => void
] {
  const [teamAbilities] = React.useState<AbilityName[]>(() => {
    const string = localStorage.getItem(key);
    if (string) {
      return JSON.parse(string);
    }
    return [];
  });

  const setTeamAbilities = React.useCallback((teamAbilities: AbilityName[]) => {
    localStorage.setItem(key, JSON.stringify(teamAbilities));
  }, []);

  return [teamAbilities, setTeamAbilities];
}
