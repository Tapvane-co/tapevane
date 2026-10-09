import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProfileView from "@/components/ProfileView";
import { getProfile, sampleUsernames } from "@/lib/profiles";

export function generateStaticParams() {
  return sampleUsernames().map((username) => ({ username }));
}

export async function generateMetadata({ params }: PageProps<"/p/[username]">): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfile(username);
  if (!profile || !profile.isActive) return { title: "Profile unavailable | Tapvane" };
  const line = [profile.title, profile.company].filter(Boolean).join(" · ");
  return {
    title: `${profile.fullName} | Tapvane`,
    description: line || `${profile.fullName} on Tapvane`,
    openGraph: { title: profile.fullName, description: line || undefined, type: "profile" },
  };
}

function Unavailable() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-gold uppercase tracking-[0.3em] text-xl">Tapvane</span>
      <h1 className="font-display text-3xl text-ivory">Profile unavailable</h1>
      <p className="max-w-xs text-muted">This Tapvane profile isn&apos;t active right now.</p>
      <Link href="/" className="text-sm text-gold underline-offset-4 hover:underline">
        Get your own Tapvane card
      </Link>
    </main>
  );
}

async function ProfileContent({ params }: { params: PageProps<"/p/[username]">["params"] }) {
  const { username } = await params;
  const profile = await getProfile(username);
  if (!profile || !profile.isActive) return <Unavailable />;
  return (
    <main className="flex flex-1 flex-col">
      <ProfileView profile={profile} />
    </main>
  );
}

export default function ProfilePage(props: PageProps<"/p/[username]">) {
  return (
    <Suspense fallback={<main className="flex-1" />}>
      <ProfileContent params={props.params} />
    </Suspense>
  );
}
