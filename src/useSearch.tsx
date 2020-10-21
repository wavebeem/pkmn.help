import { useLocation } from "react-router-dom";

export function useSearch() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
