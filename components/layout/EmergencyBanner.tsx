import { PhoneIcon } from "@heroicons/react/24/solid";
import { SITE } from "@/lib/utils";

export function EmergencyBanner() {
  return (
    <div className="relative z-40 bg-clinic-red text-white">
      <div className="container-tight flex items-center justify-center gap-2 py-2 text-[13px] font-medium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="hidden sm:inline">Dental emergency?</span>
        <a
          href={`tel:${SITE.phone1}`}
          className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call now: {SITE.phone1}
        </a>
      </div>
    </div>
  );
}
