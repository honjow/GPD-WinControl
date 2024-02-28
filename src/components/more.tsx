import { ButtonItem, Field, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { Backend } from "../backend";
import { useUpdate } from "../hooks";
import { LocalizationManager, LocalizeStrEnum } from "../i18n";


export const MoreComponent: VFC = () => {
    const { currentVersion, latestVersion } = useUpdate();

    let uptButtonText = LocalizationManager.getString(LocalizeStrEnum.REINSTALL_PLUGIN);

    if (currentVersion !== latestVersion && Boolean(latestVersion)) {
        uptButtonText = `${LocalizationManager.getString(LocalizeStrEnum.UPDATE_PLUGIN)} ${latestVersion}`;
    }

    return (
        <PanelSection>
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={() => {
                        Backend.resetMappings();
                    }}
                >{LocalizationManager.getString(LocalizeStrEnum.RESET_MAPPING)}</ButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={() => {
                        Backend.updateLatest();
                    }}
                >{uptButtonText}</ButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <Field disabled label={LocalizationManager.getString(LocalizeStrEnum.INSTALLED_VERSION)}>
                    {currentVersion}
                </Field>
            </PanelSectionRow>
            {Boolean(latestVersion) && (
                <PanelSectionRow>
                    <Field disabled label={LocalizationManager.getString(LocalizeStrEnum.LATEST_VERSION)}>
                        {latestVersion}
                    </Field>
                </PanelSectionRow>
            )}
        </PanelSection>
    )
}