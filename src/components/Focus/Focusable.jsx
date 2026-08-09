import {
  useContext,
  useEffect,
  useRef,
} from "react";

import FocusContext from "../../context/FocusContext";

export default function Focusable({
  id,
  row,
  col,
  onEnter,
  children,
}) {
  const ref = useRef(null);

  const {
    register,
    unregister,
    focusedId,
  } = useContext(FocusContext);

  const focused = focusedId === id;

  useEffect(() => {
    register({
      id,
      row,
      col,
      ref,
      onEnter,
    });

    return () => unregister(id);
  }, [
    id,
    row,
    col,
    onEnter,
    register,
    unregister,
  ]);

  useEffect(() => {
    if (!focused || !ref.current) return;

    // Scroll the page and any horizontal row to keep the
    // focused element comfortably centered.
    requestAnimationFrame(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  }, [focused]);

  return (
    <div
      ref={ref}
      onClick={onEnter}
      className={`
        relative
        rounded-xl
        transition-all
        duration-200
        will-change-transform
        ${
          focused
            ? "z-50 scale-105 ring-4 ring-red-500 shadow-[0_0_40px_rgba(239,68,68,.55)]"
            : ""
        }
      `}
    >
      {children}
    </div>
  );
}