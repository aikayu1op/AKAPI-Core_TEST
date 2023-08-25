import { system, world } from "@minecraft/server";
import { Player } from "../../index.js";
import { isDuplicate } from "../AfterEvents/isDuplicate.js";

export class IAllPlayerCallback {
  /**
   *
   * @type {Player}
   */
  player;
  /**
   * @type {number}
   */
  currentCount = 0;
}

/**
 * @callback AllPlayerCallback
 * @param {IAllPlayerCallback} ev
 */

var _tick = [];

let isRunning = false;

/**
 * @param {AllPlayerCallback} callback
 * @param {number} tickDelay
 * @deprecated
 */
export function tickSubscribe(callback, tickDelay = 0) {
  if(isDuplicate(_tick.map(x => x.function), callback) == -1 && typeof callback === "function")
      _tick.push({
          function: callback,
          delay: tickDelay,
          time: 0,
          currentCount: 0
      });
  else throw new Error("This function has already subscribed.");
  if(!isRunning && _tick.length >= 1){
      isRunning = true;
      start();
  }
  return callback;
}
/**
 * @deprecated
 * @param {AllPlayerCallback} callback
 */
export function tickUnSubscribe(callback){
  let index = isDuplicate(_tick.map(x => x.function), callback);
  if(index != -1)
      _tick.splice(index, 1);
  else throw new Error("This function was not found.")
  if(isRunning && _tick.length == 0){
      isRunning = false;
      //stop();
  }
}

/**
 * イベント登録数が1個以上の場合にイベントを監視するようにします。
 */
function start(){
  let runId = system.runInterval(() => {
    if(!isRunning) system.clearRun(runId);
    if(_tick.length == 0) return;
    for (const IPlayer of world.getAllPlayers())
      _tick.forEach((f) => {
        let currentCount = f.currentCount;
        let player = new Player(IPlayer);
        f.delay == f.time ? f.function({ player, currentCount }) : 0;
      });

    _tick.map((f) => {
      if (f.delay == f.time) {
        f.time = 0;
        if (f.currentCount == Number.MAX_VALUE) f.currentCount = 0;
        f.currentCount++;
      } else f.time += 1;
    });
  });
}

