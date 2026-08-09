import { useQuery } from "@tanstack/react-query";
import { getSeason } from "../services/tmdb";

export default function useSeason(id, season) {
  return useQuery({
    queryKey: ["season", id, season],
    queryFn: () => getSeason(id, season),
    enabled: !!id && !!season,
    staleTime: 1000 * 60 * 10,
  });
}