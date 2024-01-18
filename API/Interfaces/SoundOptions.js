import { Vector } from "../Vector/Vector.js";
export class SoundOptions {
  volume = -32767;
  pitch = -32767;
  /**
   * @type {Vector}
   */
  location = null;
  getOptions() {
    let alldata = {};
    if (this.volume != -32767) alldata.volume = this.volume;
    if (this.pitch != -32767) alldata.pitch = this.pitch;
    if (this.location != null && this.location instanceof Vector) alldata.location = this.location.getMCVector3();
    return alldata;
  }
  /**
   * 
   * @param {ISoundOptions} obj 
   */
  constructor(obj = undefined){
    if(typeof obj !== undefined){
      this.volume =   obj?.volume;
      this.pitch =    obj?.pitch;
      this.location = obj?.location;
    }
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
