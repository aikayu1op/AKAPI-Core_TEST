import { system } from "../System/index.js";
import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
import { MessageFormCallback, MessageFormCanceledCallback, MessageFormFirstCallback} from "./Callback/IMessageFormCallback.js";
import { world } from "../World/index.js";

/**
 * @callback MessageFormResponse
 * @param {MessageFormCallback} ev
 */
/**
 * @callback MessageFormCanceledResponse
 * @param {MessageFormCanceledCallback} ev
 */
/**
 * @callback MessageFormFirstResponse
 * @param {MessageFormFirstCallback} ev
 */

export class MessageFormData{
    /**
     * @private
     */
    form = {
        title: "",
        body: ""
    }
    _callback;
    /**
     * @private
     */
    _button = [];
    /**
     * MessageFormDataのtitleテキストを設定します。
     * @param {string} text
     */
    title(text){
        this.form.title = text;
    }
    /**
     * MessageFormDataのbodyテキストを設定します。
     * @param {string} text
     */
    body(text){
        this.form.body = text;
    }
    /**
     * ボタンをフォームに追加できます。
     * 
     * 上から1つ目のボタンを設定できます。
     * @param {string} text 
     * @param {MessageFormResponse} callback
     */
    button1(text, callback){
        this._button[2] = text;
        if(typeof callback == "function") this._button[3] = callback;
        return this;
    }
    /**
     * ボタンをフォームに追加できます。
     * 
     * 上から2つ目のボタンを設定できます。
     * @param {string} text 
     * @param {MessageFormResponse} callback
     */
     button2(text, callback){
        this._button[0] = text;
        if(typeof callback == "function") this._button[1] = callback;
        return this;
    }
    /**
     * 指定したプレイヤーにフォームを表示します。
     * @param {Player} showPlayer 
     * @param {MessageFormCanceledResponse} callback
     * @param {boolean} force
     */
    show(showPlayer, callback, force = false){
        const title = this.form.title;
        const body = this.form.body;
        const _callback = this._callback;
        const _button = this._button;
        system.run(function forces(){
            new UI.MessageFormData()
            .title(title)
            .body(body)
            .button1(_button[2])
            .button2(_button[0])
            .show(showPlayer.getMCPlayer()).then(response =>{
                const { canceled, cancelationReason: cr, selection: index} = response;
                let player = showPlayer;
                let cancelationReason = String(cr);
                if(index != undefined) cancelationReason = "buttonClicked";
                if(typeof _callback == "function") _callback({player, index, cancelationReason});
                if(canceled){
                    if(force && String(cr) == "userBusy") system.run(forces);
                    if(typeof callback == "function") callback({player, cancelationReason, index});
                    if(canceled) return;
                }
                if(typeof _button[index*2+1] == "function") _button[index*2+1]({player, index});
            }).catch(e => {throw e});
        });
    }
    /**
     * 
     * @param {string} title 
     * @param {string} body 
     * @param {MessageFormFirstResponse} callback 
     */
    constructor(title = "", body = "", callback){
        this.form.title = title;
        this.form.body = body;
        this._callback = callback;
    }
}