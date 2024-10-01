import { PanelSection, PanelSectionRow } from "decky-frontend-lib";

import { VFC } from "react";
import { stickOptionId } from "../backend";
import { useStickOptions } from "../hooks";
import { SlowSliderField } from ".";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";

export const StickSliderComponent: VFC<{
  id: stickOptionId;
  label: string;
}> = ({ id, label }) => {
  const { value, updateStickOptions } = useStickOptions(id);
  return (
    <PanelSectionRow>
      <SlowSliderField
        label={label}
        value={value}
        min={-10}
        max={10}
        step={1}
        notchCount={21}
        notchLabels={[
          // { notchIndex: 0, label: "-10" },
          // { notchIndex: 9, label: "10" },
        ]}
        notchTicksVisible={false}
        showValue={true}
        bottomSeparator={"none"}
        onChangeEnd={(val: number) => {
          updateStickOptions(id, val);
        }}
      />
    </PanelSectionRow>
  );
};

export const StickComponent: VFC = () => {
  const options: { id: stickOptionId; label: string }[] = [
    { id: "ldead", label: LocalizationManager.getString(LocalizeStrEnum.LEFT_STICK_DEADZONE) },
    { id: "rdead", label: LocalizationManager.getString(LocalizeStrEnum.RIGHT_STICK_DEADZONE) },
    { id: "lcent", label: LocalizationManager.getString(LocalizeStrEnum.LEFT_STICK_CENTRING) },
    { id: "rcent", label: LocalizationManager.getString(LocalizeStrEnum.RIGHT_STICK_CENTRING) },
  ];

  return (
    <PanelSection title={LocalizationManager.getString(LocalizeStrEnum.STICK_SETTINGS)}>
      {options.map((opt, idx) => {
        return <StickSliderComponent key={idx} id={opt.id} label={opt.label} />;
      })}
    </PanelSection>
  );
};
