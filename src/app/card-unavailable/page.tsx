import Link from "next/link";

export const metadata = { title: "Card unavailable | Tapvane" };

export default function CardUnavailable() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-gold uppercase tracking-[0.3em] text-xl">Tapvane</span>
      <h1 className="font-display text-3xl text-ivory">Card unavailable</h1>
      <p className="max-w-xs text-muted">
        This card is not active. If it is yours, please contact us and we will help.
      </p>
      <Link
        href="/"
        className="mt-2 flex min-h-12 items-center rounded-full border border-line px-6 text-ivory hover:border-gold"
      >
        Go to Tapvane
      </Link>
    </main>
  );
}
