import { Dimension } from "../Dimension/index.js";
import { Vector } from "../Vector/Vector.js";
import { Vector2 } from "../Vector/Vector2.js";

export class TeleportOptions{
    /**
     * @type {Dimension}
     */
    dimension;
    /**
     * @type {boolean}
     */
    keepVelocity;
    /**
     * @type {Vector2}
     */
    rotation;
    /**
     * @type {boolean}
     */
    checkForBlocks;
    /**
     * @type {Vector}
     */
    facingLocation;
    /**
     * TeleportのオプションをObject化します。
     * @deprecated
     */
    toObject(){
        let obj = {};
        if(!!this.dimension && this.dimension instanceof Dimension) obj.dimension = this.dimension;
        if(!!this.keepVelocity && typeof this.keepVelocity === "boolean") obj.keepVelocity = this.keepVelocity;
        if(!!this.rotation && typeof this.rotation instanceof Vector2) obj.rotation = this.rotation.toObject();
        if(!!this.checkForBlocks && typeof this.checkForBlocks === "boolean") obj.checkForBlocks = this.checkForBlocks;
        if(!!this.facingLocation && this.facingLocation instanceof Vector) obj.facingLocation = this.facingLocation.getMCVector3();

        return obj;
    }
    constructor(){}
}