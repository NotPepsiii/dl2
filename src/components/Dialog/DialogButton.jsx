import { useContext } from "react";
import FocusContext from "../../context/FocusContext";

export default function DialogButton({
  id,
  row,
  col,
  children,
  onClick,
  danger = false,
}) {
  const { focusedId } = useContext(FocusContext);

  const focused = focusedId === id;

  return (
    <button
      onClick={onClick}
      className={`
        min-w-[160px]
        rounded-xl
        px-6
        py-4
        text-lg
        font-semibold
        transition-all
        duration-200
        ${
          danger
            ? "bg-red-600 hover:bg-red-700"
            : "bg-zinc-700 hover:bg-zinc-600"
        }
        ${
          focused
            ? "ring-4 ring-red-500 scale-105"
            : ""
        }
      `}
    >
      {children}
    </button>
  );
}