import { system } from "../../../../../index.js";
import Config from "../../Config/index.js";
import { Command } from "../../Main.js";

Command.register({
    cmd: "op",
    usage: ["player<string>","player<string> fakeOp<boolean>"],
    description: "指定したプレイヤーにオペレーターを設定します。",
    permission: true,
    execute: ev =>{
      const OP_MESSAGE = "§7§oYou are now op!";
      if(!ev.getPlayer(ev.args[0])){
        ev.sender.sendMessage(`§c指定したプレイヤーは現在いません。`);
        return;
      }
      let player = ev.getPlayer(ev.args[0]);
      if(ev.args[1]){
        player.sendMessage(OP_MESSAGE);
        return;
      }
      if(player.hasTag(Config.firstTag+Config.opTag)){
        ev.sender.sendMessage(`§c指定されたプレイヤーは既にopです。`);
        return;
      }
      system.run(() =>{
        player.addTag(Config.firstTag+Config.opTag);
        player.sendMessage(OP_MESSAGE);
      })
    }
  
  })