import { definePlugin, ServerAPI, staticClasses } from "decky-frontend-lib";
import { VFC } from "react";
import { FaHatCowboy } from "react-icons/fa";
import { MouseMappingComponent, MoreComponent, RumbleComponent, StickComponent, RGBComponent } from "./components";
import { PluginManager } from "./backend";
import { useSupport } from "./hooks";
import { LocalizationManager } from "./i18n";

// import logo from "../assets/logo.png";

const Content: VFC<{ serverAPI: ServerAPI }> = ({ }) => {
  const { supportRumbleOption, supportRgb, supportStickOption } = useSupport();

  return (
    <div>
      <MouseMappingComponent />
      {supportRgb && <RGBComponent />}
      {supportRumbleOption && <RumbleComponent />}
      {supportStickOption && <StickComponent />}
      <MoreComponent />
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  LocalizationManager.init(serverApi);
  PluginManager.register(serverApi);

  return {
    title: <div className={staticClasses.Title}>GPD-WinControl</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaHatCowboy />,
    onDismount() {
      PluginManager.unregister();
    },
  };
});
