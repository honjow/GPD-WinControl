import {
  BackButtonId,
  BackButtonMapping,
  BackDelay,
  BackDelayId,
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
  private _showL4: boolean = false;
  private _showR4: boolean = false;

  private _stickOptions: { id: stickOptionId; value: number }[] = [
    { id: "ldead", value: 0 },
    { id: "rdead", value: 0 },
    { id: "lcent", value: 0 },
    { id: "rcent", value: 0 },
  ];

  private _mapingsOptions: { id: ButtonId; label: string }[] = [];

  private _backButtonMappings: BackButtonMapping[] = [
    { id: "l41", name: "" },
    { id: "l42", name: "" },
    { id: "l43", name: "" },
    { id: "l44", name: "" },
    { id: "r41", name: "" },
    { id: "r42", name: "" },
    { id: "r43", name: "" },
    { id: "r44", name: "" },
  ];
  private _backDelays: BackDelay[] = [
    { id: "l4delay1", delay: 0 },
    { id: "l4delay2", delay: 0 },
    { id: "l4delay3", delay: 0 },
    { id: "l4delay4", delay: 0 },
    { id: "r4delay1", delay: 0 },
    { id: "r4delay2", delay: 0 },
    { id: "r4delay3", delay: 0 },
    { id: "r4delay4", delay: 0 },
  ];

  private _currentVersion: string = "";
  private _latestVersion: string = "";

  private _supportRumbleOption: boolean = false;
  private _supportRgb: boolean = false;
  private _supportStickOption: boolean = false;

  private _hue: number = 0;
  private _saturation: number = 100;
  private _brightness: number = 100;

  private _ledMode: LedMode = 0;

  public static xfirmware_version: string = "";
  public static kfirmware_version: string = "";

  public static async init() {
    Backend.getRumble().then((value) => {
      this._instance._rumbleMode = value;
    });

    this._instance._stickOptions.forEach(async (opt) => {
      Backend.getConfigNumber(opt.id).then((value) => {
        opt.value = value;
      });
    });

    ButtonIds.forEach((id) => {
      Backend.getConfigStr(id).then((value) => {
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

    Backend.getBackMappings().then((value) => {
      this._instance._backButtonMappings = value;
    });

    Backend.getBackDelays().then((value) => {
      this._instance._backDelays = value;
    });

    Backend.getXFirmwareVersion().then((value) => {
      console.log(`XFirmware Version: ${value}`);
      this.xfirmware_version = value;
    });

    Backend.getKFirmwareVersion().then((value) => {
      console.log(`KFirmware Version: ${value}`);
      this.kfirmware_version = value;
    });
  }

  public static get showMouseMapping(): boolean {
    return this._instance._showMouseMapping;
  }
  public static set showMouseMapping(value: boolean) {
    this._instance._showMouseMapping = value;
  }

  public static get showL4(): boolean {
    return this._instance._showL4;
  }

  public static set showL4(value: boolean) {
    this._instance._showL4 = value;
  }

  public static get showR4(): boolean {
    return this._instance._showR4;
  }

  public static set showR4(value: boolean) {
    this._instance._showR4 = value;
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

  public static get backButtonMappings(): BackButtonMapping[] {
    return this._instance._backButtonMappings;
  }

  public static set backButtonMappings(value: BackButtonMapping[]) {
    this._instance._backButtonMappings = value;
  }

  public static get backDelays(): BackDelay[] {
    return this._instance._backDelays;
  }

  public static set backDelays(value: BackDelay[]) {
    this._instance._backDelays = value;
  }

  public static getBackMappingOption(id: BackButtonId): string {
    return (
      this._instance._backButtonMappings.find((opt) => opt.id === id)?.name ||
      "NONE"
    );
  }

  public static setBackMappingOption(id: BackButtonId, value: string) {
    const index = this._instance._backButtonMappings.findIndex(
      (opt) => opt.id === id
    );
    if (index === -1) {
      this._instance._backButtonMappings.push({ id, name: value });
      return;
    }
    this._instance._backButtonMappings[index].name = value;
  }

  public static getBackDelay(id: BackDelayId): number {
    return this._instance._backDelays.find((opt) => opt.id === id)?.delay || 0;
  }

  public static setBackDelay(id: BackDelayId, value: number) {
    const index = this._instance._backDelays.findIndex((opt) => opt.id === id);
    if (index === -1) {
      this._instance._backDelays.push({ id, delay: value });
      return;
    }
    this._instance._backDelays[index].delay = value;
  }
}
