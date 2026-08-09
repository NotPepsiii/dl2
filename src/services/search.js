import tmdb from "../api/tmdb";

export async function searchMulti(query) {
  if (!query.trim()) return [];

  const { data } = await tmdb.get("/search/multi", {
    params: {
      query,
      include_adult: false,
    },
  });

  return data.results.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );
}