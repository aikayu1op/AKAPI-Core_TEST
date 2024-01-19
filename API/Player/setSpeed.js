import { system } from "../System/index.js";

system.allPlayerTickSubscribe(ev =>{
    let plus = 0;
    if(ev.player.isSprinting) plus = 0.05;
    ev.player.getComponent().getMovement().setCurrentValue(ev.player.speed+plus);
})