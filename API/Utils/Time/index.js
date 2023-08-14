import { sleep as s, nativeSleep as ns } from "./sleep.js";

export class Time{
    /**
     * 指定した時間停止します。(マイクラのtickを使用します。)
     * @param {number} ticks
     */
    static sleep(ticks){
        return s(ticks);
    }
    /**
     * @deprecated
     * @param {number} ms 
     * @returns 
     */
    static nativeSleep(ms){
        return ns(ms);
    }
}