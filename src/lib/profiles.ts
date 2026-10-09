// Profile data. For now this is sample data; in Stage 4 it will be read from Supabase.
export type Profile = {
  username: string;
  fullName: string;
  title?: string;
  company?: string;
  bio?: string;
  photoUrl?: string;
  coverUrl?: string;
  accentColor?: string; // Pro only
  phone?: string;
  whatsapp?: string; // digits with country code, e.g. 2348000000000
  email?: string;
  website?: string;
  location?: string;
  instagram?: string; // handle, no @
  linkedin?: string; // handle or full URL
  x?: string;
  tiktok?: string;
  facebook?: string;
  snapchat?: string;
  isActive: boolean;
};

const sampleProfiles: Profile[] = [
  {
    username: "demo",
    fullName: "Amaka Obi",
    title: "Brand Designer",
    company: "Obi Studio",
    bio: "I design brands and websites for growing Nigerian businesses. Tap Save Contact to stay in touch.",
    phone: "+2348000000000",
    whatsapp: "2348000000000",
    email: "hello@example.com",
    website: "https://example.com",
    location: "Wadata, Makurdi, Benue State",
    instagram: "tapvane",
    linkedin: "https://www.linkedin.com/in/example",
    x: "tapvane",
    isActive: true,
  },
  {
    username: "offline-demo",
    fullName: "Switched Off",
    isActive: false,
  },
];

export async function getProfile(username: string): Promise<Profile | null> {
  return sampleProfiles.find((p) => p.username === username.toLowerCase()) ?? null;
}

export function sampleUsernames() {
  return sampleProfiles.map((p) => p.username);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export type SocialKind = "instagram" | "x" | "tiktok" | "facebook" | "snapchat" | "linkedin";

export function socialUrl(kind: SocialKind, v: string) {
  if (/^https?:\/\//i.test(v)) return v;
  const h = v.replace(/^@/, "");
  const base = {
    instagram: "https://instagram.com/",
    x: "https://x.com/",
    tiktok: "https://tiktok.com/@",
    facebook: "https://facebook.com/",
    snapchat: "https://snapchat.com/add/",
    linkedin: "https://linkedin.com/in/",
  }[kind];
  return base + h;
}

export function mapsUrl(location: string) {
  return /^https?:\/\//i.test(location)
    ? location
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

export function vcardFor(p: Profile) {
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const parts = p.fullName.trim().split(/\s+/);
  const last = parts.length > 1 ? parts.pop()! : "";
  const first = parts.join(" ");
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:${esc(last)};${esc(first)};;;`, `FN:${esc(p.fullName)}`];
  if (p.company) lines.push(`ORG:${esc(p.company)}`);
  if (p.title) lines.push(`TITLE:${esc(p.title)}`);
  if (p.phone) lines.push(`TEL;TYPE=CELL:${p.phone}`);
  if (p.email) lines.push(`EMAIL:${p.email}`);
  if (p.website) lines.push(`URL:${p.website}`);
  if (p.location) lines.push(`ADR;TYPE=WORK:;;${esc(p.location)};;;;`);
  lines.push("END:VCARD");
  return lines.join("\r\n") + "\r\n";
}
