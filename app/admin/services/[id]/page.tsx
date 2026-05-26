import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceEditor } from "@/components/admin/ServiceEditor";

type Step = { title: string; detail: string };
type Faq = { question: string; answer: string };

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const s = await prisma.service.findUnique({ where: { id: params.id } });
  if (!s) notFound();
  const steps = (Array.isArray(s.steps) ? (s.steps as unknown as Step[]) : []) ?? [];
  const faqs = (Array.isArray(s.faqs) ? (s.faqs as unknown as Faq[]) : []) ?? [];
  return (
    <ServiceEditor
      initial={{
        id: s.id,
        name: s.name,
        slug: s.slug,
        description: s.description,
        benefits: s.benefits ?? [],
        steps,
        faqs,
        image: s.image,
        order: s.order,
        published: s.published,
      }}
    />
  );
}
