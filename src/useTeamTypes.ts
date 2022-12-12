import * as React from "react";
import { Type } from "./data-types";

const key = "team_types";

// Not safe for SSR due to reading localStorage inside the useState callback...
// Oh well. Hope that's not a problem later...
export function useTeamTypes(): [Type[][], (teamTypes: Type[][]) => void] {
  const [teamTypes] = React.useState<Type[][]>(() => {
    const string = localStorage.getItem(key);
    if (string) {
      return JSON.parse(string);
    }
    return [];
  });

  const setTeamTypes = React.useCallback((teamTypes: Type[][]) => {
    localStorage.setItem(key, JSON.stringify(teamTypes));
  }, []);

  return [teamTypes, setTeamTypes];
}
