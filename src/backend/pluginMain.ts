import { Backend } from ".";
import { Settings } from "../hooks";

export class PluginManager {
  public static register = async () => {
    // await localizationManager.init(serverAPI);
    await Backend.init();
    await Settings.init();
  };
  public static unregister() {}
}
