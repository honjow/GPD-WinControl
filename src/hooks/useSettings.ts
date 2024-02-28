import {
  Backend,
  ButtonId,
  ButtonIds,
  LedMode,
  rgbToHsv,
  stickOptionId,
} from "../backend";

export class Settings {
  private static _instance: Settings = new Settings();

  private _showMouseMapping: boolean = false;
  private _rumbleMode: number = 1;

  private _stickOptions: { id: stickOptionId; value: number }[] = [
    { id: "ldead", value: 0 },
    { id: "rdead", value: 0 },
    { id: "lcent", value: 0 },
    { id: "rcent", value: 0 },
  ];

  private _mapingsOptions: { id: ButtonId; label: string }[] = [];

  private _currentVersion: string = "";
  private _latestVersion: string = "";

  private _supportRumbleOption: boolean = false;
  private _supportRgb: boolean = false;
  private _supportStickOption: boolean = false;

  private _hue: number = 0;
  private _saturation: number = 100;
  private _brightness: number = 100;

  private _ledMode: LedMode = 0;

  public static async init() {
    Backend.getRumble().then((value) => {
      this._instance._rumbleMode = value;
    });

    this._instance._stickOptions.forEach(async (opt) => {
      Backend.getStickConfig(opt.id).then((value) => {
        opt.value = value;
      });
    });

    ButtonIds.forEach((id) => {
      Backend.getMappingConfig(id).then((value) => {
        this._instance._mapingsOptions.push({ id, label: value });
      });
    });

    Backend.getSupportRumbleOption().then((value) => {
      this._instance._supportRumbleOption = value;
    });
    Backend.getSupportRGBOption().then((value) => {
      this._instance._supportRgb = value;
    });
    Backend.getSupportStickOption().then((value) => {
      this._instance._supportStickOption = value;
    });

    Backend.getVersion().then((value) => {
      this._instance._currentVersion = value;
    });

    // Backend.getLatestVersion().then((value) => {
    //   this._instance._latestVersion = value;
    // });

    Backend.getRgb().then(({ r, g, b }) => {
      const [h, s, v] = rgbToHsv(r, g, b);
      this._instance._hue = h;
      this._instance._saturation = s;
      this._instance._brightness = v;
    });
    Backend.getLedMode().then((mode) => {
      this._instance._ledMode = mode;
    });
  }

  public static get showMouseMapping(): boolean {
    return this._instance._showMouseMapping;
  }
  public static set showMouseMapping(value: boolean) {
    this._instance._showMouseMapping = value;
  }

  public static get rumbleMode(): number {
    return this._instance._rumbleMode;
  }
  public static set rumbleMode(value: number) {
    this._instance._rumbleMode = value;
  }

  public static get stickOptions(): { id: stickOptionId; value: number }[] {
    return this._instance._stickOptions;
  }

  public static set stickOptions(
    value: { id: stickOptionId; value: number }[]
  ) {
    this._instance._stickOptions = value;
  }

  public static setStickOption(id: stickOptionId, value: number) {
    const index = this._instance._stickOptions.findIndex(
      (opt) => opt.id === id
    );
    this._instance._stickOptions[index].value = value;
  }

  public static getStickOption(id: stickOptionId): number {
    return (
      this._instance._stickOptions.find((opt) => opt.id === id)?.value || 0
    );
  }

  public static getMappingOptions(): { id: ButtonId; label: string }[] {
    return this._instance._mapingsOptions;
  }

  public static setMappingOption(id: ButtonId, value: string) {
    const index = this._instance._mapingsOptions.findIndex(
      (opt) => opt.id === id
    );
    if (index === -1) {
      this._instance._mapingsOptions.push({ id, label: value });
      return;
    }
    this._instance._mapingsOptions[index].label = value;
  }

  public static getMappingOption(id: ButtonId): string {
    return (
      this._instance._mapingsOptions.find((opt) => opt.id === id)?.label ||
      "NONE"
    );
  }

  public static get currentVersion(): string {
    return this._instance._currentVersion;
  }

  public static set currentVersion(value: string) {
    this._instance._currentVersion = value;
  }

  public static get latestVersion(): string {
    return this._instance._latestVersion;
  }

  public static set latestVersion(value: string) {
    this._instance._latestVersion = value;
  }

  public static get supportRumbleOption(): boolean {
    return this._instance._supportRumbleOption;
  }

  public static set supportRumbleOption(value: boolean) {
    this._instance._supportRumbleOption = value;
  }

  public static get supportRgb(): boolean {
    return this._instance._supportRgb;
  }

  public static set supportRgb(value: boolean) {
    this._instance._supportRgb = value;
  }

  public static get supportStickOption(): boolean {
    return this._instance._supportStickOption;
  }

  public static set supportStickOption(value: boolean) {
    this._instance._supportStickOption = value;
  }

  public static get hue(): number {
    return this._instance._hue;
  }

  public static set hue(value: number) {
    this._instance._hue = value;
  }

  public static get saturation(): number {
    return this._instance._saturation;
  }

  public static set saturation(value: number) {
    this._instance._saturation = value;
  }

  public static get brightness(): number {
    return this._instance._brightness;
  }

  public static set brightness(value: number) {
    this._instance._brightness = value;
  }

  public static get ledMode(): LedMode {
    return this._instance._ledMode;
  }

  public static set ledMode(value: LedMode) {
    this._instance._ledMode = value;
  }
}
