import { PanelSection, PanelSectionRow } from "@decky/ui";

import { FC } from "react";
import { stickOptionId } from "../backend";
import { useStickOptions } from "../hooks";
import { SlowSliderField } from ".";
import { localizationManager, localizeStrEnum } from "../i18n";

export const StickSliderComponent: FC<{
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

export const StickComponent: FC = () => {
  const options: { id: stickOptionId; label: string }[] = [
    { id: "ldead", label: localizationManager.getString(localizeStrEnum.LEFT_STICK_DEADZONE) },
    { id: "rdead", label: localizationManager.getString(localizeStrEnum.RIGHT_STICK_DEADZONE) },
    { id: "lcent", label: localizationManager.getString(localizeStrEnum.LEFT_STICK_CENTRING) },
    { id: "rcent", label: localizationManager.getString(localizeStrEnum.RIGHT_STICK_CENTRING) },
  ];

  return (
    <PanelSection title={localizationManager.getString(localizeStrEnum.STICK_SETTINGS)}>
      {options.map((opt, idx) => {
        return <StickSliderComponent key={idx} id={opt.id} label={opt.label} />;
      })}
    </PanelSection>
  );
};
