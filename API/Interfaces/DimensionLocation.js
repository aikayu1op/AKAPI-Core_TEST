import { Dimension } from "../Dimension/index.js";
import { Vector } from "../Vector/Vector.js";

export class DimensionLocation{
    /**
     * @private
     */
    _dl;
    /**
     * ディメンションを取得します。
     * @returns {Dimension}
     * @readonly
     */
    get dimension(){
        return new Dimension(this._dl.dimension);
    }
    /**
     * 座標を取得します。
     * @returns {Vector}
     * @readonly
     */
    get location(){
        return new Vector(this._dl.x,this._dl.y,this._dl.z);
    }
    get native(){
        return this._dl;
    }
    /**
     * 
     * @param {import("@minecraft/server").DimensionLocation} dl 
     */
    constructor(dl){
        this._dl = dl;
    }
}