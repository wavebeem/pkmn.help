import * as React from "react";
import { Type } from "./data-types";

const key = "team_tera_types";

// Not safe for SSR due to reading localStorage inside the useState callback...
// Oh well. Hope that's not a problem later...
export function useTeamTeraTypes(): [Type[], (teamTeraTypes: Type[]) => void] {
  const [teamTeraTypes] = React.useState<Type[]>(() => {
    const string = localStorage.getItem(key);
    if (string) {
      return JSON.parse(string);
    }
    return [];
  });

  const setTeamTeraTypes = React.useCallback((teamTeraTypes: Type[]) => {
    localStorage.setItem(key, JSON.stringify(teamTeraTypes));
  }, []);

  return [teamTeraTypes, setTeamTeraTypes];
}
