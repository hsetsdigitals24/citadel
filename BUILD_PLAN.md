# BUILD_PLAN.md — Citadel Global Dental Clinic Website

Next.js 14 · PostgreSQL · Nodemailer · Cloudflare R2

---

## Guiding Principle

Build the simplest thing that works. No over-engineering. Every decision should make the site easier to maintain by a small team, not just easier to build once.

---

## Phase 0 — Project Setup (Day 1)

### 0.1 Scaffold the App

```bash
npx create-next-app@latest citadel-dental \
  --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"

cd citadel-dental
```

### 0.2 Install Dependencies

```bash
# Core
npm install prisma @prisma/client
npm install next-auth bcryptjs
npm install nodemailer
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install zod react-hook-form @hookform/resolvers
npm install react-google-recaptcha-v3

# UI helpers
npm install clsx tailwind-merge
npm install @heroicons/react

# Blog editor (admin)
npm install @tiptap/react @tiptap/starter-kit

# SEO
npm install next-sitemap

# Dev
npm install -D @types/nodemailer @types/bcryptjs
```

### 0.3 Initialize Prisma

```bash
npx prisma init
# Set DATABASE_URL in .env
```

Paste the schema from `CLAUDE.md` into `prisma/schema.prisma`, then:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 0.4 Seed First Admin

Create `prisma/seed.ts`:

```ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('ChangeMe123!', 12)
  await prisma.admin.upsert({
    where: { email: 'admin@citadelglobaldental.com' },
    update: {},
    create: { email: 'admin@citadelglobaldental.com', password: hash, role: 'admin' },
  })
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton' },
  })
}

main().finally(() => prisma.$disconnect())
```

```bash
npx prisma db seed
```

### 0.5 Copy `.env.local` Template

Fill in all values from `CLAUDE.md` — Environment Variables section.

---

## Phase 1 — Foundation (Days 2–3)

Build the shell that every page shares.

### 1.1 `lib/` Utilities

**`lib/db.ts`** — Prisma singleton (prevents connection pool exhaustion in dev):

```ts
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**`lib/email.ts`** — Nodemailer transporter + two template functions:

```ts
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function sendAppointmentNotification(appt: AppointmentData) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CLINIC_EMAIL,
    subject: `New Appointment Request — ${appt.fullName}`,
    html: appointmentNotificationTemplate(appt),
  })
}

export async function sendAppointmentConfirmation(appt: AppointmentData) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: appt.email,
    subject: 'We received your appointment request — Citadel Global Dental Clinic',
    html: appointmentConfirmationTemplate(appt),
  })
}
```

**`lib/r2.ts`** — Cloudflare R2 helpers:

```ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function getUploadUrl(key: string, contentType: string) {
  return getSignedUrl(r2, new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  }), { expiresIn: 300 })
}

export async function getFileUrl(key: string) {
  return getSignedUrl(r2, new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  }), { expiresIn: 3600 })
}
```

**`lib/recaptcha.ts`**:

```ts
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })
  const data = await res.json()
  return data.success && data.score >= 0.5
}
```

### 1.2 NextAuth Setup

`app/api/auth/[...nextauth]/route.ts`:

```ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const admin = await prisma.admin.findUnique({ where: { email: credentials.email } })
        if (!admin) return null
        const valid = await bcrypt.compare(credentials.password, admin.password)
        if (!valid) return null
        return { id: admin.id, email: admin.email, role: admin.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
})

export { handler as GET, handler as POST }
```

### 1.3 Middleware

`middleware.ts` (root):

```ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({ pages: { signIn: '/admin/login' } })

