import {
  NotchLabel,
  PanelSection,
  PanelSectionRow,
  gamepadSliderClasses,
} from "@decky/ui";
import { FC } from "react";
import { SlowSliderField } from "./SlowSliderField";
import { useRgb } from "../hooks";
import { LedMode } from "../backend";
import { localizationManager, localizeStrEnum } from "../i18n";

export const RGBComponent: FC = () => {
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
    { mode: LedMode.OFF, label: localizationManager.getString(localizeStrEnum.RGB_MODE_OFF) },
    { mode: LedMode.SOLID, label: localizationManager.getString(localizeStrEnum.RGB_MODE_SOLID) },
    { mode: LedMode.BREATHE, label: localizationManager.getString(localizeStrEnum.RGB_MODE_BREATHE) },
    { mode: LedMode.ROTATE, label: localizationManager.getString(localizeStrEnum.RGB_MODE_ROTATE) },
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
    <PanelSection title={localizationManager.getString(localizeStrEnum.RGB_SETTINGS)}>
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
            label={localizationManager.getString(localizeStrEnum.HUE)}
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
            label={localizationManager.getString(localizeStrEnum.SATURATION)}
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
            label={localizationManager.getString(localizeStrEnum.BRIGHTNESS)}
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