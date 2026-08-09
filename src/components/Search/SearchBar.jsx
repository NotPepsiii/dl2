import { Search } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

import FocusContext from "../../context/FocusContext";
import Focusable from "../Focus/Focusable";

export default function SearchBar({
  value,
  onChange,
}) {
  const inputRef = useRef(null);

  const { focusedId } = useContext(FocusContext);

  const focused = focusedId === "search-input";

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [focused]);

  return (
    <div className="sticky top-0 z-20 mb-10 bg-[#0B0B0B] py-6">
      <Focusable
        id="search-input"
        row={0}
        col={0}
      >
        <div className="relative">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400"
            size={28}
          />

          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search movies and TV shows..."
            className="h-16 w-full rounded-2xl border border-zinc-700 bg-zinc-900 pl-16 pr-6 text-xl outline-none transition focus:border-red-600"
            onKeyDown={(e) => {
              // Let the focus system handle navigation keys.
              if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
              ) {
                e.preventDefault();
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: e.key,
                    bubbles: true,
                  })
                );
              }
            }}
          />
        </div>
      </Focusable>
    </div>
  );
}