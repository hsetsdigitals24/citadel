// Shared type aliases for domain models. Re-exports Prisma's generated types
// so consumers can `import type { BlogPost, Service, ... } from "@/types"`
// without reaching into @prisma/client directly.

import type {
  Appointment as PrismaAppointment,
  BlogPost as PrismaBlogPost,
  Service as PrismaService,
  TeamMember as PrismaTeamMember,
  Testimonial as PrismaTestimonial,
  SiteSettings as PrismaSiteSettings,
  Admin as PrismaAdmin,
} from "@prisma/client";

export type Appointment = PrismaAppointment;
export type BlogPost = PrismaBlogPost;
export type Service = PrismaService;
export type TeamMember = PrismaTeamMember;
export type Testimonial = PrismaTestimonial;
export type SiteSettings = PrismaSiteSettings;
export type Admin = PrismaAdmin;

export type Step = { title: string; detail: string };

export type ContactMethod = "email" | "whatsapp" | "phone";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";
export type AdminRole = "admin" | "editor";

export type AppointmentInput = {
  fullName: string;
  phone: string;
  email: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  reason: string;
  contactMethod: ContactMethod;
};

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};
