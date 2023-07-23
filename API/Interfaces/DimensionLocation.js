import { Dimension } from "../Dimension/index.js";
import { Vector } from "../Vector/Vector.js";

export class DimensionLocation{
    /**
     * @private
     */
    _dl;
    /**
     * ディメンションを取得します。
     * @readonly
     */
    get dimension(){
        return Dimension(this._dl.dimension);
    }
    /**
     * 座標を取得します。
     * @readonly
     */
    get location(){
        return Vector(this._dl.x,this._dl.y,this._dl.z);
    }
    /**
     * 
     * @param {import("@minecraft/server").DimensionLocation} dl 
     */
    constructor(dl){
        this._dl = dl;
    }
}