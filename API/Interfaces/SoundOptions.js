import { Location } from "@minecraft/server";
export class SoundOptions{
    /**
     * @private
     */
    alldata = {};
    volume = -32767;
    pitch = -32767;
    /**
     * @type {Location}
     */
    location = null;
    getOptions(){
        if(this.volume != -32767) this.alldata.volume = this.volume;
        if(this.pitch != -32767) this.alldata.pitch = this.pitch;
        if(this.location != null && this.location instanceof Location) this.alldata.location = this.location;
        return this.alldata;
    }
    constructor(){}
}