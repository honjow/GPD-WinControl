import { ServerAPI } from "decky-frontend-lib";
import { Backend } from "./backend";
import { Settings } from "../hooks/useSettings";

export class PluginManager {
  public static register = async (serverAPI: ServerAPI) => {
    await Backend.init(serverAPI);
    await Settings.init();
  };
  public static unregister() {}
}
