import { Command } from "../../Main.js";
import * as UI from "../../../../../UI/index.js";
import { ItemQueryOptions } from "../../../../Interfaces/ItemQueryOptions.js";
import { system } from "../../../../../index.js";

Command.register({
    cmd: "seeinv",
    usage: ["playerName<string>", "playerName<string> withEmpty<boolean>"],
    description: "指定したプレイヤーのインベントリの内容を取得します。",
    permission: true,
    execute: cmd =>{
        const getPlayer = cmd.getPlayer(cmd.args[0]);
        if(!getPlayer){
            cmd.sender.sendMessage("§c指定したプレイヤーは存在しません。もう一度入力してください。");
            return;
        }
        const form = new UI.ChestFormData("36")
        .title(`${getPlayer.name}`);
        const options = new ItemQueryOptions();
        options.withEmpty = false;
        options.location.hotbar.isChecked = true;
        options.location.inventory.isChecked = true;
        options.location.inventory.amount = 64;
        cmd.sender.sendMessage(JSON.stringify(options));
        getPlayer.getComponent().getInventory().container.getAllItems(options).forEach((item, i) =>{
            if(!!item) form.button(i, item?.nameTag??item.typeId.replace("minecraft:", ""), [""], `textures/items/${item.typeId.replace("minecraft:", "")}`, item.amount, false)
        });
        cmd.sender.sendMessage("チャットを閉じてください。");
        system.run(async function force(){
            const response = await form.show(cmd.sender);
            if(response.cancelationReason === "UserBusy"){
                force();
                return;
            }
            if(response.canceled) return;
        });
    }
})