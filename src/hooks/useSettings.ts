import { Backend } from "../backend/backend";
import { ButtonId, buttonIds, stickOptionId } from "../backend/const";
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

  private _mapingsOptions: { id: ButtonId; label: string }[] = [
  ];

  public static async init() {
    const rumbleMode = await Backend.getRumble();
    this._instance._rumbleMode = rumbleMode;
    this._instance._stickOptions.forEach(async (opt) => {
      const value = await Backend.getStickConfig(opt.id);
      opt.value = value;
    });
    
    buttonIds.forEach(async (id) => {
      const value = await Backend.getMappingConfig(id);
      this._instance._mapingsOptions.push({ id, label: value });
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

  public static set stickOptions(value: { id: stickOptionId; value: number }[]) {
    this._instance._stickOptions = value;
  }

  public static setStickOption(id: stickOptionId, value: number) {
    const index = this._instance._stickOptions.findIndex((opt) => opt.id === id);
    this._instance._stickOptions[index].value = value;
  }

  public static getStickOption(id: stickOptionId): number {
    return this._instance._stickOptions.find((opt) => opt.id === id)?.value || 0;
  }

  public static getMappingOptions(): { id: ButtonId; label: string }[] {
    return this._instance._mapingsOptions;
  }

  public static setMappingOption(id: ButtonId, value: string) {
    const index = this._instance._mapingsOptions.findIndex((opt) => opt.id === id);
    if (index === -1) {
      this._instance._mapingsOptions.push({ id, label: value });
      return;
    }
    this._instance._mapingsOptions[index].label = value;
  }

  public static getMappingOption(id: ButtonId): string {
    return this._instance._mapingsOptions.find((opt) => opt.id === id)?.label || "NONE";
  }

}
