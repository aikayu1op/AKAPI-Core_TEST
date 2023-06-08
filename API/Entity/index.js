import * as mc from "@minecraft/server";
import { Components } from "../Components/EntityComponents.js";
import { Vector } from "../Vector/index.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { Dimension } from "../Dimension/index.js";
import { world } from "../World/index.js";
import { Block } from "../Block/Block.js";

export class Entity {
  /**
   * エンティティの足元からの座標クラスが返ります。
   * @type {Vector}
   * @readonly
   */
  location;
  /**
   * @readonly
   * @type {string}
   */
  id;
  /**
   * エンティティの現在いるディメンションクラスを取得します。
   * @type {Dimension}
   * @readonly
   */
  dimension;
  /**
   * エンティティが向いている方向のクラスが返ります。
   * @readonly
   */
  rotation;
  /**
   * @readonly
   */
  target;
  /**
   * エンティティを表すScoreboardIdentityクラスが返ります。
   * 使い方例(公式クラスを使っています。)
   * ```
   * import { world } from "@minecraft/server";
   *
   * world.beforeEvents.chatSend.subscribe((ev) =>{
   *    let score = world.scoreboard.getObjective("スコアの名前").getScore(ev.sender.scoreboard);
   *    if(score >= 10) ev.sender.tell("スコア10以上あります。");
   * })
   * ```
   * @readonly
   */
  scoreboard;
  /**
   * エンティティのアイデンティティが返ってきます。
   * 例として、鶏をtypeIdした際はminecraft:chickenが返ってきます。
   * @type {string}
   * @readonly
   */
  typeId;

