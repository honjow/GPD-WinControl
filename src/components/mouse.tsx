import {
  ButtonItem,
  DropdownItem,
  PanelSection,
  PanelSectionRow,
} from "decky-frontend-lib";
import { keyCode } from "../backend/utils";
import { useEffect, useState, VFC } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { Settings } from "../hooks/useSettings";
import {useMappings } from "../hooks/useMappings";
import { ButtonId } from "../backend/const";

const MappingDropdownItem: VFC<{ id: ButtonId; label: string }> = ({
  id,
  label,
}) => {
  const { value, updateMappingOptions } = useMappings(id);
  return (
    <PanelSectionRow>
      <DropdownItem
        label={label}
        selectedOption={value}
        rgOptions={keyCode.map((item) => {
          return {
            label: item.label,
            data: item.label,
          };
        })}
        onChange={(val) => {
          updateMappingOptions(id, val.label as string);
        }}
      ></DropdownItem>
    </PanelSectionRow>
  );
};

const MouseMappingComponent: VFC = () => {
  const [showMouseMapping, setShowMouseMapping] = useState(
    Settings.showMouseMapping
  );
  useEffect(() => {
    Settings.showMouseMapping = showMouseMapping;
  }, [showMouseMapping]);

  const mappingsOptions: { id: ButtonId; label: string }[] = [
    { id: "du", label: "Dpad-Up" },
    { id: "dd", label: "Dpad-Down" },
    { id: "dl", label: "Dpad-Left" },
    { id: "dr", label: "Dpad-Right" },
    { id: "l1", label: "L1" },
    { id: "r1", label: "R1" },
    { id: "l2", label: "L2" },
    { id: "r2", label: "R2" },
    { id: "l3", label: "L3" },
    { id: "r3", label: "R3" },
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "x", label: "X" },
    { id: "y", label: "Y" },
    { id: "select", label: "Select" },
    { id: "start", label: "Start" },
    { id: "menu", label: "Menu" },
    { id: "lu", label: "Left Stick Up" },
    { id: "ld", label: "Left Stick Down" },
    { id: "ll", label: "Left Stick Left" },
    { id: "lr", label: "Left Stick Right" },
  ];

  return (
    <PanelSection title="键鼠模式映射">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          style={{
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowMouseMapping(!showMouseMapping)}
        >
          {showMouseMapping ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
        </ButtonItem>
      </PanelSectionRow>

      {showMouseMapping &&
        mappingsOptions.map((opt, idx) => {
          return (
            <MappingDropdownItem key={idx} id={opt.id} label={opt.label} />
          );
        })}
    </PanelSection>
  );
};

export default MouseMappingComponent;
