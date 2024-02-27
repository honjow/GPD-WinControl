import { useEffect, useState } from "react";
import { Backend } from "../backend/backend";
import { Settings } from "./useSettings";

export type stickOption = {
  id: "ldead" | "rdead" | "lcent" | "rcent";
  label: string;
  value: number;
};

export const useStickOptions = (id: stickOption["id"]) => {
  const [value, setValue] = useState(Settings.getStickOption(id));

  useEffect(() => {
    const getData = async () => {
      const val = await Backend.getStickOptions(id);
      setValue(val);
      Settings.setStickOption(id, val);
    };
    getData();
  }, [value]);

  const updateStickOptions = (id: stickOption["id"], value: number) => {
    Backend.setStickOptions(id, value);
    Settings.setStickOption(id, value);
  };

  return {
    value,
    updateStickOptions,
  };
};
