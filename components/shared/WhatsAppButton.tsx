"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:inline-flex fixed bottom-5 right-5 z-50 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow ring-4 ring-[#25D366]/20"
    >
      <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#25D366]/60" />
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M19.05 4.91A10 10 0 0 0 4.13 18.18L3 22l3.93-1.05a10 10 0 0 0 5.06 1.37h.01a10 10 0 0 0 7.05-17.41zM12 20.32a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-2.34.63.63-2.28-.2-.31a8.3 8.3 0 1 1 6.45 3.3zm4.55-6.22c-.25-.13-1.47-.73-1.7-.81s-.39-.13-.56.13c-.16.25-.64.81-.78.97s-.29.19-.54.06a6.83 6.83 0 0 1-2-1.24 7.55 7.55 0 0 1-1.39-1.73c-.15-.25 0-.39.11-.51.11-.11.25-.29.38-.43.13-.15.16-.25.25-.42a.46.46 0 0 0 0-.43c-.06-.13-.56-1.34-.76-1.84s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.03c0 1.2.88 2.36 1 2.52s1.72 2.63 4.18 3.68a14.4 14.4 0 0 0 1.4.52 3.4 3.4 0 0 0 1.54.1c.47-.07 1.47-.6 1.68-1.18s.21-1.07.15-1.18-.23-.18-.48-.31z"/>
      </svg>
    </motion.a>
  );
}
