import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function SearchCard({ item, focused }) {
  const title = item.title || item.name;

  const link =
    item.media_type === "movie"
      ? `/movie/${item.id}`
      : `/tv/${item.id}`;

  return (
    <motion.div
      animate={{
        scale: focused ? 1.08 : 1,
        y: focused ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={`rounded-xl transition-shadow ${
        focused
          ? "ring-4 ring-red-500 shadow-[0_0_40px_rgba(239,68,68,0.45)]"
          : ""
      }`}
    >
      <Link to={link} className="group block">
        <img
          src={`${IMAGE}${item.poster_path}`}
          alt={title}
          className="aspect-[2/3] w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
        />

        <h3 className="mt-3 truncate text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm text-zinc-400">
          {item.media_type === "movie"
            ? "Movie"
            : "TV Show"}
        </p>
      </Link>
    </motion.div>
  );
}