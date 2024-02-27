import { PanelSection, PanelSectionRow } from "decky-frontend-lib";

import { VFC } from "react";
import { stickOptionId } from "../backend";
import { useStickOptions } from "../hooks";
import { SlowSliderField } from ".";

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
        // notchLabels={[
        //   { notchIndex: -10, label: "-10" },
        //   { notchIndex: 0, label: "0" },
        //   { notchIndex: 10, label: "10" },
        // ]}
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
    { id: "ldead", label: "左摇杆死区" },
    { id: "rdead", label: "右摇杆死区" },
    { id: "lcent", label: "左摇杆边界" },
    { id: "rcent", label: "右摇杆边界" },
  ];

  return (
    <PanelSection title="摇杆死区">
      {options.map((opt, idx) => {
        return <StickSliderComponent key={idx} id={opt.id} label={opt.label} />;
      })}
    </PanelSection>
  );
};
