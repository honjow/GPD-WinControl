import { useEffect, useState } from "react";
import { Backend } from "../backend/backend";
import { Settings } from "./useSettings";
import { ButtonId } from "../backend/const";

export const useMappings = (id: ButtonId) => {
  const [value, setValue] = useState(Settings.getMappingOption(id));

  useEffect(() => {
    const getData = async () => {
      const val = await Backend.getMappingConfig(id);
      setValue(val);
      Settings.setMappingOption(id, val);
    };
    getData();
  }, [value]);

  const updateMappingOptions = (id: string, value: string) => {
    Backend.setConfig(id, value);
    Settings.setMappingOption(id, value);
  };

  return {
    value,
    updateMappingOptions,
  };
};

