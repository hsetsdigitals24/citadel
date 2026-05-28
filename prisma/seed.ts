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
    update: { workingHours: "Open 24 hours, 7 days a week" },
    create: {
      id: "singleton",
      workingHours: "Open 24 hours, 7 days a week",
    },
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
    {
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
      faqs: [
        { question: "How long do veneers last?", answer: "Porcelain veneers typically last 10–15 years; composite veneers 5–7 years. Longevity depends on oral hygiene, bite habits, and avoiding excessive force such as grinding." },
        { question: "Are veneers reversible?", answer: "Traditional veneers require minor enamel removal and are considered irreversible. However, minimal-prep and no-prep veneer options preserve more tooth structure — we will discuss which suits you at your consultation." },
        { question: "Do veneers look natural?", answer: "Yes. Modern porcelain veneers are fabricated to match the translucency and colour gradient of natural enamel. Most people cannot tell the difference from natural teeth." },
        { question: "Am I a candidate for veneers?", answer: "Veneers are suitable for healthy teeth with adequate enamel. Patients with severe decay, gum disease, or heavy grinding may need those issues addressed first. We assess your full dental health at consultation." },
      ],
      order: 5,
    },
    {
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
      faqs: [
        { question: "How many hours a day must I wear my aligners?", answer: "For effective treatment, aligners should be worn for 20–22 hours per day. They are only removed for eating, drinking anything other than water, and cleaning your teeth." },
        { question: "Can I eat and drink with aligners in?", answer: "Aligners should be removed before eating or drinking anything other than plain water. Heat and pigment from food and drinks can warp or stain the trays." },
        { question: "How long does aligner treatment take?", answer: "Treatment duration varies from 6 months for mild cases to 18 months or more for moderate alignment issues. Your digital simulation will show a projected timeline before treatment starts." },
        { question: "Are aligners suitable for everyone?", answer: "Aligners work best for mild to moderate crowding, spacing, and bite issues. Severe skeletal discrepancies or complex bite problems may require traditional braces or surgical intervention. We assess your case at the initial scan appointment." },
      ],
      order: 6,
    },
    {
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
      faqs: [
        { question: "What procedures are included in a smile makeover?", answer: "A cosmetic smile makeover can include teeth whitening, composite bonding, tooth contouring, gum reshaping, veneers, and crown replacements — tailored to your individual goals." },
        { question: "How long does cosmetic dental work last?", answer: "Composite bonding lasts 5–8 years with good care; porcelain veneers 10–15 years; crowns 10–20 years. Regular check-ups and good oral hygiene are key to longevity." },
        { question: "Is cosmetic treatment painful?", answer: "Most cosmetic procedures are minimally invasive and performed under local anaesthetic where needed. Many patients experience little to no discomfort during or after treatment." },
        { question: "How do I maintain cosmetic dental work?", answer: "Brush twice daily with a non-abrasive toothpaste, floss regularly, avoid biting hard objects, and attend six-monthly check-ups. We may recommend a nightguard if you grind your teeth." },
      ],
      order: 7,
    },
    {
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
        "Emergency dental care available 24 hours, 7 days a week",
      ],
      steps: [
        { title: "Family registration", detail: "We register all family members under a single file for easy coordination. Medical histories, allergies, and dental concerns are recorded for each individual." },
        { title: "Full mouth examination", detail: "Each patient receives a thorough clinical examination including X-rays (where indicated) to detect decay, gum disease, and developmental concerns early." },
        { title: "Personalised preventive plan", detail: "Based on the examination, we design an age-appropriate preventive care plan — dietary advice, brushing guidance, sealants, and fluoride application for children." },
        { title: "Treatment & restorations", detail: "Any identified decay, infections, or restorative needs are addressed using conservative techniques appropriate for the patient's age and dental maturity." },
        { title: "Scheduled recall visits", detail: "We schedule six-monthly recall appointments for the whole family, sending reminders so nobody misses a check-up." },
      ],
      faqs: [
        { question: "From what age should children first visit the dentist?", answer: "We recommend the first visit when your child's first tooth erupts, or no later than their first birthday. Early visits familiarise children with the clinic environment and catch developmental issues early." },
        { question: "How often should my family come in?", answer: "Most patients benefit from a check-up and professional clean every six months. Patients with higher cavity risk or gum disease may need more frequent visits — we will advise you at your examination." },
        { question: "Do you handle dental emergencies?", answer: "Yes. We handle dental emergencies including toothache, knocked-out teeth, broken restorations, and facial swellings 24 hours, 7 days a week. Our emergency line is always reachable on 08131539685." },
        { question: "What preventive treatments do you offer for children?", answer: "We offer fissure sealants (a protective coating on back teeth), professional fluoride application, dietary counselling, and early orthodontic assessment to intercept problems before they become complex." },
      ],
      order: 8,
    },
    {
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
      faqs: [
        { question: "What metals are used?", answer: "We work with gold (10k, 14k, 18k), sterling silver, and white gold. Diamond-set options use secure bezel or pavé settings. All metals used are biocompatible and safe for oral contact." },
        { question: "Are grills safe to wear?", answer: "When custom-fitted by a dental professional and worn as directed, grills are safe. We advise removing them before eating, drinking, and sleeping, and cleaning them daily to prevent bacterial build-up." },
        { question: "Do grills damage your teeth?", answer: "Custom-fitted, removable grills do not damage teeth when worn correctly and removed regularly for cleaning. Ill-fitting or permanently cemented grills — not provided here — can cause dental problems." },
        { question: "How long does it take to get a grill made?", answer: "From the impression appointment to final fitting is typically 1–2 weeks. Complex multi-tooth or diamond-set designs may take up to 3 weeks." },
      ],
      order: 9,
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
