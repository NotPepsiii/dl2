import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { tvPlayerUrl } from "../api/player";
import { getProgress, saveProgress } from "../utils/progress";

import useTV from "../hooks/useTV";
import useSeason from "../hooks/useSeason";

import PlayerHeader from "../components/Player/PlayerHeader";
import PlayerFrame from "../components/Player/PlayerFrame";

export default function WatchTV() {
  const { id, season, episode } = useParams();

  const seasonNumber = Number(season);
  const episodeNumber = Number(episode);

  const { data: show } = useTV(id);
  const { data: seasonData } = useSeason(id, seasonNumber);

  const currentEpisode = seasonData?.episodes?.find(
    (ep) => ep.episode_number === episodeNumber
  );

  const saved =
    getProgress(
      `${id}-${seasonNumber}-${episodeNumber}`,
      "tv"
    ) || {};

  const url = tvPlayerUrl(
    id,
    seasonNumber,
    episodeNumber,
    Math.floor(saved.currentTime || 0)
  );

  useEffect(() => {
    function onMessage(event) {
      if (typeof event.data !== "string") return;

      try {
        const message = JSON.parse(event.data);

        if (message.type !== "PLAYER_EVENT") return;
        if (!show || !currentEpisode) return;

        saveProgress(
          {
            id: `${show.id}-${seasonNumber}-${episodeNumber}`,
            showId: show.id,

            type: "tv",

            season: seasonNumber,
            episode: episodeNumber,

            title: show.name,
            episodeTitle: currentEpisode.name,

            overview: currentEpisode.overview,

            poster: show.poster_path,
            backdrop: show.backdrop_path,

            rating: show.vote_average,

            year: show.first_air_date?.slice(0, 4),
          },
          message.data
        );
      } catch (err) {
        console.error("Player message error:", err);
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener(
        "message",
        onMessage
      );
    };
  }, [
    id,
    show,
    currentEpisode,
    seasonNumber,
    episodeNumber,
  ]);

  return (
    <main className="flex h-screen flex-col bg-black text-white">
      <PlayerHeader
        title={show?.name}
        subtitle={
          currentEpisode
            ? `Season ${seasonNumber} • Episode ${episodeNumber} — ${currentEpisode.name}`
            : undefined
        }
      />

      <PlayerFrame url={url} />
    </main>
  );
}