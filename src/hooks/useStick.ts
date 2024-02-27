import { useEffect, useState } from "react";
import { Backend } from "../backend/backend";
import { Settings } from "./useSettings";
import { stickOptionId } from "../backend/const";

export const useStickOptions = (id: stickOptionId) => {
  const [value, setValue] = useState(Settings.getStickOption(id));

  useEffect(() => {
    const getData = async () => {
      const val = await Backend.getStickConfig(id);
      setValue(val);
      Settings.setStickOption(id, val);
    };
    getData();
  }, [value]);

  const updateStickOptions = (id: stickOptionId, value: number) => {
    Backend.setConfig(id, value);
    Settings.setStickOption(id, value);
  };

  return {
    value,
    updateStickOptions,
  };
};
