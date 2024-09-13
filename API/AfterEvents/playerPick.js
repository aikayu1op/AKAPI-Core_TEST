import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Player, system } from "../../index.js";
import { IPlayerPickEvent } from "./interface.js";
import { isDuplicate } from "./isDuplicate.js";

/**
 * @type {Map<string, ItemStack[]>}
 */
const inventory = new Map();

/**
 * @type {Function[]}
 */
var _listener = [];
var isRunning = false;
/**
 * プレイヤーがアイテムを取得したときに発生するイベント
 */
class PlayerPickEvent{
    /**
     * @param {(arg: IPlayerPickEvent) => void} callback
     * @returns {(arg: IPlayerPickEvent) => void}
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
     * @param {} callback 
     */
    unsubscribe(callback){
        let index = isDuplicate(_listener,callback);
          if (index != -1) _listener.splice(index, 1);
          else throw new Error("This function was not found.");
          if (isRunning && _listener.length == 0) isRunning = false;
        return callback;
    }
    constructor(){}
}
export const playerPick = new PlayerPickEvent();

function start(){
    let event1 = mc.world.beforeEvents.entityRemove.subscribe(ev =>{
        const entity = new Entity(ev.removedEntity);
        const comp = entity.getComponent().getEntityItem();
        if(!comp.hasComponent()) return;
        mc.world.getAllPlayers().forEach(p =>{
            let player = new Player(p);
            let index = -1;
            let lastIndex = 0;
            let invIndex = [];
            const beforeInv = inventory.get(player.id).filter(x => x?.typeId === comp.itemStack.typeId && x?.nameTag === comp.itemStack.nameTag);
            const invComp = player.getComponent().getInventory().container.getAllItems().filter((x,i) => {
                if(x?.typeId === comp.itemStack.typeId && x?.nameTag === comp.itemStack.nameTag){
                    invIndex.push(i);
                    lastIndex = i;
                    return true;
                }
            });
            const isPlayer =  invComp.length != beforeInv.length || (!invComp.every((x,i) =>{
                if(beforeInv[i].amount === x.amount){ index = invIndex[i]; return true;}
            }));
            if(isPlayer){
                _listener.forEach(f => f({player, item: comp.itemStack, index: (index==-1?lastIndex:index)}));
                return;
            }
        });
    });

    let event2 = system.allPlayerTickSubscribe(({player}) =>{
        if(!isRunning){
            mc.world.beforeEvents.entityRemove.unsubscribe(event1);
            system.allPlayerTickUnSubscribe(event2);
        }
        inventory.set(player.id, player.getComponent().getInventory().container.getAllItems());
    });
}