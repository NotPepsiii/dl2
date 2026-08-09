import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/tmdb";

export default function usePopularMovies() {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
    staleTime: 1000 * 60 * 10,
  });
}