import { Command } from "../../Main.js";

Command.register({
    cmd: "nv",
    description: "暗視を切り替えれます。",
    permission: true,
    execute: cmd =>{
        const EFFECT_NAME = "night_vision";
        if(cmd.sender.removeEffect(EFFECT_NAME)) cmd.sender.sendMessage("暗視を削除しました。");
        else{
            cmd.sender.addEffect(EFFECT_NAME, 20000000, {showParticles: false});
            cmd.sender.sendMessage("暗視を付与しました。");
        }
    }
})