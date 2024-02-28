import { ServerAPI } from "decky-frontend-lib";
import { localizeMap, LocalizeStrEnum } from "./localizeMap";

export class LocalizationManager {
  private static language = "english";
  public static async init(serverAPI: ServerAPI) {
    serverAPI!.callPluginMethod<{}, string>("get_language", {}).then((res) => {
      if (res.success) {
        this.language = res.result;
      }
    });
  }
  public static getString(defaultString: LocalizeStrEnum) {
    var str =
      localizeMap[this.language]?.strings?.[defaultString] ??
      localizeMap["english"]?.strings?.[defaultString];
    return str == "" ? localizeMap["english"]?.strings?.[defaultString] : str;
  }
}
