import { Command } from "../../index.js";

Command.register({
  cmd: "cc",
  usage: [],
  description: "チャットのログをすべて削除します。",
  permission: false,
  execute: ev =>{
    for(let i = 0; i < 100; i++) ev.sender.sendMessage(" ");
    ev.sender.sendMessage("チャットをクリアしました。");
  }
})