export const config = { matcher: ['/admin/:path*'] }
```

Exclude `/admin/login` from the matcher automatically (NextAuth handles it).

### 1.4 Root Layout

`app/layout.tsx` — Include:
- Google Fonts (Inter or Poppins) via `next/font/google`
- `<EmergencyBanner />`
- `<Header />`
- `<main>{children}</main>`
- `<Footer />`
- `<WhatsAppButton />` (fixed floating)
- Google Analytics `<Script>` with `strategy="afterInteractive"`

### 1.5 Header & Footer Components

**Header:** logo left, nav links center/right, "Book Appointment" CTA button (red), hamburger on mobile.

**Footer:** clinic name, address, phones (tappable), email, working hours, social icons (Facebook, Instagram), legal page links.

**EmergencyBanner:** thin red bar at very top — "Emergency? Call us now: 08131539685" — `tel:` link, visible on all pages.

**WhatsAppButton:** Fixed green circle, bottom-right, `z-50`, `wa.me` link with pre-filled message. On mobile: 56×56px minimum.

---

## Phase 2 — Public Pages (Days 4–7)

Build pages in this order (highest to lowest business impact):

### 2.1 Homepage (`/`)

Sections (top to bottom):
1. **Hero** — Clinic name, tagline "Best Braces Centre", headline, subheading, two CTAs (Book Appointment + Call Now). Full-viewport height, clinic photo background or solid blue.
2. **Services Highlight** — 3–4 service cards pulled from DB. "View all services →"
3. **Why Choose Us** — 4–6 icon + copy blocks (Certified Experts, Global Standards, Patient-Centred Care, etc.)
4. **Team Preview** — Dr. Ejakpome card with photo, qualifications, brief bio. "Meet the team →"
5. **Testimonials** — Carousel of published testimonials.
6. **CTA Banner** — Full-width blue banner: "Ready to smile with confidence? Book your appointment today."

All data fetched server-side with Prisma.

### 2.2 About Page (`/about`)

- Clinic history: founded 2020 in Ilorin.
- Mission & Vision statements.
- Core values: Discipline · Hard Work · Dedication.
- Certifications: Bachelor of Dental Surgery; Certification in Implantology (USA and Canada).
- Clinic standards and patient commitment prose.
- CTA at bottom.

Static content (no DB needed — hardcode or use a `lib/content.ts` constants file for now).

### 2.3 Services Pages

`/services` — Grid of all published `Service` records from DB. Each card: name, short description, image, "Learn more →" button.

`/services/[slug]` — Full service detail:
- Hero with service name and image.
- Description paragraph.
- Benefits list (from `benefits[]`).
- Step-by-step procedure (from `steps` JSON array).
- Book Appointment CTA.

### 2.4 Team Page (`/team`)

Grid of `TeamMember` records ordered by `order` field.

Each card: photo (from R2), name, qualifications, specialization, experience dates, bio, LinkedIn (optional).

Dr. Ejakpome initial data: BDS, Implantology (USA/Canada), Oral & Maxillofacial Surgery specialist, practising since 2014.

### 2.5 Appointments Page (`/appointments`)

- Page heading + brief intro.
- `<AppointmentForm />` — left column (on desktop).
- Right column: working hours (8am–4pm daily), contact options (email, WhatsApp, phone), emergency notice.

`<AppointmentForm />`:
- React Hook Form + Zod client validation.
- reCAPTCHA v3 (invisible, fires on submit).
- `POST /api/appointments`.
- On success: thank-you message + WhatsApp button if that's the preferred contact method.

### 2.6 Blog Pages

`/blog`:
- Fetch published posts, 10 per page.
- Category filter (dropdown or tabs).
- Title search (query param `?q=`).
- Pagination (simple prev/next or numbered).

`/blog/[slug]`:
- Fetch post by slug.
- Render `content` HTML safely (`dangerouslySetInnerHTML` with sanitization or use a markdown renderer).
- Cover image, category badge, published date.
- CTA at end of post.

### 2.7 Testimonials Page (`/testimonials`)

Grid/masonry of published `Testimonial` records.

Each card: patient name (first name + last initial), quote text, star rating (if set).

Layout must accommodate a future `<iframe>` or `<video>` testimonial block — leave a `videoUrl` optional field ready in the schema (or just a `String?` column).

### 2.8 Contact Page (`/contact`)

- All phone numbers as tappable `tel:` links.
- Email as `mailto:` link.
- Physical address with copy-to-clipboard button.
- Working hours table.
- Social media icon links (Facebook, Instagram) — open in new tab.
- Google Maps `<iframe>` embed for 221 Ibrahim Taiwo Street, Ilorin.
- `<ContactForm />` component (fields: name, phone, email, message) — `POST /api/contact`.

### 2.9 Legal Pages

Three static pages: `/privacy-policy`, `/terms`, `/cookie-policy`.

Draft sensible content or use a legal template. Mark as "last updated May 2026". Accessible from footer only.

### 2.10 404 Page

`app/not-found.tsx` — Friendly message + "Go back to homepage" button.

---

## Phase 3 — API Routes (Days 6–8, parallel with pages)

### 3.1 POST `/api/appointments`

```ts
// Validate with Zod
// Verify reCAPTCHA
// Rate limit (5 requests / IP / hour)
// prisma.appointment.create(...)
// sendAppointmentNotification(appt)
// sendAppointmentConfirmation(appt)
// return NextResponse.json({ success: true })
```

### 3.2 POST `/api/contact`

Same pattern as above but simpler — no DB insert needed (just email the clinic).

### 3.3 POST `/api/upload`

Admin-only (check session server-side).

```ts
// Validate: key (string), contentType (image/*)
// return { url: await getUploadUrl(key, contentType) }
```

### 3.4 Blog CRUD

`GET /api/blog` — Returns published posts (public). Supports `?category=` and `?q=` filters.

`POST /api/blog` — Admin only. Creates a new draft post.

`GET/PUT/DELETE /api/blog/[id]` — Admin only.

### 3.5 Services CRUD

Same structure as blog routes.

---

## Phase 4 — Admin Panel (Days 8–11)

### 4.1 Login Page (`/admin/login`)

Simple email + password form. Uses `signIn()` from `next-auth/react`. On success → `/admin`.

### 4.2 Admin Layout

`app/admin/layout.tsx` — Sidebar nav: Dashboard, Appointments, Blog, Services, Team, Settings. Top bar with "Sign out" button. No session check needed here — `middleware.ts` handles it.

### 4.3 Dashboard (`/admin`)

Two stat cards: total appointments (all time), pending appointments. Recent appointments table (last 10).

### 4.4 Appointments Manager (`/admin/appointments`)

Table of all `Appointment` records, newest first. Columns: date, name, phone, reason, preferred contact, status.

Status can be updated (dropdown: pending → confirmed → cancelled) with a simple `PUT /api/appointments/[id]` or inline server action.

### 4.5 Blog Manager (`/admin/blog`)

List with title, status (draft/published), created date, Edit and Delete buttons.

"New Post" button → `/admin/blog/new`.

Edit page: title, slug (auto-generated from title, editable), excerpt, category, cover image upload (`<ImageUpload />`), Tiptap rich-text editor for content, publish toggle, Save button.

### 4.6 Services Manager (`/admin/services`)

Same pattern as blog. Fields: name, slug, description, benefits (multi-line input — one per line, split on save), steps (repeatable field pairs: step title + detail), image upload, published toggle, order number.

### 4.7 Team Manager (`/admin/team`)

List with drag-to-reorder (or simple order number input). Each member: name, qualifications, specialization, experience, bio (textarea), photo upload, Save button.

### 4.8 Settings Page (`/admin/settings`)

Single form updating the `SiteSettings` singleton row:
- Working hours text
- Facebook URL
- Instagram URL
- Physical address

---

## Phase 5 — SEO & Performance (Day 12)

### 5.1 Metadata

Add `generateMetadata()` to every public page. Use a helper function that builds the base metadata object:

```ts
// lib/metadata.ts
export function buildMeta(title: string, description: string): Metadata {
  return {
    title: `${title} | Citadel Global Dental Clinic`,
    description,
    openGraph: { title, description, siteName: 'Citadel Global Dental Clinic' },
  }
}
```

### 5.2 JSON-LD Schema

Add to homepage `<head>` via `next/script`:

```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Citadel Global Dental Clinic and Braces Centre",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "221 Ibrahim Taiwo Street",
    "addressLocality": "Ilorin",
    "addressRegion": "Kwara State",
    "addressCountry": "NG"
  },
  "telephone": "+2348131539685",
  "email": "citadelglobaldentalclinic@gmail.com",
  "openingHours": "Mo-Su 08:00-16:00",
  "url": "https://citadelglobaldental.com"
}
```

### 5.3 Sitemap & Robots

`next-sitemap.config.js`:

```js
module.exports = {
  siteUrl: 'https://citadelglobaldental.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
}
```

Add to `package.json` scripts:

```json
"postbuild": "next-sitemap"
```

### 5.4 Security Headers

`next.config.js`:

```js
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

