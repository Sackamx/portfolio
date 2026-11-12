import type { Device, Stage } from "@/components/project/device-stage";

/** Geometry measured from the Figma "Projekt/Homely" and "Projekt/Fuoco Nero" frames (px). */
const GREY = "#e3e0e2";

type Size = Device["screenSize"];

const browser = (dir: string, screen: string, url: string, box: Device["box"], size: Size): Device => ({
  kind: "browser",
  box,
  radius: 14,
  url,
  screen: `/projects/${dir}/screen-${screen}.jpg`,
  screenSize: size,
});

const handheld = (
  dir: string,
  screen: string,
  box: Device["box"],
  radius: number,
  bezel: number,
  screenRadius: number,
  size: Size
): Device => ({
  kind: "handheld",
  box,
  radius,
  bezel,
  screenRadius,
  screen: `/projects/${dir}/screen-${screen}.jpg`,
  screenSize: size,
});

/** A static mock-up photo; Figma crops these to the frame (12 px corners). */
const photo = (dir: string, name: string, box: Device["box"], radius = 12): Device => ({
  kind: "image",
  box,
  radius,
  screen: `/projects/${dir}/${name}.jpg`,
  screenSize: { w: box.w * 2, h: box.h * 2 },
});

/** `keyVisual` opens every case study; other stages are referenced by the dictionary's sections. */
export type ProjectStages = { keyVisual: Stage } & Record<string, Stage | undefined>;

export const SHOWCASE_STAGES: Record<string, ProjectStages> = {
  homely: {
    keyVisual: {
      w: 1280,
      h: 800,
      bg: GREY,
      devices: [
        browser("homely", "desktop", "homely.com", { x: 96, y: 72, w: 920, h: 508 }, { w: 1840, h: 6499 }),
        handheld("homely", "phone", { x: 914, y: 205, w: 270, h: 561 }, 40, 10, 30, { w: 500, h: 5481 }),
      ],
    },
    rwd: {
      w: 1280,
      h: 760,
      bg: GREY,
      devices: [
        handheld("homely", "tablet-rwd", { x: 260, y: 40, w: 498, h: 701 }, 32, 14, 18, { w: 940, h: 5216 }),
        handheld("homely", "phone-rwd", { x: 760, y: 110, w: 300, h: 626 }, 42, 10, 32, { w: 560, h: 6139 }),
      ],
    },
    projects: {
      w: 1280,
      h: 781,
      devices: [
        browser("homely", "projects", "homely.com/projects", { x: 0, y: 0, w: 1280, h: 781 }, { w: 2560, h: 5574 }),
      ],
    },
  },
  "fuoco-nero": {
    keyVisual: {
      w: 1280,
      h: 800,
      bg: GREY,
      devices: [
        browser("fuoco-nero", "desktop", "fuoconero.com", { x: 96, y: 72, w: 920, h: 589 }, { w: 1840, h: 4814 }),
        handheld("fuoco-nero", "phone", { x: 914, y: 200, w: 270, h: 536 }, 40, 10, 30, { w: 500, h: 4898 }),
      ],
    },
    rwd: {
      w: 1280,
      h: 930,
      bg: GREY,
      devices: [
        handheld("fuoco-nero", "tablet-rwd", { x: 260, y: 48, w: 498, h: 834 }, 32, 14, 18, { w: 940, h: 4268 }),
        handheld("fuoco-nero", "phone-rwd", { x: 760, y: 165, w: 300, h: 600 }, 42, 10, 32, { w: 560, h: 5466 }),
      ],
    },
  },
  "core-motion-physiotherapy": {
    keyVisual: {
      w: 1280,
      h: 800,
      bg: GREY,
      devices: [photo("core-motion-physiotherapy", "key", { x: 120, y: 53, w: 1040, h: 693 })],
    },
    print: {
      w: 1280,
      h: 548,
      bg: GREY,
      devices: [
        photo("core-motion-physiotherapy", "print-1", { x: 64, y: 64, w: 560, h: 420 }),
        photo("core-motion-physiotherapy", "print-2", { x: 656, y: 64, w: 560, h: 420 }),
      ],
    },
  },
  kvisual: {
    keyVisual: {
      w: 1280,
      h: 800,
      bg: GREY,
      devices: [photo("kvisual", "key", { x: 160, y: 40, w: 960, h: 720 })],
    },
    brand: {
      w: 1280,
      h: 370,
      bg: GREY,
      devices: [
        photo("kvisual", "stamp", { x: 64, y: 64, w: 229, h: 242 }),
        photo("kvisual", "social", { x: 325, y: 64, w: 429, h: 242 }),
        photo("kvisual", "box", { x: 787, y: 64, w: 429, h: 242 }),
      ],
    },
  },
  "artiko-festival": {
    keyVisual: {
      w: 1280,
      h: 800,
      bg: GREY,
      devices: [
        browser("artiko-festival", "desktop", "artikofestival.com", { x: 96, y: 89, w: 920, h: 543 }, { w: 1840, h: 7140 }),
        handheld("artiko-festival", "phone", { x: 914, y: 258, w: 232, h: 513 }, 34.4, 9, 25.8, { w: 430, h: 6714 }),
      ],
    },
    print: {
      w: 1280,
      h: 805,
      bg: GREY,
      devices: [
        photo("artiko-festival", "bus-stop", { x: 64, y: 64, w: 560, h: 373 }),
        photo("artiko-festival", "billboard", { x: 656, y: 64, w: 560, h: 373 }),
        photo("artiko-festival", "rollup", { x: 64, y: 469, w: 363, h: 272 }),
        photo("artiko-festival", "bag", { x: 459, y: 469, w: 363, h: 272 }),
        photo("artiko-festival", "wristband", { x: 853, y: 469, w: 363, h: 272 }),
      ],
    },
    social: {
      w: 1280,
      h: 1052,
      bg: GREY,
      devices: [
        photo("artiko-festival", "carousel", { x: 64, y: 64, w: 1152, h: 270 }, 8),
        photo("artiko-festival", "laptop", { x: 225, y: 366, w: 829, h: 622 }),
      ],
    },
  },
};
