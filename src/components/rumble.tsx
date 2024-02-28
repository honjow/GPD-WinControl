import { NotchLabel, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { RumbleMode } from "../backend";
import { useRumble } from "../hooks";
import { SlowSliderField } from ".";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";

export const RumbleComponent: VFC = () => {
  const { mode, updateRumble } = useRumble();

  const options = [
    { mode: RumbleMode.OFF, label: LocalizationManager.getString(LocalizeStrEnum.RUMBLE_OFF) },
    { mode: RumbleMode.LOW, label: LocalizationManager.getString(LocalizeStrEnum.RUMBLE_LOW) },
    { mode: RumbleMode.HIGH, label: LocalizationManager.getString(LocalizeStrEnum.RUMBLE_HIGH) },
  ];

  const MODES: NotchLabel[] = options.map((opt, _) => {
    return {
      notchIndex: opt.mode,
      label: opt.label,
      value: opt.mode,
    };
  });

  return (
    <PanelSection title={LocalizationManager.getString(LocalizeStrEnum.RUMBLE_SETTINGS)}>
      <PanelSectionRow>
        <SlowSliderField
          value={mode}
          min={0}
          max={MODES.length - 1}
          step={1}
          notchCount={MODES.length}
          notchLabels={MODES}
          notchTicksVisible={true}
          showValue={false}
          onChange={updateRumble}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};
