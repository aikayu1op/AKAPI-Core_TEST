import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { IBeforeChatEventSignal } from "./interface";

/**
 * @type {Function[]}
 */
var _listener = [];

/**
 * チャットイベントのデータが返ってきます。
 * @callback BeforeChatEventSignal
 * @param {IBeforeChatEventSignal} ev
 */

class BeforeChatEvents {
    /**
     * チャットを送信した際に発火しますが、送信する前の瞬間になるのでチャットのキャンセルが可能です。
     * @param {BeforeChatEventSignal} callback 
     * @returns {(arg: BeforeChatEventSignal) => void}
     */
     subscribe(callback){
        if(typeof callback == "function"){
            _listener.push(callback);
            return callback;
        }
    }
    /**
     * 登録されているイベントを削除します。
     * @param {BeforeChatEventSignal} callback 
     */
    unsubscribe(callback){
        if(typeof callback == "function") _listener = _listener.filter(f => f !== callback);
    }
}
mc.world.events.beforeChat.subscribe(ev =>{
    const { sender: s, message, sendToTargets, targets: t } = ev;
    let targets = [];
    t.forEach(x => targets.push(new Player(x)));
    const sender = new Player(s);
    let cancel = () => ev.cancel = true;
    _listener.forEach(f =>{
        f({sender, cancel, message, sendToTargets, targets});
    })
})

export const BeforeChat = new BeforeChatEvents();