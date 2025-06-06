import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { Vector } from "../Vector/Vector.js";
import { Block } from "../Block/Block.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { EntityQueryOptions } from "../Interfaces/EntityQueryOptions.js";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { BlockPermutation } from "../Block/BlockPermutation.js";
import { BlockType } from "../Block/BlockType.js";
import { Vector2 } from "../Vector/Vector2.js";

export class Dimension {
  /**
   * @private
   * @type {mc.Dimension}
   */
  _dimension;
  /**
   * 現在居るディメンションのIDが入っています。
   * @readonly
   * @type {string}
   */
  id;
  /**
   * @readonly
   */
  get heightRange(){
    return this._dimension.heightRange;
  }
  /**
   *
   * @param {Vector} location
   * @param {number} radius
   * @param {mc.ExplosionOptions} options
   */
  createExplosion(location, radius, options = {}) {
    this._dimension.createExplosion(location.getMCVector3(), radius, options);
  }
  /**
   * 
   * @param {Vector | mc.Vector3} pos 
   * @param {string | mc.BiomeType} biomeToFind 
   * @param {mc.BiomeSearchOptions | undefined} options 
   */
  findClosestBiome(pos, biomeToFind, options = undefined){
    if(pos instanceof Vector) pos = pos.getMCVector3();
    return new Vector(this._dimension.findClosestBiome(pos, biomeToFind, options));
  }
  /**
   * 指定されたディメンションと座標のブロックを取得します。
   * @param {Vector} location
   */
  getBlock(location) {
    return new Block(this._dimension.getBlock(location.getMCVector3()));
  }
  /**
   * 
   * 指定された座標がアクセス出来る状態かどうかを取得します。
   * @param {Vector} location
   * @returns 
   */
  getBlockIsValid(location){
    try{
      if(location instanceof Vector) this._dimension.getBlock(location.getMCVector3()).isValid();
      return true;
    }catch{return false;}
  }
  /**
   * 指定された数分を取得します。
   * @param {Vector} vector1
   * @param {Vector} vector2
   * @
   * returns {BlockIterator}
   */
  getBlocks(vector1, vector2){
    let check1 = vector1 instanceof Vector? vector1 : new Vector(0, 0, 0);
    let check2 = vector2 instanceof Vector? vector2 : new Vector(0, 0, 0);
    return getBlocks(this, check1, check2.x, check2.y, check2.z);
  }
  /**
   *
   * @param {Vector} location
   * @param {Vector} direction
   * @param {mc.BlockRaycastOptions | BlockRaycastOptions} options
   */
  getBlockFromRay(location, direction, options = {}) {
    if (options instanceof BlockRaycastOptions)
        return this._dimension.getBlockFromRay(location.getMCVector3(), direction.getMCVector3(), options.getOptions())
    else return this._dimension.getBlockFromRay(location.getMCVector3(), direction.getMCVector3(), options);
  }
  /**
   * optionsで指定されたエンティティを返します。
   *
   * optionsは指定がない場合はすべてのエンティティを返します。
   * @param {keyof EntityQueryOptions | EntityQueryOptions} options
   */
  getEntities(options = {}) {
    const push = [];
    if (options instanceof EntityQueryOptions)
      for (const entity of this._dimension.getEntities(options.getOptions())) push.push(new Entity(entity));
    else for (const entity of this._dimension.getEntities(options)) push.push(new Entity(entity));

    return push;
  }
  /**
   * @param {Vector} location
   */
  getEntitiesAtBlockLocation(location) {
    return this._dimension.getEntitiesAtBlockLocation(location.getMCVector3()).map((x) => new Entity(x));
  }
  /**
   * locationからdirectionまでの結んだ範囲内にエンティティが存在したら返ります。
   * @param {Vector} location 
   * @param {Vector} direction 
   * @param {mc.EntityRaycastOptions} options 
   * @returns 
   */
  getEntitiesFromRay(location, direction, options = {}){
    return this._dimension.getEntitiesFromRay(location, direction, options);
  }
  /**
   * 
   * @param {Vector2} locationXZ 
   * @param {number} minHeight 
   * @returns 
   */
  getTopmostBlock(locationXZ, minHeight = undefined){
    const block = this._dimension.getTopmostBlock(locationXZ.toVectorXZ(), minHeight);
    if(!block) return undefined;
    return new Block(block);
  }
  /**
   *
   * @param {{} | EntityQueryOptions} options
   * @returns {Player[]}
   */
  getPlayers(options = {}) {
    if (options instanceof EntityQueryOptions)
      return [...this._dimension.getPlayers(options.getOptions())].map((p) => new Player(p));
    else if (typeof options === "object") return [...this._dimension.getPlayers(options)].map((p) => new Player(p));
  }
  /**
   * 現在のディメンションの天気を取得します。
   * @returns {"Clear" | "Rain" | "Thunder"}
   */
  getWeather(){
    return this._dimension.getWeather();
  }
  /**
   * コマンドを同期処理で実行します。
   * @param {string} commandString
   */
  runCommand(commandString) {
    return this._dimension.runCommand(commandString);
  }
  /**
   * コマンドを非同期処理で実行します。
   * @param {string} commandString
   */
  runCommandAsync(commandString) {
    return this._dimension.runCommandAsync(commandString);
  }
  /**
   * 現在のディメンションの天気を変更します。
   * @param {"Clear" | "Rain" | "Thunder"} weatherType 天候のタイプを指定します。
   * @param {number} duration 何秒間変更するかを指定します。
   */
  setWeather(weatherType, duration = 0){
    this._dimension.setWeather(weatherType, duration);
  }
  /**
   * 指定した座標にブロックを設置します。
   * @param {Vector} location
   * @param {import("../Block/Block.js").BlockID | string | mc.BlockType | mc.BlockPermutation | BlockPermutation } block
   */
  setBlock(location, block, options = {}){
    if(block instanceof BlockPermutation)
      this.setBlockPermutation(location, block, options);
    else 
      this.setBlockType(location, block, options);
  }
  /**
   * 
   * @param {Vector} location 
   * @param {BlockPermutation} permutation 
   */
  setBlockPermutation(location, permutation){
    this._dimension.setBlockPermutation(location.getMCVector3(), permutation.getMCBlockPermutation());
  }
  /**
   * 
   * @param {Vector} location 
   * @param {string | BlockType | mc.BlockType} blockType 
   */
  setBlockType(location, blockType){
    this._dimension.setBlockType(location.getMCVector3(), blockType);
  }
  /**
   * 指定した始終点を基準にブロックを設置します。
   * @param {Vector} begin
   * @param {Vector} end
   * @param {string | mc.BlockType | mc.BlockPermutation | BlockPermutation} block
   * @param {mc.BlockFillOptions | undefined} options
   */
  fillBlocks(begin, end, block, options = undefined){
    if(block instanceof BlockPermutation)
      return this._dimension.fillBlocks(new mc.BlockVolume(begin.getMCVector3(), end.getMCVector3()), block?.getMCBlockPermutation()??block, options);
    else
      return this._dimension.fillBlocks(new mc.BlockVolume(begin.getMCVector3(), end.getMCVector3()), block, options);
  }
  /**
   * 指定されたエンティティを召喚します。
   * @param {string} identifier
   * @param {Vector} location
   * @param {mc.SpawnEntityOptions} options
   */
  spawnEntity(identifier, location, options = undefined) {
    return new Entity(this._dimension.spawnEntity(identifier, location.getMCVector3(), options));
  }
  /**
   * 指定されたアイテムを召喚します。
   * @param {ItemStack} itemStack
   * @param {Vector} location
   */
  spawnItem(itemStack, location) {
    if(!itemStack instanceof ItemStack) return undefined;
    return new Entity(this._dimension.spawnItem(itemStack?.getItemStack(), location.getMCVector3()));
  }
  /**
   * 指定されたパーティクルを召喚します。
   * @param {string} effectName
   * @param {Vector} location
   * @param {mc.MolangVariableMap} molangVariableMap
   */
  spawnParticle(effectName, location, molangVariableMap = new mc.MolangVariableMap()) {
    this._dimension.spawnParticle(effectName, location.getMCVector3(), molangVariableMap);
  }
  /**
   * マイクラ公式のDimensionクラスを返します。
   * @deprecated
   * @returns {mc.Dimension}
   */
  getMCDimension() {
    return this._dimension;
  }

  /**
   * @overload
   */
  constructor(dimension) {
    try {
      if (typeof dimension == "string") this._dimension = mc.world.getDimension(dimension);
      else this._dimension = dimension;
      this.id = this._dimension.id;
    } catch (e) {}
  }
}

/**
 * @param {Dimension} dimension
 * @param {Vector} vector
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function* getBlocks(dimension, vector, x, y, z){
  let checkx = x >= 0?true:(x*=-1,false)
  let checky = y >= 0?true:(y*=-1,false)
  let checkz = z >= 0?true:(z*=-1,false)

  for(let lx = 0; lx < x+1; lx++){
    for(let ly = 0; ly < y+1; ly++){
      for(let lz = 0; lz < z+1; lz++){
        yield dimension.getBlock(vector.changeOffset(checkx?lx:lx*-1, checky?ly:ly*-1, checkz?lz:lz*-1))
      }
    } 
  }
}
