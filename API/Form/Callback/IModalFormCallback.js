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
export class IModalFormItemOptions{
    /**
     * @type {string | IRawMessage | undefined}
     * フォームのアイテムのツールチップを設定します。
     */
    tooltip;
}
export class IModalFormDropDownOptions extends IModalFormItemOptions{
    /**
     * @type {number}
     * フォームのドロップダウンの初期値を設定します。
     */
    defaultValueIndex;
}
export class IModalFormSliderOptions extends IModalFormItemOptions{
    /**
     * @type {number}
     * フォームのスライダーの値のステップを設定します。
     */
    valueStep;
    /**
     * @type {number}
     * フォームのスライダーの初期値を設定します。
     */
    defaultValue;
}
export class IModalFormTextFieldOptions extends IModalFormItemOptions{
    /**
     * @type {string | IRawMessage | undefined}
     * フォームのテキストフィールドの初期値を設定します。
     */
    defaultValue;
}
export class IModalFormToggleOptions extends IModalFormTextFieldOptions{}
