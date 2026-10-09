// Card data. For now this is sample data; in Stage 5 it will be read from Supabase.
// A card code is what's written on the chip: https://tapvane.com/c/<code>
export type Card = {
  code: string;
  status: "unassigned" | "active" | "disabled";
  profileUsername?: string; // set when status is "active"
};

const sampleCards: Card[] = [
  { code: "TVN-DEMO1", status: "active", profileUsername: "demo" },
  { code: "TVN-NEW01", status: "unassigned" },
  { code: "TVN-OFF01", status: "disabled" },
];

export async function getCard(code: string): Promise<Card | null> {
  const wanted = code.trim().toUpperCase();
  return sampleCards.find((c) => c.code === wanted) ?? null;
}

export function sampleCardCodes() {
  return sampleCards.map((c) => c.code);
}
