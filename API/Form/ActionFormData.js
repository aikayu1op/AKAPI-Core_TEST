import { system } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
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
     * @private
     */
    firstCallback = undefined;
    /**
     * @private
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
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text
     */
    title(text){
        this.form.title = text;
        return this;
    }
    /**
     * ActionFormDataのbodyテキストを設定します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text
     */
    body(text){
        this.form.body = text;
        return this;
    }
    /**
     * ボタンをフォームに追加できます。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text 
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
     * @overload
     * @param {Player} showPlayer 
     * @param {ActionFormCanceledResponse} callback
     * @param {boolean} force
     */
    show(showPlayer, callback = undefined, force = false){
        const form = new UI.ActionFormData()
        .title(this.form.title)
        .body(this.form.body);
        for(let i = 0; i < this.buttons.length; i+=2) form.button(this.buttons[i], this.buttons[i+1]);
        let firstCallback = this.firstCallback;
        let _doCallback = this._doCallback;
        let count = 0;
        //if(!callback && !force) return form.show(showPlayer.getMCPlayer());
        system.run(function forces(){
            form.show(showPlayer.getMCPlayer()).then(response =>{
                let player = showPlayer;
                let index = response.selection;
                const {canceled} = response;
                if(typeof firstCallback == "function" && typeof index == "number") firstCallback({player, index, count});
                if(String(response.cancelationReason) == "UserBusy" && force){
                    system.run(forces);
                    return;
                }
                if(typeof callback != "function" && !!callback) throw "this callback is not a function.";
                let cancelationReason = String(response.cancelationReason);
                if(response.selection != undefined) cancelationReason = "buttonClicked";
                if(typeof callback == "function") callback({player, cancelationReason, canceled, count, index});
                if(response.canceled) return;
                let fn = _doCallback[response.selection];
                if(typeof fn == "function") fn({player, index, count});
    
            });
        });
        return;
    }
        /**
     * 指定したプレイヤーにフォームを表示します。
     * @param {Player} showPlayer 
     * @param {ActionFormCanceledResponse} callback
     * @param {boolean} force
     */
    async showAsync(showPlayer, callback = undefined, force = false){
        const form = new UI.ActionFormData()
        .title(this.form.title)
        .body(this.form.body);
        for(let i = 0; i < this.buttons.length; i+=2) form.button(this.buttons[i], this.buttons[i+1]);
        let firstCallback = this.firstCallback;
        let _doCallback = this._doCallback;
        let count = 0;
        await new Promise((resolve) =>{
            system.run(function forces(){
                form.show(showPlayer.getMCPlayer()).then(response =>{
                    let player = showPlayer;
                    let index = response.selection;
                    const {canceled} = response;
                    if(typeof firstCallback == "function" && typeof index == "number") firstCallback({player, index, count});
                    if(String(response.cancelationReason) == "UserBusy" && force){
                        system.run(forces);
                        return;
                    }
                    if(typeof callback != "function" && !!callback) throw "this callback is not a function.";
                    resolve("");
                    let cancelationReason = String(response.cancelationReason);
                    if(response.selection != undefined) cancelationReason = "buttonClicked";
                    if(typeof callback == "function") callback({player, cancelationReason, canceled, count, index});
                    if(response.canceled) return;
                    let fn = _doCallback[response.selection];
                    if(typeof fn == "function") fn({player, index, count});
        
                });
            });
        })
        return true;
    }
    /**
     * フォームの最初の設定をします。
     * callbackには、フォームを閉じた瞬間に必ず実行されるものを書くことができます。
     * @example
     * new ActionFormData("test", "this is test form.", (data) =>{
     *    data.player.addTag("example");
     * })
     * @overload
     * @overload
     * @param {string} title
     * @overload
     * @param {string} title
     * @param {string} body
     * @overload
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