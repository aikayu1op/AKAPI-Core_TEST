import { ExecuteObject } from "./ExecuteObject.js";

/**
 * @callback ExecuteCallback
 * @param {ExecuteObject} ev
 */

export class IBuilderObject{
    /**
     * コマンドの名前
     * @type {string}
     */
    cmd;
    /**
     * コマンドの使い方
     * 
     * ここでargsに入る値がbooleanやstringなどを設定できます。
     * @type {string[]}
     */
    usage;
    /**
     * コマンドの説明部分
     * @type {string}
     */
    description;
    /**
     * パーミッションを設定できます。
     * 
     * Stringの場合は指定されたパーミッションをプレイヤーから取得し、実行します。
     * 
     * Booleanの場合はopか否かでプレイヤーを取得し、実行します。
     * @type {string | boolean}
     */
    permission;
    /**
     * コマンドの実行処理
     * @type {ExecuteCallback}
     */
    execute;
}