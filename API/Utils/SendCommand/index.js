import { CommandCallbackSignal } from "./interface.js";

/**
 * @callback CommandCallback
 * @param {CommandCallbackSignal} ev
 */

/**
 * コマンドのデータがすべて入った変数
 */
let cmdData = [];


export class Command{
    /**
     * @private
     * @type {{
     * cmd: string,
     * description: string,
     * usage: string[],
     * hasOp: boolean,
     * permissions: string[],
     * execute: CommandCallback
     * }}
     */
    cmdData;
    
    /**
     * コマンドの名前を設定します。
     * @param {string} cmd 
     */
    setCommand(cmd){
        this.cmdData.cmd = cmd;
        return this;
    }
    /**
     * コマンドの説明文を設定します。
     * @param {string} description 
     */
    setDescription(description){
        this.cmdData.description = description;
        return this;
    }
    /**
     * コマンドの使用例を設定します。
     * @param {string[]} usage 
     */
    setUsage(...usage){
        this.cmdData.usage = usage;
        return this;
    }
    /**
     * opを持っているかどうかを設定します。
     * 
     * falseならopを持っていなくても実行可能になりますが、trueならopを持っていないと実行できません。
     * @param {boolean} hasOp 
     */
    setHasOp(hasOp){
        this.cmdData.hasOp = hasOp;
        return this;
    }
    /**
     * コマンドのパーミッションを設定できます。
     * 
     * opのコマンドでも、指定されたタグが存在すれば使えるようになります。
     * 
     * 最初に!をつけることで以外を指定することができます。(opなしのコマンドも除外されます。)
     * @param  {...string} permissions 
     */
    setPermissions(...permissions){
        this.cmdData.permissions = permissions;
        return this;
    }
    /**
     * コマンドの挙動を設定できます。
     * @param {CommandCallback} callback 
     */
    executeCommand(callback){
        this.cmdData.execute = callback;
        return this;
    }



    /**
     * コマンドの基本情報を設定します。
     * @param {{
     * cmd: string,
     * description: string,
     * usage: string[],
     * hasOp: boolean,
     * permissions: string[],
     * execute: CommandCallback
     * }} data 
     */
    constructor(data = {
        cmd: "",
        description: "",
        usage: [],
        hasOp: false,
        permissions: [],
        execute: () => {}
    }){
        if(typeof data == "object") this.cmdData = data;
        else this.cmdData = {
            cmd: "",
            description: "",
            usage: [],
            hasOp: false,
            permissions: [],
            execute: () => {}
        }
    }
}

