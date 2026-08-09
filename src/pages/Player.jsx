import { useEffect, useState } from "react";

export default function Player() {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timer;

    const show = () => {
      setShowControls(true);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setShowControls(false);
      }, 4000);
    };

    show();

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
        case "Enter":
        case " ":
        case "Escape":
        case "Backspace":
          show();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Video Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
        <div className="text-center">
          <div className="mb-4 text-8xl">▶</div>

          <h1 className="text-4xl font-bold">
            Dulo TV Player
          </h1>

          <p className="mt-3 text-zinc-400">
            Video player will go here.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div
        className={`absolute inset-x-0 bottom-0 transition-opacity duration-300 ${
          showControls
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="bg-gradient-to-t from-black via-black/80 to-transparent px-10 pb-8 pt-20">
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-red-600"
              style={{ width: "30%" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Example Movie
              </h2>

              <p className="text-zinc-400">
                42:15 / 2:08:43
              </p>
            </div>

            <div className="flex gap-4 text-lg">
              <div className="rounded-lg bg-white/10 px-4 py-2">
                ⏪ Rewind
              </div>

              <div className="rounded-lg bg-red-600 px-6 py-2 font-bold">
                ⏸ Pause
              </div>

              <div className="rounded-lg bg-white/10 px-4 py-2">
                ⏩ Forward
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}