import { cn } from "@/lib/utils";

export type PillVariant =
  | "outline"
  | "filled"
  | "accent"
  | "plum"
  | "ink"
  | "muted";

const variants: Record<PillVariant, string> = {
  outline: "border-ink text-ink",
  filled: "border-transparent bg-lilac text-night",
  accent: "border-transparent bg-lime text-night",
  plum: "border-transparent bg-plum text-white",
  ink: "border-transparent bg-ink text-paper",
  muted: "border-tag-line text-muted-ink",
};

type Props = {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
};

export default function Pill({ children, variant = "outline", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border-[1.5px] px-3.5 py-2 text-sm font-medium leading-none",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
