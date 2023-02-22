import * as mc from "@minecraft/server";
import { Vector } from "../Vector/index.js";
import { Location } from "./Location.js";

export class BlockLocation {
  /**
   * BlockLocationの一個上(y+1)を返します。
   * @returns {BlockLocation}
   */
  above() {
    return new BlockLocation(this.x, this.y + 1, this.z);
  }
  /**
   *
   * @param {BlockLocation} other
   * @returns {BlockLocation[]}
   */
  blockBetween(other) {
    const array = this.getBlockLocation().blocksBetween(other.getBlockLocation());
    const push = [];
    for (const data of array) push.push(new BlockLocation(data));
    return push;
  }
  /**
   * BlockLocationの位置が正しいかどうかをチェックします。
   * @param {BlockLocation} other
   */
  equals(other) {
    if (this.x == other.x && this.y == other.y && this.z == other.z) return true;
    else return false;
  }
  /**
   * BlockLocationのオフセットを調節できます。
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  offset(x = 0, y = 0, z = 0) {
    return new BlockLocation(this.x + x, this.y + y, this.z + z);
  }
  /**
   * マイクラ公式のBlockLocationクラスを返します。
   * @deprecated
   * @returns {mc.BlockLocation}
   */
  getMCBlockLocation() {
    return new mc.BlockLocation(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
  }
  /**
   * マイクラ公式のLocationクラスを返します。
   * @deprecated
   * @returns {mc.Location}
   */
  getMCLocation() {
    return new mc.Location(this.x, this.y, this.z);
  }
  /**
   * AKAPIのLocationクラスを返します。
   */
  convertLocation() {
    return new Location(this);
  }
  /**
   * AKAPIのVectorクラスを返します。
   */
  convertVector() {
    return new Vector(this);
  }

  /**
   *
   * @param {number | Location | Vector | mc.BlockLocation | mc.Location | mc.Vector3} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    if (
      x instanceof Location ||
      x instanceof Vector ||
      x instanceof mc.BlockLocation ||
      x instanceof mc.Location
    ) {
      this.x = Math.floor(x.x);
      this.y = Math.floor(x.y);
      this.z = Math.floor(x.z);
    } else if(typeof x === "number") {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
      this.z = Math.floor(z);
    }
  }
}
