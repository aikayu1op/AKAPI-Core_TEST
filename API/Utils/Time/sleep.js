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