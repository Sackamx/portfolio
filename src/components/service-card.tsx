import {
  Building2,
  Camera,
  Clapperboard,
  Package,
  Printer,
  TrendingUp,
  View,
  Wallpaper,
  Wind,
  Wine,
} from "lucide-react";

interface Props {
  title: string;
  description: string;
  index: number;
}

const ICONS = [
  TrendingUp,
  Wallpaper,
  Package,
  Building2,
  Printer,
  Camera,
  Wine,
  View,
  Clapperboard,
  Wind,
];

export default function ServiceCard({ title, description, index }: Props) {
  const Icon = ICONS[index];
  return (
    <li className="border rounded-md border-border p-4 space-y-2 h-full">
      {Icon && <Icon size={20} className="shrink-0" />}
      <h3 className="font-semibold after:block after:h-px after:w-1/2 after:bg-foreground max-w-max">
        {title}
      </h3>
      <p className="prose text-pretty dark:prose-invert text-sm text-muted-foreground">
        {description}
      </p>
    </li>
  );
}
