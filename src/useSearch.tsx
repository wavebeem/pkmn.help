import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function useSearch() {
  const location = useLocation();
  const search = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  return search;
}
