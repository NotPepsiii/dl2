import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { moviePlayerUrl } from "../api/player";
import { getProgress, saveProgress } from "../utils/progress";

import useMovie from "../hooks/useMovie";

import PlayerHeader from "../components/Player/PlayerHeader";
import PlayerFrame from "../components/Player/PlayerFrame";

export default function WatchMovie() {
  const { id } = useParams();

  const { data: movie } = useMovie(id);

  const saved = getProgress(id, "movie") || {};

  const url = moviePlayerUrl(
    id,
    Math.floor(saved.currentTime || 0)
  );

  useEffect(() => {
    function onMessage(event) {
      if (typeof event.data !== "string") return;

      try {
        const message = JSON.parse(event.data);

        if (message.type !== "PLAYER_EVENT") return;

        if (!movie) return;

        saveProgress(
          {
            id: movie.id,
            type: "movie",
            title: movie.title,
            overview: movie.overview,
            poster: movie.poster_path,
            backdrop: movie.backdrop_path,
            rating: movie.vote_average,
            year: movie.release_date?.slice(0, 4),
          },
          message.data
        );
      } catch (err) {
        console.error("Player message error:", err);
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [id, movie]);

  return (
    <main className="flex h-screen flex-col bg-black text-white">
      <PlayerHeader />
      <PlayerFrame url={url} />
    </main>
  );
}