---

## Phase 6 — Testing & QA (Days 13–14)

### Checklist

**Functionality**
- [ ] Appointment form submits → clinic gets email → patient gets confirmation email
- [ ] Contact form submits → clinic gets email
- [ ] reCAPTCHA blocks obvious spam (score < 0.5 returns 400)
- [ ] Admin login works; wrong password is rejected
- [ ] Admin CRUD: create / edit / delete blog post, service, team member
- [ ] Image upload: presigned URL generated → file uploaded to R2 → key saved → image renders
- [ ] Blog pagination, search, category filter all work
- [ ] 404 page renders on bad URL

**Cross-browser**
- [ ] Chrome, Firefox, Safari, Edge — all desktop and mobile

**Mobile**
- [ ] Homepage renders correctly at 320px, 375px, 768px
- [ ] Hamburger nav opens and closes
- [ ] Appointment form usable without zoom on iPhone SE (375px)
- [ ] WhatsApp button not obscuring form submit buttons
- [ ] Phone numbers trigger native dialler on tap

**Performance**
- [ ] Run Lighthouse on `/` — target ≥ 85 mobile
- [ ] All images using `next/image` (no raw `<img>` tags)
- [ ] No console errors or warnings in production build

**SEO**
- [ ] Every page has unique `<title>` and `<meta description>`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] JSON-LD schema present on homepage

