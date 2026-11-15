"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  labels: {
    prev: string;
    next: string;
    open: string;
    close: string;
  };
};

/** Round white control; the icon is an SVG so it sits dead-centre regardless of font metrics. */
const ROUND_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-full border-[1.2px] border-night bg-white text-night transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime md:size-[45px]";

const ICON = { size: 18, strokeWidth: 2.5, "aria-hidden": true } as const;

export default function Gallery({ images, alt, labels }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  if (count === 0) return null;

  const counter = (
    <span className="rounded-full bg-night px-[13px] py-1.5 text-[11px] font-bold leading-none text-white">
      {index + 1} / {count}
    </span>
  );

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-4">
      {/* Viewer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[13px] bg-placeholder md:aspect-[1023/837]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={labels.open}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-text"
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${alt} - ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1088px) 1024px, 100vw"
              className={cn(
                "object-cover transition-opacity duration-300",
                i === index ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </button>
        {count > 1 && (
          // Arrow rail: both buttons share one vertically-centred row, inset 19px like the Figma frame.
          <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between md:inset-x-[19px]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.prev}
              className={cn(ROUND_BUTTON, "pointer-events-auto")}
            >
              <ArrowLeft {...ICON} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className={cn(ROUND_BUTTON, "pointer-events-auto")}
            >
              <ArrowRight {...ICON} />
            </button>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-4 right-4 md:bottom-[22px] md:right-[19px]">
          {counter}
        </div>
      </div>

      {/* Thumbnails */}
      <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 py-1 md:gap-4">
        {images.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === index}
              className={cn(
                "relative block h-[90px] w-[120px] overflow-hidden rounded-lg transition-opacity md:h-[120px] md:w-[160px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-text",
                i === index
                  ? "opacity-100 outline outline-[3px] outline-plum-text [outline-offset:-3px]"
                  : "opacity-55 hover:opacity-90"
              )}
            >
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox: image area is padded so the controls never cover the photo. */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex flex-col bg-[#141016]"
          onClick={() => setOpen(false)}
        >
          <div className="flex justify-end p-4 md:p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className={ROUND_BUTTON}
              autoFocus
            >
              <X {...ICON} />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center gap-3 px-3 md:gap-6 md:px-6">
            {count > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={labels.prev}
                className={ROUND_BUTTON}
              >
                <ArrowLeft {...ICON} />
              </button>
            )}
            <div className="relative h-full min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[index]}
                alt={`${alt} - ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {count > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={labels.next}
                className={ROUND_BUTTON}
              >
                <ArrowRight {...ICON} />
              </button>
            )}
          </div>
          <div className="flex justify-center p-4 md:p-6">{counter}</div>
        </div>
      )}
    </div>
  );
}
