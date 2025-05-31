import * as UI from "@minecraft/server-ui";
import { Player } from "../Player/index.js";
import { IModalFormDropDownOptions, IModalFormResponse, IModalFormTextFieldOptions, IModalFormToggleOptions } from "./Callback/IModalFormCallback";
import { system } from "@minecraft/server";
import { IRawMessage } from "../Interfaces/IRawMessage.js";

/**
 * @callback ModalFormResponse
 * @param {IModalFormResponse}
 */

export class ModalFormData{
    /**
     * @private
     * @type {string}
     */
    _title;
    /**
     * アイテムの順番を取得する
     * @private
     * @type {{id: string, label: string | IRawMessage, placeholderText: string, defaultValueIndex: number, defaultValue: string | number | boolean, minValue: number, maxValue: number, valueStep: number, defaultValue: number, tooltip: string | IRawMessage}[]}
     */
    _elements = [];
    /**
     * @private
     * @type {string}
     */
    _submitButton;

    /**
     * フォームにドロップダウンを配置します。
     * @overload
     * @param { string | IRawMessage} label 
     * @param {(string | IRawMessage)[]} items 
     * @param {number} defaultValueIndex
     * @param {string | IRawMessage} tooltip
     * @returns {this}
     * @overload
     * @param {string | IRawMessage} label
     * @param {(string | IRawMessage)[]} items 
     * @param {IModalFormDropDownOptions} options
     * @returns {this}
     * 
     */
    dropdown(label = "", items = [], defaultValueIndex = 0, tooltip = undefined){
        if(typeof defaultValueIndex === "object"){
            this._elements.push({id: "textField", label, options: defaultValueIndex});
            return this;
        }
        this._elements.push({id: "dropdown", label, items, options:{ defaultValueIndex, tooltip }});
        return this;
    }
    /**
     * 仕切りをフォームに追加します。
     */
    divider(){
        this._elements.push({id: "divider"});
        return this;
    }
    header(text = ""){
        this._elements.push({id: "header", text});
        return this;
    }
    /**
     * 
     * @param {string | IRawMessage} text 
     */
    label(text = ""){
        this._elements.push({id: "label", text});
        return this;
    }
    /**
     * フォームにスライダーを配置します。
     * @overload
     * @param {string | IRawMessage} label 
     * @param {number} minValue 
     * @param {number} maxValue 
     * @param {number} valueStep 
     * @param {number} defaultValue 
     * @param {string | IRawMessage} tooltip
     * @returns {this}
     * @overload
     * @param {string | IRawMessage} label 
     * @param {number} minValue 
     * @param {number} maxValue 
     * @param {IModalFormSliderOptions} options
     * @returns {this}
     */
    slider(label = "", minValue = 0, maxValue = 100, valueStep = 1, defaultValue = minValue, tooltip = undefined){
        if(typeof valueStep === "object"){
            this._elements.push({id: "textField", label, options: valueStep});
            return this;
        }
        this._elements.push({id: "slider", label, minValue, maxValue, options: { valueStep, defaultValue, tooltip }});
        return this;
    }
    /**
     * 決定ボタンをフォームの名前を変更します。
     * @param {string | IRawMessage} text 
     * @returns 
     */
    submitButton(text){
        this._submitButton = text;
        return this;
    }
    /**
     * ModalFormDataのtitleテキストを設定します。
     * @param {string | IRawMessage} text
     */
    title(text){
        this._title = text;
        return this;
    }
    /**
     * フォームにテキストボックスを配置します。
     * @overload
     * @param {string | IRawMessage} label 
     * @param {string | IRawMessage} placeholderText 
     * @param {string} defaultValue 
     * @returns {this}
     * @overload
     * @param {string | IRawMessage} label 
     * @param {string | IRawMessage} placeholderText 
     * @param {IModalFormTextFieldOptions} options
     * @returns {this}
     */
    textField(label = "", placeholderText = "", defaultValue = undefined, tooltip = undefined){
        if(typeof defaultValue === "object"){
            this._elements.push({id: "textField", label, placeholderText, options: defaultValue});
            return this;
        }
        this._elements.push({id: "textField", label, placeholderText, options:{ defaultValue, tooltip }});
        return this;
    }
    /**
     * フォームにトグルを配置します。
     * @overload
     * @param {string} label 
     * @param {boolean} defaultValue 
     * @param {string | IRawMessage} tooltip
     * @returns {this}
     * @overload
     * @param {string} label 
     * @param {IModalFormToggleOptions} defaultValue 
     * @returns {this}
     */
    toggle(label = "", defaultValue = false, tooltip = undefined){
        if(typeof defaultValue === "object"){
            this._elements.push({id: "textField", label, options: defaultValue});
            return this;
        }
        this._elements.push({id: "toggle", label, options:{defaultValue, tooltip}});
        return this;
    }

    /**
     * 指定したプレイヤーにフォームを表示します。
     * @overload
     * @param {Player} showPlayer 
     * @param {ModalFormResponse} callback
     * @param {boolean} force
     * @returns {void}
     * @overload
     * @param {Player} showPlayer
     * @returns {Promise<IModalFormResponse>}
     */
    show(showPlayer, callback = undefined, force = false){
        const form = new UI.ModalFormData()
        .title(this._title)
        if(!!this._submitButton) form.submitButton(this._submitButton);
        for(const dat of this._elements){
            switch(dat.id){
                case "dropdown":
                    form.dropdown(dat.label, dat.items, dat.options);
                    break;
                case "divider":
                    form.divider();
                    break;
                case "header":
                    form.header(dat.text);
                    break;
                case "label":
                    form.label(dat.text);
                    break;
                case "slider":
                    form.slider(dat.label, dat.minValue, dat.maxValue, dat.options);
                    break;
                case "textField":
                    form.textField(dat.label, dat.placeholderText, dat.options);
                    break;
                case "toggle":
                    form.toggle(dat.label, dat.options);
                    break;
            }
        }
        if(!callback && !force) return form.show(showPlayer.getMCPlayer());
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
        .title(this._title)
        if(!!this._submitButton) form.submitButton(this._submitButton);
        for(const dat of this._elements){
            switch(dat.id){
                case "dropdown":
                    form.dropdown(dat.label, dat.items, dat.options);
                    break;
                case "divider":
                    form.divider();
                    break;
                case "header":
                    form.header(dat.text);
                    break;
                case "label":
                    form.label(dat.text);
                    break;
                case "slider":
                    form.slider(dat.label, dat.minValue, dat.maxValue, dat.options);
                    break;
                case "textField":
                    form.textField(dat.label, dat.placeholderText, dat.options);
                    break;
                case "toggle":
                    form.toggle(dat.label, dat.options);
                    break;
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
        this._title = title;
    }
}

