import { system } from "../System/index.js";
import { IPlayerSneakingEvents } from "./interface";
import { isDuplicate } from "./isDuplicate.js";

/**
 * @type {{function: Function,isMoment: Map<string, any>,sneakTime: Map<string, number>}[]}
 */
var _event = [];
/**
 * 一つ以上動く場合は、ここがTrueになります。
 */
let isRunning = false;
export class PlayerSneakingEvents{
    /**
     * イベントを登録します。 
     * @param {(callback: IPlayerSneakingEvents) => void} callback 
     * @throw 同じものが既に存在している場合にエラーをかえします。
     */
    subscribe(callback){
        if(isDuplicate(_event, callback) == -1 && typeof callback === "function")
            _event.push({
                function: callback,
                isMoment: new Map(),
                sneakTime: new Map()
            });
        else throw new Error(`This function has already subscribed.`)
        if(!isRunning && _event.length >= 1){
            isRunning = true;
            start();
        }
        return callback;
    }
    /**
     * イベントを削除します。 
     * @param {(callback: IPlayerSneakingEvents) => void} callback 
     */
    unsubscribe(callback){
        let index = isDuplicate(_event.map(x => x.function), callback);
        if(index != -1)
            _event.splice(index, 1);
        else throw new Error("This function was not found.")
        if(isRunning && _event.length == 0)
            isRunning = false;
    }
}
export const playerSneak = new PlayerSneakingEvents();

/**
 * イベント登録数が1個以上の場合にイベントを監視するようにします。
 */
function start(){
    let runId = system.allPlayerTickSubscribe(({player}) =>{
        if(!isRunning) system.allPlayerTickUnSubscribe(runId);
        _event.forEach(f =>{
            if(player.isSneaking){
                let isMoment = f.isMoment.has(player.id)? false : true;
                let sneakTime = f.sneakTime.has(player.id)? (f.sneakTime.get(player.id) >= Number.MAX_SAFE_INTEGER? (f.sneakTime.set(player.id, 0), 0) : f.sneakTime.get(player.id)) : 0
                f.function(({player, isMoment, sneakTime}));
                f.isMoment.set(player.id, true)
                f.sneakTime.set(player.id, (f.sneakTime.has(player.id)? f.sneakTime.get(player.id) : 0) +1)

            }else _event.forEach(p => {
                p.isMoment.delete(player.id);
                p.sneakTime.set(player.id, 0);
            });
        });
    })
}