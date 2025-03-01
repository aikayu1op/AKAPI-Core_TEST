import { Command } from "../../Main.js";

Command.register({
    cmd: "reload",
    usage: ["all<string>"],
    description: "すべてのスクリプトをリロードします。\nもしもallを引数にいれるとワールドをリロードします。",
    permission: true,
    execute: cmd =>{
        cmd.sender.runCommand(`reload${!cmd.args[0]?"":" "+cmd.args[0]}`);
    }
})