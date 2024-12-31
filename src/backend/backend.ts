import { BackButtonMapping, BackDelay, ButtonId, LedModeMap } from ".";
import { SettingsData } from "../hooks";
import { call } from "@decky/api";

export class Backend {
  public static async init() {
  }

  public static async getRumble(): Promise<number> {
    return await (call("get_rumble")) as number;
  }

  public static async setRumble(mode: number) {
    // await this.serverAPI!.callPluginMethod("set_rumble", { mode: mode });
    await call("set_rumble", mode);
  }

  // log_info
  public static async log_info(message: string) {
    // this.serverAPI!.callPluginMethod("log_info", { message: message });
    await call("log_info", message);
  }

  public static async getConfigNumber(id: string): Promise<number> {
    // const value = (
    //   await this.serverAPI!.callPluginMethod("get_config_num", {
    //     option: id,
    //   })
    // ).result;
    const value = await call("get_config_num", id) as number;

    return value;
  }

  public static async getConfigStr(id: ButtonId) {
    // const value = (
    //   await this.serverAPI!.callPluginMethod("get_config_str", {
    //     option: id,
    //   })
    // ).result;
    const value = await call("get_config_str", id) as string;

    return value as string;
  }

  public static setConfig(id: string, value: number | string) {
    // this.serverAPI!.callPluginMethod("set_config", {
    //   option: id,
    //   value: value,
    // });
    call<[option: string, value: number | string], void>("set_config", id, value);
  }

  public static async resetMappings() {
    // return await this.serverAPI!.callPluginMethod("reset_mappings", {});
    return await call("reset_mappings");
  }

  public static async updateLatest() {
    // return await this.serverAPI!.callPluginMethod("update_latest", {});
    return await call("update_latest");
  }

  public static async getVersion(): Promise<string> {
    // return (await this.serverAPI!.callPluginMethod("get_version", {}))
    //   .result as string;
    return (await call("get_version")) as string;
  }

  public static async getLatestVersion(): Promise<string> {
    // return (await this.serverAPI!.callPluginMethod("get_latest_version", {}))
    //   .result as string;
    return (await call("get_latest_version")) as string;
  }

  // get_support_rumble_option
  public static async getSupportRumbleOption(): Promise<boolean> {
    // return (
    //   ((await this.serverAPI!.callPluginMethod("get_support_rumble_option", {}))
    //     .result as boolean) || false
    // );
    return (
      (await call("get_support_rumble_option")) as boolean || false
    );
  }

  // get_support_rgb_option
  public static async getSupportRGBOption(): Promise<boolean> {
    // return (
    //   ((await this.serverAPI!.callPluginMethod("get_support_rgb_option", {}))
    //     .result as boolean) || false
    // );
    return (
      (await call("get_support_rgb_option")) as boolean || false
    );
  }

  // get_support_stick_option
  public static async getSupportStickOption(): Promise<boolean> {
    // return (
    //   ((await this.serverAPI!.callPluginMethod("get_support_stick_option", {}))
    //     .result as boolean) || false
    // );
    return (
      (await call("get_support_stick_option")) as boolean || false
    );
  }

  // getRgb
  public static async getRgb(): Promise<{ r: number; g: number; b: number }> {
    // const res = await this.serverAPI!.callPluginMethod<{}, number[]>(
    //   "get_rgb",
    //   {}
    // );
    const res = await call("get_rgb") as number[];
    if (res) {
      const r = res[0] as number;
      const g = res[1] as number;
      const b = res[2] as number;
      return { r: r, g: g, b: b };
    } else {
      return { r: 0, g: 0, b: 0 };
    }
  }

  // setRgb
  public static async setRgb(r: number, g: number, b: number) {
    // await this.serverAPI!.callPluginMethod("set_rgb", { r: r, g: g, b: b });
    await call<[a: number, b: number, c: number], void>("set_rgb", r, g, b);
  }

  // getLedMode
  public static async getLedMode(): Promise<number> {
    // const res = await this.serverAPI!.callPluginMethod<{}, string>(
    //   "get_config_str",
    //   { option: "ledmode" }
    // );
    const res = await call("get_config_str", "ledmode") as string;
    if (res) {
      return LedModeMap[res as string] || 0;
    } else {
      return 0;
    }
  }

  // setLedMode
  public static async setLedMode(mode: number) {
    const modeStr = Object.keys(LedModeMap).find(
      (key) => LedModeMap[key] === mode
    );
    // await this.serverAPI!.callPluginMethod("set_config", {
    //   option: "ledmode",
    //   value: modeStr,
    // });
    if (!modeStr) {
      return;
    }
    await call<[option: string, value: string], void>("set_config", "ledmode", modeStr);
  }

  // get_Xfirmware_version
  public static async getXFirmwareVersion(): Promise<string> {
    // return (await this.serverAPI!.callPluginMethod("get_Xfirmware_version", {}))
    //   .result as string;
    try {
      // return (
      //   await this.serverAPI!.callPluginMethod("get_Xfirmware_version", {})
      // ).result as string;
      return (await call("get_Xfirmware_version")) as string;
    } catch (error) {
      console.error("getXFirmwareVersion error", error);
    }
    return "UNKNOWN";
  }

  // get_Kfirmware_version
  public static async getKFirmwareVersion(): Promise<string> {
    try {
      // return (
      //   await this.serverAPI!.callPluginMethod("get_Kfirmware_version", {})
      // ).result as string;
      return (await call("get_Kfirmware_version")) as string;
    } catch (error) {
      console.error("getKFirmwareVersion error", error);
    }
    return "UNKNOWN";
  }

  // getMappingOptions
  public static async getBackMappings(): Promise<BackButtonMapping[]> {
    const ids = ["l41", "l42", "l43", "l44", "r41", "r42", "r43", "r44"];
    const promises = ids.map((id) => Backend.getConfigStr(id));
    const results = await Promise.all(promises);
    return ids.map(
      (id, index) => ({ id, name: results[index] } as BackButtonMapping)
    );
  }

  // getBackDelays
  public static async getBackDelays(): Promise<BackDelay[]> {
    const ids = [
      "l4delay1",
      "l4delay2",
      "l4delay3",
      "l4delay4",
      "r4delay1",
      "r4delay2",
      "r4delay3",
      "r4delay4",
    ];
    const promises = ids.map((id) => Backend.getConfigNumber(id));
    const results = await Promise.all(promises);
    return ids.map((id, index) => ({ id, delay: results[index] } as BackDelay));
  }

  // get_settings
  public static async getSettings(): Promise<SettingsData> {
    const res = await call("get_settings") as Record<string, unknown>;
    if (!res) {
      return new SettingsData();
    }
    let data = new SettingsData();
    data.fromDict(res as Record<string, unknown>);
    return data;
  }

  // set_settings
  public static async setSettings(settings: SettingsData) {
    return await call("set_settings", settings);
  }
}
