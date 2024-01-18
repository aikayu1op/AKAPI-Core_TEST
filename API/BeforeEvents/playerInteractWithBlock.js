import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Player } from "../Player/index.js";
import { IBeforePlayerInteractWithBlock } from "./interface.js"
import { Block } from "../Block/Block.js";
import { isDuplicate } from "../AfterEvents/isDuplicate.js";

/**
 * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。アイテムを持っていなくても発火させることが可能です。
 * @callback BeforePlayerInteractWithBlocks
 * @param {IBeforePlayerInteractWithBlock} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
var isRunning = false;
export class BeforePlayerInteractWithBlock {
  /**
   * ブロックに対して右クリック、またはタップではタッチした瞬間に発火するイベントです。
   * アイテムを持っていなくても発火させることが可能です。
   * @param {BeforePlayerInteractWithBlocks} callback
   * @returns {(arg: BeforePlayerInteractWithBlocks) => void}
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
   * @param {BeforePlayerInteractWithBlocks} callback
   */
  unsubscribe(callback) {
    let index = isDuplicate(_listener, callback);
    if (index != -1) {
      _listener[index] = undefined;
      _listener.filter((c) => typeof c === "undefined").length == 0 ? (_listener = []) : 0;
    } else throw new Error("This function was not found.");
    if (isRunning && _listener.length == 0) {
      isRunning = false;
      //stop();
    }
    return callback;
  }
  constructor() {}
}
function start(){
    let runId = mc.world.beforeEvents.playerInteractWithBlock.subscribe((ev) => {
        if(!isRunning) mc.system.run(() =>{mc.world.beforeEvents.playerInteractWithBlock.unsubscribe(runId)});
        //const { faceLocationX, faceLocationY, blockFace } = ev;
        let player = new Player(ev.player);
        let cancel = (value) => {
            if (typeof value == "boolean") ev.cancel = value;
            else if (!value) ev.cancel = true;
        };
        let getItemStack = (itemStack) => {
          if (!itemStack) {
            if (!ev.itemStack?.typeId) return undefined;
            else return new ItemStack(ev.itemStack);
          }
          if (player instanceof Entity && itemStack instanceof ItemStack)
            player.getComponent().getInventory().container.setItem(0, itemStack);
          else if (player instanceof Player && itemStack instanceof ItemStack)
            player.getComponent().getInventory().container.setItem(player.selectedSlot, itemStack);
        };
        const interact  =  new IBeforePlayerInteractWithBlock();
        interact.getItemStack =   getItemStack;
        interact.itemStack = ev.itemStack;
        interact.player =  new Player(ev.player);
        interact.block  =  new Block(ev.block);
        interact.cancel =  cancel;

        _listener.forEach((f) => f(interact));
    });
}

export const playerInteractWithBlock = new BeforePlayerInteractWithBlock();
