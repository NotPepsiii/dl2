export function moviePlayerUrl(id, progress = 0) {
  const params = new URLSearchParams({
    autoPlay: "true",
    color: "e50914",
  });

  if (progress > 0) {
    params.set("progress", progress);
  }

  return `https://www.vidking.net/embed/movie/${id}?${params}`;
}

export function tvPlayerUrl(
  id,
  season,
  episode,
  progress = 0
) {
  const params = new URLSearchParams({
    autoPlay: "true",
    color: "e50914",
  });

  if (progress > 0) {
    params.set("progress", progress);
  }

  return `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?${params}`;
}