import {
  ButtonItem,
  DropdownItem,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  showContextMenu
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi"
import { keyCode } from "../backend";
import { Settings, useBackButtonMapping } from "../hooks";

interface BackButtonMappingItemProps {
  val: string;
  delay: number;
  updateMappingOptions: (val: string) => void;
  updateDelay: (delay: number) => void;
  enableSetDelay?: boolean;
}

export const BackButtonMappingItem: VFC<BackButtonMappingItemProps> = ({
  val,
  delay,
  updateMappingOptions,
  updateDelay,
  enableSetDelay = true,
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

  var delays = [0, 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000, 3000];

  // 找出 delays 中最接近 delay 的值
  // @ts-ignore
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
      {enableSetDelay && <PanelSectionRow>
        <DropdownItem
          menuLabel="Delay"
          rgOptions={delays.map((item) => {
            return {
              label: item.toString() + " ms",
              data: item,
            };
          })}
          selectedOption={delay}
          onChange={(val) => {
            updateDelay(val.data as number);
          }}
        />
      </PanelSectionRow>}
    </>
  );
};

export const BackBunntonMappingComponent: VFC = () => {
  const [showL4, setShowL4] = useState<boolean>(Settings.showL4);
  const [showR4, setShowR4] = useState<boolean>(Settings.showR4);

  const {
    backButtonMappings,
    backDelays,
    updateBackButtonMappings,
    updateBackDelays,
  } = useBackButtonMapping();

  useEffect(() => {
    Settings.showL4 = showL4;
    Settings.showR4 = showR4;
  }, [showL4, showR4]);

  const l4Items = backButtonMappings.filter(item => item.id.startsWith("l4"));
  const l4LastIndex = l4Items.slice().reverse().findIndex(item => item.name !== "NONE");
  const _l4mappingsOptions = l4Items.slice(0, l4Items.length - l4LastIndex).map((item) => {
    return {
      id: item.id,
      label: item.name,
      delayId: `l4delay${item.id.slice(-1)}`,
    };
  });

  const r4Items = backButtonMappings.filter(item => item.id.startsWith("r4"));
  const r4LastIndex = r4Items.slice().reverse().findIndex(item => item.name !== "NONE");
  const _r4mappingsOptions = r4Items.slice(0, r4Items.length - r4LastIndex).map((item) => {
    return {
      id: item.id,
      label: item.name,
      delayId: `r4delay${item.id.slice(-1)}`,
    };
  });

  return (
    <div>
      <PanelSection title={"L4"}>
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
            onClick={() => setShowL4(!showL4)}
          >
            {showL4 ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
          </ButtonItem>
        </PanelSectionRow>
        {
          showL4 &&
          _l4mappingsOptions.map((opt, idx) => {
            return (
              <BackButtonMappingItem
                val={backButtonMappings.find((item) => item.id === opt.id)?.name || ""}
                delay={backDelays.find((item) => item.id === opt.delayId)?.delay || 0}
                updateMappingOptions={(val) => updateBackButtonMappings(opt.id, val)}
                updateDelay={(delay) => updateBackDelays(opt.delayId, delay)}
                enableSetDelay={idx < _l4mappingsOptions.length - 1}
              />
            );
          }
          )
        }
        {showL4 &&
          _l4mappingsOptions.length < 4 &&
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
              onClick={() => {
                showContextMenu(
                  <Menu label={"Add"}>
                    {keyCode.map((item) => {
                      return (
                        <MenuItem onClick={() => {
                          updateBackButtonMappings(`l4${_l4mappingsOptions.length + 1}`, item.label);
                        }}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Menu>);
              }}
            >
              <FiPlusCircle />
            </ButtonItem>
          </PanelSectionRow>
        }
      </PanelSection>
      <PanelSection title={"R4"}>
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
            onClick={() => setShowR4(!showR4)}
          >
            {showR4 ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
          </ButtonItem>
        </PanelSectionRow>
        {
          showR4 &&
          _r4mappingsOptions.map((opt, idx) => {
            return (
              <BackButtonMappingItem
                val={backButtonMappings.find((item) => item.id === opt.id)?.name || ""}
                delay={backDelays.find((item) => item.id === opt.delayId)?.delay || 0}
                updateMappingOptions={(val) => updateBackButtonMappings(opt.id, val)}
                updateDelay={(delay) => updateBackDelays(opt.delayId, delay)}
                enableSetDelay={idx < _r4mappingsOptions.length - 1}
              />
            );
          }
          )
        }
        {showR4 &&
          _r4mappingsOptions.length < 4 &&
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
              onClick={() => {
                showContextMenu(
                  <Menu label={"Add"}>
                    {keyCode.map((item) => {
                      return (
                        <MenuItem onClick={() => {
                          updateBackButtonMappings(`r4${_r4mappingsOptions.length + 1}`, item.label);
                        }}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Menu>);
              }}
            >
              <FiPlusCircle />
            </ButtonItem>
          </PanelSectionRow>
        }
      </PanelSection>
    </div>
  );
}