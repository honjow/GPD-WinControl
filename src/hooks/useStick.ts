import { useEffect, useState } from "react";
import { Backend, stickOptionId } from "../backend";
import { Settings } from ".";

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
