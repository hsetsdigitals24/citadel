import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const SITE = {
  name: "Citadel Global Dental Clinic",
  brand: "Best Braces Centre",
  phone1: "08131539685",
  phone2: "09151517479",
  phone1Intl: "+2348131539685",
  whatsappNumber: "2348131539685",
  whatsappMessage:
    "Hello%2C%20I%20found%20you%20on%20your%20website%20and%20I%27d%20like%20to%20book%20an%20appointment.",
  email: "citadelglobaldentalclinic@gmail.com",
  hours: "Open 24 hours, 7 days a week",
  facebookUrl: "#",
  instagramUrl: "#",
  url: "https://citadelglobaldental.com",
} as const;

export const whatsappLink = `https://wa.me/${SITE.whatsappNumber}?text=${SITE.whatsappMessage}`;

export type ClinicLocation = {
  id: string;
  name: string;
  address: string;
  addressShort: string;
};

export const LOCATIONS: readonly ClinicLocation[] = [
  {
    id: "citadel-ilorin",
    name: "Citadel Global Dental Clinic and Braces Centre",
    address:
      "221 Ibrahim Taiwo Road, Opposite Agbo-oba Junction, Besides Chupet Stores, Ilorin, Kwara State, Nigeria",
    addressShort: "221 Ibrahim Taiwo Road, Ilorin",
  },
  {
    id: "adewole-ilorin",
    name: "Adewole Specialist Dental Clinic",
    address:
      "25 Okoerin Street, Opposite Laurel Street, Off Taiwo, Ilorin, Kwara State, Nigeria",
    addressShort: "25 Okoerin Street, Ilorin",
  },
] as const;
