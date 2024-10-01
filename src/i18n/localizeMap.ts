import * as schinese from "./schinese.json";
import * as tchinese from "./tchinese.json";
import * as english from "./english.json";
import * as german from "./german.json";
import * as japanese from "./japanese.json";
import * as koreana from "./koreana.json";
import * as thai from "./thai.json";
import * as bulgarian from "./bulgarian.json";
import * as italian from "./italian.json";
import * as french from "./french.json";

export interface LanguageProps {
  label: string;
  strings: any;
  credit: string[];
  locale: string;
}

export const defaultLanguage = "english";
export const defaultLocale = "en";
export const defaultMessages = english;

export const localizeMap: { [key: string]: LanguageProps } = {
  schinese: {
    label: "简体中文",
    strings: schinese,
    credit: ["honjow"],
    locale: "zh-CN",
  },
  tchinese: {
    label: "繁體中文",
    strings: tchinese,
    credit: [],
    locale: "zh-TW",
  },
  english: {
    label: "English",
    strings: english,
    credit: [],
    locale: "en",
  },
  german: {
    label: "Deutsch",
    strings: german,
    credit: [],
    locale: "de",
  },
  japanese: {
    label: "日本語",
    strings: japanese,
    credit: [],
    locale: "ja",
  },
  koreana: {
    label: "한국어",
    strings: koreana,
    credit: [],
    locale: "ko",
  },
  thai: {
    label: "ไทย",
    strings: thai,
    credit: [],
    locale: "th",
  },
  bulgarian: {
    label: "Български",
    strings: bulgarian,
    credit: [],
    locale: "bg",
  },
  italian: {
    label: "Italiano",
    strings: italian,
    credit: [],
    locale: "it",
  },
  french: {
    label: "Français",
    strings: french,
    credit: [],
    locale: "fr",
  },
};

export enum localizeStrEnum {
  RGB_SETTINGS = "RGB_SETTINGS",
  LED_ON = "LED_ON",
  BRIGHTNESS = "BRIGHTNESS",
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
  HUE = "HUE",
  SATURATION = "SATURATION",

  RGB_MODE_OFF = "RGB_MODE_OFF",
  RGB_MODE_SOLID = "RGB_MODE_SOLID",
  RGB_MODE_BREATHE = "RGB_MODE_BREATHE",
  RGB_MODE_ROTATE = "RGB_MODE_ROTATE",

  MOUSE_MAPPING = "MOUSE_MAPPING",
  RESET_MAPPING = "RESET_MAPPING",

  RUMBLE_SETTINGS = "RUMBLE_SETTINGS",
  RUMBLE_OFF = "RUMBLE_OFF",
  RUMBLE_LOW = "RUMBLE_LOW",
  RUMBLE_HIGH = "RUMBLE_HIGH",

  STICK_SETTINGS = "STICK_SETTINGS",
  LEFT_STICK_DEADZONE = "LEFT_STICK_DEADZONE",
  RIGHT_STICK_DEADZONE = "RIGHT_STICK_DEADZONE",
  LEFT_STICK_CENTRING = "LEFT_STICK_CENTRING",
  RIGHT_STICK_CENTRING = "RIGHT_STICK_CENTRING",

  REINSTALL_PLUGIN = "REINSTALL_PLUGIN",
  UPDATE_PLUGIN = "UPDATE_PLUGIN",
  INSTALLED_VERSION = "INSTALLED_VERSION",
  LATEST_VERSION = "LATEST_VERSION",
}
