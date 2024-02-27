import { Backend } from "../backend/backend";
import { stickOption } from "./useStick";
export class Settings {
  private static _instance: Settings = new Settings();

  private _showMouseMapping: boolean = false;
  private _rumbleMode: number = 1;

  private _stickOptions: { id: stickOption["id"]; value: number }[] = [
    { id: "ldead", value: 0 },
    { id: "rdead", value: 0 },
    { id: "lcent", value: 0 },
    { id: "rcent", value: 0 },
  ];

  public static async init() {
    const rumbleMode = await Backend.getRumble();
    this._instance._rumbleMode = rumbleMode;
    this._instance._stickOptions.forEach(async (opt) => {
      const value = await Backend.getStickOptions(opt.id);
      opt.value = value;
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

  public static get stickOptions(): { id: stickOption["id"]; value: number }[] {
    return this._instance._stickOptions;
  }

  public static set stickOptions(value: { id: stickOption["id"]; value: number }[]) {
    this._instance._stickOptions = value;
  }

  public static setStickOption(id: stickOption["id"], value: number) {
    const index = this._instance._stickOptions.findIndex((opt) => opt.id === id);
    this._instance._stickOptions[index].value = value;
  }

  public static getStickOption(id: stickOption["id"]): number {
    return this._instance._stickOptions.find((opt) => opt.id === id)?.value || 0;
  }

}
