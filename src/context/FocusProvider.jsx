import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import FocusContext from "./FocusContext";

export default function FocusProvider({
  children,
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [focusedId, setFocusedId] =
    useState(null);

  const register = useCallback((item) => {
    setItems((old) => {
      const filtered = old.filter(
        (i) => i.id !== item.id
      );

      return [...filtered, item];
    });
  }, []);

  const unregister = useCallback((id) => {
    setItems((old) =>
      old.filter((i) => i.id !== id)
    );
  }, []);

  useEffect(() => {
    if (!focusedId && items.length) {
      setFocusedId(items[0].id);
    }
  }, [items, focusedId]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!items.length) return;

      const current = items.find(
        (i) => i.id === focusedId
      );

      if (!current) return;

      let next = null;

      switch (e.key) {
        case "ArrowRight":
          next = items.find(
            (i) =>
              i.row === current.row &&
              i.col === current.col + 1
          );
          break;

        case "ArrowLeft":
          next = items.find(
            (i) =>
              i.row === current.row &&
              i.col === current.col - 1
          );
          break;

        case "ArrowDown": {
          const candidates = items.filter(
            (i) => i.row > current.row
          );

          if (candidates.length) {
            const nextRow = Math.min(
              ...candidates.map((i) => i.row)
            );

            next = candidates
              .filter((i) => i.row === nextRow)
              .sort(
                (a, b) =>
                  Math.abs(a.col - current.col) -
                  Math.abs(b.col - current.col)
              )[0];
          }

          break;
        }

        case "ArrowUp": {
          const candidates = items.filter(
            (i) => i.row < current.row
          );

          if (candidates.length) {
            const prevRow = Math.max(
              ...candidates.map((i) => i.row)
            );

            next = candidates
              .filter((i) => i.row === prevRow)
              .sort(
                (a, b) =>
                  Math.abs(a.col - current.col) -
                  Math.abs(b.col - current.col)
              )[0];
          }

          break;
        }

        case "Enter":
        case "NumpadEnter": {
          e.preventDefault();

          const root = current.ref?.current;

          if (root) {
            const clickable =
              root.matches(
                "a,button,[role='button']"
              )
                ? root
                : root.querySelector(
                    "a,button,[role='button'],input,select,textarea"
                  );

            if (clickable) {
              clickable.click();
              return;
            }
          }

          current.onEnter?.();
          return;
        }

        case "Backspace":
        case "Escape":
        case "BrowserBack":
        case "GoBack": {
          const active = document.activeElement;

          if (
            active &&
            (
              active.tagName === "INPUT" ||
              active.tagName === "TEXTAREA" ||
              active.isContentEditable
            )
          ) {
            return;
          }

          e.preventDefault();
          navigate(-1);
          return;
        }

        default:
          return;
      }

      if (next) {
        e.preventDefault();
        setFocusedId(next.id);

        requestAnimationFrame(() => {
          next.ref?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        });
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [items, focusedId, navigate]);

  const value = useMemo(
    () => ({
      register,
      unregister,
      focusedId,
      setFocusedId,
    }),
    [register, unregister, focusedId]
  );

  return (
    <FocusContext.Provider value={value}>
      {children}
    </FocusContext.Provider>
  );
}