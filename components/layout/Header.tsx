"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-soft"
          : "bg-white/60 backdrop-blur-sm"
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo className="h-9 w-9" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-brand-700">
              Citadel Global
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
              Dental Clinic
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-700"
                    : "text-ink-muted hover:text-brand-700"
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/appointments"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-clinic-red px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-clinic-red-hover hover:shadow-glow"
          >
            Book Appointment
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-brand-100 bg-white"
          >
            <nav className="container-tight flex flex-col py-4">
              {links.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium",
                      active
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-muted hover:bg-brand-50/60 hover:text-brand-700"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/appointments"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-clinic-red px-5 py-3 text-sm font-semibold text-white"
              >
                Book Appointment
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
