import { useEffect, useState } from "react";
import { Backend, LedMode, hsvToRgb, rgbToHsv } from "../backend";
import { Settings } from ".";

export const useRgb = () => {
  const [hue, setHue] = useState<number>(Settings.hue);
  const [saturation, setSaturation] = useState<number>(Settings.saturation);
  const [brightness, setBrightness] = useState<number>(Settings.brightness);

  const [ledMode, setLedMode] = useState<LedMode>(Settings.ledMode);

  useEffect(() => {
    const getData = async () => {
      const { r, g, b } = await Backend.getRgb();
      const [h, s, v] = rgbToHsv(r, g, b);
      const mode = await Backend.getLedMode();
      setHue(h);
      setSaturation(s);
      setBrightness(v);
      setLedMode(mode);

      Settings.ledMode = mode;
      Settings.hue = h;
      Settings.saturation = s;
      Settings.brightness = v;
    };
    getData();
  }, []);

  const setHsv = async (
    h: number,
    s: number,
    v: number,
    setRGB: boolean = true
  ) => {
    if (h >= 360) {
      h = 0;
    }
    const [r, g, b] = hsvToRgb(h, s, v);
    setHue(h);
    setSaturation(s);
    setBrightness(v);
    Settings.hue = h;
    Settings.saturation = s;
    Settings.brightness = v;
    if (setRGB) {
      await Backend.setRgb(r, g, b);
    }
  };

  const updateLedMode = async (mode: LedMode) => {
    if (mode > 3) {
      mode = 0;
    }
    setLedMode(mode);
    Settings.ledMode = mode;
    await Backend.setLedMode(mode);
  };

  return {
    hue,
    saturation,
    brightness,
    setHsv,
    ledMode,
    updateLedMode,
  };
};
