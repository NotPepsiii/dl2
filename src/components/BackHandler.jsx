import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BackHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onKeyDown = (e) => {
      // Don't go back while typing
      const tag = document.activeElement?.tagName;
      const editable =
        document.activeElement?.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";

      if (editable) return;

      const isBackKey =
        e.key === "Backspace" ||
        e.key === "Escape" ||
        e.key === "BrowserBack" ||
        e.key === "GoBack";

      if (!isBackKey) return;

      e.preventDefault();

      // Don't leave the app if already home
      if (location.pathname === "/") return;

      navigate(-1);
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [navigate, location.pathname]);

  return null;
}