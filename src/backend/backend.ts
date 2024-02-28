import { ServerAPI } from "decky-frontend-lib";
import { ButtonId, LedModeMap } from ".";

export class Backend {
  private static serverAPI: ServerAPI;
  public static async init(serverAPI: ServerAPI) {
    this.serverAPI = serverAPI;
  }

  public static async getRumble(): Promise<number> {
    const mode: number = (
      await this.serverAPI!.callPluginMethod("get_rumble", {})
    ).result as number;
    return mode;
  }

  public static async setRumble(mode: number) {
    await this.serverAPI!.callPluginMethod("set_rumble", { mode: mode });
  }

  public static async log_debug(message: string) {
    this.serverAPI!.callPluginMethod("log_debug", { message: message });
  }

  // log_info
  public static async log_info(message: string) {
    this.serverAPI!.callPluginMethod("log_info", { message: message });
  }

  public static async getStickConfig(id: string): Promise<number> {
    const value = (
      await this.serverAPI!.callPluginMethod("get_config_num", {
        option: id,
      })
    ).result;
    Backend.log_debug(`getStickConfig: ${id} = ${value}`);
    return value as number;
  }

  public static setConfig(id: string, value: number | string) {
    this.serverAPI!.callPluginMethod("set_config", {
      option: id,
      value: value,
    });
  }

  public static async getMappingConfig(id: ButtonId) {
    const value = (
      await this.serverAPI!.callPluginMethod("get_config_str", {
        option: id,
      })
    ).result;
    Backend.log_debug(`getMappingConfig: ${id} = ${value}`);
    return value as string;
  }

  public static async resetMappings() {
    return await this.serverAPI!.callPluginMethod("reset_mappings", {});
  }

  public static async updateLatest() {
    return await this.serverAPI!.callPluginMethod("update_latest", {});
  }

  public static async getVersion(): Promise<string> {
    return (await this.serverAPI!.callPluginMethod("get_version", {}))
      .result as string;
  }

  public static async getLatestVersion(): Promise<string> {
    return (await this.serverAPI!.callPluginMethod("get_latest_version", {}))
      .result as string;
  }

  // get_support_rumble_option
  public static async getSupportRumbleOption(): Promise<boolean> {
    return (
      ((await this.serverAPI!.callPluginMethod("get_support_rumble_option", {}))
        .result as boolean) || false
    );
  }

  // get_support_rgb_option
  public static async getSupportRGBOption(): Promise<boolean> {
    return (
      ((await this.serverAPI!.callPluginMethod("get_support_rgb_option", {}))
        .result as boolean) || false
    );
  }

  // get_support_stick_option
  public static async getSupportStickOption(): Promise<boolean> {
    return (
      ((await this.serverAPI!.callPluginMethod("get_support_stick_option", {}))
        .result as boolean) || false
    );
  }

  // getRgb
  public static async getRgb(): Promise<{ r: number; g: number; b: number }> {
    const res = await this.serverAPI!.callPluginMethod<{}, number[]>(
      "get_rgb",
      {}
    );
    if (res.success) {
      const r = res.result[0] as number;
      const g = res.result[1] as number;
      const b = res.result[2] as number;
      return { r: r, g: g, b: b };
    } else {
      return { r: 0, g: 0, b: 0 };
    }
  }

  // setRgb
  public static async setRgb(r: number, g: number, b: number) {
    await this.serverAPI!.callPluginMethod("set_rgb", { r: r, g: g, b: b });
  }

  // getLedMode
  public static async getLedMode(): Promise<number> {
    const res = await this.serverAPI!.callPluginMethod<{}, string>(
      "get_config_str",
      { option: "ledmode" }
    );
    if (res.success) {
      return LedModeMap[res.result as string] || 0;
    } else {
      return 0;
    }
  }

  // setLedMode
  public static async setLedMode(mode: number) {
    const modeStr = Object.keys(LedModeMap).find(
      (key) => LedModeMap[key] === mode
    );
    await this.serverAPI!.callPluginMethod("set_config", {
      option: "ledmode",
      value: modeStr,
    });
  }
}
