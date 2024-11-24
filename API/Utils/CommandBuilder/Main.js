import { system, world } from "../../../index.js";
import { IBuilderObject } from "./Object/BuilderObject.js";
import Config from "./Config/index.js";
import { Player } from "../../Player/index.js";
import { ExecuteObject } from "./Object/ExecuteObject.js";
import { MessageBuilderData } from "../../BeforeEvents/Data/MessageBuilderData.js";
// 必要正規表現 \s+(?=(?:[^"]*"[^"]*")*[^"]*$)]

/** @type {Map<string, string>} */
var _showPlayerMsg = new Map();
/** @type {Function[]} */
var _messageCallback = [];

/**
 * @callback ExecuteCallback
 * @param {ExecuteObject} ev
 * @callback MessageExecuteCallback
 * @param {import("./Object/MessageObject.js").MessageObject} ev2
 */

/**
 * @type {Map<string, IBuilderObject>}
 */
var cmdData = new Map();

export class Command {
  /**
   * コマンドを追加できます。
   * 
   *
   * @example
   * ```
   * Command.register({
   *   cmd: "test",
   *   usage: ["player<string> count<number> message<string>","player<string> message<string>"],
   *   description: "入力された文字を繰り返します。",
   *   permission: false,
   *   execute: (ev) =>{
   *      if(!!ev.getPlayer(ev.args[0])){
   *       if(typeof ev.args[1] === "number")
   *        for(let i = 0; i < ev.args[1]; i++) ev.getPlayer(ev.args[0]).sendMessage(ev.args[2]);
   *       else ev.getPlayer(ev.args[0]).sendMessage(ev.args[1]);
   *   }else ev.sender.sendMessage(`§c指定されたプレイヤー"${ev.args[0]}"は見つかりませんでした。`);
   * })
   * ```
   * @param {IBuilderObject} obj
   */
  static register(obj) {
    let count = 3;
    if (!obj.hasOwnProperty("permission")) obj.permission = false;
    if (!obj.hasOwnProperty("description")) obj.description = "";
    if (!obj.hasOwnProperty("usage")) obj.usage = [""];
    if (obj.hasOwnProperty("cmd") && typeof obj.cmd === "string") count++;
    if (obj.hasOwnProperty("execute") && typeof obj.execute === "function") count++;
    if (
      obj.hasOwnProperty("cmd") &&
      obj.hasOwnProperty("usage") &&
      obj.hasOwnProperty("description") &&
      obj.hasOwnProperty("execute") &&
      obj.hasOwnProperty("permission")
    ){
      cmdData.set(obj.cmd, obj);
    }
    else
      throw `[${
        this._data.cmd ?? "undefined"
      }] The expected number of arguments is 5, but the returned value is ${count}`;
  }
  /**
   * 現在のコンフィグを取得します。
   */
  static getConfig(){
    return Config;
  }
  /**
   * @type {IBuilderObject}
   * @private
   */
  _data = {};
  /**
   * コマンドを指定します。
   * @param {string} cmdId
   */
  setCommand(cmdId) {
    if (typeof cmdId === "string") this._data.cmd = cmdId;
    return this;
  }
  /**
   * コマンドの使い方について設定できます。
   * @param  {...string} usage
   */
  setUsage(...usage) {
    if (usage.every((x) => typeof x === "string")) this._data.usage = usage;
    return this;
  }
  /**
   * コマンドの説明文について設定できます。
   * @param {string} description
   */
  setDescription(description) {
    if (typeof description === "string") this._data.description = description;
    return this;
  }
  /**
   * コマンドを入力した際に実行できます。
   * @param {ExecuteCallback} execute
   */
  setExecute(execute) {
    if (typeof execute === "function") this._data.execute = execute;
    return this;
  }
  /**
   * コマンドのパーミッションを指定できます。
   *
   * String型の場合は指定したパーミッションからプレイヤーを取得し、実行します。
   *
   * Boolean型場合はopかどうかをプレイヤーから取得し、実行します。
   * @param {boolean | string} permission
   */
  setPermission(permission = false) {
    if (typeof permission == "boolean" || typeof permission == "string") this._data.permission = permission;
    return this;
  }
  setData() {
    let count = 3;
    if (!this._data.permission) this._data.permission = false;
    if (!this._data.description) this._data.description = "";
    if (!this._data.usage) this._data.usage = [""];
    if (!!this._data.cmd && typeof this._data.cmd === "string") count++;
    if (!!this._data.execute && typeof this._data.execute === "function") count++;
    if (
      this._data.hasOwnProperty("cmd") &&
      this._data.hasOwnProperty("usage") &&
      this._data.hasOwnProperty("description") &&
      this._data.hasOwnProperty("execute")
    )
      cmdData.set(this._data.cmd, this._data);
    else
      throw `[${
        this._data.cmd ?? "undefined"
      }] The expected number of arguments is 5, but the returned value is ${count}`;
  }

