import { ServerAPI } from "decky-frontend-lib";
import { Backend } from ".";
import { Settings } from "../hooks";

export class PluginManager {
  public static register = async (serverAPI: ServerAPI) => {
    await Backend.init(serverAPI);
    await Settings.init();
  };
  public static unregister() {}
}
