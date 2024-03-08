import {
  ButtonItem,
  DropdownItem,
  Field,
  PanelSection,
  PanelSectionRow
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { ButtonId, keyCode } from "../backend";
import { Settings, useBackButtonMapping } from "../hooks";

interface BackButtonMappingItemProps {
  val: string;
  delay: number;
  updateMappingOptions: (val: string) => void;
  updateDelay: (delay: number) => void;
}

export const BackButtonMappingItem: VFC<BackButtonMappingItemProps> = ({
  val,
  delay,
  updateMappingOptions,
  updateDelay,
}) => {

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

  console.log(`val: ${val}, delay: ${delay}`);

  const delays = [0, 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000, 3000];

  // 找出 delays 中最接近 delay 的值
  const findClosestDelay = (delay: number) => {
    let min = Math.abs(delay - delays[0]);
    let closest = delays[0];
    for (let val of delays) {
      let diff = Math.abs(delay - val);
      if (diff < min) {
        min = diff;
        closest = val;
      }
    }
    return closest;
  }

  return (
    <>
      <PanelSectionRow>
        <DropdownItem
          selectedOption={val}
          rgOptions={keyCode.map((item) => {
            return {
              label: item.label,
              data: item.label,
            };
          })}
          onChange={(val) => {
            updateMappingOptions(val.label as string);
          }}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <DropdownItem
          rgOptions={delays.map((item) => {
            return {
              label: item.toString(),
              data: item,
            };
          })}
          selectedOption={delay}
          onChange={(val) => {
            updateDelay(val.data as number);
          }}
        />
      </PanelSectionRow>
    </>
  );
};

export const BackBunntonMappingComponent: VFC = () => {
  const [showBackButtonMapping, setShowBackButtonMapping] = useState<boolean>(Settings.showBackButtonMapping);

  const {
    backButtonMappings,
    backDelays,
    updateBackButtonMappings,
    updateBackDelays,
  } = useBackButtonMapping();

  useEffect(() => {
    Settings.showBackButtonMapping = showBackButtonMapping;
  }, [showBackButtonMapping]);


  const l4mappingsOptions: { id: ButtonId; label: string; delayId: ButtonId }[] = [
    { id: "l41", label: "L41", delayId: "l4delay1" },
    { id: "l42", label: "L42", delayId: "l4delay2" },
    { id: "l43", label: "L43", delayId: "l4delay3" },
    { id: "l44", label: "L44", delayId: "l4delay4" },
  ]

  const r4mappingsOptions: { id: ButtonId; label: string; delayId: ButtonId }[] = [
    { id: "r41", label: "R41", delayId: "r4delay1" },
    { id: "r42", label: "R42", delayId: "r4delay2" },
    { id: "r43", label: "R43", delayId: "r4delay3" },
    { id: "r44", label: "R44", delayId: "r4delay4" },
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
        {showBackButtonMapping && <Field label={"L4"} />}
        {
          showBackButtonMapping &&
          l4mappingsOptions.map((opt, _) => {
            return (
              <BackButtonMappingItem
                val={backButtonMappings.find((item) => item.id === opt.id)?.name || ""}
                delay={backDelays.find((item) => item.id === opt.delayId)?.delay || 0}
                updateMappingOptions={(val) => updateBackButtonMappings(opt.id, val)}
                updateDelay={(delay) => updateBackDelays(opt.delayId, delay)}
              />
            );
          }
          )
        }
        <Field />
        {showBackButtonMapping && <Field label={"R4"} />}
        {
          showBackButtonMapping &&
          r4mappingsOptions.map((opt, _) => {
            return (
              <BackButtonMappingItem
                val={backButtonMappings.find((item) => item.id === opt.id)?.name || ""}
                delay={backDelays.find((item) => item.id === opt.delayId)?.delay || 0}
                updateMappingOptions={(val) => updateBackButtonMappings(opt.id, val)}
                updateDelay={(delay) => updateBackDelays(opt.delayId, delay)}
              />
            );
          }
          )
        }
      </PanelSection>
    </div>
  );
}