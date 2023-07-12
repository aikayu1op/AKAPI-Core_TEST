import { IExecuteObject } from "./IExecuteObject.js";

export class MessageObject extends IExecuteObject{
    /**
     * 送ったメッセージを取得します。
     * @type {string}
     * @readonly
     */
    message;
}