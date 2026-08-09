import { useContext, useEffect } from "react";

import FocusContext from "../context/FocusContext";

import Hero from "../components/Hero/Hero";
import Navbar from "../components/Layout/Navbar";
import Row from "../components/Row/Row";
import ContinueWatchingRow from "../components/ContinueWatching/ContinueWatchingRow";

import useTrending from "../hooks/useTrending";
import usePopularMovies from "../hooks/usePopularMovies";
import usePopularTV from "../hooks/usePopularTV";

export default function Home() {
  const { setFocusedId } =
    useContext(FocusContext);

  const {
    data: trending = [],
    isLoading: loadingTrending,
    isError: trendingError,
  } = useTrending();

  const {
    data: movies = [],
    isLoading: loadingMovies,
    isError: moviesError,
  } = usePopularMovies();

  const {
    data: tv = [],
    isLoading: loadingTV,
    isError: tvError,
  } = usePopularTV();

  const isLoading =
    loadingTrending ||
    loadingMovies ||
    loadingTV;

  const isError =
    trendingError ||
    moviesError ||
    tvError;

  const heroMovie = trending.find(
    (item) =>
      item.backdrop_path &&
      (item.title || item.name)
  );

  // Always restore Hero focus when entering Home.
  useEffect(() => {
    if (isLoading || !heroMovie) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFocusedId("hero-watch");
      });
    });

    return () => cancelAnimationFrame(id);
  }, [isLoading, heroMovie, setFocusedId]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        <h1 className="animate-pulse text-3xl font-bold">
          Loading Dulo TV...
        </h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold">
            Something went wrong
          </h1>

          <p className="text-zinc-400">
            We couldn't load content from TMDB.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      <div className="mx-auto max-w-[1700px] px-8 py-8">
        <Hero movie={heroMovie} />

        <div className="space-y-12">
          <ContinueWatchingRow />

          <Row
            row={3}
            title="🔥 Trending"
            items={trending}
          />

          <Row
            row={4}
            title="🎬 Popular Movies"
            items={movies}
          />

          <Row
            row={5}
            title="📺 Popular TV"
            items={tv}
          />
        </div>
      </div>
    </main>
  );
}