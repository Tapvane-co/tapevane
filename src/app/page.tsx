import Logo from "@/components/Logo";

// Temporary Stage 1 page, just to prove the setup works. Replaced in Stage 6.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
      <Logo />
      <h1 className="font-display text-4xl text-ivory">Tap. Share. Connect.</h1>
      <p className="max-w-md text-muted">
        Setup complete. The TAPLY website is under construction.
      </p>
      <span className="rounded-full bg-gold px-8 py-3 font-semibold text-onyx">
        Get your card
      </span>
    </main>
  );
}
