import * as mc from "@minecraft/server";
import { BlockType } from "./BlockType.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
export class BlockPermutation{
    /**
     * @readonly
     * @type {BlockType}
     */
    type;
    /**
     * BlockPermutationのクローンを作成します。
     */
    clone(){
        return new BlockPermutation(this._permutation);
    }
    /**
     * 
     */
    getAllProperties(){
        return this._permutation.getAllProperties();
    }
    /**
     * 
     * @param {string} propertyName 
     */
    getProperty(propertyName){
        return this._permutation.getProperty(propertyName);
    }
    /**
     * ブロックに付与されているタグを返します。
     */
    getTags(){
        return this._permutation.getTags()
    }
    /**
     * ブロックのデータを保持したままItemStackを返します。
     */
    getItemStack(){
        return new ItemStack(this._permutation.getItemStack())
    }
    /**
     * ブロックに本当にタグがついてるか検証します。
     * @param {string} tag 
     */
    hasTag(tag){
        return this._permutation.hasTag(tag);
    }
    /**
     * マイクラ公式のBlockPermutationを返します。
     * @deprecated
     */
    getMCBlockPermutation(){
        return this._permutation;
    }
    /**
     * 
     * @overload
     */
    constructor(permutation){
        /**
         * @private
         */
        this._permutation = permutation;
        /**
         * @readonly
         */
        this.type = new BlockType(this._permutation.type);
    }
}