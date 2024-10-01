import { Field, PanelSection, PanelSectionRow, ToggleField } from "decky-frontend-lib";
import { VFC } from "react";
import { Backend } from "../backend";
import { useMore } from "../hooks";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";
import { ActionButtonItem } from ".";


export const MoreComponent: VFC = () => {
    const { currentVersion,
        latestVersion,
        xfirmwareVersion,
        kfirmwareVersion,
        disableFirmwareCheck,
        setDisableFirmwareCheck,
    } = useMore();

    let uptButtonText = LocalizationManager.getString(LocalizeStrEnum.REINSTALL_PLUGIN);

    if (currentVersion !== latestVersion && Boolean(latestVersion)) {
        uptButtonText = `${LocalizationManager.getString(LocalizeStrEnum.UPDATE_PLUGIN)} ${latestVersion}`;
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
                >{LocalizationManager.getString(LocalizeStrEnum.RESET_MAPPING)}</ActionButtonItem>
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
                <Field focusable label={LocalizationManager.getString(LocalizeStrEnum.INSTALLED_VERSION)}>
                    {currentVersion}
                </Field>
            </PanelSectionRow>
            {Boolean(latestVersion) && (
                <PanelSectionRow>
                    <Field focusable label={LocalizationManager.getString(LocalizeStrEnum.LATEST_VERSION)}>
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