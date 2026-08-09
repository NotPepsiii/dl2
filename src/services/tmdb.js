import tmdb from "../api/tmdb";

/* ----------------------- */
/* Trending */
/* ----------------------- */

export async function getTrending() {
  try {
    const response = await tmdb.get("/trending/all/week");
    console.log("Trending success:", response.data);
    return response.data.results;
  } catch (err) {
    console.error("Trending failed:", err.response?.data || err);
    return [];
  }
}

/* ----------------------- */
/* Movies */
/* ----------------------- */

export async function getPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular");
    console.log("Movies success:", response.data);
    return response.data.results;
  } catch (err) {
    console.error("Movies failed:", err.response?.data || err);
    return [];
  }
}

export async function getMovie(id) {
  const { data } = await tmdb.get(`/movie/${id}`);
  return data;
}

export async function getMovieCredits(id) {
  const { data } = await tmdb.get(`/movie/${id}/credits`);
  return data.cast;
}

export async function getSimilarMovies(id) {
  const { data } = await tmdb.get(`/movie/${id}/similar`);
  return data.results;
}

/* ----------------------- */
/* TV Shows */
/* ----------------------- */

export async function getPopularTV() {
  try {
    const response = await tmdb.get("/tv/popular");
    console.log("TV success:", response.data);
    return response.data.results;
  } catch (err) {
    console.error("TV failed:", err.response?.data || err);
    return [];
  }
}

export async function getTV(id) {
  const { data } = await tmdb.get(`/tv/${id}`);
  return data;
}

export async function getTVCredits(id) {
  const { data } = await tmdb.get(`/tv/${id}/credits`);
  return data.cast;
}

export async function getSimilarTV(id) {
  const { data } = await tmdb.get(`/tv/${id}/similar`);
  return data.results;
}

/* ----------------------- */
/* Seasons */
/* ----------------------- */

export async function getSeason(id, seasonNumber) {
  const { data } = await tmdb.get(
    `/tv/${id}/season/${seasonNumber}`
  );

  return data;
}

/* ----------------------- */
/* Episodes */
/* ----------------------- */

export async function getEpisode(
  id,
  seasonNumber,
  episodeNumber
) {
  const { data } = await tmdb.get(
    `/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`
  );

  return data;
}