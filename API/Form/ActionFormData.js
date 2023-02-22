import { system } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
import { world } from "../World/index.js";
import { ActionFormCallback, ActionFormCanceledCallback, ActionFormFirstCallback } from "./Callback/IActionFormCallback.js";


/**
 * @callback ActionFormResponse
 * @param {ActionFormCallback} ev
 */
/**
 * @callback ActionFormCanceledResponse
 * @param {ActionFormCanceledCallback} ev
 */
/**
 * @callback ActionFormFirstResponse
 * @param {ActionFormFirstCallback} ev
 */

export class ActionFormData{
    /**
     * @private
     */
    form = {
        title: "",
        body: "",
    }
    /**
     * @type {Function}
     */
    firstCallback;
    /**
     * @privare
     * @type {string[]}
     */
    buttons = [];
    /**
     * ボタンのコールバックを返します。
     * @private
     */
    _doCallback = [];
    /**
     * ボタンのコールバックを取得します。
     * @type {number}
     * @private
     */
    _callbackIndex = -1;
    /**
     * ActionFormDataのtitleテキストを設定します。
     * @param {string} text
     */
    title(text){
        this.form.title = text;
    }
    /**
     * ActionFormDataのbodyテキストを設定します。
     * @param {string} text
     */
    body(text){
        this.form.body = text;
    }
    /**
     * ボタンをフォームに追加できます。
     * @param {string} text 
     * @param {string} iconPath 
     * @param {ActionFormResponse} callback
     */
    button(text, iconPath = undefined, callback = undefined){
        this.buttons.push(text,iconPath);
        this._callbackIndex++;
        if(typeof callback == "function" && callback) this._doCallback[this._callbackIndex] = callback;
        return this;
    }
    /**
     * 指定したプレイヤーにフォームを表示します。
     * @param {Player} showPlayer 
     * @param {ActionFormCanceledResponse} callback
     * @param {boolean} force
     */
    show(showPlayer, callback = undefined, force = false){
        const form = new UI.ActionFormData()
        .title(this.form.title)
        .body(this.form.body);
        for(let i = 0; i < this.buttons.length; i+=2) form.button(this.buttons[i], this.buttons[i+1]);
        system.run(function forces(){
            form.show(showPlayer.getMCPlayer()).then(response =>{
                let player = showPlayer;
                let index = response.selection;
                if(typeof this.firstCallback == "function") this.firstCallback({player, index});
                if(String(response.cancelationReason) == "userBusy" && force) system.run(forces);
                if(typeof callback != "function") throw "this callback is not a function.";
                let cancelationReason = String(response.cancelationReason);
                if(response.selection != undefined) cancelationReason = "buttonClicked";
                if(typeof callback == "function") callback({player, cancelationReason});
                if(response.canceled) return;
                let fn = this._doCallback[response.selection];
                if(typeof fn == "function") fn({player, index});
    
            });
        })
    }
    /**
     * フォームの最初の設定をします。
     * callbackには、フォームを閉じた瞬間に必ず実行されるものを書くことができます。
     * @example
     * new ActionFormData("test", "this is test form.", (data) =>{
     *    data.player.addTag("example");
     * })
     * @param {string} title 
     * @param {string} body 
     * @param {ActionFormFirstResponse} callback 
     */
    constructor(title = "", body = "", callback = undefined){
        this.form.title = title;
        this.form.body = body;
        if(typeof callback == "function") this.firstCallback = callback;
    }
}