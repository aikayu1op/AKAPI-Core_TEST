import { Player } from "../../Player/index.js";

export class MessageFormFirstCallback{
    /**
     * 実行したプレイヤーのクラスが返ります。
     * @readonly
     * @type {Player}
     */
    player;
    /**
     * 押されたボタンが何番目のボタンなのかを取得できます。
     * @readonly
     * @type {number}
     */
    index;
    /**
     * どうやってフォームを閉じたかを取得できます。
     * @type {"userClosed" | "userBusy" | "buttonClicked"}
     * @readonly
     */
    cancelationReason;
}
export class MessageFormCallback{
    /**
     * ボタンを押したプレイヤーのクラスが返ります。
     * @type {Player}
     * @readonly
     */
    player;
}
export class MessageFormCanceledCallback{
    /**
     * キャンセルしたプレイヤーのクラスが返ります。
     * @readonly
     * @type {Player}
     */
    player;
    /**
     * どうやってフォームを閉じたかを取得できます。
     * @type {"userClosed" | "userBusy" | "buttonClicked"}
     * @readonly
     */
    cancelationReason;
    /**
     * フォームが人為的に閉じたかどうかを取得します。
     * @readonly
     * @type {boolean}
     */
    canceled;
}