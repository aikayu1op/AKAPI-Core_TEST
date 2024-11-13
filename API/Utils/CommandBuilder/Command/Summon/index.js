import { EntityTypes } from "@minecraft/server";
import { Command } from "../../Main.js";

Command.register({
    cmd: "summon",
    usage: ["entityType<string>"],
    description: "指定したエンティティを召喚します。",
    permission: true,
    execute: (cmd) => {
        if(!cmd.args[0]){
            cmd.sender.sendMessage("§c実行できません。");
            return;
        }else if(cmd.args[0] == "list"){
            cmd.sender.sendMessage("§7現在のエンティティ一覧:");
            cmd.sender.sendMessage(EntityTypes.getAll().map(x => x.id).sort().join("\n"));
            cmd.sender.sendMessage("§7--------------------------------------");
            return;
        }
        cmd.sender.dimension.spawnEntity(cmd.args[0].includes("minecraft:")?cmd.args[0]:"minecraft:"+cmd.args[0], cmd.sender.location);
    }
})