import { NotchLabel, PanelSection, PanelSectionRow } from "@decky/ui";
import { FC } from "react";
import { RumbleMode } from "../backend";
import { useRumble } from "../hooks";
import { SlowSliderField } from ".";
import { localizationManager, localizeStrEnum } from "../i18n";

export const RumbleComponent: FC = () => {
  const { mode, updateRumble } = useRumble();

  const options = [
    { mode: RumbleMode.OFF, label: localizationManager.getString(localizeStrEnum.RUMBLE_OFF) },
    { mode: RumbleMode.LOW, label: localizationManager.getString(localizeStrEnum.RUMBLE_LOW) },
    { mode: RumbleMode.HIGH, label: localizationManager.getString(localizeStrEnum.RUMBLE_HIGH) },
  ];

  const MODES: NotchLabel[] = options.map((opt, _) => {
    return {
      notchIndex: opt.mode,
      label: opt.label,
      value: opt.mode,
    };
  });

  return (
    <PanelSection title={localizationManager.getString(localizeStrEnum.RUMBLE_SETTINGS)}>
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
