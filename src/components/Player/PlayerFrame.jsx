import { useState } from "react";
import PlayerLoader from "./PlayerLoader";

export default function PlayerFrame({ url }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex-1 overflow-hidden bg-black">
      {!loaded && <PlayerLoader />}

      <iframe
        src={url}
        title="Dulo TV Player"
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="origin"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}