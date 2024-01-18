import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Player } from "../Player/index.js";
import { IBeforePlayerBreakBlock } from "./interface.js"
import { Block } from "../Block/Block.js";
import { isDuplicate } from "../AfterEvents/isDuplicate.js";
import { Dimension } from "../Dimension/index.js";

/**
 * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。アイテムを持っていなくても発火させることが可能です。
 * @callback BeforePlayerBreakBlocks
 * @param {IBeforePlayerBreakBlock} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
var isRunning = false;
export class BeforePlayerBreakBlock {
  /**
   * ブロックに対して右クリック、またはタップではタッチした瞬間に発火するイベントです。
   * アイテムを持っていなくても発火させることが可能です。
   * @param {BeforePlayerBreakBlocks} callback
   * @returns {(arg: BeforePlayerBreakBlocks) => void}
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
   * @param {BeforePlayerBreakBlocks} callback
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
    let runId = mc.world.beforeEvents.playerBreakBlock.subscribe((ev) => {
        if(!isRunning) mc.system.run(() =>{mc.world.beforeEvents.playerBreakBlock.unsubscribe(runId)});
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
        const breakBlock  =  new IBeforePlayerBreakBlock();
        breakBlock.getItemStack =   getItemStack;
        breakBlock.itemStack = ev.itemStack;
        breakBlock.player =  new Player(ev.player);
        breakBlock.block  =  new Block(ev.block);
        breakBlock.dimension = new Dimension(ev.dimension);
        breakBlock.cancel =  cancel;

        _listener.forEach((f) => f(breakBlock));
    });
}

export const playerBreakBlock = new BeforePlayerBreakBlock();
