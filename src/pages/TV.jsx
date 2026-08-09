import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FocusContext from "../context/FocusContext";

import useTV from "../hooks/useTV";
import useSeason from "../hooks/useSeason";

import WatchButton from "../components/UI/WatchButton";
import Focusable from "../components/Focus/Focusable";
import SeasonSelector from "../components/TV/SeasonSelector";
import EpisodeList from "../components/TV/EpisodeList";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function TV() {
  const { id } = useParams();

  const [season, setSeason] = useState(1);

  const { setFocusedId, focusedId } =
    useContext(FocusContext);

  const {
    data: show,
    isLoading,
  } = useTV(id);

  const {
    data: seasonData,
    isLoading: seasonLoading,
  } = useSeason(id, season);

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

  if (!show)
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0B] text-white">
        TV Show not found.
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BACKDROP}${show.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-black/20" />
      </div>

      <div className="relative mx-auto -mt-40 max-w-7xl px-8 pb-16">
        <div className="flex gap-10">
          <img
            src={`${POSTER}${show.poster_path}`}
            alt={show.name}
            className="w-72 rounded-2xl shadow-2xl"
          />

          <div className="flex-1">
            <h1 className="mb-4 text-5xl font-black">
              {show.name}
            </h1>

            <div className="mb-6 flex flex-wrap gap-6 text-zinc-400">
              <span>
                ⭐ {show.vote_average.toFixed(1)}
              </span>

              <span>
                {show.first_air_date}
              </span>

              <span>
                {show.number_of_seasons} Seasons
              </span>

              <span>
                {show.number_of_episodes} Episodes
              </span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-zinc-800 px-4 py-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mb-8 max-w-3xl text-lg leading-8 text-zinc-300">
              {show.overview}
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
                <WatchButton
                  id={show.id}
                  type="tv"
                  season={season}
                  episode={1}
                >
                  ▶ Watch Season {season}
                </WatchButton>
              </div>
            </Focusable>
          </div>
        </div>

        <div className="mt-14">
          <SeasonSelector
            seasons={show.seasons.filter(
              (s) => s.season_number > 0
            )}
            selected={season}
            onChange={setSeason}
          />

          {!seasonLoading && seasonData && (
            <EpisodeList
              showId={show.id}
              season={season}
              episodes={seasonData.episodes}
            />
          )}
        </div>
      </div>
    </main>
  );
}