import { isDuplicate } from "../AfterEvents/isDuplicate";
import { system } from "../System/index.js";
import { IBeforePlayerMoveEventSignal } from "./interface";

/**
 * イベント一覧
 * @type {Function[]}
 */
var _listener = [];
/**
 * 動く前の座標
 * @type {Map<string, {location: import("../Vector").Vector,rotation: import("../Vector").Vector2}>}
 */
var _beforeLoc = new Map();
/**
 * 実行状態
 */
var isRunning = false;

class BeforePlayerMoveEvent{
    /**
     * 
     * @param {(args: IBeforePlayerMoveEventSignal) => void} callback 
     */
    subscribe(callback){
        if(isDuplicate(_listener, callback) != -1) throw new Error("This function has already subscribed.");
        !isRunning?(isRunning = true,start()):0
        _listener.push(callback);
    }
    /**
     * 
     * @param {(args: IBeforePlayerMoveEventSignal) => void} callback
     */
    unsubscribe(callback){
        if(!isRunning) throw new Error("Not a single event was registered.");
        let check = isDuplicate(_listener, callback);
        if(check == -1) throw new Error("This function has not subscribed.");
        _listener.splice(check, 1);
        if(isRunning && _listener.length == 0) isRunning = false;

    }
}

function start(){
    let run1 = system.allPlayerTickSubscribe(ev =>{
        !isRunning?system.allPlayerTickUnSubscribe(run1):null
        if(ev.player.getVelocity().isZero) _beforeLoc.set(ev.player.id, {location:ev.player.location,rotation:ev.player.rotation})
        else{
            let player = ev.player;
            let cancel = () => player.location = _beforeLoc.has(player.id)?_beforeLoc.get(player.id).location:player.location;
            _listener.forEach(f => f({player, cancel}));
        }
    })
}

export const playerMove = new BeforePlayerMoveEvent();