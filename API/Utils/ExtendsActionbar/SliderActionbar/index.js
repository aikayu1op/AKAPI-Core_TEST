import { Player } from "../../../Player/index.js";
import { system } from "../../../System/index.js";
import { world } from "../../../World/index.js";

/**
 * @type {Map<number, Map<string, string>>}
 */
var slider = new Map();

/**
 * @type {Map<number, Map<string, number>>}
 */
var sliderTick = new Map();
/**
 * @type {Map<number, Map<string, boolean>>}
 */
var sliderFlash = new Map();


/**
 * 右から左へ流れるメッセージを作成します。
 * 
 * MultiLineActionbarを使用して実行します。
 */
export class SliderActionbar{
    
    /**
     * SliderActionbarを設定します。
     * @param {Player} player 
     * @param {string} id 
     * @param {string} message 
     */
    static setData(player, id, message){
        let fixed = `${" ".repeat(50)}${message}`;
        if(!slider.has(player.id)) slider.set(player.id, new Map().set(id, fixed));
        else slider.set(player.id, slider.get(player.id).set(id, fixed));
        if(!sliderTick.has(player.id)) sliderTick.set(player.id, new Map().set(id, 0));
        else sliderTick.set(player.id, sliderTick.get(player.id).set(id, 0));
        if(!sliderFlash.has(player.id)) sliderFlash.set(player.id, new Map().set(id, false));
        else sliderFlash.set(player.id, sliderFlash.get(player.id).set(id, false));
    }
}
system.runSchedule(() =>{
    for(const p of world.getAllPlayers()){
        if(!slider.has(p.id)) continue;
        let sliderData = slider.get(p.id);
        let getTick = sliderTick.get(p.id);
        let getFlash = sliderFlash.get(p.id);
        for(const data of sliderData.keys()){
            sliderData.set(data, sliderData.get(data).slice(1)+" ");
            if(getTick.get(data) % 4 == 0) getFlash.set(data, getFlash.get(data) ? false : true);
            if(getFlash.get(data)) p.setMultiLineActionbar(data, `§l§e${sliderData.get(data).slice(1)}§r `.substring(0,50));
            else p.setMultiLineActionbar(data, `§r§l${sliderData.get(data).slice(1)} `.substring(0, 50));
            if(getTick.get(data) <= sliderData.get(data).length) getTick.set(data, getTick.get(data)+1);
            else{
                p.deleteMultiLineActionbar(data); 
                sliderData.delete(data);
                getTick.delete(data);
            }
            
        }
    }
},2)