import * as mc from "@minecraft/server";
import { Player } from "../Player/index.js";
import { Vector } from "../Location/Vector.js";
import { BlockLocation, Location } from "../Location/index.js";
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
    this._dimension.createExplosion(location.getMCLocation(), radius, options);
  }
  /**
   * 指定されたディメンションと座標のブロックを取得します。
   * @param { BlockLocation | Location | Vector} location
   */
  getBlock(location) {
    return new Block(this._dimension.getBlock(location.getMCBlockLocation()));
  }
  /**
   *
   * @param {Vector} location
   * @param {Vector} direction
   * @param {BlockRaycastOptions | {}} options
   */
  getBlockFromRay(location, direction, options = {}) {
    if (options instanceof BlockRaycastOptions)
      return this._dimension.getBlockFromRay(location.getMCLocation(), direction.getMCLocation(), options.getOptions());
    else return this._dimension.getBlockFromRay(location.getMCLocation(), direction.getMCLocation(), options);
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
   * @param {BlockLocation | Location} location
   */
  getEntitiesAtBlockLocation(location) {
    /**
     * @type {Entity[]}
     */
    const push = [];
    for (const entity of this._dimension.getEntitiesAtBlockLocation(location.getMCBlockLocation()))
      push.push(new Entity(entity));
    return push;
  }
  /**
   *
   * @param {{} | EntityQueryOptions} options
   * @returns {Player[]}
   */
  getPlayers(options = {}) {
    /**
     * @type {Player[]}
     */
    let allPlayer = [];
    if (options instanceof EntityQueryOptions) {
      [...this._dimension.getPlayers(options.getOptions())].forEach((p) => allPlayer.push(new Player(p)));
      return allPlayer;
    } else if (typeof options === "object") {
      [...this._dimension.getPlayers(options)].forEach((p) => allPlayer.push(new Player(p)));
      return allPlayer;
    }
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
   * @param {Location | BlockLocation | Vector} location
   */
  spawnEntity(identifier, location) {
    return new Entity(this._dimension.spawnEntity(identifier, location.getMCLocation()));
  }
  /**
   * 指定されたアイテムを召喚します。
   * @param {ItemStack} itemStack
   * @param {Location | BlockLocation | Vector} location
   */
  spawnItem(itemStack, location) {
    return new Entity(this._dimension.spawnItem(itemStack.getItemStack(), location.getMCLocation()));
  }
  /**
   * 指定されたパーティクルを召喚します。
   * @param {string} effectName
   * @param {Location | BlockLocation | Vector} location
   * @param {mc.MolangVariableMap} molangVariableMap
   */
  spawnParticle(effectName, location, molangVariableMap = new mc.MolangVariableMap()) {
    this._dimension.spawnParticle(effectName, location.getMCLocation(), molangVariableMap);
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
