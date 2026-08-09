import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import FocusContext from "../../context/FocusContext";
import Focusable from "../Focus/Focusable";
import DialogButton from "./DialogButton";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  const { setFocusedId } = useContext(FocusContext);

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      setFocusedId("dialog-cancel");
    });

    const handleKeyDown = (e) => {
      if (
        e.key === "Escape" ||
        e.key === "Backspace" ||
        e.key === "BrowserBack" ||
        e.key === "GoBack"
      ) {
        e.preventDefault();
        onCancel?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onCancel, setFocusedId]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-full bg-red-600/20 p-3">
                  <AlertTriangle
                    className="text-red-500"
                    size={34}
                  />
                </div>

                <h2 className="text-3xl font-bold">
                  {title}
                </h2>
              </div>

              <p className="mb-10 text-lg leading-relaxed text-zinc-300">
                {message}
              </p>

              <div className="flex justify-end gap-4">
                <Focusable
                  id="dialog-cancel"
                  row={0}
                  col={0}
                  onEnter={onCancel}
                >
                  <DialogButton
                    id="dialog-cancel"
                    onClick={onCancel}
                  >
                    {cancelText}
                  </DialogButton>
                </Focusable>

                <Focusable
                  id="dialog-confirm"
                  row={0}
                  col={1}
                  onEnter={onConfirm}
                >
                  <DialogButton
                    id="dialog-confirm"
                    danger={danger}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </DialogButton>
                </Focusable>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}