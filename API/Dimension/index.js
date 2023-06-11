import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { Vector } from "../Vector/Vector.js";
import { Block } from "../Block/Block.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { EntityQueryOptions } from "../Interfaces/EntityQueryOptions.js";
import { Entity } from "../Entity/index.js";
import { ItemStack } from "../ItemStack/ItemStack.js";

export class Dimension {
  /**
   * @private
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

    return push[Symbol.iterator]();
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
   * コマンドを非同期処理で実行します。
   * @param {string} commandString
   */
  runCommandAsync(commandString) {
    return this._dimension.runCommandAsync(commandString);
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
    return new Entity(this._dimension.spawnItem(itemStack.getItemStack(), location.getMCVector3()));
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
   * @param {mc.Dimension | string} dimension
   */
  constructor(dimension) {
    try {
      if (typeof dimension == "string") this._dimension = mc.world.getDimension(dimension);
      else this._dimension = dimension;
      this.id = this._dimension.id;
    } catch (e) {}
  }
}
