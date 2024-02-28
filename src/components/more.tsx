import { ButtonItem, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { VFC } from "react";
import { Backend } from "../backend";


export const MoreComponent: VFC = () => {
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
                >Update latest</ButtonItem>
            </PanelSectionRow>
        </PanelSection>
    )
}