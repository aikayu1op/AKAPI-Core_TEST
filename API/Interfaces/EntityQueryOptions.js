import * as mc from "@minecraft/server";

/**
 * world.getPlayers()や\<Dimension\>.getEntities() の判定範囲を限定化するオプションです。
 */
export class EntityQueryOptions {
  /**
   * @private
   */
  alldata = {};
  closests = -32767;
  excludeFamilies = [""];
  /**
   * @type {mc.GameMode[]}
   */
  excludeGameModes = [""];
  excludeNames = [""];
  excludeTags = [""];
  excludeTypes = [""];
  families = [""];
  farthest = -32767;
  /**
   * @type {mc.GameMode}
   */
  gameMode = "";
  /**
   * @type {Location}
   */
  location = "";
  maxDistance = -32767;
  maxHorizontalRotation = -32767;
  maxLevel = -32767;
  maxVerticalRotation = -32767;
  minDistance = -32767;
  minHorizontalRotation = -32767;
  minLevel = -32767;
  minVerticalRotation = -32767;
  name = "";
  /**
   * @type {{exclude?: boolean, maxScore?: number, minScore?: number, objective?: string}}
   */
  scoreOptions = "";
  tags = [""];
  type = "";
  /**
   * @type {mc.BlockAreaSize}
   */
  volume = "";

  getOptions() {
    if (this.closests != -32767) this.alldata.closests = this.closests;
    if (this.excludeFamilies != "") this.alldata.excludeFamilies = this.excludeFamilies;
    if (this.excludeGameModes != "") this.alldata.excludeGameModes = this.excludeGameModes;
    if (this.excludeNames != "") this.alldata.excludeNames = this.excludeNames;
    if (this.excludeTags != "") this.alldata.excludeTags = this.excludeTags;
    if (this.excludeTypes != "") this.alldata.excludeTypes = this.excludeTypes;
    if (this.families != "") this.alldata.families = this.families;
    if (this.farthest != -32767) this.alldata.farthest = this.farthest;
    if (this.gameMode != "") this.alldata.gameMode = this.gameMode;
    if (this.location != "") this.alldata.location = this.location;
    if (this.maxDistance != -32767) this.alldata.maxDistance = this.maxDistance;
    if (this.maxHorizontalRotation != -32767) this.alldata.maxHorizontalRotation = this.maxHorizontalRotation;
    if (this.maxLevel != -32767) this.alldata.maxLevel = this.maxLevel;
    if (this.maxVerticalRotation != -32767) this.alldata.maxVerticalRotation = this.maxVerticalRotation;
    if (this.minDistance != -32767) this.alldata.minDistance = this.minDistance;
    if (this.minHorizontalRotation != -32767) this.alldata.minHorizontalRotation = this.minHorizontalRotation;
    if (this.minLevel != -32767) this.alldata.minLevel = this.minLevel;
    if (this.minVerticalRotation != -32767) this.alldata.minVerticalRotation = this.minVerticalRotation;
    if (this.name != "") this.alldata.name = this.name;
    if (this.scoreOptions != "") this.alldata.scoreOptions = this.scoreOptions;
    if (this.tags != "") this.alldata.tags = this.tags;
    if (this.type != "") this.alldata.type = this.type;
    return this.alldata;
  }
  constructor(){}
}