import { world } from "../../../index.js";
import { system } from "../../System/index.js";

/**
 * 指定された時間Sleepをかけます。
 * @param {number} ticks
 */
export function sleep(ticks){
    return new Promise((resolve, reject) =>{
        system.runTimeout(resolve, ticks)
    })
}
/**
 * 指定された時間Sleepをかけます(Nativeベース)
 * @param {number} ms 
 */
export function nativeSleep(ms){
    /*return new Promise((resolve, reject) =>{
        let a = new Date().getTime();
        for(let i = 0; i < 2; i++){
            let b = new Date().getTime();
            if(i == 2){
                //world.sendMessage(`${b}\n${a}`);
                if(b - a <= ms) break;
                //yield i = 0;
            }
        }
        resolve();
    })*/
}