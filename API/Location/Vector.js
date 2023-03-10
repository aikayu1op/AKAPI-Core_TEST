import * as mc from "@minecraft/server";
import { BlockLocation } from "./BlockLocation.js";
import { Location } from "./Location.js";

export class Vector {
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
   * ベクトルを表す定数から(0, 0, -1)変更したVectorが返されます。
   */
  getBack() {
    return this.changeOffset(0, 0, -1);
  }
  /**
   * ベクトルを表す定数から(0, -1, 0)変更したVectorが返されます。
   */
  getDown() {
    return this.changeOffset(0, -1, 0);
  }
  /**
   * ベクトルを表す定数から(0, 0, 1)変更したVectorが返されます。
   */
  getForward() {
    return this.changeOffset(0, 0, 1);
  }
  /**
   * ベクトルを表す定数から(-1, 0, 0)変更したVectorが返されます。
   */
  getLeft() {
    return this.changeOffset(-1, 0, 0);
  }
  /**
   * ベクトルを表す定数から(1, 1, 1)変更したVectorが返されます。
   */
  getOne() {
    return this.changeOffset(1, 1, 1);
  }
  /**
   * ベクトルを表す定数から(-1, -1, -1)変更したVectorが返されます。
   */
  getMinusOne() {
    return this.changeOffset(-1, -1, -1);
  }
  /**
   * ベクトルを表す定数から(1, 0, 0)変更したVectorが返されます。
   */
  getRight() {
    return this.changeOffset(1, 0, 0);
  }
  /**
   * ベクトルを表す定数から(0, 1, 0)変更したVectorが返されます。
   */
  getUp() {
    return this.changeOffset(0, 1, 0);
  }
  /**
   * ベクトルを表す定数から(0, 0, 0)変更したVectorが返されます。
   */
  getZero() {
    return this.changeOffset(0, 0, 0);
  }
  /**
   * このベクターが引数のベクターと同じかどうかを取得します。
   * @param {Vector} vector
   */
  equals(vector) {
    if (this.x == vector.x && this.y == vector.y && this.z == vector.z) return true;
    else return false;
  }
  length() {
    return this.getMCVector().length();
  }
  lengthSquared() {
    return new Vector(this.getMCVector().lengthSquared());
  }
  normalised() {
    return new Vector(this.getMCVector().normalized());
  }
  /**
   * マイクラが提供しているVectorクラスを返します。
   * @deprecated
   */
  getMCVector() {
    return new mc.Vector(this.x, this.y, this.z);
  }
  /**
   * マイクラが提供しているVector3インターフェースを返します。
   * @deprecated
   */
  getMCVector3() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }
  /**
   * マイクラが提供しているLocationクラスを返します。
   * @deprecated
   */
  getMCLocation() {
    return new mc.Location(this.x, this.y, this.z);
  }
  /**
   * マイクラが提供しているBlockLocationクラスを返します。
   * @deprecated
   */
  getMCBlockLocation() {
    return new mc.BlockLocation(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
  }
  /**
   * AKAPIのLocationクラスを返します。
   * @returns {Location}
   */
  convertLocation() {
    return new Location(this);
  }
  /**
   * AKAPIのBlockLocationクラスを返します。
   * @returns {BlockLocation}
   */
  convertBlockLocation() {
    return new BlockLocation(this);
  }
  /**
   * Vectorのオフセットを変更します。
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  changeOffset(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * ベクターを生成します。
   * x部分にマイクラ公式のVector3を入れることや、APIのLocationも可能です。
   * @param {number | mc.Vector3 | mc.Vector | mc.Location | Location | BlockLocation} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    if (
      x instanceof mc.Vector ||
      x instanceof mc.Location ||
      x instanceof Location ||
      x instanceof BlockLocation ||
      "x" in x
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
