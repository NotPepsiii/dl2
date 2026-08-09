import { useState, useContext, useEffect } from "react";
import Focusable from "../Focus/Focusable";
import FocusContext from "../../context/FocusContext";

export default function SeasonSelector({
  seasons,
  selected,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const { focusedId, setFocusedId } =
    useContext(FocusContext);

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      setFocusedId(`season-${selected}`);
    });
  }, [open, selected, setFocusedId]);

  return (
    <div className="mb-10">
      <Focusable
        id="season-button"
        row={1}
        col={0}
        onEnter={() => setOpen((o) => !o)}
      >
        <button
          className={`flex w-64 items-center justify-between rounded-xl border px-5 py-3 text-lg font-semibold transition ${
            focusedId === "season-button"
              ? "border-red-500 bg-red-600 text-white"
              : "border-zinc-700 bg-zinc-900 text-white"
          }`}
        >
          <span>Season {selected}</span>
          <span
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </Focusable>

      {open && (
        <div className="mt-3 w-64 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          {seasons.map((season, index) => (
            <Focusable
              key={season.id}
              id={`season-${season.season_number}`}
              row={2 + index}
              col={0}
              onEnter={() => {
                onChange(season.season_number);
                setOpen(false);

                requestAnimationFrame(() => {
                  setFocusedId("season-button");
                });
              }}
            >
              <div
                className={`cursor-pointer px-5 py-4 transition ${
                  focusedId ===
                  `season-${season.season_number}`
                    ? "bg-red-600 text-white"
                    : selected === season.season_number
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-800"
                }`}
              >
                {season.name}
              </div>
            </Focusable>
          ))}
        </div>
      )}
    </div>
  );
}