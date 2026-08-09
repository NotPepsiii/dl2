import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function ContinueWatchingCard({ item }) {
  return (
    <Link
      to={`/watch/${item.type}/${item.id}`}
      className="group block w-[220px] flex-shrink-0"
    >
      <img
        src={`${IMAGE_BASE}${item.poster}`}
        alt={item.title}
        className="aspect-[2/3] w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
      />

      <h3 className="mt-3 truncate text-lg font-semibold">
        {item.title}
      </h3>

      <ProgressBar progress={item.progress} />

      <p className="mt-2 text-sm text-zinc-400">
        {Math.round(item.progress)}% watched
      </p>
    </Link>
  );
}