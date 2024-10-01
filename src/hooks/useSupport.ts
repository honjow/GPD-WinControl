import { useEffect, useState } from "react";
import { Backend } from "../backend";
import { Settings } from ".";

export const useSupport = () => {
  const [supportRumbleOption, setSupportRumbleOption] = useState<boolean>(
    Settings.supportRumbleOption
  );
  const [supportRgb, setSupportRgb] = useState<boolean>(Settings.supportRgb);
  const [supportStickOption, setSupportStickOption] = useState<boolean>(
    Settings.supportStickOption
  );

  useEffect(() => {
    const getData = async () => {
      const supportRumbleOption = await Backend.getSupportRumbleOption();
      const supportRgb = await Backend.getSupportRGBOption();
      const supportStickOption = await Backend.getSupportStickOption();
      setSupportRumbleOption(supportRumbleOption);
      setSupportRgb(supportRgb);
      setSupportStickOption(supportStickOption);
    };
    getData();
  });

  return { supportRumbleOption, supportRgb, supportStickOption };
};
