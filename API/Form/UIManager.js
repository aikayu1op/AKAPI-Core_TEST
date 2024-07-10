import * as UI from "@minecraft/server-ui";

export class UIManager{

    /**
     * 全てのformScreenを閉じます
     * @param {import("../Player").Player} player 
     */
    closeAllForms(player){
        UI.uiManager.closeAllForms(player.getMCPlayer());
    }

    constructor(){}
}
export const uiManager = new UIManager();