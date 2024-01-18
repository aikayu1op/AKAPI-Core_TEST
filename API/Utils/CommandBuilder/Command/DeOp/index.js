import { Command } from "../../Main.js";

Command.register({
    cmd: "deop",
    usage: ["player<string>"],
    description: "指定したプレイヤーの権限を剥奪します。",
    permission: true,
    execute: ev =>{
        const player = ev.getPlayer(ev.args[0]);
        if(!player){
            ev.sender.sendMessage("§c指定したプレイヤーは現在いません。");
            return;
        }
        if(player.removeTag(Command.getConfig().firstTag+Command.getConfig().opTag)){
            player.sendMessage("§7You are no longer op!");
            ev.sender.sendMessage(`${player.name}の権限を剥奪しました。`);
            return;
        }
        ev.sender.sendMessage("§c指定したプレイヤーは既に権限を剥奪されているか、所持していません。");
    }
})