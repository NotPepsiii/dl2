import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../services/tmdb";

export default function useTrending() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}