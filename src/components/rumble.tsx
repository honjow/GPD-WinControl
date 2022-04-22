import {
  NotchLabel,
  PanelSection,
  PanelSectionRow,
  SliderField,
} from "decky-frontend-lib";
import { VFC } from "react";
import { RumbleMode } from "./enum";
import { useRumble } from "../hooks/useRumble";

const RumbleComponent: VFC = () => {
  const { mode, updateRumble } = useRumble();
  // const [mode, setMode] = useState<RumbleMode>(RumbleMode.HIGH);

  // useEffect(() => {
  //   Backend.getRumble().then((currentMode) => {
  //     setMode(currentMode);
  //   });
  // }, [mode]);

  const options = [
    { mode: RumbleMode.OFF, label: "关闭" },
    { mode: RumbleMode.LOW, label: "弱" },
    { mode: RumbleMode.HIGH, label: "强" },
  ];

  const handleSliderChange = (value: number) => {
    // setMode(value);
    updateRumble(value);
  };

  const MODES: NotchLabel[] = options.map((opt, idx) => {
    return {
      notchIndex: idx,
      label: opt.label,
      value: opt.mode,
    };
  });

  return (
    <PanelSection title="震动强度">
      <PanelSectionRow>
        <SliderField
          value={mode}
          min={0}
          max={MODES.length - 1}
          step={1}
          notchCount={MODES.length}
          notchLabels={MODES}
          notchTicksVisible={true}
          showValue={false}
          bottomSeparator={"none"}
          onChange={handleSliderChange}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

export default RumbleComponent;