  /**
   * エンティティにエフェクトを追加します。
   * 書き方例(公式クラスを使用しています。)
   * ```
   * import { world, Player, MinecraftEffectTypes } from "@minecraft/server";
   *
   * world.beforeEvents.chatSend.subscribe((ev) =>{
   *    //スピードエフェクト付与
   *    ev.sender.addEffect(MinecraftEffectTypes.speed, 20, 1, false);
   * })
   * ```
   * @param {mc.EffectType} effectType エフェクトタイプを指定します。
   * @param {number} duration 時間を指定しますが、tickで指定してください。(20/1tick)
   * @param {number} amplifier 効果レベルを指定します。
   * @param {boolean} showParticles パーティクルを表示するかどうか
   */
  addEffect(effectType, duration = 400, amplifier = 0, showParticles = false) {
    this._entity.addEffect(effectType, duration, amplifier, showParticles);
  }
  /**
   * エンティティにタグを設定します。
   * @param {String} tag ここで指定された名前でタグを付与します。
   */
  addTag(tag) {
    this._entity.addTag(tag);
  }
  /**
   * 現在の速度に衝撃を与えたベクトルを追加します。
   * @param {Vector} vector
   */
  applyImpulse(vector) {
    this._entity.applyImpulse(vector.getMCVector3());
  }
  /**
   *
   * @param {number} directionX
   * @param {number} directionZ
   * @param {number} horizontalStrength
   * @param {number} verticalStrength
   */
  applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength) {
    this._entity.applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength);
  }
  /**
   * 速度をリセットさせます。
   */
  clearVelocity() {
    this._entity.clearVelocity();
  }
  /**
   * エンティティが向いている方向のブロッククラスを返します。
   * @param { BlockRaycastOptions || {} } options 距離等のオプションの設定
   */
  getBlockFromViewDirection(options = {}) {
    if (options instanceof BlockRaycastOptions)
      return new Block(this._entity.getBlockFromViewDirection(options.getOptions()));
    else return new Block(this._entity.getBlockFromViewDirection(options));
  }
  /**
   * エンティティのコンポーネントを設定・取得するクラスを返します。(自作クラス)
   */
  getComponent() {
    return Components.getEntity(this._entity);
  }
  /**
   * エンティティ(エンティティ)に登録されているコンポーネントをすべて返します。
   * 基本的な使い方
   * ```
   * //<Player>はこのクラスを表します。
   * for(const components of <Player>.getComponents()){
   *    <Player>.tell(components.typeId);
   * }
   * //これで登録されているコンポーネントの名前を取得することが出来ます。
   *
   * ```
   */
  getComponents() {
    return Components.getEntity(this._entity).getComponents();
  }
  /**
   *
   * @param {string} identifier 取得したいデータ
   */
  getDynamicProperty(identifier) {
    return this._entity.getDynamicProperty(identifier);
  }
  /**
   * エンティティに指定されたEffectTypeが付与しているかどうかを返します。付与されている場合はEffectクラスが返り、そうじゃない場合はundefinedを返します。
   * @param {mc.EffectType} effectType 取得したいエフェクトタイプ
   */
  getEffect(effectType) {
    try {
      return this._entity.getEffect(effectType);
    } catch (e) {
      return undefined;
    }
  }
  /**
   * エンティティが向いている方向のエンティティを取得します。
   * @param {mc.EntityRaycastOptions} options 範囲の設定ができます。
   */
  getEntitiesFromViewDirection(options = {}) {
    return this._entity.getEntitiesFromViewDirection(options).map((x) => new Entity(x));
  }
  /**
   * マイクラ公式のEntityクラスを返します。
   * @deprecated
   * @returns {mc.Entity}
   */
  getMCEntity() {
    return this._entity;
  }
  /**
   * EntityクラスからPlayerクラスへ変換します。
   */
  convertPlayer() {
    return world.getPlayers({
      name: this.NameTag(),
      location: this.location,
      maxDistance: 1,
      minDistance: 1,
    })[0];
  }
  /**
   * スコアを取得します。
   *
   * 値が存在しない場合はfalseを返します。
   * @param {string} objectiveId 取得したいオブジェクト
   */
  getScore(objectiveId) {
    return world.scoreboard.getObjective(objectiveId).getScore(this._entity.scoreboard) ?? false;
  }
  /**
   * エンティティに登録されているタグをすべて取得します。
   */
  getTags() {
    return this._entity.getTags();
  }
  /**
   * 頭からの座標を返します。
   */
  getHeadLocation() {
    return new Vector(this._entity.getHeadLocation());
  }
  /**
   * 動いている方向の速度を返します。
   */
  getVelocity() {
    return new Vector(this._entity.getVelocity());
  }
  /**
   * 向いている方向のベクターを返します。
   */
  getViewDirection() {
    return new Vector(this._entity.getViewDirection());
  }
  /**
   * 現在向いている方向を返します。
   * xが上下、yが左右の向きを表します。
   */
  getRotation() {
    return this._entity.getRotation();
  }
  /**
   * エンティティに指定されたタグが存在するかどうかをチェックします。
   * 配列で指定すると、指定したタグがすべて完全一致したらtrueを返します。
   * @param {string | string[]} tag
   * @returns 返ってくる値はboolean、存在した場合はtrue,存在しない場合はfalseになります。
   */
  hasTag(tag) {
    if (tag instanceof Array) return tag.filter((x) => this._entity.hasTag(String(x))).length == tag.length;
    return this._entity.hasTag(tag);
  }
  /**
   * エンティティに指定されたタグが存在するかどうかを個数単位でチェックします。
   * 配列ではない場合は、部分一致で数値を返します。
   * @param {string | string[]} tag
   */
  hasTags(tag) {
    if (tag instanceof Array) return this.getTags().filter((x) => tag.find((y) => x === y)).length;
    return this.getTags().filter((x) => x.match(tag)).length;
  }
  /**
   * エンティティをキルします。
   */
  kill() {
    this._entity.kill();
  }
  /**
   * アニメーションを実行します。
   * @param {string} animationName
   * @param {{}} options
   */
  playAnimation(animationName, options) {
    this._entity.playAnimation(animationName, options);
  }
  /**
   * エンティティに追加されているダイナミックプロパティを削除します。
   * @param {String} identifier
   */
  removeDynamicProperty(identifier) {
    return this._entity.removeDynamicProperty(identifier);
  }
  /**
   * エンティティに登録されているタグを削除します。
   * @param {String} tag
   * @returns 正常に削除出来た場合はtrue, 削除出来なかった、タグが存在しなかった場合はfalseが返ります。
   */
  removeTag(tag) {
    return this._entity.removeTag(tag);
  }
  /**
   * 指定されたコマンドを実行します。
   * @param {String} command
   */
  runCommandAsync(command) {
    return this._entity.runCommandAsync(command);
  }
  /**
   * プロパティにデータをセットします。
   * @param {String} identifier
   * @param {boolean | String | number} value
   */
  setDynamicProperty(identifier, value) {
    this._entity.setDynamicProperty(identifier, value);
  }
  /**
   * エンティティの向きを設定します。
   * @param {number} degreesX
   * @param {number} degreesY
   */
  setRotation(degreesX, degreesY) {
    this._entity.setRotation(degreesX, degreesY);
  }
  /**
   * エンティティをテレポートさせます。
   * @param {Vector} location
   * @param {boolean} keepVelocity
   * @param {Dimension} dimension
   * @param {number} xRotation
   * @param {number} yRotation
   */
  teleport(
    location,
    keepVelocity = false,
    dimension = this.dimension,
    xRotation = this._entity.rotation.x,
    yRotation = this._entity.rotation.y
  ) {
    this._entity.teleport(location.getMCVector3(), dimension.getMCDimension(), xRotation, yRotation, keepVelocity);
  }
  /**
   * エンティティをテレポートさせます。
   * @param {Vector} location
   * @param {Dimension} dimension
   * @param {Vector} facing
   * @param {boolean} keepVelocity
   */
  teleportFacing(location, dimension = this.dimension, facing, keepVelocity = false) {
    this._entity.teleportFacing(
      location.getMCVector3(),
      dimension.getMCDimension(),
      facing.getMCVector3(),
      keepVelocity
    );
  }
  /**
   * イベントをトリガーします。
   * @param {String} eventName
   */
  triggerEvent(eventName) {
    this._entity.triggerEvent(eventName);
  }

  /**
   * エンティティのネームタグを設定・変更します。中に何も入れなかった場合は、ネームタグが返ります。
   * 中にstringを入れると設定されます。
   * @param {String} value
   */
  NameTag(value = undefined) {
    if (value == undefined) return this._entity.nameTag;
    if (typeof value == "string") this._entity.nameTag = value;
  }
  /**
   * エンティティのネームタグを設定・変更します。
   */
  get nameTag() {
    return this._entity.nameTag;
  }
  /**
   * エンティティのネームタグを設定・変更します。
   * @param {string} value ここに文字列を入れることで、名前が変更されます。
   */
  set nameTag(value) {
    this._entity.nameTag = value;
  }
  /**
   * スニークを設定・変更できます。中に何も入れなかった場合は、スニークしているかどうかが返ります。
   * 中にbooleanを入れると設定されます。
   * @param {boolean} value
   */
  Sneaking(value = undefined) {
    if (value == undefined) return this._entity.isSneaking;
    if (typeof value == "boolean") this._entity.isSneaking = value;
  }
  /**
   *
   * @param {mc.Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      this.dimension = new Dimension(this._entity.dimension);
      this.id = this._entity.id;
      this.location = new Vector(this._entity.location);
      this.scoreboard = this._entity.scoreboard;
      this.target = new Entity(this._entity.target);
      this.typeId = this._entity.typeId;
    } catch (e) {}
  }
}
