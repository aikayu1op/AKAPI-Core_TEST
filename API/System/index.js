import * as mc from "@minecraft/server";
import { IAllPlayerCallback, tickSubscribe, tickUnSubscribe } from "./forAllPlayer.js";

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
  get currentTick(){return mc.system.currentTick;}
  /**
   * @readonly
   */
  get beforeEvents(){return mc.system.beforeEvents;}
  /**
   * @readonly
   */
  get afterEvents(){return mc.system.afterEvents}
  /**
   * @readonly
   */
  get WORLD_TICKS(){return mc.system.WORLD_TICKS;}
  /**
   * @readonly
   */
  get serverSystemInfo(){return mc.server.serverSystemInfo;}

  /**
   * forを使ったすべてのプレイヤーに対して実行するものを強制的に1つのForにまとめさせれるものです。
   * 
   * tickDelayを使用することも可能になっています。
   * @param {AllPlayerCallback} callback 
   * @param {number} tickDelay 
   */
  allPlayerTickSubscribe(callback, tickDelay = 0) {
    return tickSubscribe(callback, tickDelay);
  }
  /**
   * イベントを解除します。
   * @param {AllPlayerCallback} runId
   */
  allPlayerTickUnSubscribe(runId) {
    tickUnSubscribe(runId);
  }
  /**
   * 登録しているRunイベントを終了します。
   * @param {number} runId
   */
  clearRun(runId) {
    mc.system.clearRun(runId);
  }
  /**
   * 非同期処理を止めます。
   * @param {number} jobId 
   */
  clearJob(jobId){
    mc.system.clearJob(jobId);
  }
  /**
   * サーバーを強制的に終了させます。
   */
  close() {
    mc.system.beforeEvents.watchdogTerminate.subscribe(e => e.cancel = false)
    function crash() {
        while (true)
          crash();
    }
    crash();
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
   * 非同期処理を実行します。
   * @param {Generator<void, void, void>} callback 
   * @returns 
   */
  runJob(callback){
    return mc.system.runJob(callback);
  }
  /**
   * callback関数をdelayTicksごとに動かす際に使用します。
   * この関数は、イベントに登録されるので常に実行します。
   * @example
   * ```
   * import { system } from "./AKAPI-core/index.js";
   *
   * system.runInterval(() =>{
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
   * 指定したtick分処理を待ちます。
   * @param {Function} callback
   * @param {number} delayTicks
   */
  runTimeout(callback, delayTicks = 0) {
    return mc.system.runTimeout(callback, delayTicks);
  }
  waitTicks(tick = 1){
    return mc.system.waitTicks(tick);
  }
}
export const system = new System();