  /**
   * コマンドのデータを取得
   * @deprecated
   */
  static getCmdData() {
    return cmdData;
  }

  constructor() {}
}

world.beforeEvents.mc.chatSend.subscribe((ev) => {
  let player = ev.sender;
  const message = ev.message;
  let sender = new Player(player);
  const getPlayers = (name) => {
    return world.getPlayers().filter((x) => x.name.toLowerCase().startsWith(name?.toLowerCase()));
  };
  const getPlayer = (name) => {
    return getPlayers(name?.toLowerCase())[0];
  };
  ev.cancel = true;
  let isCommand = false;
  if (ev.message.startsWith(Config.commandPrefix)) {
    const regex = /\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    let [cmd, ...arg] = message.substring(1).split(regex);
    isCommand = true;
    if(cmd == "execute" && player.hasTag(Config.firstTag+Config.opTag)){
      let executePlayer = getPlayer(arg[0]);
      if(!executePlayer){
        player.sendMessage("Error.");
        return;
      }
      player.sendMessage("Executed.");
      player = executePlayer.getMCPlayer();
      sender = executePlayer;
      cmd = arg[1];
      arg = arg.slice(2);
    }
    executeCommand(player, sender, cmd, arg, message, isCommand);
  }else
    executeCommand(player, sender, undefined, undefined, message, isCommand);
});

/**
 * 
 * @param {Player} player 
 * @param {Player} sender 
 * @param {string} cmd 
 * @param {string[]} arg 
 * @param {string} message 
 * @param {boolean} isCommand 
 * @returns 
 */
