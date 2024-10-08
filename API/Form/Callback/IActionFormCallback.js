import { Player } from "../../Player/index.js";

export class ActionFormFirstCallback{
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
}
export class ActionFormCallback{
    /**
     * ボタンを押したプレイヤーのクラスが返ります。
     * @type {Player}
     * @readonly
     */
    player;
    /**
     * 押されたボタンが何番目のボタンなのかを取得できます。
     * @type {number}
     * @readonly
     */
    index;
}
export class ActionFormCanceledCallback{
    /**
     * キャンセルしたプレイヤーのクラスが返ります。
     * @readonly
     * @type {Player}
     */
    player;
    /**
     * どうやってフォームを閉じたかを取得できます。
     * @type {"UserClosed" | "UserBusy" | "buttonClicked"}
     * @readonly
     */
    cancelationReason;
    /**
     * フォームが人為的に閉じたかどうかを取得します。
     * @readonly
     * @type {boolean}
     */
    canceled;
    /**
     * @readonly
     * 押したボタンのindexを取得します。
     * @type {number}
     */
    index;
}
export class ActionFormCanceled extends ActionFormCanceledCallback{
    /** @private */
    player;
}