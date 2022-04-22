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

const MouseMappingComponent: VFC = () => {
  const [showMouseMapping, setShowMouseMapping] = useState(
    Settings.showMouseMapping
  );
  useEffect(() => {
    Settings.showMouseMapping = showMouseMapping;
  }, [showMouseMapping]);
  const mappingsOptions = [
    "Dpad-Up",
    "Dpad-Down",
    "Dpad-Left",
    "Dpad-Right",

    "L1",
    "R1",
    "L2",
    "R2",
    "L3",
    "R3",
    "A",
    "B",
    "X",
    "Y",

    "Select",
    "Start",
    "Menu",

    "Left Stick Up",
    "Left Stick Down",
    "Left Stick Left",
    "Left Stick Right",

    "Right Stick Up",
    "Right Stick Down",
    "Right Stick Left",
    "Right Stick Right",
  ];

  return (
    <PanelSection title="鼠标模式">
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
        mappingsOptions.map((item) => {
          return (
            <PanelSectionRow>
              <DropdownItem
                label={item}
                rgOptions={keyCode.map((item) => {
                  return {
                    label: item.label,
                    data: item.value,
                  };
                })}
                selectedOption={undefined}
              ></DropdownItem>
            </PanelSectionRow>
          );
        })}
    </PanelSection>
  );
};

export default MouseMappingComponent;
