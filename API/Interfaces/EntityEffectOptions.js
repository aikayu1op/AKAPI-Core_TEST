export class EntityEffectOptions{

    /**
     * @type {number}
     */
    amplifier;
    /**
     * @type {boolean}
     */
    showParticles = false;
    /**
     * @deprecated
     */
    toObject(){
        let obj = {};
        if(!!this.amplifier && typeof this.amplifier === "number") obj.amplifier = this.amplifier;
        if(typeof this.showParticles === "boolean") obj.showParticles = this.showParticles;
        return obj;
    }
    constructor(){}
}