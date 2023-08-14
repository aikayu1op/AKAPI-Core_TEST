export class PlayAnimationOptions{
    /**
     * @remarks
     * Amount of time to fade out after an animation stops.
     * @type {number}
     *
     */
    blendOutTime;
    /**
     * @remarks
     * Specifies a controller to use that has been defined on the
     * entity.
     * @type {string}
     */
    controller;
    /**
     * @remarks
     * Specifies the state to transition to.
     * @type {string}
     *
     */
    nextState;
    /**
     * @remarks
     * Specifies a Molang expression for when this animation should
     * complete.
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