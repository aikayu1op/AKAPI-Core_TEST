import { system } from "../System/index.js";
import { IPlayerJumpingEvents } from "./interface";
import { isDuplicate } from "./isDuplicate.js";

/**
 * @type {{function: Function,isMoment: Map<string, any>}[]}
 */
var _event = [];
/**
 * 一つ以上動く場合は、ここがTrueになります。
 */
let isRunning = false;
export class PlayerJumpingEvents{
    /**
     * イベントを登録します。 
     * @param {(callback: IPlayerJumpingEvents) => void} callback 
     * @throw 同じものが既に存在している場合にエラーをかえします。
     */
    subscribe(callback){
        if(isDuplicate(_event.map(x => x.function), callback) == -1 && typeof callback === "function")
            _event.push({
                function: callback,
                isMoment: new Map()
            });
        else throw new Error("This function has already subscribed.");
        if(!isRunning && _event.length >= 1){
            isRunning = true;
            start();
        }
        return callback;
    }
    /**
     * イベントを削除します。 
     * @param {(callback: IPlayerJumpingEvents) => void} callback 
     */
    unsubscribe(callback){
        let index = isDuplicate(_event.map(x => x.function), callback);
        if(index != -1){
            _event[index] = undefined;
            _event.filter(c => typeof c === "undefined").length == 0 ? _event = [] : 0
        }
        else throw new Error("This function was not found.")
        if(isRunning && _event.length == 0)
            isRunning = false;
        return callback;
    }
}
export const playerJump = new PlayerJumpingEvents();

/**
 * イベント登録数が1個以上の場合にイベントを監視するようにします。
 */
function start(){
    let runId = system.allPlayerTickSubscribe(({player}) =>{
        if(!isRunning) system.allPlayerTickUnSubscribe(runId)
        _event.forEach(f =>{
            if(player.isJumping){
                let isMoment = f.isMoment.has(player.id)? false : true;
                f.function(({player, isMoment}));
                f.isMoment.set(player.id, true);

            }else _event.forEach(p => p.isMoment.delete(player.id));
        });
    })
}