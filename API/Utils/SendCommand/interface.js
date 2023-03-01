import { Player } from "../../../index.js";

export class CommandCallbackSignal{
    /**
     * コマンドを実行したプレイヤーを返します。
     * @type {Player}
     */
    sender;
    /**
     * 実行されたコマンドの引数を返します。
     * 
     * 引数に入るのは空白が空いたところから引数が入ります。(例: .cmd test test2 --- args[0] ==> "test", args[1] ==> "test2")
     * @type {string[]}
     */
    args;
}
