import { useNavigate } from "react-router-dom";

import Focusable from "../Focus/Focusable";
import EpisodeCard from "./EpisodeCard";

export default function EpisodeList({
  showId,
  season,
  episodes,
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {episodes.map((episode, index) => (
        <Focusable
          key={episode.id}
          id={`episode-${episode.id}`}
          row={2 + index}
          col={0}
          onEnter={() =>
            navigate(
              `/watch/tv/${showId}/${season}/${episode.episode_number}`
            )
          }
        >
          <EpisodeCard episode={episode} />
        </Focusable>
      ))}
    </div>
  );
}