export function executeCommand(player, sender, cmd, arg, message, isCommand) {
  const regex = /\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/;
  const getPlayers = (name) => {
    return world.getPlayers().filter((x) => x.name.toLowerCase().startsWith(name?.toLowerCase()));
  };
  const getPlayer = (name) => {
    return world.getPlayers().find(x => x.name?.toLowerCase().startsWith(name?.toLowerCase()));
  };
  if(isCommand){
    const cmdData = Command.getCmdData();
      if (!cmdData.has(cmd)) {
        sender.sendMessage(replaceArgs(Config.invalidMessage, cmd));
        return;
      }
      let args = [];
      if (arg.length > 0)
        args = arg.map((x, i) => {
          x = x.startsWith('"') && x.endsWith('"') ? x.slice(1, -1) : x;
          let nothingBool = false;
          cmdData
            .get(cmd)
            .usage.filter((y) => y.split(regex).length === arg.length)
            .forEach((z) =>{
              if(!nothingBool){
                let array = z.split(regex);
                if(array.every(() => {
                  if (array[i].includes("number") && !isNaN(x)) {
                    x = Number(x);
                    return true;
                  } 
                  else if ((array[i].includes("boolean") && x === "true") || x === "false") {
                    x == "true" ? (x = true) : (x = false);
                    return true;
                  } 
                  else if (array[i].includes("object")) {
                    try {                  
                      x = JSON.parse(x);
                      return true;
                    } catch {
                      return false;
                    }
                  } else if (array[i].includes("string") && typeof x === "string") return true;
                  return false;
                })) nothingBool = true;
              }
            })
          return x;
        });

      if (
        typeof cmdData.get(cmd).permission == "boolean" &&
        cmdData.get(cmd).permission &&
        player.hasTag(Config.firstTag + Config.opTag)
      ) {
        let isOp = () => player.hasTag(Config.firstTag + Config.opTag);
        system.run(() => cmdData.get(cmd).execute({ sender, name: cmd, args, getPlayer, getPlayers, isOp }));
        return;
      } else if (typeof cmdData.get(cmd).permission == "boolean" && !cmdData.get(cmd).permission) {
        let isOp = () => player.hasTag(Config.firstTag + Config.opTag);
        system.run(() => cmdData.get(cmd).execute({ sender, name: cmd, args, getPlayer, getPlayers, isOp }))
        return;
      } else if (
        (typeof cmdData.get(cmd).permission === "string" &&
          player.hasTag(Config.firstTag + cmdData.get(cmd).permission)) ||
        ev.sender.hasTag(Config.firstTag + Config.opTag)
      ) {
        let isOp = () => player.hasTag(Config.firstTag + Config.opTag)? true : player.hasTag(Config.firstTag + cmdData.get(cmd).permission)
        system.run(() => cmdData.get(cmd).execute({ sender, name: cmd, args, getPlayer, getPlayers, isOp }))
        return;
      } else {
        system.run(() => sender.sendMessage(replaceArgs(Config.invalidMessage, cmd)));
        return;
      }
      
  } else {
    //messageBuilder
    system.run(() =>{
      //WebSocket用通信
      //sender.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§m§s§g${message.split("").map(x => "§"+x).join("")}"}]}`);
      //同様
      //sender.sendActionbar("");

      const MB = new MessageBuilderData();
      MB.sender = sender;
      MB.message = message;
      MB.getPlayer = getPlayer;
      MB.getPlayers = getPlayers;
      //console.log(`<${sender.nameTag}> ${message}`)
      if (_messageCallback.length > 0) _messageCallback.forEach((f) => f(MB));  
      if (player.hasTag(Config.firstTagMsg + Config.noSend)) return;
      if (!_showPlayerMsg.has(sender.id)) {
        world.sendMessage(`<${sender.nameTag}> ${MB.message}`);
        return;
      }
      const data = _showPlayerMsg
        .get(sender.id)
        .replace(/%p/g, sender.name)
        .replace(/%n/g, sender.nameTag)
        .replace(/%x/g, Math.floor(sender.location.x))
        .replace(/%y/g, Math.floor(sender.location.y))
        .replace(/%z/g, Math.floor(sender.location.z))
        .replace(/%d/g, sender.dimension.id)
        .replace(/%m/g, MB.message);
      for (const player of world.getAllPlayers()) {
        if (player.hasTag(Config.firstTagMsg+Config.noShowPrefix)) player.sendMessage(`<${sender.nameTag}> ${MB.message}`);
        else player.sendMessage(data);
      }
    })
  }
}
/**
 * 実行できなかったメッセージに対して、$1などの引数に値を入れることができます。
 * @param {string} message
 * @param  {...string} args
 */
export function replaceArgs(message, ...args) {
  return message.replace(/\$(\d+)/g, (match, index) => {
    const argIndex = parseInt(index, 10) - 1;
    return args[argIndex] || "";
  });
}

export class MessageBuilder {
  /**
   * メッセージの表示の仕方を設定できます。
   *
   * 設定する際に、色々パラメーターが用意されているので、そちらを使用ください。
   *
   * %p = プレイヤーの元の名前
   *
   * %n = プレイヤーのネームタグ
   *
   * %m = プレイヤーが打ったメッセージ
   *
   * %x = プレイヤーのx座標
   *
   * %y = プレイヤーのy座標
   *
   * %z = プレイヤーのz座標
   *
   * %d = プレイヤーの今いるディメンション
   *
   * @example
   * ```
   * MessageBuilder.set(<Player>, "[%d] [初心者] §e%n > %m")
   * ```
   *
   * @param {import("../../Player/index.js").Player} player
   * @param {string} showMsg
   */
  static message(player, showMsg) {
    _showPlayerMsg.set(player.id, showMsg);
  }
  /**
   * 既に変更済みかどうかを取得します。
   * @param {import("../../Player/index.js").Player} player
   */
  static isChanged(player){
    return _showPlayerMsg.has(player.id);
  }
  /**
   * メッセージが送信された瞬間に実行する関数です。
   * @param {MessageExecuteCallback} callback
   */
  static execute(callback) {
    if (typeof callback === "function") _messageCallback.push(callback);
  }
}
export {ExecuteObject}