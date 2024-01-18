import { isDuplicate } from "../AfterEvents/isDuplicate.js";
import { system } from "../System/index.js";
import { IBeforePlayerEmotingEventSignal } from "./interface.js";

/**
 * イベント一覧
 * @type {Function[]}
 */
var _listener = [];
/**
 * 実行状態
 */
var isRunning = false;
class PlayerEmoting{
    /**
     * 
     * @param {(args: IBeforePlayerEmotingEventSignal) => void} callback 
     */
    subscribe(callback){
        if(isDuplicate(_listener, callback) != -1) throw new Error("This function has already subscribed.");
        !isRunning?(isRunning = true,start()):0
        _listener.push(callback);
    }
    /**
     * 
     * @param {(args: IBeforePlayerEmotingEventSignal) => void} callback
     */
    unsubscribe(callback){
        if(!isRunning) throw new Error("Not a single event was registered.");
        let check = isDuplicate(_listener, callback);
        if(check == -1) throw new Error("This function has not subscribed.");
        _listener.splice(check, 1);
        if(isRunning && _listener.length == 0) isRunning = false;

    }
}
export const playerEmoting = new PlayerEmoting();

function start(){
    let run1 = system.allPlayerTickSubscribe(ev =>{
        !isRunning?system.allPlayerTickUnSubscribe(run1):null
        if(!ev.player.isEmoting) return;
        let player = ev.player;
        let cancel = () => ev.player.playAnimation("animation.player.sleeping", {blendOutTime: 1});
        _listener.forEach(f => f({player, cancel}));
    })
}