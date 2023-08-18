export class PlayAnimationOptions{
    /**
     * アニメーションが終わってから通常状態に戻るまでの時間
     * @type {number}
     *
     */
    blendOutTime;
    /**
     * エンティティに定義されている、使用するコントローラを指定します。
     * @type {string}
     */
    controller;
    /**
     * @remarks
     * 次のアニメーションの設定
     * @type {string}
     *
     */
    nextState;
    /**
     * @remarks
     * Molangを使っての終了条件を設定できます。
     * @type {string}
     *
     */
    stopExpression;
    /**
     * @deprecated
     */
    toObject(){
        let obj = {};
        if(typeof this.blendOutTime === "number") obj.blendOutTime = this.blendOutTime;
        if(typeof this.controller === "string") obj.controller = this.controller;
        if(typeof this.nextState === "string") obj.nextState = this.nextState;
        if(typeof this.stopExpression === "string") obj.stopExpression = this.stopExpression;
        return obj;
    }
}