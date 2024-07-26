import { Command } from "../../Main.js";

Command.register({
    cmd: "tp",
    usage: ["playerName<string>", "playerName<string> toPlayer<string>"],
    description: "指定されたPlayerにtpします(省略可)",
    permission: true,
    execute: cmd =>{
        let player = cmd.getPlayer(cmd.args[0]);
        if(!player){
            cmd.sender.sendMessage(`§c指定したプレイヤーは存在しません。`);
            return;
        }
        if(!cmd.args[1]){
                cmd.sender.location = player.location;
                cmd.sender.sendMessage(`${player.name}にテレポートしました。`);
        }else{
            let toPlayer = cmd.getPlayer(cmd.args[1]);
            if(!toPlayer){
                cmd.sender.sendMessage(`§c指定したプレイヤーは存在しません。`);
                return;
            }
            player.location = toPlayer.location;
            cmd.sender.sendMessage(`${player.name}を${toPlayer.name}にテレポートさせました。`);
        }
    }
})