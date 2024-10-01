import { definePlugin, staticClasses } from "@decky/ui";
import { FC } from "react";
import { FaHatCowboy } from "react-icons/fa";
import { MouseMappingComponent, MoreComponent, RumbleComponent, StickComponent, RGBComponent, BackBunntonMappingComponent } from "./components";
import { PluginManager } from "./backend";
import { useSupport } from "./hooks";
import { localizationManager } from "./i18n";

// import logo from "../assets/logo.png";

const Content: FC<{}> = ({ }) => {
  const { supportRumbleOption, supportRgb, supportStickOption } = useSupport();

  return (
    <div>
      <MouseMappingComponent />
      <BackBunntonMappingComponent />
      {supportRgb && <RGBComponent />}
      {supportRumbleOption && <RumbleComponent />}
      {supportStickOption && <StickComponent />}
      <MoreComponent />
    </div>
  );
};

export default definePlugin(() => {
  localizationManager.init();
  PluginManager.register();

  return {
    title: <div className={staticClasses.Title}>GPD-WinControl</div>,
    content: <Content />,
    icon: <FaHatCowboy />,
    onDismount() {
      PluginManager.unregister();
    },
  };
});
