export function normalizeMedia(item) {
  return {
    id: item.id,
    type:
      item.media_type === "tv" || item.first_air_date
        ? "tv"
        : "movie",

    title: item.title || item.name,

    overview: item.overview,

    poster: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : null,

    backdrop: item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : null,

    rating: item.vote_average ?? 0,

    year: (item.release_date || item.first_air_date || "").slice(0, 4),

    raw: item,
  };
}