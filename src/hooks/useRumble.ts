import { RumbleMode } from "../components/enum";
import { useEffect, useState } from "react";
import { Backend } from "../backend/backend";
import { Settings } from "./useSettings";

export const useRumble = () => {
  const [mode, setMode] = useState<RumbleMode>(Settings.rumbleMode);

  useEffect(() => {
    const getData = async () => {
      const currentMode = await Backend.getRumble();
      setMode(currentMode);
      Settings.rumbleMode = currentMode;
    };
    getData();
  }, [mode]);

  const updateRumble = (mode: RumbleMode) => {
    Settings.rumbleMode = mode;
    Backend.setRumble(mode);
  }

  return { mode, updateRumble};
};
