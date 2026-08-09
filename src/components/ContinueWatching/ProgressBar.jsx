export default function ProgressBar({ progress }) {
  return (
    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
      <div
        className="h-full rounded-full bg-red-600 transition-all duration-300"
        style={{
          width: `${Math.min(progress, 100)}%`,
        }}
      />
    </div>
  );
}