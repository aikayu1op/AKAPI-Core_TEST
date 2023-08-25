import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { Player } from "../Player/index.js";
import { IPlayerDeathEventSignal } from "./interface.js";

/**
 * 地面に右クリック、またはタップではタッチした瞬間に発火するイベントです。アイテムを持っていなくても発火させることが可能です。
 * @callback PlayerDeathEventSignal
 * @param {IPlayerDeathEventSignal} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];

var isRunning = false;
class PlayerDeathEvent{
    /**
     * @param {PlayerDeathEventSignal} callback
     * @returns {(arg: PlayerDeathEventSignal) => void}
     */
    subscribe(callback){
        if(isDuplicate(_listener, callback) == -1 && typeof callback === "function")
            _listener.push(callback);
        else throw new Error("This function has already subscribed.");
        if(!isRunning && _listener.length >= 1){
            isRunning = true;
            start();
        }
        return callback;
    }
    /**
     * イベントを停止します。
     * @param {PlayerDeathEventSignal} callback 
     */
    unsubscribe(callback){
        let index = isDuplicate(_listener, callback);
        if(index != -1){
            _listener[index] = undefined;
            _listener.filter(c => typeof c === "undefined").length == 0 ? _listener = [] : 0
        }
        else throw new Error("This function was not found.")
        if(isRunning && _listener.length == 0)
            isRunning = false;
        return callback;
    }
    constructor(){}
}
function start(){
    let runData = mc.world.afterEvents.entityDie.subscribe(ev =>{
        if(!isRunning) mc.world.afterEvents.entityDie.unsubscribe(runData);
        /*
        if(ev.hurtEntity.typeId != "minecraft:player") return;
        let player = new Player(ev.hurtEntity);
        let damagingEntity = new Entity(ev.damagingEntity);
        let projectile = new Entity(ev.projectile);
        let reason = ev.cause;
        let damage = ev.damage;
        if(player.getComponent().getHealth().getCurrent() <= 0) _listener.forEach(f => f({player, damagingEntity, projectile, reason, damage}));
        */
    })
}

export const playerDie = new PlayerDeathEvent();