# CLAUDE.md — Citadel Global Dental Clinic Website

This file is the single source of truth for AI-assisted development of the Citadel Global Dental Clinic and Braces Centre website. Read this before writing any code.

---

## Project Identity

| Key | Value |
|---|---|
| Client | Citadel Global Dental Clinic and Braces Centre |
| Brand | Best Braces Centre (BBC) |
| Location | 221 Ibrahim Taiwo Street, Opp. Agbo-oba Junction, Besides Chupet Stores, Ilorin, Kwara State, Nigeria |
| Primary contact | Dr. Chris Ejakpome |
| Phone 1 | 08131539685 (also WhatsApp & emergency) |
| Phone 2 | 09151517479 |
| Email | citadelglobaldentalclinic@gmail.com |
| Working hours | 8:00 AM – 4:00 PM daily |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Prisma ORM |
| Email | Nodemailer (SMTP) |
| File storage | Cloudflare R2 (S3-compatible) with signed URLs |
| Auth (admin) | NextAuth.js (credentials provider) |
| Forms | React Hook Form + Zod validation |
| CAPTCHA | Google reCAPTCHA v3 |
| Analytics | Google Analytics 4 via `next/script` |
| Deployment | Vercel (recommended) |
| Version control | Git / GitHub (private repo) |

---

## Environment Variables

All secrets live in `.env.local`. Never commit this file.

```
# Database
DATABASE_URL=postgresql://user:password@host:5432/citadel_dental

# Email (Nodemailer)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Citadel Global Dental Clinic <noreply@citadelglobaldental.com>"
CLINIC_EMAIL=citadelglobaldentalclinic@gmail.com

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=citadel-dental
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://yourdomain.com

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=2348131539685
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello%2C%20I%20found%20you%20on%20your%20website%20and%20I%27d%20like%20to%20book%20an%20appointment.
```

---

## Project Structure

```
citadel-dental/
├── app/
│   ├── (public)/                   # All public-facing pages
│   │   ├── page.tsx                # Homepage
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx            # Services listing
│   │   │   └── [slug]/page.tsx     # Individual service
│   │   ├── team/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Single post
│   │   ├── testimonials/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── cookie-policy/page.tsx
│   ├── admin/                      # Protected admin area
│   │   ├── layout.tsx              # Auth guard layout
│   │   ├── login/page.tsx
│   │   ├── page.tsx                # Dashboard
│   │   ├── appointments/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx       # Create / edit post
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── team/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── appointments/route.ts   # POST — submit appointment
│   │   ├── contact/route.ts        # POST — contact enquiry
│   │   ├── blog/
│   │   │   ├── route.ts            # GET list / POST create
│   │   │   └── [id]/route.ts       # GET / PUT / DELETE
│   │   ├── services/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── upload/route.ts         # POST — R2 presigned PUT URL
│   │   └── auth/[...nextauth]/route.ts
│   ├── layout.tsx                  # Root layout (GA, fonts, WhatsApp button)
│   └── not-found.tsx               # Custom 404
├── components/
│   ├── ui/                         # Button, Input, Card, Badge, etc.
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── EmergencyBanner.tsx     # Persistent emergency contact strip
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesHighlight.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── TeamPreview.tsx
│   │   └── TestimonialsCarousel.tsx
│   ├── forms/
│   │   ├── AppointmentForm.tsx
│   │   └── ContactForm.tsx
│   └── shared/
│       ├── WhatsAppButton.tsx      # Fixed floating button (all pages)
│       ├── CTAButton.tsx
│       └── ImageUpload.tsx         # R2 presigned upload widget (admin only)
├── lib/
│   ├── db.ts                       # Prisma client singleton
│   ├── email.ts                    # Nodemailer transporter + HTML templates
│   ├── r2.ts                       # R2 S3 client, getUploadUrl, getFileUrl
│   ├── recaptcha.ts                # Server-side token verification
│   └── utils.ts                    # slugify, formatDate, cn, etc.
├── prisma/
│   └── schema.prisma
├── public/
│   └── images/                     # Static brand assets
├── types/
│   └── index.ts
└── middleware.ts                   # Protect /admin/* routes
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Appointment {
  id            String   @id @default(cuid())
  fullName      String
  phone         String
  email         String
  preferredDate DateTime?
  preferredTime String?
  reason        String
  contactMethod String   // "email" | "whatsapp" | "phone"
  status        String   @default("pending") // "pending" | "confirmed" | "cancelled"
  createdAt     DateTime @default(now())
}

model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String
  content     String    // HTML
  coverImage  String?   // R2 object key
  category    String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  benefits    String[]
  steps       Json     // [{ title: string, detail: string }]
  image       String?  // R2 object key
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model TeamMember {
  id             String  @id @default(cuid())
  name           String
  qualifications String
  specialization String
  experience     String  // e.g. "2014 – present"
  bio            String
  photo          String? // R2 object key
  order          Int     @default(0)
}

model Testimonial {
  id          String   @id @default(cuid())
  patientName String
  quote       String
  rating      Int?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Admin {
  id        String @id @default(cuid())
  email     String @unique
  password  String // bcrypt hash
  role      String @default("editor") // "admin" | "editor"
}

model SiteSettings {
  id           String @id @default("singleton")
  workingHours String @default("8:00 AM – 4:00 PM daily")
  facebookUrl  String @default("")
  instagramUrl String @default("")
  address      String @default("221 Ibrahim Taiwo Street, Ilorin")
}
```

