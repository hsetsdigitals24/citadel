import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-brand-gradient shadow-soft",
        className
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-1/2 w-1/2 text-white"
        aria-hidden
      >
        <path
          d="M11 8c-2.5 0-4.5 2-4.5 4.5 0 2.5.6 4.6 1.9 7.6.7 1.6 1.3 3.4 2.6 3.4 1.1 0 1.4-1.6 2-3.1.4-1.1 1-1.9 2-1.9s1.6.8 2 1.9c.6 1.5.9 3.1 2 3.1 1.3 0 1.9-1.8 2.6-3.4 1.3-3 1.9-5.1 1.9-7.6C23.5 10 21.5 8 19 8c-1.3 0-2 .6-3 .6S12.3 8 11 8z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
