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
  {
    id: "fb-veneers",
    slug: "veneers",
    name: "Veneers",
    description:
      "Ultra-thin porcelain or composite shells custom-bonded to the front surface of your teeth — correcting colour, shape, spacing, and minor chips in one or two visits for a completely transformed smile.",
    benefits: [
      "Natural-looking translucency that mimics real enamel",
      "Highly stain-resistant porcelain options",
      "Customised shade, shape, and size to your face",
      "Minimal enamel removal with no-prep and minimal-prep options",
      "Correct chips, gaps, discolouration, and minor misalignment",
      "Long-lasting results — 10 to 15 years with good care",
    ],
    steps: [
      { title: "Smile design consultation", detail: "Digital photos and a wax-up mock-up let you preview the final result before anything is done to your teeth." },
      { title: "Tooth preparation", detail: "A thin layer of enamel (0.3–0.7 mm) is gently removed to create space for the veneer. Local anaesthetic ensures comfort throughout." },
      { title: "Digital impression & shade matching", detail: "A precise scan of your teeth is sent to the laboratory where your bespoke veneers are crafted." },
      { title: "Temporary veneers", detail: "Temporary restorations protect your prepared teeth while the permanent veneers are being made (usually 1–2 weeks)." },
      { title: "Bonding & finishing", detail: "Permanent veneers are checked for fit and colour, then bonded with dental-grade adhesive resin and polished to a perfect finish." },
    ],
    image: null,
    order: 5,
  },
  {
    id: "fb-aligners",
    slug: "aligners",
    name: "Aligners",
    description:
      "Removable, nearly invisible clear aligner trays that gradually straighten your teeth without brackets or wires — a discreet, comfortable alternative to traditional braces for mild to moderate orthodontic cases.",
    benefits: [
      "Virtually invisible — no metal brackets or wires",
      "Fully removable for eating, drinking, and cleaning",
      "No dietary restrictions throughout treatment",
      "Smooth plastic trays with no sharp edges or irritation",
      "Shorter average treatment time than traditional braces",
      "Digital treatment plan shows you the end result upfront",
    ],
    steps: [
      { title: "3D digital scan", detail: "A precise intraoral scan replaces messy impressions. The scan is used to map your current tooth positions in three dimensions." },
      { title: "Digital treatment simulation", detail: "We generate a step-by-step virtual model of your tooth movements so you can see the projected final result before committing to treatment." },
      { title: "Custom tray fabrication", detail: "Your series of aligners is precision-fabricated from medical-grade, BPA-free thermoplastic. Each tray moves teeth a fraction of a millimetre." },
      { title: "Tray delivery & fitting", detail: "You receive your first set of trays. We confirm the fit, discuss wear instructions (20–22 hours per day), and show you how to insert and remove them correctly." },
      { title: "Progress reviews", detail: "You return every 4–6 weeks to collect your next batch of trays and for us to monitor progress. Refinement trays are provided as needed at no extra charge." },
    ],
    image: null,
    order: 6,
  },
  {
    id: "fb-cosmetic",
    slug: "cosmetic-dental-care",
    name: "Cosmetic Dental Care",
    description:
      "A comprehensive smile makeover programme combining composite bonding, tooth contouring, gum-line aesthetics, and colour-matched restorations — personalised to enhance every aspect of your smile's appearance.",
    benefits: [
      "Fully personalised smile design tailored to your facial features",
      "Composite bonding performed in a single visit",
      "Gum-line contouring for a balanced, even smile",
      "Colour-matched restorations invisible against natural teeth",
      "Minimal-prep or no-prep options preserve healthy tooth structure",
      "Addresses chips, cracks, uneven edges, and discolouration",
    ],
    steps: [
      { title: "Smile assessment & photography", detail: "We photograph your teeth, gums, and face from multiple angles to analyse proportions, symmetry, and colour before designing any treatment." },
      { title: "Digital smile design", detail: "Using your photos and a digital design tool, we create a visual mock-up of your ideal smile. You review and approve the design before we proceed." },
      { title: "Treatment sequence planning", detail: "We map out the order of procedures — whitening before bonding, gum contouring before restorations — to achieve the most efficient and lasting result." },
      { title: "Procedures", detail: "Each agreed treatment is carried out with precision. Composite bonding and contouring are typically completed in one or two appointments." },
      { title: "Review & aftercare", detail: "A final review appointment checks bite, aesthetics, and your comfort with the result. We provide a personalised maintenance plan to protect your investment." },
    ],
    image: null,
    order: 7,
  },
  {
    id: "fb-family",
    slug: "family-dental-care",
    name: "Family Dental Care",
    description:
      "Comprehensive, preventive-focused dentistry for every member of your family — from a child's first check-up to senior restorative care — all delivered under one trusted roof with a gentle, patient-first approach.",
    benefits: [
      "One clinic for the whole family — children to seniors",
      "Paediatric-friendly environment and gentle technique",
      "Preventive sealants and fluoride treatment for children",
      "Routine exams, X-rays, and professional cleaning",
      "Early orthodontic screening for developing smiles",
      "Emergency dental care available during clinic hours",
    ],
    steps: [
      { title: "Family registration", detail: "We register all family members under a single file for easy coordination. Medical histories, allergies, and dental concerns are recorded for each individual." },
      { title: "Full mouth examination", detail: "Each patient receives a thorough clinical examination including X-rays (where indicated) to detect decay, gum disease, and developmental concerns early." },
      { title: "Personalised preventive plan", detail: "Based on the examination, we design an age-appropriate preventive care plan — dietary advice, brushing guidance, sealants, and fluoride application for children." },
      { title: "Treatment & restorations", detail: "Any identified decay, infections, or restorative needs are addressed using conservative techniques appropriate for the patient's age and dental maturity." },
      { title: "Scheduled recall visits", detail: "We schedule six-monthly recall appointments for the whole family, sending reminders so nobody misses a check-up." },
    ],
    image: null,
    order: 8,
  },
  {
    id: "fb-grills",
    slug: "grills",
    name: "Grills",
    description:
      "Custom-fitted decorative dental accessories crafted from premium metals and stones — individually designed and precision-fitted from dental impressions for a seamless, comfortable, and stylish result.",
    benefits: [
      "Fully custom-fitted using accurate dental impressions",
      "Choice of gold, silver, rose gold, and diamond-set options",
      "Removable for daily oral hygiene — no permanent alteration",
      "Premium-grade metals safe for oral use",
      "Professional fitting ensures proper bite and comfort",
      "Unique, bespoke designs crafted to your specification",
    ],
    steps: [
      { title: "Style consultation", detail: "We discuss your preferred metal, finish (high-polish, matte, diamond-set), coverage (single tooth, full front set), and any custom design details." },
      { title: "Dental impression", detail: "A precise impression of your teeth is taken using dental-grade materials to ensure the grill fits snugly without gaps, movement, or pressure on the gums." },
      { title: "Fabrication", detail: "Your impression is sent to a specialist fabricator. The grill is cast and finished to your specification. Turnaround is typically 1–2 weeks depending on complexity." },
      { title: "Fitting & adjustments", detail: "We trial-fit the grill, check for pressure points, bite interference, and aesthetic alignment. Minor adjustments are made chairside until the fit is perfect." },
    ],
    image: null,
    order: 9,
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