---

## Pages Reference

### Public Pages

| Route | Purpose |
|---|---|
| `/` | Hero, service highlights, why-choose-us, team preview, testimonials, CTA |
| `/about` | Clinic story (founded 2020), mission, values (Discipline · Hard Work · Dedication), certifications (BDS, Implantology — USA & Canada) |
| `/services` | All service cards |
| `/services/[slug]` | Service detail: description, benefits, procedure steps, image, book-now CTA |
| `/team` | Team profiles. Dr. Chris Ejakpome is primary: BDS, Implantology cert (USA/Canada), Oral & Maxillofacial Surgery specialism, practising since 2014 |
| `/appointments` | Appointment form + working hours + contact options + emergency info |
| `/blog` | Post listing, category filter, search, pagination |
| `/blog/[slug]` | Full blog post |
| `/testimonials` | Patient quotes; layout must support future video embeds |
| `/contact` | All contacts, Google Maps embed, working hours, social links |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/cookie-policy` | Cookie policy |

### Admin Pages (all require active session)

| Route | Purpose |
|---|---|
| `/admin/login` | Login page |
| `/admin` | Dashboard: appointment count, recent submissions |
| `/admin/appointments` | View, filter, update status of appointment submissions |
| `/admin/blog` | List, create, edit, publish, delete blog posts |
| `/admin/services` | Manage service pages, reorder, publish/unpublish |
| `/admin/team` | Manage team member profiles and photos |
| `/admin/settings` | Edit contact info, working hours, social media links |

---

## Core Feature Specs

### Appointment Form
**Fields:** full name, phone, email, preferred date, preferred time, reason for visit, preferred contact method (email / WhatsApp / phone).

**Server flow (`/api/appointments`):**
1. Parse and validate body with Zod.
2. Verify reCAPTCHA v3 token against `RECAPTCHA_SECRET_KEY`.
3. Rate-limit by IP (simple in-memory map or Upstash).
4. Insert row into `Appointment` table via Prisma.
5. Send clinic notification email via Nodemailer.
6. Send patient confirmation email via Nodemailer.
7. Return `{ success: true }` — frontend then opens WhatsApp deep-link if contact method is WhatsApp.

### Email (Nodemailer)
`lib/email.ts` exports:
- `transporter` — configured from SMTP env vars.
- `sendAppointmentNotification(appt)` — HTML email to `CLINIC_EMAIL` with all appointment details.
- `sendAppointmentConfirmation(appt)` — HTML email to patient confirming receipt and next steps.
- `sendContactEnquiry(data)` — Forwards contact form to clinic email.

### File Storage (Cloudflare R2)
`lib/r2.ts` exports:
- `r2Client` — `S3Client` pointed at `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.
- `getUploadUrl(key, contentType)` — `PutObject` presigned URL, expires in 300s. Called by `/api/upload`.
- `getFileUrl(key)` — `GetObject` presigned URL, expires in 3600s. Used when rendering private images.

**Upload flow (admin):**
1. Admin picks an image in `<ImageUpload />`.
2. Component calls `POST /api/upload` with `{ key, contentType }`.
3. Server returns a presigned PUT URL.
4. Browser uploads file directly to R2 (no server proxy).
5. Admin form saves the object key (not the full URL) to the DB.
6. On render: component calls `getFileUrl(key)` server-side or fetches a fresh URL client-side.

**Key naming convention:**
- `team/<cuid>.webp`
- `blog/<cuid>.webp`
- `services/<cuid>.webp`

### WhatsApp Floating Button
Fixed bottom-right on all pages (`z-50`). Rendered in root `layout.tsx`.

```
https://wa.me/2348131539685?text=Hello%2C%20I%20found%20you%20on%20your%20website%20and%20I%27d%20like%20to%20book%20an%20appointment.
```

### Emergency Banner
Persistent strip at top of every page (or fixed on mobile). Shows "Emergency? Call now: 08131539685" as a `<a href="tel:08131539685">` link.

### Blog
- Content stored as HTML string in `BlogPost.content`.
- Listing page: 10 posts per page, category dropdown, title search (Prisma `contains`).
- Each post: title, slug, excerpt, coverImage, category, publishedAt, body HTML.
- Admin rich-text: use a lightweight editor (e.g. `react-quill` or `tiptap`).

### Admin Auth
- NextAuth.js credentials provider: look up Admin by email, compare bcrypt hash.
- `middleware.ts` matches `/admin` (excluding `/admin/login`) and redirects unauthenticated users.
- Seed one admin account via `prisma/seed.ts` on first deploy.

