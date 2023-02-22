
export class MusicOptions{
    /**
     * @private
     */
    alldata = {};
    volume = -32767;
    fade = -32767;
    /**
     * @type {boolean}
     */
    loop = null;
    getOptions(){
        if(this.volume != -32767) this.alldata.volume = this.volume;
        if(this.fade != -32767) this.alldata.fade = this.fade;
        if(this.loop != null) this.alldata.loop = this.loop;
        return this.alldata;
    }
    constructor(){}
}