export class IModalFormResponse{
    /**
     * @readonly
     * フォームを閉じたかを判定するbooleanです。
     */
    canceled = false;
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