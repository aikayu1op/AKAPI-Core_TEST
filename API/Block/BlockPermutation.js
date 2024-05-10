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
     * @returns 
     */
    getAllStates(){
        return this._permutation.getAllStates();
    }
    /**
     * 
     * @param {string} propertyName 
     */
    getState(propertyName){
        return this._permutation.getState(propertyName);
    }
    /**
     * 
     * @param {number} amount 
     * @returns 
     */
    getItemStack(amount = 1){
        return new ItemStack(this._permutation.getItemStack(amount));
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
     * @param {string} name 
     * @param {string | number | boolean} value 
     */
    withState(name, value){
        this._permutation.withState(name, value);
        return this;
    }
    /**
     * 
     * @param {import("./Block.js").BlockID} blockId 
     * @param {Record<string, boolean | number | undefined>} states 
     */
    static resolve(blockId, states = undefined){
        return new BlockPermutation(mc.BlockPermutation.resolve(blockId, states));
    }
    /**
     * @param {mc.BlockPermutation} permutation
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