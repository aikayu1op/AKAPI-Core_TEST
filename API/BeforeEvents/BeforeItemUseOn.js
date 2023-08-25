import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Player } from "../Player/index.js";
import { IBeforeItemUseOnEventSignal } from "./interface.js";
import { Vector } from "../Vector/Vector.js";
import { Block } from "../Block/Block.js";
import { isDuplicate } from "../AfterEvents/isDuplicate.js";

/**
 * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。アイテムを持っていなくても発火させることが可能です。
 * @callback BeforeItemUseOnEventSignal
 * @param {IBeforeItemUseOnEventSignal} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
export class BeforeItemUseOnEvent {
  /**
   * ブロックに対して右クリック、またはタップではタッチした瞬間に発火するイベントです。
   * アイテムを持っていなくても発火させることが可能です。
   * @param {BeforeItemUseOnEventSignal} callback
   * @returns {(arg: BeforeItemUseOnEventSignal) => void}
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
   * イベントを停止します。
   * @param {BeforeItemUseOnEventSignal} callback
   */
  unsubscribe(callback) {
    let index = isDuplicate(_listener, callback);
    if (index != -1) {
      _listener[index] = undefined;
      _listener.filter((c) => typeof c === "undefined").length == 0 ? (_listener = []) : 0;
    } else throw new Error("This function was not found.");
    if (isRunning && _listener.length == 0) {
      isRunning = false;
      stop();
    }
    return callback;
  }
  constructor() {}
}
mc.world.beforeEvents.itemUseOn.subscribe((ev) => {
  const { faceLocationX, faceLocationY, blockFace } = ev;
  let source;
  if (ev.source.typeId == "minecraft:player") source = new Player(ev.source);
  else source = new Entity(source);
  let cancel = (value) => {
    if (typeof value == "boolean") ev.cancel = value;
    else if (!value) ev.cancel = true;
  };
  let item = (itemStack) => {
    if (!itemStack) {
      if (!ev.itemStack?.typeId) return undefined;
      else return new ItemStack(ev.itemStack);
    }
    if (source instanceof Entity && itemStack instanceof ItemStack)
      source.getComponent().getInventory().container.setItem(0, itemStack);
    else if (source instanceof Player && itemStack instanceof ItemStack)
      source.getComponent().getInventory().container.setItem(source.SelectedSlot(), itemStack);
  };
  let block = new Block(ev.block);
  _listener.forEach((f) => f({ source, block, cancel, item, faceLocationX, faceLocationY, blockFace }));
});

export const BeforeItemUseOn = new BeforeItemUseOnEvent();
