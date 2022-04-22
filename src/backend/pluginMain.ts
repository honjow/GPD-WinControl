import { ServerAPI } from "decky-frontend-lib";
import { Backend } from "./backend";

export class PluginManager {
  public static register = async (serverAPI: ServerAPI) => {
    await Backend.init(serverAPI);
  };
  public static unregister() {}
}
