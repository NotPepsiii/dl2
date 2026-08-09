import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlayerHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-zinc-950 px-6 py-3">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-zinc-800"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-xl font-bold">
        Dulo TV
      </h1>

      <div />
    </header>
  );
}