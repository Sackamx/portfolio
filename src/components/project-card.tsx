import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description?: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  // links?: readonly {
  //   icon: React.ReactNode;
  //   type: string;
  //   href: string;
  // }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  // links,
  className,
}: Props) {
  return (
    <article className="h-full">
      <Card
        className={
          "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full group/card"
        }
      >
        <Link
          href={href ?? "#"}
          className={cn("block cursor-pointer", className)}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
            />
          )}
          {image && (
            <div className="h-40 overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-full w-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500"
              />
            </div>
          )}
          {!image && !video && (
            <div className="h-40 bg-muted flex items-center justify-center">
              <p className="prose text-sm dark:prose-invert text-pretty">
                In progress...
              </p>
            </div>
          )}
        </Link>
        <CardHeader className="p-4 pb-0">
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link
                ?.replace("https://", "")
                .replace("www.", "")
                .replace("/", "")}
            </div>
            {description && (
              <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                {description}
              </Markdown>
            )}
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col p-4 pt-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {/* {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )} */}
        </CardContent>
        {/* <CardFooter className="p-4">
        <Button size="sm">
          Sprawdź
          <ChevronRight size={14} />
        </Button>
      </CardFooter> */}
      </Card>
    </article>
  );
}
