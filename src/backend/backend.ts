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
    await this.serverAPI!.callPluginMethod("set_rumble", {"mode": mode});
  }

  public static async log(message: string) {
    this.serverAPI!.callPluginMethod("log", { message: message });
  }
}
