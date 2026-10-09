// The TAPVANE logo lives in one place so it can be refined later.
export default function Logo({ tagline = true }: { tagline?: boolean }) {
  return (
    <div className="inline-flex flex-col items-center">
      <span className="font-display text-gold uppercase tracking-[0.3em] text-3xl">
        TAPVANE
      </span>
      {tagline && (
        <span className="mt-2 text-muted uppercase tracking-[0.25em] text-[10px]">
          Tap · Share · Connect
        </span>
      )}
    </div>
  );
}
