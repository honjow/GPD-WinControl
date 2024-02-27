import { ServerAPI } from "decky-frontend-lib";
import { ButtonId } from "./const";

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
    this.serverAPI!.callPluginMethod("log", { message: message });
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
}
