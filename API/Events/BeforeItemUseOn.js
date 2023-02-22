import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { BlockLocation } from "../Location/BlockLocation.js";
import { Player } from "../Player/index.js";
import { IBeforeItemUseOnEventSignal } from "./interface";


/**
 * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。アイテムを持っていなくても発火させることが可能です。
 * @callback BeforeItemUseOnEventSignal
 * @param {IBeforeItemUseOnEventSignal} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
export class BeforeItemUseOnEvent{
    /**
     * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。
     * アイテムを持っていなくても発火させることが可能です。
     * @param {BeforeItemUseOnEventSignal} callback
     * @returns {(arg: BeforeItemUseOnEventSignal) => void}
     */
    subscribe(callback){
        if(typeof callback == "function"){
            _listener.push(callback);
            return callback;
        }
    }
    /**
     * イベントを停止します。
     * @param {BeforeItemUseOnEventSignal} callback 
     */
    unsubscribe(callback){
        if(typeof callback == "function") _listener = _listener.filter(f => f !== callback);
    }
    constructor(){}
}
mc.world.events.beforeItemUseOn.subscribe(ev =>{
    const {faceLocationX, faceLocationY, blockFace} = ev;
    let source;
    if(ev.source.typeId == "minecraft:player") source = new Player(ev.source);
    else source = new Entity(source);
    let cancel = () => ev.cancel = true;
    let item = (itemStack) =>{
        if(!itemStack){
            if(!ev.item?.typeId) return undefined;
            else return new ItemStack(ev.item);
        }
        if(source instanceof Entity && itemStack instanceof ItemStack) source.getComponent().getInventory().container.setItem(0, itemStack);
        else if(source instanceof Player && itemStack instanceof ItemStack) source.getComponent().getInventory().container.setItem(source.SelectedSlot(), itemStack);
    }
    let blockLocation = new BlockLocation(ev.blockLocation);
    _listener.forEach(f => f({source, blockLocation, cancel, item, faceLocationX, faceLocationY, blockFace}))

});

export const BeforeItemUseOn = new BeforeItemUseOnEvent();