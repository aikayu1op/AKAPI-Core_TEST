import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { IBeforeChatEventSignal } from "./interface.js";
import { isDuplicate } from "../AfterEvents/isDuplicate.js";

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
    if (isDuplicate(_listener, callback) == -1 && typeof callback === "function") _listener.push(callback);
    else throw new Error("This function has already subscribed.");
    if (!isRunning && _listener.length >= 1) {
      isRunning = true;
      start();
    }
    return callback;
  }
  /**
   * 登録されているイベントを削除します。
   * @param {BeforeChatEventSignal} callback
   */
  unsubscribe(callback) {
    let index = isDuplicate(
      _listener.map((x) => x.function),
      callback
    );
    if (index != -1) _listener.splice(index, 1);
    else throw new Error("This function was not found.");
    if (isRunning && _listener.length == 0) isRunning = false;
  }
}
function start() {
  let runData = mc.world.beforeEvents.chatSend.subscribe((ev) => {
    if (!isRunning) mc.world.beforeEvents.chatSend.unsubscribe(runData);
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
}

export const BeforeChat = new BeforeChatEvents();
