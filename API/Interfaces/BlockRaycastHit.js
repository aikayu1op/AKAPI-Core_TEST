import * as mc from "@minecraft/server";
import { Block } from "../Block/index.js";
import { Vector } from "../Vector/Vector.js";

export class BlockRaycastHit{
    /**
     * @private
     */
    _block;
    /**
     * @private
     */
    _face;
    /**
     * @private
     */
    _faceLocation;
    /**
     * @type {import("../../").Block}
     */
    get block(){
        return this._block;
    };
    set block(value){
        if(!value) return;
        if(value instanceof mc.Block && !!value)
            this._block = new Block(value);
    }
    /**
     * @remarks
     * Face of the block that was hit.
     * @type {import("@minecraft/server").Direction}
     *
     */
    get face(){
        return this._face;
    };
    set face(value){
        if(!value) return;
        this._face = value;
    }
    /**
     * @remarks
     * Hit location relative to the bottom north-west corner of the
     * block.
     * @type {import("../../").Vector}
     *
     */
    get faceLocation(){
        return this._faceLocation;
    };
    set faceLocation(value){
        if(!value) return;
        this._faceLocation = new Vector(value);
    }
    /**
     * 
     * @param {mc.BlockRaycastHit} obj
     */
    constructor(obj){
        if(!obj){
            this.block = undefined;
            this.face = undefined;
            this.faceLocation = undefined;
        }else{
            this.block = obj.block;
            this.face = obj.face;
            this.faceLocation = obj.faceLocation;
        }
    }
}