import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
import { IModalFormResponse } from "./Callback/IModalFormCallback";
import { system } from "@minecraft/server";

/**
 * @callback ModalFormResponse
 * @param {IModalFormResponse}
 */

export class ModalFormData{
    /**
     * @private
     */
    form = {
        title: "",
    }
    /**
     * アイテムの順番を取得する
     * @private
     * @type {string[]}
     */
    _list = [];
    /**
     * @private
     * @type {Map<string, Map<string, string[]>>[]}
     */
    _dropdown = [];
    /**
     * @private
     * @type {Map<string, string[]>[]}
     */
    _textField = [];
    /**
     * @private
     * @type {string | boolean[]}
     */
     _toggle = [];
     /**
     * @private
     * @type {Map<string, number[]>[]}
     */
    _slider = [];

    /**
     * ModalFormDataのtitleテキストを設定します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} text
     */
    title(text){
        this.form.title = text;
        return this;
    }
    /**
     * フォームにテキストボックスを配置します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} label 
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} placeholderText 
     * @param {string} defaultValue 
     */
    textField(label = "", placeholderText = "", defaultValue = undefined){
        let data = [];
        let map = new Map();
        data.push(placeholderText, defaultValue);
        map.set(label, data);
        this._list.push("textField");
        this._textField.push(map);
        return this;
    }
    /**
     * フォームにトグルを配置します。
     * @param {string} label 
     * @param {boolean} defaultValue 
     */
    toggle(label = "", defaultValue = false){
        this._list.push("toggle");
        this._toggle.push(label, defaultValue);
        return this;
    }
    /**
     * フォームにスライダーを配置します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} label 
     * @param {number} minValue 
     * @param {number} maxValue 
     * @param {number} valueStep 
     * @param {number} defaultValue 
     */
    slider(label = "", minValue = 0, maxValue = 100, valueStep = 1, defaultValue = minValue){
        let data = [];
        let map = new Map();
        data.push(minValue, maxValue, valueStep, defaultValue);
        map.set(label, data);
        this._list.push("slider");
        this._slider.push(map);
        return this;
    }
    /**
     * フォームにドロップダウンを配置します。
     * @param {string | import("../Interfaces/IRawMessage.js").IRawMessage} label 
     * @param {(string | import("../Interfaces/IRawMessage.js").IRawMessage)[]} options 
     * @param {number} defaultValueIndex 
     */
    dropdown(label = "", options = [], defaultValueIndex = 0){
        let data = new Map();
        let map = new Map();
        data.set("options", options)
        data.set("index", defaultValueIndex)
        map.set(label, data);
        this._list.push("dropdown");
        this._dropdown.push(map);
        return this;
    }

    /**
     * 指定したプレイヤーにフォームを表示します。
     * @param {Player} showPlayer 
     * @param {ModalFormResponse} callback
     * @param {boolean} force
     */
    show(showPlayer, callback, force = false){
        const form = new UI.ModalFormData()
        .title(this.form.title)
        let dropdown = 0;
        let textField = 0;
        let slider = 0;
        let toggle = 0;
        for(let i = 0; i < this._list.length; i++){
            if(this._list[i] == "dropdown"){
                const data = this._dropdown[dropdown];
                const keys = [...data.keys()][0];
                const options = data.get(keys).get("options");
                const index = data.get(keys).get("index");
                form.dropdown(keys, options, index);
                dropdown+=1;
            }
            else if(this._list[i] == "textField"){
                const data = this._textField[textField];
                const keys = [...data.keys()][0];
                const data2 = data.get(keys);
                form.textField(keys, data2[0],data2[1]);
                textField+=1;
            }
            else if(this._list[i] == "slider"){
                const data = this._slider[slider];
                const keys = [...data.keys()][0];
                const data2 =  data.get(keys);
                form.slider(keys, data2[0],data2[1], data2[2], data2[3]);
                slider+=1;
            }
            else if(this._list[i] == "toggle"){
                form.toggle(this._toggle[toggle], this._toggle[toggle+1]);
                toggle+=2;
            }
        }
        system.run(function forces(){
            form.show(showPlayer.getMCPlayer()).then(response =>{
                let player = showPlayer;
                const { cancelationReason, formValues, canceled } = response;
                if(cancelationReason === "UserBusy" && force){
                    forces();
                    return;
                }
                callback({ player, cancelationReason, formValues, canceled });
            });
        })
        //const returnForm = form.show(showPlayer.getMCPlayer());
        //return returnForm;
    }
    /**
     * 指定したプレイヤーにフォームを表示します。
     * @param {Player} showPlayer 
     * @param {ModalFormResponse} callback
     */
    async showAsync(showPlayer, callback, force = false){
        const form = new UI.ModalFormData()
        .title(this.form.title)
        let dropdown = 0;
        let textField = 0;
        let slider = 0;
        let toggle = 0;
        for(let i = 0; i < this._list.length; i++){
            if(this._list[i] == "dropdown"){
                const data = this._dropdown[dropdown];
                const keys = [...data.keys()][0];
                const options = data.get(keys).get("options");
                const index = data.get(keys).get("index");
                form.dropdown(keys, options, index);
                dropdown+=1;
            }
            else if(this._list[i] == "textField"){
                const data = this._textField[textField];
                const keys = [...data.keys()][0];
                const data2 = data.get(keys);
                form.textField(keys, data2[0],data2[1]);
                textField+=1;
            }
            else if(this._list[i] == "slider"){
                const data = this._slider[slider];
                const keys = [...data.keys()][0];
                const data2 =  data.get(keys);
                form.slider(keys, data2[0],data2[1], data2[2], data2[3]);
                slider+=1;
            }
            else if(this._list[i] == "toggle"){
                form.toggle(this._toggle[toggle], this._toggle[toggle+1]);
                toggle+=2;
            }
        }
        await new Promise((resolve) =>{
            system.run(function forces(){
                form.show(showPlayer.getMCPlayer()).then(response =>{
                    let player = showPlayer;
                    const { cancelationReason, formValues, canceled } = response;
                    if(cancelationReason === "UserBusy" && force){
                        forces();
                        return;
                    }
                    callback({ player, cancelationReason, formValues, canceled });
                    resolve("");
                });
            })
            //const returnForm = form.show(showPlayer.getMCPlayer());
            //return returnForm;
        })
    }
    /**
     * @overload
     * @overload
     * @param {string} title 
     */
    constructor(title = ""){
        this.form.title = title;
    }
}

