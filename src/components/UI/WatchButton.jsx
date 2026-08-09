import { Link } from "react-router-dom";

export default function WatchButton({
  id,
  type = "movie",
  season = 1,
  episode = 1,
  children,
}) {
  const href =
    type === "movie"
      ? `/watch/movie/${id}`
      : `/watch/tv/${id}/${season}/${episode}`;

  return (
    <Link
      to={href}
      className="rounded-xl bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700"
    >
      {children ?? "▶ Watch Now"}
    </Link>
  );
}