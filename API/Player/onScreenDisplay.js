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
