import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import FocusContext from "../context/FocusContext";
import Focusable from "../components/Focus/Focusable";

import useMovie from "../hooks/useMovie";
import WatchButton from "../components/UI/WatchButton";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function Movie() {
  const { id } = useParams();

  const { focusedId, setFocusedId } =
    useContext(FocusContext);

  const { data: movie, isLoading } =
    useMovie(id);

  useEffect(() => {
    requestAnimationFrame(() => {
      setFocusedId("watch-button");
    });
  }, [id, setFocusedId]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );

  if (!movie)
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Movie not found.
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKDROP}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-black/20" />
      </div>

      <div className="relative mx-auto -mt-40 flex max-w-7xl gap-10 px-8 pb-16">
        <img
          src={`${POSTER}${movie.poster_path}`}
          alt={movie.title}
          className="w-72 rounded-2xl shadow-2xl"
        />

        <div className="flex-1">
          <h1 className="mb-4 text-5xl font-black">
            {movie.title}
          </h1>

          <div className="mb-6 flex gap-6 text-zinc-400">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-800 px-4 py-2"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mb-8 max-w-3xl text-lg leading-8 text-zinc-300">
            {movie.overview}
          </p>

          <Focusable
            id="watch-button"
            row={0}
            col={0}
          >
            <div
              className={`inline-block rounded-2xl transition ${
                focusedId === "watch-button"
                  ? "scale-105 ring-4 ring-red-500"
                  : ""
              }`}
            >
              <WatchButton id={movie.id} />
            </div>
          </Focusable>
        </div>
      </div>
    </main>
  );
}