import { ButtonItem, Field, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { Backend } from "../backend";
import { useUpdate } from "../hooks";


export const MoreComponent: VFC = () => {
    const { currentVersion, latestVersion } = useUpdate();

    let uptButtonText = `Reinstall Plugin`;

    if (currentVersion !== latestVersion && Boolean(latestVersion)) {
        uptButtonText = `Update to ${latestVersion}`;
    }

    return (
        <PanelSection>
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={() => {
                        Backend.resetMappings();
                    }}
                >Reset Mappings</ButtonItem>
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
                <Field disabled label={"Installed Version"}>
                    {currentVersion}
                </Field>
            </PanelSectionRow>
            {Boolean(latestVersion) && (
                <PanelSectionRow>
                    <Field disabled label={"Latest Version"}>
                        {latestVersion}
                    </Field>
                </PanelSectionRow>
            )}
        </PanelSection>
    )
}