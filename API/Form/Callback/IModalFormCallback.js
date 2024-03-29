export class IModalFormResponse{
    /**
     * @readonly
     * フォームを閉じたかを判定するbooleanです。
     * @type {boolean}
     */
    canceled;
    /**
     * @readonly
     * フォームがどのように閉じたかを取得します。
     * @type {"UserClosed" | "UserBusy" | "buttonClicked"}
     * 
     */
    cancelationReason;
    /**
     * @readonly
     * ModalFormにて入力されたデータが格納されています。
     * @type {(boolean | string | number)[]}
     */
    formValues = [];
}