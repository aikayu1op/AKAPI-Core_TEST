import { system } from "../System/index.js";
import { world } from "../World/index.js";
import { IPlayerMoveEventSignal } from "./interface.js";
import { isDuplicate } from "./isDuplicate.js";

/**
 *
 * @callback PlayerMoveEventSignal
 * @param {IPlayerMoveEventSignal} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
var isRunning = false;
/**
 * プレイヤーが動いた際に吐くイベント
 */
class PlayerMoveEvent{
    /**
     * @param {PlayerMoveEventSignal} callback
     * @returns {(arg: PlayerMoveEventSignal) => void}
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
     * @param {PlayerMoveEventSignal} callback 
     */
    unsubscribe(callback){
        let index = isDuplicate(_listener, callback);
        if(index != -1){
            _listener[index] = undefined;
            _listener.filter(c => typeof c === "undefined").length == 0 ? _listener = [] : 0
        }
        else throw new Error("This function was not found.")
        if(isRunning && _listener.length == 0){
            isRunning = false;
            //stop();
        }
        return callback;
    }
    constructor(){}
}
export const playerMove = new PlayerMoveEvent();
/**
 * イベント登録数が1個以上の場合にイベントを監視するようにします。
 */
function start(){
    let runId = system.allPlayerTickSubscribe(({player}) =>{
        if(!isRunning) system.allPlayerTickUnSubscribe(runId);
        if(player.getVelocity().isZero) return;
        let getVelocity = () => player.getVelocity();
        let getLocation = () => player.location;
        let dimension = player.dimension;
        _listener.forEach(f => f({player, getVelocity, getLocation, dimension}));
    })
}