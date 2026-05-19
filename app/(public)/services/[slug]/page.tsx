import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@heroicons/react/20/solid";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { getService } from "@/lib/queries";
import { resolveImageUrl } from "@/lib/r2";
import { buildMeta } from "@/lib/metadata";

type Step = { title: string; detail: string };

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const s = await getService(params.slug);
  if (!s) return buildMeta("Service", "Dental service at Citadel Global Dental Clinic.");
  return buildMeta(s.name, s.description.slice(0, 155));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = await getService(params.slug);
  if (!s) notFound();

  const steps = (Array.isArray(s.steps) ? s.steps : []) as Step[];
  const benefits = (s.benefits as string[]) ?? [];
  const imageUrl = await resolveImageUrl(s.image);

  return (
    <>
      <PageHero eyebrow="Service" title={s.name} description={s.description} />

      <section className="section">
        <div className="container-tight grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {imageUrl && (
              <Reveal>
                <div className="relative -mt-24 aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-black/[0.04] shadow-glow">
                  <Image
                    src={imageUrl}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
            {benefits.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="heading-md text-balance">Benefits</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 rounded-xl bg-surface p-4 ring-1 ring-black/[0.04]"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm text-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {steps.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="heading-md text-balance">How it works</h2>
                  <ol className="mt-6 space-y-4">
                    {steps.map((st, i) => (
                      <li
                        key={st.title}
                        className="relative flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-black/[0.04] shadow-soft"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {st.title}
                          </h3>
                          <p className="mt-1 text-sm text-ink-muted">
                            {st.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-3xl bg-brand-gradient p-7 text-white shadow-glow">
                <h3 className="text-lg font-semibold">Ready to start?</h3>
                <p className="mt-2 text-sm text-white/80">
                  Book a consultation and we will tailor the right plan for you.
                </p>
                <Link
                  href="/appointments"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-clinic-red px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-clinic-red-hover"
                >
                  Book appointment
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
