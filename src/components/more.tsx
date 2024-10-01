import { Field, PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { FC } from "react";
import { Backend } from "../backend";
import { useMore } from "../hooks";
import { localizationManager, localizeStrEnum } from "../i18n";
import { ActionButtonItem } from ".";


export const MoreComponent: FC = () => {
    const { currentVersion,
        latestVersion,
        xfirmwareVersion,
        kfirmwareVersion,
        disableFirmwareCheck,
        setDisableFirmwareCheck,
    } = useMore();

    let uptButtonText = localizationManager.getString(localizeStrEnum.REINSTALL_PLUGIN);

    if (currentVersion !== latestVersion && Boolean(latestVersion)) {
        uptButtonText = `${localizationManager.getString(localizeStrEnum.UPDATE_PLUGIN)} ${latestVersion}`;
    }

    // firmware_check

    return (
        <PanelSection title="More">
            <PanelSectionRow>
                <ToggleField
                    label={"Disable Firmware Check"}
                    checked={disableFirmwareCheck}
                    onChange={setDisableFirmwareCheck}
                />
            </PanelSectionRow>
            <PanelSectionRow>
                <ActionButtonItem
                    layout="below"
                    onClick={() => {
                        Backend.resetMappings();
                    }}
                >{localizationManager.getString(localizeStrEnum.RESET_MAPPING)}</ActionButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <ActionButtonItem
                    layout="below"
                    onClick={() => {
                        Backend.updateLatest();
                    }}
                >{uptButtonText}</ActionButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <Field focusable label={localizationManager.getString(localizeStrEnum.INSTALLED_VERSION)}>
                    {currentVersion}
                </Field>
            </PanelSectionRow>
            {Boolean(latestVersion) && (
                <PanelSectionRow>
                    <Field focusable label={localizationManager.getString(localizeStrEnum.LATEST_VERSION)}>
                        {latestVersion}
                    </Field>
                </PanelSectionRow>
            )}
            {Boolean(xfirmwareVersion) && (
                <PanelSectionRow>
                    <Field focusable label={"XFirmware Version"}>
                        {xfirmwareVersion}
                    </Field>
                </PanelSectionRow>
            )}
            {Boolean(kfirmwareVersion) && (
                <PanelSectionRow>
                    <Field focusable label={"KFirmware Version"}>
                        {kfirmwareVersion}
                    </Field>
                </PanelSectionRow>
            )}
        </PanelSection>
    )
}