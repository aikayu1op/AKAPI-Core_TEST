import { system } from "../System/index.js";
import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
import { MessageFormCallback, MessageFormCanceled, MessageFormCanceledCallback, MessageFormFirstCallback} from "./Callback/IMessageFormCallback.js";

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
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text
     */
    title(text){
        this.form.title = text;
        return this;
    }
    /**
     * MessageFormDataのbodyテキストを設定します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text
     */
    body(text){
        this.form.body = text;
        return this;
    }
    /**
     * ボタンをフォームに追加できます。
     * 
     * 上から1つ目のボタンを設定できます。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text 
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
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text 
     * @param {MessageFormResponse} callback
     */
     button2(text, callback){
        this._button[0] = text;
        if(typeof callback == "function") this._button[1] = callback;
        return this;
    }
    /**
     * 指定したプレイヤーにフォームを表示します。
     * @overload
     * @param {Player} showPlayer 
     * @param {MessageFormCanceledResponse} callback
     * @param {boolean} force
     * @returns {void}
     * @overload
     * @param {Player} showPlayer
     * @returns {Promise<MessageFormCanceled>}
     */
    show(showPlayer, callback = undefined, force = false){
        const title = this.form.title;
        const body = this.form.body;
        const _callback = this._callback;
        const _button = this._button;
        const form = new UI.MessageFormData()
        .title(title)
        .body(body)
        .button1(_button[0])
        .button2(_button[2])
        if(!callback && !force) return form.show(showPlayer.getMCPlayer())
        system.run(function forces(){
            form.show(showPlayer.getMCPlayer()).then(response =>{
                const { canceled, cancelationReason: cr, selection: index} = response;
                let player = showPlayer;
                let cancelationReason = String(cr);
                if(typeof index == "number") cancelationReason = "buttonClicked";
                if(typeof _callback == "function" && typeof index == "number") _callback({player, index, cancelationReason});
                if(canceled){
                    if(force && String(cr) == "userBusy") system.run(forces);
                    if(typeof callback == "function" && typeof index == "number") callback({player, cancelationReason, index, canceled});
                    return;
                }
                if(typeof _button[index*2+1] == "function") _button[index*2+1]({player, index});
            }).catch(e => {throw e});
        });
    }
    /**
     * 
     * @overload
     * @overload
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