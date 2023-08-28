import * as mc from "@minecraft/server";
import { Vec3 } from "./Vec3.js";
import { world } from "../../index.js";

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
   * xyzが0であればtrueを、それ以外であればfalseを返します。
   * @readonly
   * @type {boolean}
   */
  isZero;
  get isZero(){
    return (this.x == 0 && this.y == 0 && this.z == 0) ? true: false
  }
  /**
   * クローンを生成します。
   */
  clone(){
    return new Vector(this.x, this.y, this.z);
  }

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
  /*normalised() {
    return new Vector(this.getMCVector().normalized());
  }*/
  normalized(){
    return new Vector(new Vec3(this).normalized);
  }
  /**
   * ２つのVectorを足し合わせます。
   * @param {this} vector
   */
  add(vector){
    return new Vector(new Vec3(this).add(vector.getMCVector3()));
  }
  /**
   * ２つのVectorから外積を求めます。
   * @param {this} vector 
   * @returns 
   */
  cross(vector){
    return new Vector(new Vec3(this).cross(vector.getMCVector3()))
  }
  /**
   * ２つのVectorから距離を求めます。
   * @param {this} vector
   * @returns 
   */
  distance(vector){
    return new Vector(new Vec3(this).distance(vector.getMCVector3()))
  }
  /**
   * ２つのVectorから内積を求めます。
   * @param {this} vector 
   * @returns 
   */
  dot(vector){
    return new Vector(new Vec3(this).dot(vector.getMCVector3()))
  }
  /**
   * 
   */
  floor(){
    return new Vector(new Vec3(this).floor())
  }
  /**
   * ２つのVectorから線形補間を計算します。
   * @param {this} vector 
   * @param {this} vector2
   * @param {number} t
   * @returns 
   */
  lerp(vector, t){
    return new Vector(new Vec3(this).lerp(vector.getMCVector3(), t))
  }
  /**
   * ２つのVectorからスカラー値を計算します。
   * @param {this | number} num
   * @returns 
   */
  multiply(num){
    return new Vector(new Vec3(this).multiply(typeof num ? num : num instanceof Vector ? num.getMCVector3() : 1))
  }
  magnitude(){
    return Math.sqrt(this.x * this.x, this.y * this.y, this.z * this.z);
  }
  /**
   * "a"から'b'への射影を計算します。
   * @param {this} vector 
   * @returns 
   */
  projection(vector){
    return new Vector(new Vec3(this).projection(vector.getMCVector3()))
  }
  /**
   * 
   * @param {this} vector 
   * @returns 
   */
  reflect(vector){
    return new Vector(new Vec3(this).reflect(vector.getMCVector3()))
  }
  /**
   * 
   * @param {this} vector 
   * @returns 
   */
  rejection(vector){
    return new Vector(new Vec3(this).rejection(vector.getMCVector3()))
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
   * Vectorのオフセットを変更します。
   * @overload
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {this}
   * @overload
   * @param {Vector} vector
   * @returns {this}
   */
  changeOffset(x, y, z) {
    if(x instanceof Vector){
      this.x += x.x;
      this.y += x.y;
      this.z += x.z;
      return this;
    }else if(typeof x === "number" && typeof y === "number" && typeof z === "number"){
      this.x += x;
      this.y += y;
      this.z += z;
    }
    return this;
  }
  /**
   * x, y, zを強制的に設定します。
   * @param {{x: number, y: number, z: number}} param
   */
  setVector(param){
    //world.sendMessage(JSON.stringify(param));
    if(!param.hasOwnProperty("x")) param.x = this.x
    if(!param.hasOwnProperty("y")) param.y = this.y
    if(!param.hasOwnProperty("z")) param.z = this.z
    this.x = param.x;
    this.y = param.y;
    this.z = param.z;
    return this;
  }
  

  /**
   * ベクターを生成します。
   * x部分にマイクラ公式のVector3を入れることも可能です。
   * @overload
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @overload
   * @param {mc.Vector3 | mc.Vector | Vector} vector
   */
  constructor(x, y, z) {
    if(x instanceof mc.Vector || x instanceof Vector){
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
    }
    else if(typeof x == "object" && "x" in x && "y" in x && "z" in x){
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
    }else{
        this.x = x;
        this.y = y;
        this.z = z;
    }
    if(this.x == 0 && this.y == 0 && this.z == 0) this.isZero = true;
    else this.isZero = false;
  }
}
