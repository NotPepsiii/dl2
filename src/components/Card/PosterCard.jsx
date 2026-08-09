import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function PosterCard({ item }) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date || "";
  const year = date ? date.slice(0, 4) : "—";
  const rating = item.vote_average
    ? item.vote_average.toFixed(1)
    : "N/A";

  const type = item.media_type === "tv" || item.first_air_date
    ? "tv"
    : "movie";

  return (
    <Link to={`/${type}/${item.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="w-44 flex-shrink-0 cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl shadow-xl bg-zinc-900">
          <img
            src={`${IMAGE_BASE}${item.poster_path}`}
            alt={title}
            className="aspect-[2/3] w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-3">
          <h3 className="truncate font-semibold text-white">
            {title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-sm text-zinc-400">
            <span>⭐ {rating}</span>
            <span>{year}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}