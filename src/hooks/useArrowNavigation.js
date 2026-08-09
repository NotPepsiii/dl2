import { useEffect, useState } from "react";

export default function useArrowNavigation(totalItems, columns = 1) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    function onKeyDown(e) {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex((i) =>
            Math.min(i + 1, totalItems - 1)
          );
          break;

        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex((i) =>
            Math.max(i - 1, 0)
          );
          break;

        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) =>
            Math.min(i + columns, totalItems - 1)
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) =>
            Math.max(i - columns, 0)
          );
          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [totalItems, columns]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
}