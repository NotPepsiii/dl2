export default function SearchSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xl bg-zinc-800" />
          <div className="mt-3 h-5 rounded bg-zinc-800" />
          <div className="mt-2 h-4 w-2/3 rounded bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}