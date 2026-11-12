import { cn } from "@/lib/utils";
import Image from "next/image";
import { CSSProperties } from "react";

type Box = { x: number; y: number; w: number; h: number };

export type Device = {
  /** "image" is a static mock-up photo cropped into the box (no scrolling). */
  kind: "browser" | "handheld" | "image";
  /** Device frame in px of the Figma stage. */
  box: Box;
  radius: number;
  /** Browser: address shown in the bar. */
  url?: string;
  /** Handheld: bezel width and inner screen radius. */
  bezel?: number;
  screenRadius?: number;
  /** Full-length page render shown inside the screen (scrolls like the Figma prototype), or the photo. */
  screen: string;
  screenSize: { w: number; h: number };
};

export type Stage = {
  w: number;
  h: number;
  /** Panel colour behind the devices; omitted for a bare mock-up. */
  bg?: string;
  devices: Device[];
};

const BAR = 50;
const SHADOW = "0 calc(var(--u) * 24) calc(var(--u) * 48) rgba(28, 23, 33, 0.18)";
const PHOTO_SHADOW = "0 calc(var(--u) * 24) calc(var(--u) * 48) rgba(13, 5, 15, 0.3)";
const DOTS = ["#e8776a", "#f1c15b", "#7bc47f"];

/**
 * A Figma "Stage" rebuilt in CSS at any width. Every length is expressed in stage pixels
 * via `--u` (one Figma px as a fraction of the stage width), so the whole scene scales
 * as one; each screen is a scroll container holding the full page render.
 */
export default function DeviceStage({ stage, alt }: { stage: Stage; alt: string }) {
  const u = (px: number) => `calc(var(--u) * ${px})`;

  return (
    <div
      className={cn("relative w-full [container-type:inline-size]", stage.bg && "overflow-hidden rounded-2xl")}
      style={
        {
          aspectRatio: `${stage.w} / ${stage.h}`,
          backgroundColor: stage.bg,
          "--u": `${100 / stage.w}cqw`,
        } as CSSProperties
      }
    >
      {stage.devices.map((device) => {
        const isBrowser = device.kind === "browser";
        const bezel = device.bezel ?? 0;
        const box = {
          left: `${(device.box.x / stage.w) * 100}%`,
          top: `${(device.box.y / stage.h) * 100}%`,
          width: `${(device.box.w / stage.w) * 100}%`,
          height: `${(device.box.h / stage.h) * 100}%`,
          borderRadius: u(device.radius),
        };
        const sizes = `(min-width: 1440px) ${Math.ceil((device.box.w / stage.w) * 1280)}px, ${Math.ceil((device.box.w / stage.w) * 100)}vw`;

        if (device.kind === "image") {
          return (
            <div
              key={device.screen}
              className="absolute overflow-hidden"
              style={{ ...box, boxShadow: PHOTO_SHADOW }}
            >
              <Image src={device.screen} alt={alt} fill sizes={sizes} className="object-cover" />
            </div>
          );
        }

        return (
          <div
            key={device.screen}
            className={cn("absolute flex flex-col overflow-hidden", isBrowser ? "bg-white" : "bg-[#1d1720]")}
            style={{ ...box, boxShadow: SHADOW, padding: u(bezel) }}
          >
            {isBrowser && (
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center bg-[#eceae6]"
                style={{ height: u(BAR), paddingLeft: u(16), gap: u(8) }}
              >
                {DOTS.map((color) => (
                  <span
                    key={color}
                    className="shrink-0 rounded-full"
                    style={{ width: u(10), height: u(10), backgroundColor: color }}
                  />
                ))}
                <span
                  className="flex items-center rounded-full bg-white font-medium text-[#5c5761]"
                  style={{ marginLeft: u(8), height: u(26), paddingInline: u(14), fontSize: u(12) }}
                >
                  {device.url}
                </span>
              </div>
            )}
            <div
              tabIndex={0}
              aria-label={alt}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime [&::-webkit-scrollbar]:hidden"
              style={{ borderRadius: u(device.screenRadius ?? 0) }}
            >
              <Image
                src={device.screen}
                alt={alt}
                width={device.screenSize.w}
                height={device.screenSize.h}
                sizes={sizes}
                className="block h-auto w-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
