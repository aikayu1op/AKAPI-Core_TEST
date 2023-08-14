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
class PlayerDeathEvent{
    /**
     * @param {PlayerDeathEventSignal} callback
     * @returns {(arg: PlayerDeathEventSignal) => void}
     */
    subscribe(callback){
        if(typeof callback == "function"){
            _listener.push(callback);
            return callback;
        }
    }
    /**
     * イベントを停止します。
     * @param {PlayerDeathEventSignal} callback 
     */
    unsubscribe(callback){
        if(typeof callback == "function") _listener = _listener.filter(f => f !== callback);
    }
    constructor(){}
}
mc.world.afterEvents.entityHurt.subscribe(ev =>{
    if(ev.hurtEntity.typeId != "minecraft:player") return;
    let player = new Player(ev.hurtEntity);
    let damagingEntity = new Entity(ev.damagingEntity);
    let projectile = new Entity(ev.projectile);
    let reason = ev.cause;
    let damage = ev.damage;
    if(player.getComponent().getHealth().getCurrent() <= 0) _listener.forEach(f => f({player, damagingEntity, projectile, reason, damage}));
})

export const playerDie = new PlayerDeathEvent();