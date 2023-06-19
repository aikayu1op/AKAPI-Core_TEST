import { Vector } from "../Vector/Vector.js";
export class SoundOptions {
  /**
   * @private
   */
  alldata = {};
  volume = -32767;
  pitch = -32767;
  /**
   * @type {Vector}
   */
  location = null;
  getOptions() {
    if (this.volume != -32767) this.alldata.volume = this.volume;
    if (this.pitch != -32767) this.alldata.pitch = this.pitch;
    if (this.location != null && this.location instanceof Vector) this.alldata.location = this.location.getMCVector3();
    return this.alldata;
  }
  /**
   * 
   * @param {ISoundOptions} obj 
   */
  constructor(obj){
    this.volume =   obj.volume;
    this.pitch =    obj.pitch;
    this.location = obj.location;
  }
}
export class ISoundOptions{
  /**
   * @type {number}
   */
  volume;
  /**
   * @type {number}
   */
  pitch;
  /**
   * @type {Vector}
   */
  location;
  /**
   * @protected
   */
  constructor(){}
}
