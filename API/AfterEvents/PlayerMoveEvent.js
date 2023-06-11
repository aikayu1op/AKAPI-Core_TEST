import { system } from "../System/index.js";
import { world } from "../World/index.js";
import { IPlayerMoveEventSignal } from "./interface.js";

/**
 *
 * @callback PlayerMoveEventSignal
 * @param {IPlayerMoveEventSignal} ev
 */

/**
 * @type {Function[]}
 */
var _listener = [];
/**
 * プレイヤーが動いた際に吐くイベント
 */
class PlayerMoveEvent{
    /**
     * @param {PlayerMoveEventSignal} callback
     * @returns {(arg: PlayerMoveEventSignal) => void}
     */
    subscribe(callback){
        if(typeof callback == "function"){
            _listener.push(callback);
            return callback;
        }
    }
    /**
     * イベントを停止します。
     * @param {PlayerMoveEventSignal} callback 
     */
    unsubscribe(callback){
        if(typeof callback == "function") _listener = _listener.filter(f => f !== callback);
    }
    constructor(){}
}
export const PlayerMove = new PlayerMoveEvent();

system.run(function move(){
    system.run(move);
    for(const player of world.getAllPlayers()){
        if(player.getVelocity().isZero) continue;
        let getVelocity = () => player.getVelocity();
        let getLocation = () => player.location;
        let dimension = player.dimension;
        _listener.forEach(f => f({player, getVelocity, getLocation, dimension}));
    }
})