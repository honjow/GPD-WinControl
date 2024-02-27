export const buttonIds: string[] = [
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

export type ButtonId = (typeof buttonIds)[number];

export type mappingOption = {
  id: ButtonId;
  label: string;
  value: number;
};

export type stickOption = {
  id: "ldead" | "rdead" | "lcent" | "rcent";
  label: string;
  value: number;
};

export type stickOptionId = stickOption["id"];
