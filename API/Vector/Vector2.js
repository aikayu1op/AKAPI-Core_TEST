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
     * 同じ値かどうかを取得します。
     * @param {this} vector2 
     * @returns 
     */
    equals(vector2){
        if(!(vector2 instanceof Vector2)) return false;
        if(this.x - vector2.x == 0 && this.y - vector2.y == 0) return true;
        return false
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