import { definePlugin, ServerAPI, staticClasses } from "decky-frontend-lib";
import { VFC } from "react";
import { FaHatCowboy } from "react-icons/fa";
import { MouseMappingComponent, RumbleComponent, StickComponent } from "./components";
import { PluginManager } from "./backend";

// import logo from "../assets/logo.png";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  return (
    <div>
      <MouseMappingComponent />
      <RumbleComponent />
      <StickComponent />
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
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
