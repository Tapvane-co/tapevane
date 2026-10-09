import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProfileIconButton } from "@/components/ProfileIconButton";
import ShareButton from "@/components/ShareButton";
import { icons } from "@/components/icons";
import {
  getProfile,
  initials,
  mapsUrl,
  sampleUsernames,
  socialUrl,
  type Profile,
} from "@/lib/profiles";

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
      <p className="max-w-xs text-muted">This profile is not available right now.</p>
    </main>
  );
}

function buttonsFor(p: Profile) {
  const items: { label: string; href: string; icon: React.ReactNode }[] = [];
  if (p.phone) items.push({ label: "Call", href: `tel:${p.phone}`, icon: icons.call });
  if (p.whatsapp) items.push({ label: "WhatsApp", href: `https://wa.me/${p.whatsapp.replace(/\D/g, "")}`, icon: icons.whatsapp });
  if (p.email) items.push({ label: "Email", href: `mailto:${p.email}`, icon: icons.email });
  if (p.instagram) items.push({ label: "Instagram", href: socialUrl("instagram", p.instagram), icon: icons.instagram });
  if (p.website) items.push({ label: "Website", href: p.website, icon: icons.website });
  if (p.linkedin) items.push({ label: "LinkedIn", href: socialUrl("linkedin", p.linkedin), icon: icons.linkedin });
  if (p.location) items.push({ label: "Location", href: mapsUrl(p.location), icon: icons.location });
  return items;
}

const extraSocials = [
  ["x", "X"],
  ["tiktok", "TikTok"],
  ["facebook", "Facebook"],
  ["snapchat", "Snapchat"],
] as const;

async function ProfileContent({ params }: { params: PageProps<"/p/[username]">["params"] }) {
  const { username } = await params;
  const profile = await getProfile(username);
  if (!profile) notFound();
  if (!profile.isActive) return <Unavailable />;

  const items = buttonsFor(profile);
  for (const [key, label] of extraSocials) {
    const v = profile[key];
    if (v) items.push({ label, href: socialUrl(key, v), icon: icons[key] });
  }
  const subtitle = [profile.title, profile.company].filter(Boolean).join(" · ");

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col">
      {/* Cover banner */}
      <div
        className="relative h-[150px] border-b border-gold bg-charcoal bg-cover bg-center"
        style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})` } : undefined}
      >
        <span className="absolute left-6 top-5 font-display text-xs uppercase tracking-[0.3em] text-gold">
          Tapvane
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8">
        {/* Photo overlapping the banner by half */}
        <div className="relative -mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-onyx bg-charcoal outline outline-1 outline-gold">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.photoUrl} alt={profile.fullName} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-3xl text-gold">{initials(profile.fullName)}</span>
          )}
        </div>

        <h1 className="mt-4 font-display text-[26px] leading-tight text-ivory">{profile.fullName}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-muted">{subtitle}</p>}
        {profile.bio && <p className="mt-3 line-clamp-2 text-[13px] text-muted">{profile.bio}</p>}

        <div className="mt-8 grid grid-cols-4 gap-y-5">
          {items.map((b) => (
            <ProfileIconButton key={b.label} label={b.label} href={b.href}>
              {b.icon}
            </ProfileIconButton>
          ))}
          <ShareButton name={profile.fullName} />
        </div>

        <div className="mt-auto pt-10">
          <a
            href={`/p/${profile.username}/vcard`}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-6 font-semibold text-onyx"
          >
            Save Contact
          </a>
          <p className="mt-6 text-center text-xs text-stone">
            <a href="/" className="underline-offset-4 hover:underline">
              Get your own Tapvane card
            </a>
          </p>
        </div>
      </div>
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
