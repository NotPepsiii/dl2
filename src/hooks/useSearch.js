import { useQuery } from "@tanstack/react-query";
import { searchMulti } from "../services/search";

export default function useSearch(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMulti(query),
    enabled: query.trim().length > 0,
  });
}