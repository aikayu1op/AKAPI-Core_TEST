import * as mc from "@minecraft/server";
import { Vector } from "../Vector/Vector.js";

/**
 * world.getPlayers()や\<Dimension\>.getEntities() の判定範囲を限定化するオプションです。
 */
export class EntityQueryOptions {
  /**
   * @private
   */
  alldata = {};
  /**
   * @type {number}
   */
  closests;
  /**
   * @type {string[]}
   */
  excludeFamilies;
  /**
   * @type {keyof mc.GameMode[]}
   */
  excludeGameModes;
  /**
   * @type {string[]}
   */
  excludeNames;
  /**
   * @type {string[]}
   */
  excludeTags;
  /**
   * @type {string[]}
   */
  excludeTypes;
  /**
   * @type {string[]}
   */
  families;
  /**
   * @type {string}
   */
  farthest;
  /**
   * @type {mc.GameMode}
   */
  gameMode;
  /**
   * @type {Vector}
   */
  location;
  /**
   * @type {number}
   */
  maxDistance;
  /**
   * @type {number}
   */
  maxHorizontalRotation;
  /**
   * @type {number}
   */
  maxLevel;
  /**
   * @type {number}
   */
  maxVerticalRotation;
  /**
   * @type {number}
   */
  minDistance;
  /**
   * @type {number}
   */
  minHorizontalRotation;
  /**
   * @type {number}
   */
  minLevel;
  /**
   * @type {number}
   */
  minVerticalRotation;
  /**
   * @type {string}
   */
  name;
  /**
   * @type {{exclude?: boolean, maxScore?: number, minScore?: number, objective?: string}}
   */
  scoreOptions;
  /**
   * @type {string[]}
   */
  tags;
  /**
   * @type {string}
   */
  type;
  /**
   * @type {mc.BlockAreaSize}
   */
  volume;

  getOptions() {
    if (!!this.closests) this.alldata.closests = this.closests;
    if (!!this.excludeFamilies) this.alldata.excludeFamilies = this.excludeFamilies;
    if (!!this.excludeGameModes) this.alldata.excludeGameModes = this.excludeGameModes;
    if (!!this.excludeNames) this.alldata.excludeNames = this.excludeNames;
    if (!!this.excludeTags) this.alldata.excludeTags = this.excludeTags;
    if (!!this.excludeTypes) this.alldata.excludeTypes = this.excludeTypes;
    if (!!this.families) this.alldata.families = this.families;
    if (!!this.farthest) this.alldata.farthest = this.farthest;
    if (!!this.gameMode) this.alldata.gameMode = this.gameMode;
    if (!!this.location) this.alldata.location = this.location.getMCVector3();
    if (!!this.maxDistance) this.alldata.maxDistance = this.maxDistance;
    if (!!this.maxHorizontalRotation) this.alldata.maxHorizontalRotation = this.maxHorizontalRotation;
    if (!!this.maxLevel) this.alldata.maxLevel = this.maxLevel;
    if (!!this.maxVerticalRotation) this.alldata.maxVerticalRotation = this.maxVerticalRotation;
    if (!!this.minDistance) this.alldata.minDistance = this.minDistance;
    if (!!this.minHorizontalRotation) this.alldata.minHorizontalRotation = this.minHorizontalRotation;
    if (!!this.minLevel) this.alldata.minLevel = this.minLevel;
    if (!!this.minVerticalRotation) this.alldata.minVerticalRotation = this.minVerticalRotation;
    if (!!this.name) this.alldata.name = this.name;
    if (!!this.scoreOptions) this.alldata.scoreOptions = this.scoreOptions;
    if (!!this.tags) this.alldata.tags = this.tags;
    if (!!this.type) this.alldata.type = this.type;
    return this.alldata;
  }
  constructor() {}
}
