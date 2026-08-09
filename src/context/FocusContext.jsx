import { createContext } from "react";

const FocusContext = createContext({
  focusedId: null,
  register: () => {},
  unregister: () => {},
  setFocusedId: () => {},
});

export default FocusContext;