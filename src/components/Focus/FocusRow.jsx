import { Children } from "react";

import Focusable from "./Focusable";
import { useFocusRow } from "./FocusSection";

export default function FocusRow({
  items,
  render,
  prefix = "item",
}) {
  const row = useFocusRow();

  return (
    <>
      {items.map((item, index) => (
        <Focusable
          key={`${prefix}-${item.id}`}
          id={`${prefix}-${item.id}`}
          row={row}
          col={index}
        >
          {render(item)}
        </Focusable>
      ))}
    </>
  );
}