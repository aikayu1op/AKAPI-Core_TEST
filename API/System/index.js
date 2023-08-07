import * as mc from "@minecraft/server";
import { IAllPlayerCallback, tickSubscribe } from "./forAllPlayer.js";

/**
 * @callback AllPlayerCallback
 * @param {IAllPlayerCallback} ev
 */

class System {
  constructor() {}
  /**
   * @type {number}
   * @readonly
   */
  currentTick = mc.system.currentTick;
  /**
   * @readonly
   */
  beforeEvents = mc.system.beforeEvents;
  /**
   * @readonly
   */
  afterEvents = mc.system.afterEvents;
  /**
   * 登録しているRunイベントを終了します。
   * @param {number} runId
   */
  clearRun(runId) {
    mc.system.clearRun(runId);
  }
  /**
   * callback関数を1tickごとに動かす際に使用します。
   * ただし、このままだと1回しか実行できないので、関数内にも定義する必要があります。
   * @example
   * ```
   * import { system } from "./AKAPI-core/index.js";
   *
   * system.run(function test(){
   *    system.run(test);
   *    //code here.
   * })
   * ```
   * @param {Function<void>} callback
   */
  run(callback) {
    return mc.system.run(callback);
  }
  /**
   * callback関数をdelayTicksごとに動かす際に使用します。
   * この関数は、イベントに登録されるので常に実行します。
   * @example
   * ```
   * import { system } from "./AKAPI-core/index.js";
   *
   * system.runSchedule(() =>{
   *    //code here.
   * }, 1)
   * ```
   * @param {Function<void>} callback
   * @param {number} delayTicks
   */
  runInterval(callback, delayTicks = 0) {
    return mc.system.runInterval(callback, delayTicks);
  }
  /**
   *
   * @param {Function} callback
   * @param {number} delayTicks
   */
  runTimeout(callback, delayTicks = 0) {
    return mc.system.runTimeout(callback, delayTicks);
  }
  /**
   * forを使ったすべてのプレイヤーに対して実行するものを強制的に1つのForにまとめさせれるものです。
   * 
   * tickDelayを使用することも可能になっています。
   * @param {AllPlayerCallback} callback 
   * @param {number} tickDelay 
   */
  allPlayerTickSubscribe(callback, tickDelay = 0) {
    tickSubscribe(callback, tickDelay);
  }
}
export const system = new System();
