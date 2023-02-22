import * as mc from "@minecraft/server";

class System{
    constructor(){}
    /**
     * @type {number}
     * @readonly
     */
    currentTick = mc.system.currentTick;
    /**
     * @readonly
     */
    events = mc.system.events;
    /**
     * 登録しているRunイベントを終了します。
     * @param {number} runId 
     */
    clearRun(runId){
        mc.system.clearRun(runId);
    }
    /**
     * 登録しているrunScheduleイベントを終了します。
     * @param {number} runScheduleId 
     */
    clearRunSchedule(runScheduleId){
        mc.system.clearRunSchedule(runScheduleId);
    }
    /**
     * callback関数を1tickごとに動かす際に使用します。
     * ただし、このままだと1回しか実行できないので、関数内にも定義する必要があります。
     * @example
     * ```
     * import { system } from "./AKAPI-core/index.js";
     * 
     * system.run(function test(){
     *    system.run(test);
     *    //code here.
     * })
     * ```
     * @param {Function<void>} callback 
     */
    run(callback){
        mc.system.run(callback);
    }
    /**
     * callback関数をdelayTicksごとに動かす際に使用します。
     * この関数は、イベントに登録されるので常に実行します。
     * @example
     * ```
     * import { system } from "./AKAPI-core/index.js";
     * 
     * system.runSchedule(() =>{
     *    //code here.
     * }, 1)
     * ```
     * @param {Function<void>} callback 
     * @param {number} delayTicks 
     */
    runSchedule(callback, delayTicks = 0){
        mc.system.runSchedule(callback, delayTicks)
    }
}
export const system = new System();