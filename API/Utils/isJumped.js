import { system } from "../System/index.js";
import { Player } from "../Player/index.js";
import { world } from "../World/index.js";

/**
 * @type {Map<Player, number>}
 */
let saveLoc = new Map();
/**
 * @type {Map<Player, boolean>}
 */
export let jumped = new Map();
let count = 0;

system.runSchedule(() =>{
    world.getAllPlayers().forEach(p =>{
        count++;
    });
})