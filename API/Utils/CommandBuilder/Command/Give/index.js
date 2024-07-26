import { ItemStack } from "../../../../ItemStack/ItemStack.js";
import { Command } from "../../Main.js";

Command.register({
    cmd: "give",
    usage: ["player<string> itemName<string> amount<number>"],
    description: "アイテムを与えます。",
    permission: true,
    execute: cmd =>{
        try{
            let player = cmd.getPlayer(cmd.args[0]);
            if(!player){
                cmd.sender.sendMessage("§cプレイヤーが見つかりませんでした。");
                return;
            }
            if(!cmd.args[1].includes("minecraft:")) cmd.args[1] = "minecraft:"+cmd.args[1];
            const item = new ItemStack(cmd.args[1]);
            if(cmd.args[2] > item.maxAmount){
                cmd.sender.sendMessage("§c個数に不正な値を入れないでください");
                return;
            }
            if(cmd.args[2] == 0 || !cmd.args[2]) cmd.args[2] = 1;
            item.amount = cmd.args[2];
            player.getComponent().getInventory().container.addItem(item);
            cmd.sender.sendMessage(`${player.name}に${item.typeId.split(":")[1]}を${item.amount}個与えました。`);
        }catch{ cmd.sender.sendMessage("§cアイテムが見つかりません。") }
    }
})