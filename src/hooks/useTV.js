import { useQuery } from "@tanstack/react-query";
import { getTV } from "../services/tmdb";

export default function useTV(id) {
  return useQuery({
    queryKey: ["tv", id],
    queryFn: () => getTV(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}