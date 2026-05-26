// Static fallback content so the site renders cleanly even before the database
// is provisioned. The DB takes over once seeded.

export type ServiceFallback = {
  id: string;
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  steps: { title: string; detail: string }[];
  image: string | null;
  order: number;
};

export const fallbackServices: ServiceFallback[] = [
  {
    id: "fb-braces",
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
    image: null,
    order: 1,
  },
  {
    id: "fb-implants",
    slug: "dental-implants",
    name: "Dental Implants",
    description:
      "Permanent tooth replacement with internationally certified implantology — restoring function and aesthetics for a lifetime.",
    benefits: [
      "Single, multiple or full-arch options",
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
    image: null,
    order: 2,
  },
  {
    id: "fb-whitening",
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
    image: null,
    order: 3,
  },
  {
    id: "fb-scaling",
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
    image: null,
    order: 4,
  },
];

export const fallbackTeam = [
  {
    id: "fb-chris",
    name: "Dr. Chris Ejakpome",
    qualifications: "BDS, Implantology (USA & Canada)",
    specialization: "Oral & Maxillofacial Surgery",
    experience: "2014 – present",
    bio: "Dr. Chris Ejakpome is the founder and lead clinician at Citadel Global Dental Clinic. With international training in implantology from the USA and Canada, he brings global standards of dentistry to Ilorin.",
    photo: null,
    order: 1,
  },
];

export const fallbackTestimonials = [
  {
    id: "fb-t1",
    patientName: "Aisha M.",
    quote:
      "Dr. Chris and his team are simply world-class. My braces journey was smooth and the results are amazing.",
    rating: 5,
  },
  {
    id: "fb-t2",
    patientName: "Tunde A.",
    quote:
      "I had an implant placed here and you cannot tell the difference. Top-tier care in Ilorin.",
    rating: 5,
  },
  {
    id: "fb-t3",
    patientName: "Grace O.",
    quote:
      "Friendly staff, modern clinic, and gentle treatment. My family now comes here for everything.",
    rating: 5,
  },
];

export const whyChooseUs = [
  {
    title: "Internationally certified",
    body: "Implantology training from the USA and Canada. Global standards, delivered locally.",
  },
  {
    title: "Best Braces Centre",
    body: "A dedicated braces and orthodontics centre — metal, ceramic, and clear aligner options.",
  },
  {
    title: "Patient-first care",
    body: "Gentle, thorough, and honest. We take time to explain every option.",
  },
  {
    title: "Modern clinic",
    body: "Hospital-grade hygiene, modern equipment, and a comfortable environment for all ages.",
  },
  {
    title: "Open every day",
    body: "Eight to four, every day of the week. Emergency line always reachable.",
  },
  {
    title: "Family dentistry",
    body: "From paediatric care to advanced surgical treatment — one trusted clinic for the whole family.",
  },
];
