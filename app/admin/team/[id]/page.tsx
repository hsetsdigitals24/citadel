import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TeamMemberEditor } from "@/components/admin/TeamMemberEditor";

export default async function EditTeamMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const m = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!m) notFound();
  return (
    <TeamMemberEditor
      initial={{
        id: m.id,
        name: m.name,
        qualifications: m.qualifications,
        specialization: m.specialization,
        experience: m.experience,
        bio: m.bio,
        photo: m.photo,
        order: m.order,
      }}
    />
  );
}
