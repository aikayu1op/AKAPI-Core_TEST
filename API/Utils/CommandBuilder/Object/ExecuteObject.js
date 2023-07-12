import { IExecuteObject } from "./IExecuteObject.js";

export class ExecuteObject extends IExecuteObject{
    /**
     * 空白ごとに分けられた引数を取得します
     * 
     * ""で囲われたものは空白無視で帰ってきます。
     * @type {(string | number | boolean | object)[]}
     * @readonly
     */
    args;
}