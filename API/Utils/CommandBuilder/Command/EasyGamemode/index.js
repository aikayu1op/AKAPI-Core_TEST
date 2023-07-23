import { Command } from "../../Main.js";

Command.register({
    cmd: "gmc",
    description: "クリエイティブモードにします。",
    permission: true,
    execute: ev =>{
        ev.sender.setGamemode("creative");
        ev.sender.sendMessage("クリエイティブに変更しました。");
    }
});
Command.register({
    cmd: "gms",
    description: "サバイバルモードにします。",
    permission: true,
    execute: ev =>{
        ev.sender.setGamemode("survival");
        ev.sender.sendMessage("サバイバルに変更しました。");
    }
})
Command.register({
    cmd: "gma",
    description: "アドベンチャーモードにします。",
    permission: true,
    execute: ev =>{
        ev.sender.setGamemode("adventure");
        ev.sender.sendMessage("アドベンチャーに変更しました。");
    }
})
Command.register({
    cmd: "gmspc",
    description: "スペクテイターモードにします。",
    permission: true,
    execute: ev =>{
        ev.sender.setGamemode("spectator");
        ev.sender.sendMessage("スペクテイターに変更しました。");
    }
})