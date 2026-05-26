import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TestimonialEditor } from "@/components/admin/TestimonialEditor";

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const t = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!t) notFound();
  return (
    <TestimonialEditor
      initial={{
        id: t.id,
        patientName: t.patientName,
        quote: t.quote,
        rating: t.rating,
        published: t.published,
      }}
    />
  );
}