---

## Phase 7 — Deployment (Day 15)

### 7.1 Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set all env vars in the Vercel dashboard (Settings → Environment Variables). Do NOT use `.env.local` on Vercel — use the dashboard.

### 7.2 Database

Use a managed Postgres provider:
- **Neon** (free tier, serverless-friendly, works great with Vercel)
- **Supabase** (free tier, comes with a dashboard)
- **Railway**

After provisioning, run migrations:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 7.3 Cloudflare R2 Setup

1. Create an R2 bucket named `citadel-dental`.
2. In R2 settings: enable public access OR keep private and use signed GET URLs.
3. Create an API token with Object Read and Write permissions.
4. Copy Account ID, Access Key ID, Secret Access Key → `.env.local`.

### 7.4 Post-Deploy

- [ ] Verify site is live on domain with HTTPS active.
- [ ] Submit `sitemap.xml` to Google Search Console.
- [ ] Verify Google Analytics events firing (Realtime report).
- [ ] Send a test appointment — confirm both emails are received.
- [ ] Log into `/admin` — confirm dashboard loads and seed data is visible.

---

## Dependency Reference

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3",
    "prisma": "^5",
    "@prisma/client": "^5",
    "next-auth": "^4",
    "bcryptjs": "^2",
    "nodemailer": "^6",
    "@aws-sdk/client-s3": "^3",
    "@aws-sdk/s3-request-presigner": "^3",
    "zod": "^3",
    "react-hook-form": "^7",
    "@hookform/resolvers": "^3",
    "react-google-recaptcha-v3": "^1",
    "@heroicons/react": "^2",
    "@tiptap/react": "^2",
    "@tiptap/starter-kit": "^2",
    "next-sitemap": "^4",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "@types/nodemailer": "^6",
    "@types/bcryptjs": "^2"
  }
}
```

---

## Milestone Summary

| # | Milestone | Days | Output |
|---|---|---|---|
| 0 | Project Setup | 1 | Repo, DB, env, seed admin |
| 1 | Foundation | 2–3 | Layout, auth, lib utilities |
| 2 | Public Pages | 4–7 | All 11 public pages |
| 3 | API Routes | 6–8 | All form + CRUD endpoints |
| 4 | Admin Panel | 8–11 | Full CMS for content |
| 5 | SEO & Performance | 12 | Metadata, schema, sitemap, headers |
| 6 | Testing & QA | 13–14 | Cross-browser, mobile, Lighthouse |
| 7 | Deployment | 15 | Live on domain, verified |

**Total: ~15 working days** for a focused solo developer. Add buffer for content gathering from client.

---

## What the Client Provides (Block Deployment Until Received)

- [ ] High-resolution clinic photos (exterior, interior, treatment rooms)
- [ ] Dr. Ejakpome professional portrait photograph
- [ ] Clinic certifications (scans for About page)
- [ ] Service descriptions and any procedure imagery
- [ ] Mission statement and values copy (if different from brief)
- [ ] Domain name and any existing hosting credentials
- [ ] Instagram and Facebook page URLs
- [ ] Google Business Profile access (for GSC verification)
- [ ] Any existing patient testimonials (anonymized)

---

## Post-Launch Support (30-Day Window)

- Bug fixes and minor UI adjustments at no extra charge.
- One admin training session: walk through creating a blog post, updating a service, viewing appointments, changing settings.
- Handover: `.env.local` values documented in a private secure note for client; repo access granted.
