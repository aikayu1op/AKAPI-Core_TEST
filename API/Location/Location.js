import * as mc from "@minecraft/server";
import { Vector } from "./Vector.js";
import { BlockLocation } from "./BlockLocation.js";
export class Location {
  /**
   * @type {number}
   */
  x;
  /**
   * @type {number}
   */
  y;
  /**
   * @type {number}
   */
  z;

  /**
   * マイクラ公式のLocationクラスに直します。
   * @deprecated
   */
  getMCLocation() {
    return new mc.Location(this.x, this.y, this.z);
  }
  /**
   * マイクラ公式のBlockLocationクラスに直します。
   * @deprecated
   */
  getMCBlockLocation() {
    return new mc.BlockLocation(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
  }
  /**
   *
   * @param {Location} location
   */
  equals(location) {
    if (this.x == location.x && this.y == location.y && this.z == location.z) return true;
    else return false;
  }
  /**
   *
   * @param {Location} other
   * @param {number} epsilon
   */
  isNear(other, epsilon) {
    return this.getLocation().isNear(other.getLocation(), epsilon);
  }
  /**
   * マイクラ公式のVector3のインターフェースを返します。
   */
  getMCVector3() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }
  /**
   * AKAPIのVectorクラスを返します。
   * @returns
   */
  convertVector() {
    return new Vector(this);
  }
  /**
   * AKAPIのBlockLocationクラスを返します。
   */
  convertBlockLocation() {
    return new BlockLocation(this);
  }

  /**
   * AKAPIのLocationを生成します。
   * xにいくつかのクラスを入れることもできます。
   * @param {mc.Vector | Vector | number | BlockLocation | mc.BlockLocation | mc.Location} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    if (
      x instanceof Vector ||
      x instanceof BlockLocation ||
      x instanceof mc.Location ||
      x instanceof mc.BlockLocation ||
      x instanceof mc.Vector
    ) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
}
