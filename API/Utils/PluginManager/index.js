import { system } from "../../System/index.js";
import { Command } from "../CommandBuilder/index.js";

let author = "";
let allplugins = "";
let errorlist = [];
let minus = 0;
let index = 0;
/** @type {string[]} */
let files;
let pluginFolder = {};
export class Plugins {
  /**
   * プラグインを読み込みます。フォルダの名前がAPIと最後についている場合は、APIとして読み込み、getやgetAllで呼び出せるようになります。
   * 
   * この際プラグインのクラスは、フォルダ名と同じ名前で且つ、index.jsでエクスポートされている必要があります。
   * 
   * 
   * 読み込んだプラグインは、Plugins.get("フォルダ名")で取得できます。
   * @param {string[]} filenames
   * @param {boolean} debug 読み込んだプラグインを表示します。
   */
  static register(filenames, debug = false) {
    files = filenames;
    let loadPlugins = system.runInterval(() =>{
      const data = files[index];
      if(!data){
        system.clearRun(loadPlugins);
        return;
      }
      const filename = data.split(",");
      if (data.includes("author: ")) author = data.split(":")[1].trim();
      else if (filename.length == 2) {
        let time = Date.now();
        // APIとして読み込むかどうか
        let isAPI = filename[0].endsWith("API");
        import(`../../../../../${filename[0]}/index.js`)
        .then((plugin) => {
          let now = Date.now();
          if(isAPI){
            pluginFolder[filename[0]] = plugin[filename[0]];
            pluginFolder[filename[0]].version = filename[1];
          }
          allplugins += `§a${filename[0]} ver${filename[1]} §f${now - time}ms\n`;
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
        import(`../../../../../${data}/index.js`)
        .then(() => {
          let now = Date.now();
          allplugins += `§a${data} ver? §f${now - time}ms\n`;
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
      index++;
    })
  }
  /**
   * 
   * @param {string} pluginName 
   * @returns {boolean}
   * @description 指定したプラグインが存在するかどうかを確認します。
   */
  static isExist(pluginName){
    return pluginFolder.hasOwnProperty(pluginName);
  }
  /**
   * @description 指定したプラグインを取得します。
   * @param {string} pluginName 
   * @returns {Class}
   */
  static get(pluginName){
      if(!pluginFolder[pluginName]) throw new Error(`Plugin ${pluginName} is not found.`);
      return pluginFolder[pluginName];
  }
  /**
   * 
   * @returns {string[]}
   * @description 登録されている全てのプラグインの名前を取得します。
   */
  static getAll(){
      return Object.entries(pluginFolder).map(([name, _]) => name);
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