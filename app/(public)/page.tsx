import { Hero } from "@/components/home/Hero";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TeamPreview } from "@/components/home/TeamPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTABanner } from "@/components/home/CTABanner";
import { JsonLd } from "@/components/home/JsonLd";
import { getServices, getTeam, getTestimonials } from "@/lib/queries";
import { resolveImageUrl } from "@/lib/r2";

export default async function HomePage() {
  const [services, team, testimonials] = await Promise.all([
    getServices(),
    getTeam(),
    getTestimonials(),
  ]);
  const leadRaw = team[0] ?? {
    id: "lead",
    name: "Dr. Chris Ejakpome",
    qualifications: "BDS, Implantology (USA & Canada)",
    specialization: "Oral & Maxillofacial Surgery",
    experience: "2014 – present",
    bio: "",
    photo: null,
  };
  const lead = {
    ...leadRaw,
    photoUrl: await resolveImageUrl((leadRaw as any).photo),
  };

  return (
    <>
      <JsonLd />
      <Hero />
      <ServicesHighlight services={services as any} />
      <WhyChooseUs />
      <TeamPreview member={lead as any} />
      <TestimonialsCarousel testimonials={testimonials as any} />
      <CTABanner />
    </>
  );
}
