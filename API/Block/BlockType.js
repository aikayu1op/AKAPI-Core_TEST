export class BlockType{
    /**
     * 水に漬けれるブロックかどうかを返します。
     * @readonly
     * @type {Boolean}
     */
    canBeWaterlogged;
    /**
     * ブロックのIDを返します。
     * @readonly
     * @type {Boolean}
     */
    id;
    /**
     * マイクラ公式のBlockTypeを返します。
     * @deprecated
     */
    getMCBlockType(){
        return this._type;
    }
    /**
     * @overload
     */
    constructor(type){
        /**
         * @private
         */
        this._type = type;
        this.canBeWaterlogged = this._type.canBeWaterlogged;
        this.id = this._type.id;
    }

}