import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { Vector } from "../Vector/Vector.js";
import { Block } from "../Block/Block.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { EntityQueryOptions } from "../Interfaces/EntityQueryOptions.js";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { BlockPermutation } from "../Block/BlockPermutation.js";

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
   *
   * @param {Vector} location
   * @param {number} radius
   * @param {mc.ExplosionOptions} options
   */
  createExplosion(location, radius, options = {}) {
    this._dimension.createExplosion(location.getMCVector3(), radius, options);
  }
  /**
   * 指定されたディメンションと座標のブロックを取得します。
   * @param {Vector} location
   */
  getBlock(location) {
    return new Block(this._dimension.getBlock(location.getMCVector3()));
  }
  /**
   * 指定された数分を取得します。
   * @param {Vector} vector1
   * @param {Vector} vector2
   * @returns {BlockIterator}
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
   * @param {BlockRaycastOptions | {}} options
   */
  getBlockFromRay(location, direction, options = {}) {
    if (options instanceof BlockRaycastOptions)
      return new Block(
        this._dimension.getBlockFromRay(location.getMCVector3(), direction.getMCVector3(), options.getOptions())
      );
    else return new Block(this._dimension.getBlockFromRay(location.getMCVector3(), direction.getMCVector3(), options));
  }
  /**
   * optionsで指定されたエンティティを返します。
   *
   * optionsは指定がない場合はすべてのエンティティを返します。
   * @param {EntityQueryOptions | {}} options
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
   * 指定した座標にブロックを設置します。
   * @param {Vector} location
   * @param {string | mc.BlockType | mc.BlockPermutation | BlockPermutation} block
   * @param {mc.BlockFillOptions | undefined} options
   */
  setBlock(location, block, options = undefined){
    if(block instanceof BlockPermutation)
      this._dimension.fillBlocks(location.getMCVector3(), location.getMCVector3(), block?.getMCBlockPermutation(), options);
    else 
      this._dimension.fillBlocks(location.getMCVector3(), location.getMCVector3(), block, options);
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
      return this._dimension.fillBlocks(begin.getMCVector3(), end.getMCVector3(), block?.getMCBlockPermutation()??block, options);
    else
      return this._dimension.fillBlocks(begin.getMCVector3(), end.getMCVector3(), block, options);
  }
  /**
   * 指定されたエンティティを召喚します。
   * @param {string} identifier
   * @param {Vector} location
   */
  spawnEntity(identifier, location) {
    return new Entity(this._dimension.spawnEntity(identifier, location.getMCVector3()));
  }
  /**
   * 指定されたアイテムを召喚します。
   * @param {ItemStack} itemStack
   * @param {Vector} location
   */
  spawnItem(itemStack, location) {
    return new Entity(this._dimension.spawnItem((itemStack instanceof ItemStack)? itemStack.getItemStack() : undefined, location.getMCVector3()));
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
