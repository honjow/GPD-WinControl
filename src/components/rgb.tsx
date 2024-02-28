import {
  NotchLabel,
  PanelSection,
  PanelSectionRow,
  gamepadSliderClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { SlowSliderField } from "./SlowSliderField";
import { useRgb } from "../hooks";
import { LedMode } from "../backend";

export const RGBComponent: VFC = () => {
  const {
    hue,
    saturation,
    brightness,
    setHsv,
    ledMode,
    updateLedMode,
  } = useRgb();

  const setHue = (value: number) => {
    setHsv(value, saturation, brightness);
  }

  const setSaturation = (value: number) => {
    setHsv(hue, value, brightness);
  }

  const setBrightness = (value: number) => {
    setHsv(hue, saturation, value);
  }

  const _setHue = (value: number) => {
    setHsv(value, saturation, brightness, false);
  }

  const _setSaturation = (value: number) => {
    setHsv(hue, value, brightness, false);
  }

  const _setBrightness = (value: number) => {
    setHsv(hue, saturation, value, false);
  }

  const options = [
    { mode: LedMode.OFF, label: "关闭" },
    { mode: LedMode.SOLID, label: "常亮" },
    { mode: LedMode.BREATHE, label: "呼吸" },
    { mode: LedMode.ROTATE, label: "轮转" },
  ];

  const ledModeLabels: NotchLabel[] = options.map((opt, _) => {
    return {
      notchIndex: opt.mode,
      label: opt.label,
      value: opt.mode,
    };
  });

  const showSlider = ledMode !== LedMode.OFF && ledMode !== LedMode.ROTATE;

  return (
    <PanelSection title="RGB">
      <PanelSectionRow>
        <SlowSliderField
          value={ledMode}
          min={0}
          max={ledModeLabels.length - 1}
          step={1}
          notchCount={ledModeLabels.length}
          notchLabels={ledModeLabels}
          notchTicksVisible={true}
          showValue={false}
          onChange={updateLedMode}
        />
      </PanelSectionRow>
      {showSlider && <>
        <PanelSectionRow>
          <SlowSliderField
            showValue
            label={"Hue"}
            value={hue}
            min={0}
            max={360}
            validValues="range"
            bottomSeparator="thick"
            onChangeEnd={setHue}
            onChange={_setHue}
            className="ColorPicker_HSlider"
            valueSuffix="°"
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <SlowSliderField
            showValue
            label={"Saturation"}
            value={saturation}
            min={0}
            max={100}
            validValues="range"
            bottomSeparator="thick"
            onChangeEnd={setSaturation}
            onChange={_setSaturation}
            valueSuffix="%"
            className="ColorPicker_SSlider"
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <SlowSliderField
            showValue
            label={"Brightness"}
            value={brightness}
            disabled={ledMode === LedMode.BREATHE}
            min={0}
            max={100}
            onChangeEnd={setBrightness}
            onChange={_setBrightness}
            valueSuffix="%"
            className="ColorPicker_VSlider"
          />
        </PanelSectionRow>
      </>}
      <style>
        {`
            .ColorPicker_HSlider .${gamepadSliderClasses.SliderTrack} {
              background: linear-gradient(
                to right,
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(360, 100%, 50%)
              ) !important;
              --left-track-color: #0000 !important;
              --colored-toggles-main-color: #0000 !important;
            }
            .ColorPicker_SSlider .${gamepadSliderClasses.SliderTrack} {
              background: linear-gradient(
                to right,
                hsl(0, 100%, 100%),
                hsl(${hue}, 100%, 50%)
              ) !important;
              --left-track-color: #0000 !important;
              --colored-toggles-main-color: #0000 !important;
            }
            .ColorPicker_VSlider .${gamepadSliderClasses.SliderTrack} {
              background: linear-gradient(
                to right,
                hsl(0, 100%, 0%),
                hsl(${hue}, ${saturation}%, 50%)
              ) !important;
              --left-track-color: #0000 !important;
              --colored-toggles-main-color: #0000 !important;
            }
          `}
      </style>
    </PanelSection>
  );
};