export default function EpisodeCard({
  episode,
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 transition hover:bg-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          Episode {episode.episode_number}
        </h3>

        <span className="text-sm text-zinc-400">
          {episode.runtime ?? "--"} min
        </span>
      </div>

      <h4 className="mt-2 text-xl font-semibold">
        {episode.name}
      </h4>

      <p className="mt-3 line-clamp-3 text-zinc-400">
        {episode.overview}
      </p>
    </div>
  );
}