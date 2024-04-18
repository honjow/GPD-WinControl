import { Field, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { Backend } from "../backend";
import { useUpdate } from "../hooks";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";
import { ActionButtonItem } from ".";


export const MoreComponent: VFC = () => {
    const { currentVersion, latestVersion, xfirmware_version, kfirmware_version } = useUpdate();

    let uptButtonText = LocalizationManager.getString(LocalizeStrEnum.REINSTALL_PLUGIN);

    if (currentVersion !== latestVersion && Boolean(latestVersion)) {
        uptButtonText = `${LocalizationManager.getString(LocalizeStrEnum.UPDATE_PLUGIN)} ${latestVersion}`;
    }

    return (
        <PanelSection title="More">
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
            {Boolean(xfirmware_version) && (
                <PanelSectionRow>
                    <Field focusable label={"XFirmware Version"}>
                        {xfirmware_version}
                    </Field>
                </PanelSectionRow>
            )}
            {Boolean(kfirmware_version) && (
                <PanelSectionRow>
                    <Field focusable label={"KFirmware Version"}>
                        {kfirmware_version}
                    </Field>
                </PanelSectionRow>
            )}
        </PanelSection>
    )
}