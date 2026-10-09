import { getProfile, vcardFor } from "@/lib/profiles";

export async function GET(_req: Request, ctx: RouteContext<"/p/[username]/vcard">) {
  const { username } = await ctx.params;
  const profile = await getProfile(username);
  if (!profile || !profile.isActive) {
    return new Response("Profile unavailable", { status: 404 });
  }
  return new Response(vcardFor(profile), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${profile.username}.vcf"`,
    },
  });
}
