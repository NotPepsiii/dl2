import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import Focusable from "../Focus/Focusable";

const BACKDROP = "https://image.tmdb.org/t/p/original";

export default function Hero({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const title = movie.title || movie.name;
  const year = (
    movie.release_date ||
    movie.first_air_date ||
    ""
  ).slice(0, 4);

  const rating = movie.vote_average?.toFixed(1);

  const type =
    movie.media_type === "tv" ||
    movie.first_air_date
      ? "tv"
      : "movie";

  const link = `/${type}/${movie.id}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-12 h-[70vh] overflow-hidden rounded-3xl"
    >
      <img
        src={`${BACKDROP}${movie.backdrop_path}`}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

      <div className="relative z-10 flex h-full items-end p-12">
        <div className="max-w-2xl">
          <span className="mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-bold">
            Featured
          </span>

          <h1 className="mb-4 text-6xl font-black leading-tight text-white">
            {title}
          </h1>

          <div className="mb-5 flex gap-6 text-lg text-zinc-300">
            <span>⭐ {rating}</span>
            <span>{year}</span>
          </div>

          <p className="mb-8 max-w-xl text-lg leading-8 text-zinc-200">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <Focusable
              id="hero-watch"
              row={1}
              col={0}
              onEnter={() => navigate(link)}
            >
              <Link
                to={link}
                className="block rounded-xl bg-white px-8 py-3 font-bold text-black transition hover:bg-zinc-200"
              >
                ▶ Watch
              </Link>
            </Focusable>

            <Focusable
              id="hero-info"
              row={1}
              col={1}
              onEnter={() => navigate(link)}
            >
              <Link
                to={link}
                className="block rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                More Info
              </Link>
            </Focusable>
          </div>
        </div>
      </div>
    </motion.section>
  );
}