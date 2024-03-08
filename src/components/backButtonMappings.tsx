import {
  ButtonItem,
  DialogButton,
  Dropdown,
  DropdownItem,
  Field,
  Focusable,
  Menu,
  PanelSection,
  PanelSectionRow,
  showContextMenu
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { ButtonId, keyCode } from "../backend";
import { IconMap } from ".";
import { Settings, useMappings } from "../hooks";

export const BackButtonMappingItem: VFC<{ id: ButtonId; label: string, hideNone?: boolean }> = ({
  id,
  label,
  hideNone = false,
}) => {
  const { value, updateMappingOptions } = useMappings(id);

  const SvgIcon = IconMap[id];

  const show = !hideNone || value !== "NONE";

  // return (
  //   <PanelSectionRow>
  //     <Field>
  //       <Focusable style={{ width: "100%", display: "flex" }}>
  //         <Focusable style={{ width: "calc(100% - 50px)" }}>
  //           <Dropdown selectedOption={value}
  //             rgOptions={keyCode.map((item) => {
  //               return {
  //                 label: item.label,
  //                 data: item.label,
  //               };
  //             })}
  //             onChange={(val) => {
  //               updateMappingOptions(id, val.label as string);
  //             }} />
  //         </Focusable>
  //         <Focusable style={{ marginLeft: "10px" }}>
  //           <DialogButton
  //             // disabled={!tabMasterManager.hasSettingsLoaded}
  //             style={{ height: '40px', width: '42px', minWidth: 0, padding: '10px 12px', marginLeft: 'auto', display: "flex", justifyContent: "center", alignItems: "center", marginRight: "8px" }}
  //             onClick={() => { }}
  //           >
  //           </DialogButton>
  //           {/* <Dropdown selectedOption={value}
  //           rgOptions={keyCode.map((item) => {
  //             return {
  //               label: item.label,
  //               data: item.label,
  //             };
  //           })}
  //           onChange={(val) => {
  //             updateMappingOptions(id, val.label as string);
  //           }} /> */}
  //         </Focusable>
  //       </Focusable>
  //     </Field>
  //   </PanelSectionRow>
  // );

  return (
    <PanelSectionRow>
      {show &&
        <>
          <DropdownItem
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
          />
        </>
      }
    </PanelSectionRow>
  );
};

export const BackBunntonMappingComponent: VFC = () => {
  const [showBackButtonMapping, setShowBackButtonMapping] = useState<boolean>(Settings.showBackButtonMapping);

  useEffect(() => {
    Settings.showBackButtonMapping = showBackButtonMapping;
  }, [showBackButtonMapping]);


  const l4mappingsOptions: { id: ButtonId; label: string }[] = [
    { id: "l41", label: "L41" },
    { id: "l42", label: "L42" },
    { id: "l43", label: "L43" },
    { id: "l44", label: "L44" },
  ]

  const r4mappingsOptions: { id: ButtonId; label: string }[] = [
    { id: "r41", label: "R41" },
    { id: "r42", label: "R42" },
    { id: "r43", label: "R43" },
    { id: "r44", label: "R44" },
  ]

  return (
    <div>
      <PanelSection title={"BackButon Mappings"}>
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            // @ts-ignore
            style={{
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setShowBackButtonMapping(!showBackButtonMapping)}
          >
            {showBackButtonMapping ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
          </ButtonItem>
        </PanelSectionRow>

        {/* {
        showBackButtonMapping &&
        mappingsOptions.map((opt, idx) => {
          return (
            <BackButtonMappingItem
              key={idx}
              id={opt.id}
              label={opt.label}
              hideNone={true}
            />
          );
        })
      } */}
      </PanelSection>
      {showBackButtonMapping && <PanelSection title={"L4"}>
        {l4mappingsOptions.map((opt, idx) => {
          return (
            <BackButtonMappingItem
              key={idx}
              id={opt.id}
              label={opt.label}
              hideNone={true}
            />
          );
        })}
      </PanelSection>}
      {showBackButtonMapping && <PanelSection title={"R4"}>
        {r4mappingsOptions.map((opt, idx) => {
          return (
            <BackButtonMappingItem
              key={idx}
              id={opt.id}
              label={opt.label}
              hideNone={true}
            />
          );
        })}
      </PanelSection>}
    </div>
  );
}