import { Player } from "./index.js";
import * as mc from "@minecraft/server";

export class onScreenDisplay {
  /**
   * プレイヤーにアクションバーを送信します。
   * @param {String | import("../Interfaces/IRawMessage.js").IRawMessage} message
   */
  setActionbar(message) {
    this._screenDisplay.setActionBar(String(message));
  }
  /**
   * タイトルを送信します。
   * @param {String | import("../Interfaces/IRawMessage.js").IRawMessage} message
   * @param {mc.TitleDisplayOptions} options
   */
  setTitle(message, options) {
    this._screenDisplay.setTitle(String(message), options);
  }
  /**
   * タイトルをクリアします。
   */
  clearTitle() {
    this._screenDisplay.clearTitle();
  }
  /**
   * サブタイトルを付与します。最初にupdateSubtitleを実行してからsetTitleを実行すると表示されます。
   * @param {String | import("../Interfaces/IRawMessage.js").IRawMessage} message
   */
  updateSubtitle(message) {
    this._screenDisplay.updateSubtitle(String(message));
  }
  getHiddenHudElements(){
    return this._screenDisplay.getHiddenHudElements();
  }
  /**
   * 
   * @param {mc.HudElement[]} hudElements 
   */
  hideAllExcept(hudElements = undefined){
    this._screenDisplay.hideAllExcept(hudElements);
  }
  /**
   * 
   * @param {mc.HudElement} hudElement 
   */
  isForcedHidden(hudElement){
    return this._screenDisplay.isForcedHidden(hudElement)
  }
  isValid(){
    return this._screenDisplay.isValid();
  }
  resetHudElements(){
    this._screenDisplay.resetHudElements();
  }
  /**
   * 
   * @param {mc.HudVisibility} visible
   * @param {mc.HudElement[]} hudElement
   */
  setHudVisibility(visible, hudElements = undefined){
    this._screenDisplay.setHudVisibility(visible, hudElements)
  }

  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    /**
     * @private
     */
    this._screenDisplay = player.getMCPlayer().onScreenDisplay;
  }
}
