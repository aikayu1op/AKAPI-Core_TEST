import { system } from "../../../../System/index.js";
import { world } from "../../../../World/index.js";
import { Time } from "../../../Time/index.js";
import { Command } from "../../index.js"; 

Command.register({
    cmd: "stop",
    description: "ワールドを強制的にシャットダウンさせます。",
    permission: true,
    execute: async () =>{
        world.getAllPlayers().forEach(p => p.runCommand(`kick ${p.name} サーバーを終了させました。`));
        await Time.sleep(1);
        system.close();
    }
})