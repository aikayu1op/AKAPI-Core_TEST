import * as mc from "@minecraft/server";
import { Vector } from "./Vector.js";
export class Vector2{

    /**
     * @type {number}
     */
    x;
    /**
     * @type {number}
     */
    y;

    /**
     * オフセット変更できます。
     * @param {number} x 
     * @param {number} y 
     */
    changeOffset(x = 0,y = 0){
        this.x += x;
        this.y += y;
    }
    /**
     * Objectに変換します。
     * @deprecated
     */
    toObject(){
        return {
            x: this.x,
            y: this.y
        }
    }
    /**
     * @overload
     * @param {number} x 
     * @param {number} y 
     * @overload
     * @param {mc.Vector2 | Vector} vector
     */
    constructor(x, y){
        if(!!x && x instanceof Vector){
            this.x = x.x;
            this.y = y.y;
        }
        if(!!x?.x && typeof x?.x === "number"){
            this.x = x.x;
            this.y = x.y;
        }else{
            this.x = x;
            this.y = y;
        }
    }
}