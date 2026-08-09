import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../services/tmdb";

export default function useMovie(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}