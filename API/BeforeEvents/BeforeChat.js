import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { IBeforeChatEventSignal } from "./interface.js";

/**
 * @type {Function[]}
 */
var _listener = [];

/**
 * チャットイベントのデータが返ってきます。
 * @callback BeforeChatEventSignal
 * @param {IBeforeChatEventSignal} ev
 */

class BeforeChatEvents {
  /**
   * チャットを送信した際に発火しますが、送信する前の瞬間になるのでチャットのキャンセルが可能です。
   * @param {BeforeChatEventSignal} callback
   * @returns {(arg: BeforeChatEventSignal) => void}
   */
  subscribe(callback) {
    if (typeof callback == "function") {
      _listener.push(callback);
      return callback;
    }
  }
  /**
   * 登録されているイベントを削除します。
   * @param {BeforeChatEventSignal} callback
   */
  unsubscribe(callback) {
    if (typeof callback == "function") _listener = _listener.filter((f) => f !== callback);
  }
}
mc.world.beforeEvents.chatSend.subscribe((ev) => {
  const { sender: s, message, sendToTargets, getTargets: t } = ev;
  let getTargets = () => {
    return t().map((x) => new Player(x));
  };
  const sender = new Player(s);
  /**
   * @param {Player[]} players
   */
  let setTargets = (players) => ev.setTargets(players.map((x) => x.getMCPlayer()));
  let cancel = (value) => {
    if (!!value && typeof value === "boolean") ev.cancel = value;
    else ev.cancel = true;
  };
  _listener.forEach((f) => {
    f({ sender, cancel, message, sendToTargets, getTargets, setTargets });
  });
});

export const BeforeChat = new BeforeChatEvents();
