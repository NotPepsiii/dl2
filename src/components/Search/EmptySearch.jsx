import { Search } from "lucide-react";

export default function EmptySearch() {
  return (
    <div className="mt-24 text-center">
      <Search
        size={72}
        className="mx-auto mb-6 text-zinc-600"
      />

      <h2 className="text-3xl font-bold">
        Search Dulo TV
      </h2>

      <p className="mt-3 text-zinc-400">
        Find movies and TV shows instantly.
      </p>
    </div>
  );
}