export class BlockRaycastOptions{
    /**
     * @private
     */
    alldata = {};
    /**
     * @type {boolean}
     */
    includeLiquidBlocks = null;
    /**
     * @type {boolean}
     */
    includePassableBlocks = null;
    /**
     * @type {number}
     */
    maxDistance = null;
    getOptions(){
        if(this.includeLiquidBlocks != null && typeof(this.includeLiquidBlocks) == "boolean") this.alldata.includeLiquidBlocks = this.includeLiquidBlocks;
        if(this.includePassableBlocks != null && typeof(this.includePassableBlocks) == "boolean") this.alldata.includePassableBlocks = this.includePassableBlocks;
        if(this.maxDistance != null && typeof(this.maxDistance) == "number") this.alldata.maxDistance = this.maxDistance;
        return this.alldata;
    }
    constructor(){}
}