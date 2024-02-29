import {
  ButtonItem,
  DropdownItem,
  PanelSection,
  PanelSectionRow,
} from "decky-frontend-lib";
import { useEffect, useState, VFC } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { ButtonId, keyCode } from "../backend";
import { Settings, useMappings } from "../hooks";
import { IconMap } from "./icons";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";

export const MappingDropdownItem: VFC<{ id: ButtonId; label: string }> = ({
  id,
  label,
}) => {
  const { value, updateMappingOptions } = useMappings(id);

  const SvgIcon = IconMap[id];

  return (
    <PanelSectionRow>
      <DropdownItem
        label={
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              boxSizing: "border-box",
              margin: "0",
              padding: "0",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            {SvgIcon && <span
              style={{
                width: '32px',
                height: '32px',
                marginRight: '8px',
              }}
            >
              <SvgIcon />
            </span>}
            {label}
          </span>
        }
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

export const MouseMappingComponent: VFC = () => {
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

    { id: "l41", label: "L41" },
    { id: "l42", label: "L42" },
    { id: "l43", label: "L43" },
    { id: "l44", label: "L44" },
    { id: "r41", label: "R41" },
    { id: "r42", label: "R42" },
    { id: "r43", label: "R43" },
    { id: "r44", label: "R44" },
  ];

  return (
    <PanelSection title={LocalizationManager.getString(LocalizeStrEnum.MOUSE_MAPPING)}>
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
