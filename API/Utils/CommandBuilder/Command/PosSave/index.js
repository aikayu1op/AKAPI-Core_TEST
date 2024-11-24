import { Command } from "../../Main.js";

for(let i = 1; i < 3; i++){
    Command.register({
        cmd: `pos${i}`,
        description: `現在の座標をPos${i}に保存します。`,
        permission: true,
        execute: cmd => cmd.sender["pos"+i] = cmd.sender.location.floor()
    })
}

Command.register({
    cmd: "posdel",
    description: "pos1,pos2共に削除します。",
    permission: true,
    execute: cmd => {
        for(let i = 1; i < 3; i++) cmd.sender["pos"+i] = undefined;
        cmd.sender.sendMessage("現在の座標をすべて削除しました。");
    }
})