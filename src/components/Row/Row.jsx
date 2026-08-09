import { useNavigate } from "react-router-dom";

import PosterCard from "../Card/PosterCard";
import Focusable from "../Focus/Focusable";

export default function Row({
  title,
  items = [],
  row,
}) {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="mb-5 text-3xl font-bold text-white">
        {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, index) => {
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
              id={`${title}-${type}-${item.id}`}
              row={row}
              col={index}
              onEnter={() => navigate(link)}
            >
              <PosterCard item={item} />
            </Focusable>
          );
        })}
      </div>
    </section>
  );
}