import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import { CONTAINER } from "./section";

type Props = { footer: Dict["home"]["footer"] };

export default function Footer({ footer }: Props) {
  return (
    <footer
      className={cn(
        CONTAINER,
        "flex flex-col gap-2 py-6 text-[13px] text-muted-ink sm:flex-row sm:justify-between"
      )}
    >
      <p>{footer.copyright}</p>
      <p>{footer.tagline}</p>
    </footer>
  );
}
