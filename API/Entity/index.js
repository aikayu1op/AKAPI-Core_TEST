import * as mc from "@minecraft/server";
import { Components } from "../Components/EntityComponents.js";
import { Vector } from "../Vector/Vector.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { Dimension } from "../Dimension/index.js";
import { world } from "../World/index.js";
import { Block } from "../Block/Block.js";
import { TeleportOptions } from "../Interfaces/TeleportOptions.js";
import { ScoreboardIdentity } from "../Scoreboard/ScoreboardIdentity.js";
import { Vector2 } from "../Vector/Vector2.js";

export class Entity {
  /**
   * プレイヤーが今いるディメンションを取得します。
   * @readonly
   */
  get dimension(){
    return new Dimension(this._entity.dimension);
  }
  /**
   * プレイヤーに割り当てられる識別IDを取得します。
   * @readonly
   */
  get id(){
    return this._entity?.id;
  }
  /**
   * 現在の座標を設定・取得します。
   */
  get location(){
    return new Vector(this._entity?.location);
  }
  /**
   * 現在の座標を設定・取得します。
   * @param {Vector} vector
   */
  set location(vector){
    this.teleport(vector);
  }
  /**
   * 現在向いている方向を返します。
   * xが上下、yが左右の向きを表します。
   */
  get rotation(){
    return new Vector2(this._entity.getRotation());
  }
  /**
   * 現在向いている方向を返します。
   * xが上下、yが左右の向きを表します。
   */
  set rotation(value){
    if(value instanceof Vector2)
      this._entity.setRotation(value);
  }
  /**
   * ScoreboardIdentityをかえします。
   * @readonly
   */
  get scoreboardIdentity(){
    return new ScoreboardIdentity(this._entity?.scoreboardIdentity);
  }
  /**
   * @readonly
   */
  get target(){
    return new Entity(this._entity?.target);
  }
  /**
   * エンティティの識別IDをかえします。
   * 
   * Playerの場合はminecraft:playerをかえします。
   * @readonly
   */
  get typeId(){
    return this._entity?.typeId;
  }
  /**
     * @type {EntityLifetimeState[keyof EntityLifetimeState]}
     * @readonly
     */
  get lifetimeState(){
    return this._entity.lifetimeState;
  }
  /**
     * 登っているかを取得します。(例: はしご、足場)
     * @readonly
     */
  get isClimbing(){
    return this._entity.isClimbing;
  }
  /**
   * 落ちている状態かを取得します。
   * @readonly
   */
  get isFalling(){
    return this._entity.isFalling;
  }
  /**
   * 水の中にいるのかどうかを取得します。
   * @readonly
   */
  get isInWater(){
    return this._entity.isInWater;
  }
  /**
   * 地面に足をつけている状態かを取得します。
   * @readonly
   */
  get isOnGround(){
    return this._entity.isOnGround;
  }
  /**
   * 泳いでいるかを取得します。
   * @readonly
   */
  get isSwimming(){
    return this._entity.isSwimming;
  }
  /**
   * 走っているかを取得します。
   * @readonly
   */
  get isSprinting(){
    return this._entity.isSprinting;
  }
  /**
   * 寝ているかどうかを取得します。
   * @readonly
   */
  get isSleeping(){
    return this._entity.isSleeping;
  }

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
   * @param {mc.EntityEffectOptions} options
   */
  addEffect(effectType, duration = 400, options = undefined) {
    this._entity.addEffect(effectType, duration, options);
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
   * 
   * @param {boolean} useEffect 
   */
  extinguishFire(useEffect = false){
    return this._entity.extinguishFire(useEffect);
  }
  /**
   * @readonly
   */
  get fallDistance(){
    return this._entity.fallDistance;
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
   * //<Entity>はこのクラスを表します。
   * for(const components of <Entity>.getComponents()){
   *    world.sendMessage(components.typeId);
   * }
   * //これで登録されているコンポーネントの名前を取得することが出来ます。
   *
   * ```
   */
  getComponents() {
    return Components.getEntity(this._entity).getComponents();
  }
  /**
   * 動的プロパティを取得します。
   * @param {string} identifier 取得したいデータ
   * @returns {string | number | boolean | Vector | undefined}
   */
  getDynamicProperty(identifier) {
    if(typeof this._player.getDynamicProperty(identifier) === "object") return new Vector(this._player.getDynamicProperty(identifier));
    return this._player.getDynamicProperty(identifier);
  }
  /**
   * DynamicPropertyに登録されている変数の一覧です。
   */
  getDynamicPropertyIds(){
    return this._entity.getDynamicPropertyIds();
  }
  /**
   * 
   */
  getDynamicPropertyTotalByteCount(){
    return this._entity.getDynamicPropertyTotalByteCount();
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
      location: this.location.getMCVector3(),
      maxDistance: 1,
      minDistance: 1,
    })[0];
  }
  /**
   * スコアを取得します。
   *
   * 値が存在しない場合はundefinedを返します。
   * @param {string} objectiveId 取得したいオブジェクト
   */
  getScore(objectiveId) {
    try{
      return world.scoreboard.getObjective(objectiveId).getScore(this.scoreboardIdentity);
    }catch{return undefined;}
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
   * 指定されたIDから動的プロパティがあるかどうかを取得します。 
   * @param {string} identifier DynamicPropertyで指定されたID
   * @param {ValueOf<instanceEnum>} type Stringなどの型を指定します。DynamicPropertyで設定できるものだけが対応しています。
   */
  hasDynamicProperty(identifier, type = undefined){
    let instance = ["string", "number", "boolean", "Vector", "undefined"];
    if(!identifier) return false;
    if(!!this.getDynamicProperty(identifier) && typeof type === "undefined") return true;
    if(type == "Vector") return (this.getDynamicProperty(identifier) instanceof Vector);
    if(instance.includes(type) && typeof this.getDynamicProperty(identifier) === type) return true;
    return false;
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
   * 
   * @returns 
   */
  isValid(){
    return this._entity.isValid();
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
    return this._entity.setDynamicProperty(identifier, undefined);
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
   * 指定されたコマンドを実行します。
   * @param {String} command
   */
  runCommand(command){
    return this._entity.runCommand(command);
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
   * 
   * @param {number} seconds 
   * @param {boolean} useEffect 
   */
  setOnFire(seconds, useEffect = false){
    return this._entity.setOnFire(seconds, useEffect);
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
   * @param {TeleportOptions} options
   */
  teleport(
    location,
    options
  ) {
    this._entity.teleport(location.getMCVector3(), options?.toObject());
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
   * 指定したオブジェクトに値を代入します。
   * @param {string} objectiveId 
   * @param {number} score 
   */
  setScore(objectiveId, score){
    world.scoreboard.getObjective(objectiveId).setScore(this, score);
  }
  /**
   *
   * @param {mc.Entity} entity
   */
  constructor(entity) {
    this._entity = entity;
  }
}
