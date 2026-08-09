import { useState, useEffect, useContext } from "react";
import { Trash2 } from "lucide-react";

import FocusContext from "../context/FocusContext";
import Focusable from "../components/Focus/Focusable";

import ConfirmDialog from "../components/Dialog/ConfirmDialog";
import { clearContinueWatching } from "../utils/storage";

export default function Settings() {
  const [showDialog, setShowDialog] = useState(false);

  const { focusedId, setFocusedId } =
    useContext(FocusContext);

  useEffect(() => {
    requestAnimationFrame(() => {
      setFocusedId("clear-progress");
    });
  }, [setFocusedId]);

  function handleDelete() {
    clearContinueWatching();

    window.dispatchEvent(
      new Event("continue-watching-updated")
    );

    setShowDialog(false);
  }

  return (
    <>
      <main className="min-h-screen bg-[#0B0B0B] px-8 py-10 text-white">
        <h1 className="mb-8 text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <div className="max-w-2xl space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">
              Continue Watching
            </h2>

            <p className="mb-6 text-zinc-400">
              Remove all saved watch progress.
            </p>

            <Focusable
              id="clear-progress"
              row={0}
              col={0}
              onEnter={() => setShowDialog(true)}
            >
              <button
                onClick={() => setShowDialog(true)}
                className={`flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 ${
                  focusedId === "clear-progress"
                    ? "ring-4 ring-red-500 scale-105"
                    : ""
                }`}
              >
                <Trash2 size={20} />
                Clear Continue Watching
              </button>
            </Focusable>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-2xl font-semibold">
              About
            </h2>

            <p className="text-zinc-400">
              Dulo TV v0.1.0 Beta
            </p>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={showDialog}
        title="Clear Continue Watching"
        message="This will permanently remove all saved watch progress. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
}