import { useQuery } from "@tanstack/react-query";
import { getPopularTV } from "../services/tmdb";

export default function usePopularTV() {
  return useQuery({
    queryKey: ["popular-tv"],
    queryFn: getPopularTV,
    staleTime: 1000 * 60 * 10,
  });
}