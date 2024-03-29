import { LedMode } from "./enum";

export const ButtonIds: string[] = [
  "l41",
  "l42",
  "l43",
  "l44",
  "r41",
  "r42",
  "r43",
  "r44",

  "l4delay1",
  "l4delay2",
  "l4delay3",
  "l4delay4",
  "r4delay1",
  "r4delay2",
  "r4delay3",
  "r4delay4",

  "du", //"Dpad-Up",
  "dd", //"Dpad-Down",
  "dl", //"Dpad-Left",
  "dr", //"Dpad-Right",

  "l1",
  "r1",
  "l2",
  "r2",
  "l3",
  "r3",
  "a",
  "b",
  "x",
  "y",

  "select",
  "start",
  "menu",

  "lu", // "Left Stick Up",
  "ld", //"Left Stick Down",
  "ll", //"Left Stick Left",
  "lr", //"Left Stick Right",
];

export type ButtonId = (typeof ButtonIds)[number];
export type BackButtonId = "l41" | "l42" | "l43" | "l44" | "r41" | "r42" | "r43" | "r44"
export type BackDelayId = "l4delay1" | "l4delay2" | "l4delay3" | "l4delay4" | "r4delay1" | "r4delay2" | "r4delay3" | "r4delay4"

export type BackDelay = { id: BackDelayId; delay: number };
export type BackButtonMapping = { id: BackButtonId; name: string };

export type MappingOption = {
  id: ButtonId;
  label: string;
  value: number;
};

export type StickOption = {
  id: "ldead" | "rdead" | "lcent" | "rcent";
  label: string;
  value: number;
};

export type stickOptionId = StickOption["id"];

export const GithubApiUrl = "https://api.github.com/repos/honjow/GPD-WinControl/releases/latest";

export const LedModeMap: { [key: string]: LedMode } = {
  "off": LedMode.OFF,
  "solid": LedMode.SOLID,
  "breathe": LedMode.BREATHE,
  "rotate": LedMode.ROTATE,
};