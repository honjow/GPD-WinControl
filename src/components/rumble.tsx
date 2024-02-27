import { NotchLabel, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { RumbleMode } from "../backend";
import { useRumble } from "../hooks";
import { SlowSliderField } from ".";

export const RumbleComponent: VFC = () => {
  const { mode, updateRumble } = useRumble();

  const options = [
    { mode: RumbleMode.OFF, label: "关闭" },
    { mode: RumbleMode.LOW, label: "弱" },
    { mode: RumbleMode.HIGH, label: "强" },
  ];

  const MODES: NotchLabel[] = options.map((opt, _) => {
    return {
      notchIndex: opt.mode,
      label: opt.label,
      value: opt.mode,
    };
  });

  return (
    <PanelSection title="震动强度">
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
