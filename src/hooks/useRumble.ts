import { RumbleMode } from "../components/enum";
import { useEffect, useState } from "react";
import { Backend } from "../backend/backend";

export const useRumble = () => {
  const [mode, setMode] = useState<RumbleMode>(RumbleMode.HIGH);

  useEffect(() => {
    const getData = async () => {
      const currentMode = await Backend.getRumble();
      setMode(currentMode);
    };
    getData();
  }, []);

  const updateRumble = (mode: RumbleMode) => {
    Backend.setRumble(mode);
    setMode(mode);
  }

  return { mode, updateRumble};
};
