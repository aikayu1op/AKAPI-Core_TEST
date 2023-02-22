import * as mc from "@minecraft/server";
export class ItemType{
    /**
     * @readonly
     * @type {string}
     */
    id;
    /**
     * マイクラ公式のItemTypeを返します。
     * @deprecated
     * @returns {mc.ItemType}
     */
    getMCItemType(){
        return this._itemType;
    }
    /**
     * 
     * @param {mc.ItemType} itemType 
     */
    constructor(itemType){
        /**
         * @private
         */
        this._itemType = itemType;
        this.id = itemType.id;
    }
}