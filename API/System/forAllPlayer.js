import { system, world } from "@minecraft/server";
import { Player } from "../../index.js";

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

/**
 * @param {AllPlayerCallback} callback
 * @param {number} tickDelay
 * @deprecated
 */
export function tickSubscribe(callback, tickDelay = 0) {
  if (typeof callback == "function" && typeof tickDelay == "number"){
    return _tick.push({
      function: callback,
      delay: tickDelay,
      time: 0,
      currentCount: 0,
    });
  }else throw new Error("callback or tickDelay has illegal types.");
}
/**
 * @deprecated
 * @param {number} runId 
 */
export function tickUnSubscribe(runId){
  if(!!_tick[runId]) _tick[runId] = undefined;
  _tick.filter(c => typeof c === "undefined").length == 0 ? _tick = [] : 0
}

system.runInterval(() => {
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
