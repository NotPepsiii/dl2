import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SearchCard from "./SearchCard";
import Focusable from "../Focus/Focusable";

const COLUMNS = 6;

export default function SearchGrid({ results }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="grid grid-cols-6 gap-6"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {results.map((item, index) => {
        const row = Math.floor(index / COLUMNS) + 1;
        const col = index % COLUMNS;

        const type =
          item.media_type ||
          (item.first_air_date ? "tv" : "movie");

        const link =
          type === "movie"
            ? `/movie/${item.id}`
            : `/tv/${item.id}`;

        return (
          <Focusable
            key={`${type}-${item.id}`}
            id={`search-${type}-${item.id}`}
            row={row}
            col={col}
            onEnter={() => navigate(link)}
          >
            <SearchCard item={item} />
          </Focusable>
        );
      })}
    </motion.div>
  );
}