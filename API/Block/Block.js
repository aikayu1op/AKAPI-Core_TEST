import * as mc from "@minecraft/server";
import { Dimension } from "../Dimension/index.js";
import { BlockLocation } from "../Location/index.js";
import { BaseBlockComponent } from "./BlockComponent.js";
import { BlockPermutation } from "./BlockPermutation.js";
import { BlockType } from "./BlockType.js";
export class Block{
    /**
     * ブロックのディメンションを返します。
     * @type {Dimension}
     * @readonly
     */
    dimension;
    /**
     * ブロックの座標データを返します。
     * @type {BlockLocation}
     * @readonly
     */
    location;
    /**
     * Blockの中身についての情報を返します。
     * @type {BlockPermutation}
     * @readonly
     */
    permutation;
    /**
     * このブロックの表面的な情報を返します。
     * @type {BlockType}
     * @readonly
     */
    type;
    /**
     * ブロックのIDを返します。(例: minecraft:wool等)
     * @type {string}
     * @readonly
     */
    typeId;
    /**
     * 
     * @param {BlockPermutation | BlockType} blockToPlace 
     * @param {mc.Direction | undefined} faceToPlaceOn 
     */
    canPlace(blockToPlace, faceToPlaceOn = undefined){
        if(blockToPlace instanceof BlockPermutation) return this._block.canPlace(blockToPlace.getMCBlockPermutation(), faceToPlaceOn);
        else if(blockToPlace instanceof BlockType) return this._block.canPlace(blockToPlace.getMCBlockType(), faceToPlaceOn);
    }
    /**
     * コンポーネントを返します。
     */
    getComponent(){
        return new BaseBlockComponent(this);
    }
    /**
     * ブロックのタグを返します。
     */
    getTags(){
        return this._block.getTags();
    }
    /**
     * ブロックが本当にそのタグを持っているか検証します。
     * @param {string} tag
     */
    hasTag(tag){
        return this._block.hasTag(tag);
    }
    /**
     * BlockPermutationに設定されている状態のものをセットします。
     * @param {BlockPermutation} permutation 
     */
    setPermutation(permutation){
        this._block.setPermutation(permutation.getMCBlockPermutation());
    }
    /**
     * 指定されたBlockTypeでブロックをセットします。
     * @param {BlockType} blockType 
     */
    setType(blockType){
        this._block.setType(blockType.getMCBlockType());
    }
    /**
     * 設置できるかのチェックをし、設置可能な場合は設置しtrueを返します。
     * @param {BlockPermutation} permutation 
     */
    trySetPermutation(permutation){
        this._block.trySetPermutation(permutation.getMCBlockPermutation());
    }
    /**
     * ブロックの周りに水が入っているを設定・確認できます。
     * valueに値を入れると設定され、何も入れないと確認を取ることができます。
     * 
     * @param {boolean} value 
     */
    WaterLogged(value = undefined){
        if(value == undefined) return this._block.isWaterlogged;
        this._block.isWaterlogged = value;
    }
    /**
     * マイクラ公式のBlockクラスを返します。
     * @deprecated
     * @returns {mc.Block}
     */
    getMCBlock(){
        return this._block;
    }

    /**
     * 
     * @param {mc.Block} block 
     */
    constructor(block){
        try{
            /**
             * @private
             */
            this._block = block;
            this.dimension = new Dimension(this._block.dimension);
            this.location = new BlockLocation(this._block.location);
            this.permutation = new BlockPermutation(this._block.permutation)
            this.type = new BlockType(this._block.type);
            this.typeId = this._block.typeId;
            /**
             * @type {number}
             */
            this.x = this._block.x;
            /**
             * @type {number}
             */
            this.y = this._block.y;
            /**
             * @type {number}
             */
            this.z = this._block.z;

        }catch(e){}
    }
}