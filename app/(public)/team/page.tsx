import Image from "next/image";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { getTeam } from "@/lib/queries";
import { resolveImageUrl } from "@/lib/r2";

export const metadata = buildMeta(
  "Our Team",
  "Meet the dental team behind Citadel Global Dental Clinic, led by Dr. Chris Ejakpome — BDS, Implantology (USA & Canada)."
);

export default async function TeamPage() {
  const team = await getTeam();
  const members = await Promise.all(
    team.map(async (m: any) => ({
      ...m,
      photoUrl: await resolveImageUrl(m.photo),
    }))
  );

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Globally certified. Personally dedicated."
        description="Skilled clinicians delivering modern dentistry with warmth and precision."
      />

      <section className="section">
        <div className="container-tight grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.06}>
              <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.04] shadow-soft transition hover:shadow-glow">
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-gradient">
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end justify-center pb-8 text-white/60">
                      <svg viewBox="0 0 200 200" className="h-3/4 w-3/4" fill="none">
                        <circle cx="100" cy="70" r="38" fill="rgba(255,255,255,0.18)" />
                        <path
                          d="M30 200 C 30 140 60 110 100 110 C 140 110 170 140 170 200 Z"
                          fill="rgba(255,255,255,0.18)"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm text-brand-700">
                    {m.specialization}
                  </p>
                  <p className="mt-3 text-sm text-ink-muted">
                    {m.qualifications}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-subtle">
                    {m.experience}
                  </p>
                  <p className="mt-4 text-sm text-ink-muted leading-relaxed line-clamp-4">
                    {m.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
