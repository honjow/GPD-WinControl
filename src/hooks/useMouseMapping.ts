import { useEffect, useState } from "react";
import { Backend, ButtonId } from "../backend";
import { Settings } from ".";

export const useMappings = (id: ButtonId) => {
  const [value, setValue] = useState(Settings.getMappingOption(id));

  useEffect(() => {
    const getData = async () => {
      const val = await Backend.getConfigStr(id);
      setValue(val);
      Settings.setMappingOption(id, val);
    };
    getData();
  }, [value]);

  const updateMappingOptions = (id: string, value: string) => {
    Settings.setMappingOption(id, value);
    Backend.setConfig(id, value);
  };

  return {
    value,
    updateMappingOptions,
  };
};

