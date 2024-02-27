import { ServerAPI } from "decky-frontend-lib";

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

  public static async log(message: string) {
    this.serverAPI!.callPluginMethod("log", { message: message });
  }

  public static async getStickOptions(id: string): Promise<number> {
    const value = (
      await this.serverAPI!.callPluginMethod("get_setting_with_num", {
        option: id,
      })
    ).result;
    Backend.log(`getStickOptions: ${id} = ${value}`);
    return value as number;
  }

  static setStickOptions(id: string, value: number | string) {
    this.serverAPI!.callPluginMethod("set_setting", {
      "option": id,
      "value": value,
    });
  }
}
