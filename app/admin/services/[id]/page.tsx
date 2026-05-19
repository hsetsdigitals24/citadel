import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceEditor } from "@/components/admin/ServiceEditor";

type Step = { title: string; detail: string };

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const s = await prisma.service.findUnique({ where: { id: params.id } });
  if (!s) notFound();
  const steps = (Array.isArray(s.steps) ? (s.steps as unknown as Step[]) : []) ?? [];
  return (
    <ServiceEditor
      initial={{
        id: s.id,
        name: s.name,
        slug: s.slug,
        description: s.description,
        benefits: s.benefits ?? [],
        steps,
        image: s.image,
        order: s.order,
        published: s.published,
      }}
    />
  );
}