---

## API Route Summary

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/appointments` | Public | Submit appointment form |
| POST | `/api/contact` | Public | Submit contact enquiry |
| GET | `/api/blog` | Public | List published posts |
| POST | `/api/blog` | Admin | Create post |
| GET | `/api/blog/[id]` | Admin | Get single post (inc. draft) |
| PUT | `/api/blog/[id]` | Admin | Update post |
| DELETE | `/api/blog/[id]` | Admin | Delete post |
| GET | `/api/services` | Public | List published services |
| POST | `/api/services` | Admin | Create service |
| PUT | `/api/services/[id]` | Admin | Update service |
| DELETE | `/api/services/[id]` | Admin | Delete service |
| POST | `/api/upload` | Admin | Get R2 presigned PUT URL |
| ALL | `/api/auth/[...nextauth]` | — | NextAuth handler |

---

## Branding & Design Rules

- **Primary color:** Deep Medical Blue — `#1B3E6F`
- **Secondary / CTA color:** Clinic Red — `#C0392B`
- **Background:** White `#FFFFFF`
- **Font:** Inter or Poppins from Google Fonts — no decorative fonts, ever.
- **Icons:** Heroicons only, consistent size and stroke weight.
- **Body text min:** 16px on desktop, appropriately scaled mobile.
- **WCAG 2.1 AA contrast** required everywhere.
- **Touch targets:** ≥ 44×44px.
- **Mobile nav:** hamburger drawer at `< 768px`.
- **Aesthetic:** hospital-grade clean — authoritative but warm. No stock imagery that looks generic or non-African.

---

## SEO Configuration

Every page uses `generateMetadata()` to produce:
- Unique `<title>` with target keyword + "| Citadel Global Dental Clinic"
- Unique `<meta name="description">` ≤ 160 chars

Site-wide:
- `next-sitemap` generates `sitemap.xml` and `robots.txt` at build time.
- JSON-LD on homepage: `Dentist`, `MedicalOrganization`, `LocalBusiness` schemas with NAP data.
- All `next/image` uses have descriptive `alt`.
- Internal links between services, blog, and appointment pages.

**Target keywords:** dentist in Ilorin, dental clinic in Ilorin, best braces centre Nigeria, braces in Ilorin, dental implants Ilorin, teeth whitening Ilorin, orthodontist near me, scaling and polishing Ilorin, Citadel Global Dental Clinic.

---

## Performance Rules

- Use `next/image` for every image — auto WebP, responsive `sizes`.
- No third-party scripts blocking render. GA loaded with `strategy="afterInteractive"`.
- Target: ≥ 85 PageSpeed mobile, ≥ 90 desktop.
- Core Web Vitals: pass LCP, CLS, INP.
- Page load: < 3s on standard mobile.

---

## Security Checklist

- HTTPS enforced (Vercel default, or enforce via `next.config.js` headers).
- All public form inputs validated server-side with Zod.
- reCAPTCHA v3 on every public form.
- Rate limiting on `/api/appointments` and `/api/contact`.
- Admin routes behind NextAuth session (middleware guard).
- Passwords: bcrypt (cost factor ≥ 12).
- CSP, X-Frame-Options, X-Content-Type-Options headers in `next.config.js`.
- R2 bucket: images public-readable; no sensitive data stored in R2.

---

## Third-Party Integrations

| Service | Implementation |
|---|---|
| Google Maps | `<iframe>` embed on `/contact` |
| WhatsApp | `wa.me` deep link — floating button + optional form redirect |
| Google Analytics 4 | `<Script>` with `NEXT_PUBLIC_GA_ID`, `strategy="afterInteractive"` |
| reCAPTCHA v3 | `react-google-recaptcha-v3` on all public forms |
| Google Search Console | Submit `sitemap.xml` post-deploy |
| Facebook / Instagram | Icon links in footer (and header), `target="_blank" rel="noopener"` |

---

## Mobile Requirements

- Tailwind mobile-first (`sm:`, `md:`, `lg:` breakpoints).
- Nav collapses to hamburger drawer at `< 768px`.
- All phone numbers: `<a href="tel:08131539685">`.
- WhatsApp button: fixed position, does not obscure primary content.
- Appointment form: fully operable on 320px wide screens, no zoom needed.
- All `next/image` components include correct `sizes` for responsive serving.

---

## Out of Scope (Future — Keep Architecture Clean)

These are NOT built now but the schema and folder structure must not block them later:

- Online payment (Paystack / Flutterwave)
- Patient portal (login, appointment history, prescriptions)
- Live chat
- Telemedicine / virtual consultation booking
- Multi-branch support
- i18n / multilingual content
- Before/after gallery with treatment-type filter
- PWA / mobile app

---

## Key Contacts

| Role | Contact |
|---|---|
| Product / Project Manager | Alonge R. Oluwafolakemi, H-SETS |
| Clinic Lead | Dr. Chris Ejakpome — 08131539685 |
| Clinic Email | citadelglobaldentalclinic@gmail.com |
