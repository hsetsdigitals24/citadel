import Link from "next/link";
import { forwardRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-clinic-red text-white hover:bg-clinic-red-hover shadow-soft hover:shadow-glow",
  secondary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-glow",
  ghost:
    "bg-transparent text-brand-700 hover:bg-brand-50",
  outline:
    "border border-brand-200 text-brand-700 hover:border-brand-600 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    arrow,
    className,
    children,
    ...rest
  },
  ref
) {
  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    );
  }
  return (
    <button ref={ref} className={base} {...rest}>
      {content}
    </button>
  );
});
