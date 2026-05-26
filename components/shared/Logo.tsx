import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * When true, renders a white silhouette suitable for dark backgrounds
   * (uses CSS filter to invert the color logo).
   */
  variant?: "default" | "light";
  priority?: boolean;
};

export function Logo({ className, variant = "default", priority }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block align-middle",
        // Default ratio matches the wordmark PNG; can be overridden via className.
        "h-10 w-[110px]",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="Citadel Global Dental Clinic & Braces Centre"
        fill
        priority={priority}
        sizes="200px"
        className={cn(
          "object-contain",
          variant === "light" && "brightness-0 invert"
        )}
      />
    </span>
  );
}
