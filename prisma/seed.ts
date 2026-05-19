import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.admin.upsert({
    where: { email: "admin@citadelglobaldental.com" },
    update: {},
    create: {
      email: "admin@citadelglobaldental.com",
      password: hash,
      role: "admin",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  await prisma.teamMember.upsert({
    where: { id: "dr-chris-ejakpome" },
    update: {},
    create: {
      id: "dr-chris-ejakpome",
      name: "Dr. Chris Ejakpome",
      qualifications: "BDS, Implantology (USA & Canada)",
      specialization: "Oral & Maxillofacial Surgery",
      experience: "2014 – present",
      bio: "Dr. Chris Ejakpome is the founder and lead clinician at Citadel Global Dental Clinic. With international training in implantology from the USA and Canada, he brings global standards of dentistry to Ilorin.",
      order: 1,
    },
  });

  const services = [
    {
      slug: "orthodontics-braces",
      name: "Orthodontics & Braces",
      description:
        "Modern braces and clear aligners to straighten teeth, correct bites, and unlock confident smiles. We are proudly home to the Best Braces Centre in Kwara.",
      benefits: [
        "Metal, ceramic and clear aligner options",
        "Personalised treatment plans",
        "Regular progress reviews",
        "Adult and adolescent care",
      ],
      steps: [
        { title: "Consultation", detail: "Full assessment and digital scans." },
        { title: "Treatment plan", detail: "Tailored timeline and pricing." },
        { title: "Fitting", detail: "Comfortable, precise placement." },
        { title: "Follow-up", detail: "Regular adjustments and care." },
      ],
      order: 1,
    },
    {
      slug: "dental-implants",
      name: "Dental Implants",
      description:
        "Permanent tooth replacement with internationally certified implantology — restoring function and aesthetics for a lifetime.",
      benefits: [
        "Single tooth, multiple or full-arch options",
        "Surgeon trained in USA & Canada",
        "Bone-grafting where required",
        "Natural-looking outcomes",
      ],
      steps: [
        { title: "Assessment", detail: "X-ray and 3D imaging." },
        { title: "Implant placement", detail: "Minimally invasive surgery." },
        { title: "Healing", detail: "Osseointegration period." },
        { title: "Crown fitting", detail: "Final restoration." },
      ],
      order: 2,
    },
    {
      slug: "teeth-whitening",
      name: "Teeth Whitening",
      description:
        "Safe, professional whitening that delivers visible results without damaging enamel — performed in-clinic with medical-grade products.",
      benefits: [
        "In-clinic and take-home options",
        "Enamel-safe formulations",
        "Visible results in one session",
        "Long-lasting brightness",
      ],
      steps: [
        { title: "Cleaning", detail: "Scaling and polishing first." },
        { title: "Whitening", detail: "Gel application under supervision." },
        { title: "Aftercare", detail: "Guidance to maintain results." },
      ],
      order: 3,
    },
    {
      slug: "scaling-polishing",
      name: "Scaling & Polishing",
      description:
        "Routine cleaning to remove tartar and plaque, prevent gum disease, and keep teeth healthy and bright.",
      benefits: [
        "Prevents gum disease",
        "Removes hardened tartar",
        "Polishes for a fresh feel",
        "Recommended every 6 months",
      ],
      steps: [
        { title: "Examination", detail: "Check teeth and gums." },
        { title: "Scaling", detail: "Ultrasonic tartar removal." },
        { title: "Polishing", detail: "Smooth finish for brightness." },
      ],
      order: 4,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        patientName: "Aisha M.",
        quote:
          "Dr. Chris and his team are simply world-class. My braces journey was smooth and the results are amazing.",
        rating: 5,
        published: true,
      },
      {
        patientName: "Tunde A.",
        quote:
          "I had an implant placed here and you cannot tell the difference. Top-tier care in Ilorin.",
        rating: 5,
        published: true,
      },
      {
        patientName: "Grace O.",
        quote:
          "Friendly staff, modern clinic, and gentle treatment. My family now comes here for everything.",
        rating: 5,
        published: true,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
