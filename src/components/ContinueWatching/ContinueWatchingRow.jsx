import { useNavigate } from "react-router-dom";

import { getContinueWatching } from "../../utils/progress";

import ContinueWatchingCard from "./ContinueWatchingCard";
import Focusable from "../Focus/Focusable";

export default function ContinueWatchingRow({
  row = 2,
}) {
  const navigate = useNavigate();

  const items = getContinueWatching();

  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-5 text-3xl font-bold">
        ▶ Continue Watching
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <Focusable
            key={`${item.type}-${item.id}`}
            id={`continue-${item.type}-${item.id}`}
            row={row}
            col={index}
            onEnter={() =>
              navigate(
                item.type === "movie"
                  ? `/movie/${item.id}`
                  : `/tv/${item.id}`
              )
            }
          >
            <ContinueWatchingCard item={item} />
          </Focusable>
        ))}
      </div>
    </section>
  );
}