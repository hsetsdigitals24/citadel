import { Button } from "@/components/ui/Button";

type Props = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Thin wrapper that locks in the clinic's CTA conventions:
// red primary fill, arrow affordance, large hit target. Use for "Book appointment"
// and similar top-of-funnel actions.
export function CTAButton({
  href,
  variant = "primary",
  size = "lg",
  className,
  children = "Book an appointment",
  ...rest
}: Props) {
  return (
    <Button
      href={href ?? "/appointments"}
      variant={variant}
      size={size}
      arrow
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
}
