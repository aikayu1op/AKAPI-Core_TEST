import { Command } from "../CommandBuilder/index.js";

let author = "";
let allplugins = "";
let errorlist = [];
let minus = 0;
export class Plugins {
  /**
   * プラグインを読み込みます。
   * @param {string[]} filenames
   * @param {boolean} debug 読み込んだプラグインを表示します。
   */
  static register(filenames, debug = false) {
    for (const data of filenames) {
      const filename = data.split(",");
      if (data.includes("author: ")) author = data.split(":")[1].trim();
      else if (filename.length == 2) {
        let time = Date.now();
        import(`../../../../../${filename[0]}.js`)
          .then(() => {
            let now = Date.now();
            allplugins += `§a${filename[0]} ver${filename[1]} §f${now - time - minus}ms\n`;
            minus = now - time;
            if(debug) console.warn("load plugins: "+filename[0]);
          })
          .catch((e) => {
            allplugins += `§4${filename[0]} ver${filename[1]} §f-1ms\n`;
            let list = JSON.stringify({
              name: filename,
              err: `${e}\n${String(e.stack)}`,
            });
            errorlist.push(list);
          });
      } else {
        let time = Date.now();
        import(`../../../../../${data}`)
          .then(() => {
            let now = Date.now();
            allplugins += `§a${data} ver? §f${now - time - minus}ms\n`;
            minus = now - time;
          })
          .catch((e) => {
            allplugins += `§4${data} ver? §f-1ms\n`;
            let list = JSON.stringify({
              name: filename,
              err: `${e}`,
            });
            errorlist.push(list);
          });
      }
    }
  }
}

Command.register({
  cmd: "plugins",
  usage: ['"checkMode: <string>"'],
  description: "プラグインマネージャーを開きます。",
  permission: true,
  execute: (ev) => {
    switch (ev.args[0]) {
      case "list": {
        ev.sender.sendMessage(`PluginList\n---------------------\n${allplugins}§f---------------------`);
        ev.sender.sendMessage(`author: ${author}\n---------------------`);
        break;
      }
      case "elist":
      case "e": {
        ev.sender.sendMessage("ErrorList--------------------\n");
        if (errorlist.length == 0) ev.sender.sendMessage("\n              No error.");
        else {
          for (const err of errorlist) {
            const data = JSON.parse(err);
            ev.sender.sendMessage(`Plugin: ${data.name}\n   ${data.err}\n`);
          }
        }
        ev.sender.sendMessage("\n----------------------------");
        break;
      }
      default: {
        ev.sender.sendMessage(`PluginList\n---------------------\n${allplugins}§f---------------------`)
        ev.sender.sendMessage(`author: ${author}\n---------------------`);
        break;
      }
    }
  },
});