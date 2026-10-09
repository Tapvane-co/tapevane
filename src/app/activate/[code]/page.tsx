import Link from "next/link";
import { Suspense } from "react";
import { sampleCardCodes } from "@/lib/cards";

export const metadata = { title: "Activate your Tapvane card" };

export function generateStaticParams() {
  return sampleCardCodes().map((code) => ({ code }));
}

async function Activate({ params }: { params: PageProps<"/activate/[code]">["params"] }) {
  const { code } = await params;
  const shown = decodeURIComponent(code).toUpperCase();
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-gold uppercase tracking-[0.3em] text-xl">Tapvane</span>
      <h1 className="font-display text-3xl text-ivory">Activate your Tapvane card</h1>
      <p className="text-muted">
        This card is not linked to a profile yet. Sign up or log in to set up your profile and
        connect this card.
      </p>
      <p className="rounded-full border border-line px-4 py-1 text-xs tracking-widest text-stone">
        {shown}
      </p>
      <div className="mt-4 flex w-full flex-col gap-3">
        <Link
          href="/signup"
          className="flex min-h-12 items-center justify-center rounded-full bg-gold px-6 font-semibold text-onyx"
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className="flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-ivory hover:border-gold"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}

export default function ActivatePage(props: PageProps<"/activate/[code]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <Activate params={props.params} />
    </Suspense>
  );
}
