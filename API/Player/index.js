import * as mc from "@minecraft/server";
import { Components, PlayerEquipmentSlot } from "../Components/EntityComponents.js";
import { Dimension } from "../Dimension/index.js";
import { Entity } from "../Entity/index.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { ISoundOptions, SoundOptions } from "../Interfaces/SoundOptions.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Vector } from "../Vector/Vector.js";
import { world } from "../World/index.js";
import { EntityDamageSource } from "../Interfaces/EntityDamageSource.js";
import { onScreenDisplay } from "./onScreenDisplay.js";
import { MultiLineActionbar } from "../Utils/ExtendsActionbar/MultiLineActionbar/index.js";
import { SliderActionbar } from "../Utils/ExtendsActionbar/SliderActionbar/index.js";
import { TeleportOptions } from "../Interfaces/TeleportOptions.js";
import { EntityLifetimeState } from "../Interfaces/EntityLifetimeState.js";
import { Vector2 } from "../Vector/Vector2.js";
import { ArmorSlot } from "../Interfaces/EquipmentSlot.js";
import { EntityEffectOptions } from "../Interfaces/EntityEffectOptions.js";
import { GameMode } from "../Interfaces/GameMode.js";
import { IRawMessage } from "../Interfaces/IRawMessage.js";
import { ScoreboardObjective } from "../Scoreboard/ScoreboardObjective.js";
import { ScoreboardIdentity } from "../Scoreboard/ScoreboardIdentity.js";
import { DimensionLocation } from "../Interfaces/DimensionLocation.js";
import { PlayAnimationOptions } from "../Interfaces/PlayAnimationOptions.js";
import { Block } from "../Block/Block.js";

/**
 * @template T
 * @typedef {T[keyof T]} ValueOf
 */

export class Player {

  /**
   * @private
   */
  _player;
  
  /**
   * ジャンプしているかどうかを取得します。
   * @readonly
   */
  get isJumping(){
    return this._player.isJumping;
  }
  /**
   * スニークしているかどうかを取得します。
   */
  get isSneaking(){
    return this._player.isSneaking;
  }
  /**
   * スニークしているかどうかを取得します。
   * @param {boolean} value 
   */
  set isSneaking(value){
    typeof value === "boolean" ? this._player.isSneaking = value : 0
  }

  /**
   * プレイヤーにエフェクトを追加します。
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
   * @param {keyof EntityEffectOptions | EntityEffectOptions} options
   */
  addEffect(effectType, duration = 400, options = {}) {
    if(options instanceof EntityEffectOptions) return this._player.addEffect(effectType, duration, options.toObject());
    return this._player.addEffect(effectType, duration, options);
  }
  /**
   * 経験値を増やせます。(Exp単位)
   * @param {number} amount
   */
  addExperience(amount) {
    this._player.addExperience(amount);
  }
  /**
   * 経験値を増やせます。(Lv単位)
   * @param {number} amount
   */
  addLevels(amount) {
    this._player.addLevels(amount);
  }
  /**
   * プレイヤーにタグを設定します。
   * @param {String} tag ここで指定された名前でタグを付与します。
   */
  addTag(tag) {
    return this._player.addTag(tag);
  }
  /**
   * プレイヤーにタグを設定します。
   * 
   * 複数のタグを同時に付与可能です。
   * @param {...string} tag ここで指定された名前でタグを付与します。
   */
  addTags(...tags){
    /**
     * @type {boolean[]}
     */
    let bDatas = [];
    tags.forEach(tag => {let bData=this.addTag(tag);bDatas.push(bData)});
    return bDatas;
  }
  /**
   * 指定されたオブジェクトに値を増加させます。
   * @param {string | ScoreboardObjective} objectiveId 
   * @param {number} score 
   */
  addScore(objectiveId, score){
    if(typeof score === "number")
      return world.scoreboard.getObjective(objectiveId).addScore(this, score);
  }
  /**
   * ダメージを与えます。
   * @param {number} damage いくつダメージを与えるか
   * @param {EntityDamageSource} source ダメージを与えたEntityを指定できます。
   */
  applyDamage(damage, source = undefined) {
    return this._player.applyDamage(damage, source);
  }
  /**
   * EntityクラスからPlayerクラスへ変換します。
   * @deprecated
   */
  convertPlayer() {
    return this;
  }
  /**
   * 復活地点を削除します。削除されたあとは、worldに指定されている初期スポーンを復活地点とします。
   */
  clearSpawn(){
    this._player.clearSpawn();
  }
  /**
   *
   * @param {boolean} useEffects
   */
  extinguishFire(useEffects = undefined) {
    return this._player.extinguishFire(useEffects);
  }
  /**
   * プレイヤーが向いている方向のブロッククラスを返します。
   * @param {keyof BlockRaycastOptions | BlockRaycastOptions} options 距離等のオプションの設定
   */
  getBlockFromViewDirection(options = {}) {
    if (options instanceof BlockRaycastOptions) return this._player.getBlockFromViewDirection(options.getOptions());
    else return this._player.getBlockFromViewDirection(options);
  }
  /**
   * プレイヤーのコンポーネントを設定・取得するクラスを返します。
   */
  getComponent() {
    return Components.getPlayer(this._player);
  }
  /**
   * プレイヤー(エンティティ)に登録されているコンポーネントをすべて返します。
   * 基本的な使い方
   * ```
   * //<Player>はこのクラスを表します。
   * for(const components of <Player>.getComponents()){
   *    <Player>.sendMessage(components.typeId);
   * }
   * //これで登録されているコンポーネントの名前を取得することが出来ます。
   *
   * ```
   */
  getComponents() {
    return Components.getEntity(this._player).getComponents();
  }
  /**
   *
   * @param {string} identifier 取得したいデータ
   */
  getDynamicProperty(identifier) {
    return this._player.getDynamicProperty(identifier);
  }
  /**
   * プレイヤーに指定されたEffectTypeが付与しているかどうかを返します。
   * 
   * 付与されている場合はEffectクラスが返り、そうじゃない場合はundefinedを返します。
   * @param {mc.EffectType} effectType 取得したいエフェクトタイプ
   */
  getEffect(effectType) {
    return this._player.getEffect(effectType);
  }
  /**
   * プレイヤーが向いている方向のエンティティを取得します。
   * @param {mc.EntityRaycastOptions} options 範囲の設定ができます。
   */
  getEntitiesFromViewDirection(options = {}) {
    return this._player.getEntitiesFromViewDirection(options);
  }
  /**
   * Minecraftに登録しているクールダウンを取得します。
   * 書き方: minecraft:cooldownに入っているカテゴリ名を入力
   * @param {string} itemCategory
   */
  getItemCooldown(itemCategory) {
    return this._player.getItemCooldown(itemCategory);
  }
  /**
   * 指定されたオブジェクトから値を取得します。
   * 
   * エラーや存在しない場合はundefinedをかえします。
   * @param {string | ScoreboardObjective} objectiveId
   */
  getScore(objectiveId){
    try{
      return world.scoreboard.getObjective(objectiveId).getScore(this);
    }catch{return undefined;}
  }
  /**
   * 個々に指定された復活地点の座標やディメンションを返します。
   * 指定がない場合は、undefinedを返します。
   */
  getSpawnPoint(){
    const location = this._player.getSpawnPoint();
    if(!location) return undefined;
    return new DimensionLocation(location);
  }
  /**
   * マイクラ公式のPlayerクラスを返します。
   * @deprecated
   */
  getMCPlayer() {
    return this._player;
  }
  /**
   * 現在のゲームモードを取得します。
   * @returns {ValueOf<GameMode>}
   */
  getGameMode() {
    for (const gamemodeName in mc.GameMode) {
      if ([...world.getPlayers({ name: this.name, gameMode: mc.GameMode[gamemodeName] })].length > 0) {
        return gamemodeName;
      }
    }
  }
  /**
   * 現在の経験値を取得します。
   */
  getLevel() {
    return this._player.level;
  }
  /**
   * 次のレベルまでいくらの経験値量が必要かを返します。
   */
  getNeededNextExp() {
    return this._player.totalXpNeededForNextLevel;
  }
  getXpEarnedAtCurrentLevel() {
    return this._player.xpEarnedAtCurrentLevel;
  }
  /**
   * プレイヤーに登録されているタグをすべて取得します。
   */
  getTags() {
    return this._player.getTags();
  }
  /**
   * 現在の総経験値量を取得します。
   * @returns {number}
   */
  getTotalXp(){
    return this._player.getTotalXp();
  }
  /**
   * 動いている方向の速度を返します。
   */
  getVelocity() {
    return new Vector(this._player.getVelocity());
  }
  /**
   * 指定された数分を取得します。
   * Generator<Block, void, unknown>
   * @overload
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {BlockIterator}
   * @overload
   * @param {Vector} vector
   * @returns {BlockIterator}
   */
  getBlocks(x, y, z){
    if(x instanceof Vector || typeof x === "object")
      return getBlocks(this, x?.x??0, x?.y??0, x?.z??0);
    else if(typeof x === "number" && typeof y === "number" && typeof z === "number")
      return getBlocks(this, x, y, z);
    else throw new Error("This argument is illegal.\nIt is defined as (x: number, y: number, z: number) or (vector: Vector) only.");
  }
  /**
   * @deprecated
   */
  isInstantJump(){
    if (this.isJumping) {
      if (!this.hasTag("AKAPI-Jump")) {
        this.addTag("AKAPI-Jump");
        return true;
      } else return false;
    } else {
      this.removeTag("AKAPI-Jump");
      return false;
    }
  }
  /**
   *
   */
  getViewDirection() {
    return new Vector(this._player.getViewDirection());
  }
  /**
   * 現在向いている方向を返します。
   * xが上下、yが左右の向きを表します。
   */
  getRotation() {
    return new Vector2(this._player.getRotation());
  }
  /**
   * 死んだ際にスポーンする座標が個別に設定されている場合に、そのスポーンするディメンションを取得できます。
   */
  get spawnDimension() {
    return new Dimension(this._player.spawnDimension);
  }
  /**
   * 死んだ際にスポーンする場所を設定できます。
   */
  setSpawn(spawnPosition = this.location, spawnDimension = this.dimension) {
    this._player.setSpawn(spawnPosition.getMCVector3(), spawnDimension.getMCDimension());
  }
  /**
   * スポーンポイントをリセットします。
   */
  clearSpawn() {
    this._player.clearSpawn();
  }
  /**
   * プレイヤーに指定されたタグが存在するかどうかをチェックします。
   * 配列で指定すると、指定したタグがすべて完全一致したらtrueを返します。
   * @param {string | string[]} tag
   * @returns 返ってくる値はboolean、存在した場合はtrue,存在しない場合はfalseになります。
   */
  hasTag(...tag) {
    if (tag instanceof Array) return tag.filter((x) => this._player.hasTag(String(x))).length == tag.length;
    return this._player.hasTag(tag);
  }
  /**
   * プレイヤーに指定されたタグが存在するかどうかを個数単位でチェックします。
   * 配列ではない場合は、部分一致で数値を返します。
   * @param {string | string[]} tag
   */
  hasTags(...tag) {
    if (tag instanceof Array) return this.getTags().filter((x) => tag.find((y) => x === y)).length;
    return this.getTags().filter((x) => x.match(tag)).length;
  }
  /**
   * 一瞬だけスニークしたことを検知します。
   * 
   * eventを追加したことで、廃止されました。
   * @deprecated
   */
  isInstantSneaking() {
    /*if (this.Sneaking()) {
      if (!this.hasTag("AKAPI-Sneak")) {
        this.addTag("AKAPI-Sneak");
        return true;
      } else return false;
    } else {
      this.removeTag("AKAPI-Sneak");
      return false;
    }*/
  }
  /**
   * プレイヤーをキルします。
   */
  kill() {
    this._player.kill();
  }
  /**
   * 右手に持っているアイテムを取得します。
   */
  getMainhandItem() {
    return this.getComponent().getInventory().container.getItem(this.selectedSlot);
  }
  /**
   * オフハンドに持っているアイテムを取得します。
   */
  getOffhandItem(){
    return this.getComponent().getEquipmentInventory().getEquipment("offhand");
  }
  /**
   * プレイヤーが身につけている装備を取得できます。
   * @param {ArmorSlot[keyof ArmorSlot]} equipSlot 
   */
  getArmor(equipSlot){
    return this.getComponent().getEquipmentInventory().getEquipment(ArmorSlot[equipSlot] ?? "head");
  }
  /**
   * 右手に持っているアイテムを設定・取得します。
   *
   */
  get mainhandItem(){
    return this.getComponent().getInventory().container.getItem(this.selectedSlot);
  }
  /**
   * 右手に持っているアイテムを設定・取得します。
   *
   * @param {ItemStack | undefined} itemStack ここに何も書かなければ取得しますが、ItemStackを入力するとアイテムがセットされます。
   * @returns {ItemStack | undefined}
   */
  set mainhandItem(itemStack){
    if (itemStack instanceof ItemStack) 
      this.getComponent().getInventory().container.setItem(this.selectedSlot, itemStack);
  }
  /**
   * プレイヤーのMCIDをかえします。
   */
  get name(){
    return this._player.name;
  }
  /**
   * プレイヤーにopを設定・確認出来ます。
   * 中に何も書かなければ確認になり、booleanを入れると設定されます。
   * @param {boolean} value
   */
  Op(value = undefined) {
    if (value == undefined && typeof value == "boolean") return this._player.isOp();
    else this._player.setOp(value);
  }
  /**
   * 指定されたIDでプレイヤーに音声を鳴らします。
   * 書き方例(公式クラスを使用しています。)
   * ```
   * import { world } from "@minecraft/server";
   *
   * world.beforeEvents.chatSend.subscribe((ev) =>{
   *    ev.sender.playSound("random.levelup", {pitch: 2});
   * })
   * ```
   * @param {String} soundID
   * @param {ISoundOptions | SoundOptions} options
   */
  playSound(soundID, options = {}) {
    if (options instanceof SoundOptions) this._player.playSound(soundID, options.getOptions());
    else if (typeof options == "object") this._player.playSound(soundID, new SoundOptions(options).getOptions());
  }
  /**
   *
   * @param {String} id
   * @param {String} value
   */
  postClientMessage(id, value) {
    this._player.postClientMessage(id, value);
  }
  /**
   * プレイヤーに追加されているダイナミックプロパティを削除します。
   * @param {String} identifier
   */
  removeDynamicProperty(identifier) {
    return this._player.removeDynamicProperty(identifier);
  }
  /**
   * プレイヤーに登録されているタグを削除します。
   * @param {String} tag
   * @returns 正常に削除出来た場合はtrue, 削除出来なかった、タグが存在しなかった場合はfalseが返ります。
   */
  removeTag(tag) {
    return this._player.removeTag(tag);
  }
  /**
   * プレイヤーのレベルを初期値に戻します。
   */
  resetLevel(){
    this._player.resetLevel();
  }
  /**
   * 指定されたコマンドを実行します。(同期処理)
   * @param {String} command 
   */
  runCommand(command){
    return this._player.runCommand(command);
  }
  /**
   * 指定されたコマンドを実行します。(非同期処理)
   * @param {String} command
   */
  runCommandAsync(command) {
    return this._player.runCommandAsync(command);
  }
  /**
   * プレイヤーにアクションバーを送信します。
   * @param {string} message
   */
  sendActionbar(message) {
    this.onScreenDisplay.setActionbar(message);
  }
  /**
   * プレイヤーのカメラを設定します。
   */
  setCamera(){

  }
  /**
   * 経験値バーのLvを設定できます。
   * @param {number} lv 
   */
  setLevel(lv){
    this.resetLevel();
    this.addLevels(lv);
  }
  /**
   * プロパティにデータをセットします。
   * @param {String} identifier
   * @param {boolean | String | number} value
   */
  setDynamicProperty(identifier, value) {
    this._player.setDynamicProperty(identifier, value);
  }
  /**
   * @param {ValueOf<GameMode>} gameMode
   */
  setGamemode(gameMode){
    try{this.runCommand(`gamemode ${gameMode}`);}catch{
      throw "This Gamemode has incorrect.";
    }
  }
  /**
   * 火をつけます。
   * @param {number} seconds 
   * @param {boolean} useEffect 
   */
  setOnFire(seconds = 0, useEffect = false){
    this._player.setOnFire(seconds, useEffect);
  }
  /**
   * 指定されたオブジェクトに値を代入します。
   * @param {string} objectiveId 
   * @param {number} score 
   */
  setScore(objectiveId, score){
    world.scoreboard.getObjective(objectiveId).setScore(this, score);
  }
  /**
   * ゲームモードを設定します。
   * @param {ValueOf<GameMode>} gameMode
   * @returns {void}
   */
  async setGameModeAsync(gameMode) {
    try {
      await this.runCommandAsync(`gamemode ${gameMode}`);
    } catch (e) {
      throw e;
    }
  }
  /**
   * プレイヤーの向きを設定します。
   * @deprecated
   * @param {number} degreesX
   * @param {number} degreesY
   */
  setRotation(degreesX, degreesY) {
    this._player.setRotation(degreesX, degreesY);
  }
  /**
   * プレイヤーに指定したアイテムのカテゴリに対して、クールダウンを付与します。
   * @param {String} itemCategory
   * @param {number} tickDuration
   */
  startItemCooldown(itemCategory, tickDuration) {
    this._player.startItemCooldown(itemCategory, tickDuration);
  }
  /**
   * プレイヤーをテレポートさせます。
   * @param {Vector} location
   * @param {TeleportOptions | keyof TeleportOptions} options
   */
  teleport(location, options = undefined) {
    if(!options || !options instanceof TeleportOptions)
      this._player.teleport(location.getMCVector3(), options);
    else
      this._player.teleport(location.getMCVector3(), options.toObject());
  }
  /**
   * プレイヤーにメッセージを送信します。
   * @param {IRawMessage | string | (IRawMessage | string)[]} message
   */
  sendMessage(...message) {
    if(message instanceof Array) message.forEach(msg => this._player.sendMessage(msg))
    else if (typeof message == "object" && !(message instanceof Array)) this._player.sendMessage(message);
    else this._player.sendMessage(String(message));
  }
  /**
   * イベントをトリガーします。
   * @param {String} eventName
   */
  triggerEvent(eventName) {
    this._player.triggerEvent(eventName);
  }
  /**
   * プレイヤーが右手に持っているスロット番号を返します。
   */
  get selectedSlot() {
    return this._player.selectedSlot;
  }
  /**
   * プレイヤーが右手に持っているスロット番号を返します。
   * @param {number} value 0~9の値を入れることで、ホットバーに指定された数値の場所にカーソルを合わせてくれます。
   */
  set selectedSlot(value) {
    if (typeof value == "number" && value <= 9) this._player.selectedSlot = value;
  }

  /**
   * プレイヤーのネームタグを設定・変更します。中に何も入れなかった場合は、ネームタグが返ります。
   * 中にstringを入れると設定されます。
   * @param {String} value
   */
  NameTag(value = undefined) {
    if (value == undefined) return this._player.nameTag;
    if (typeof value == "string") this._player.nameTag = value;
  }
  /**
   * プレイヤーのネームタグを取得します。
   */
  get nameTag() {
    return this._player.nameTag;
  }
  /**
   * プレイヤーのネームタグを取得します。
   * @param {string} value 文字列を指定することで、名前を変更することができます。
   */
  set nameTag(value) {
    this._player.nameTag = value;
  }
  /**
   * スニークを設定・変更できます。中に何も入れなかった場合は、スニークしているかどうかが返ります。
   * 中にbooleanを入れると設定されます。
   * @param {boolean} value
   */
  Sneaking(value = undefined) {
    if (value == undefined) return this._player.isSneaking;
    if (typeof value == "boolean") this._player.isSneaking = value;
  }
  /**
   * アニメーションを再生します。
   * @param {string} animationName 
   * @param {PlayAnimationOptions | {}} options 
   */
  playAnimation(animationName, options = undefined){
    if(options instanceof PlayAnimationOptions)
      this._player.playAnimation(animationName, options.toObject());
    else if(typeof options === "object" || !options) this._player.playAnimation(animationName, options);
  }
  /**
   * actionbarに表示するテキストを複数使えるようにします。
   *
   * idに適当な文字列を入れ、messageには表示するテキストを入れることができます。
   *
   * 通常actionbarと共存は不可能なのでどちらかを使うようにしてください。(コマンドも同様)
   *
   * ```
   * system.run(function test(){
   *    system.run(test);
   *    for(const player of world.getPlayers()){
   *        player.setMultiLineActionbar("test", "this is test message");
   *        player.setMultiLineActionbar("test2", "two line message");
   *        player.setMultiLineActionbar("main", "this is main message");
   *        player.setMultiLineActionbar("last", "this is last message");
   *    }
   * })
   * ```
   * @param {string} id 表示用ID
   * @param {string} message 表示用テキスト
   * @param {number} tick 表示時間(1/20s)
   */
  setMultiLineActionbar(id = "main", message = "undefined", tick = -1) {
    MultiLineActionbar.addMultiLineData(this, id, message, tick);
  }
  /**
   * 右から左へ流れるactionbarを作ることができます。
   *
   * sendActionbarや、コマンドによるactionbarは併用不可能です。
   * @param {string} id
   * @param {string} message
   */
  setSliderActionbar(id = "test", message = "undefined") {
    SliderActionbar.setData(this, id, message);
  }
  /**
   * MultiLineActionbarに登録されたIDで削除します。
   * @param {string} id
   */
  deleteMultiLineActionbar(id) {
    MultiLineActionbar.deleteData(this, id);
  }
  /**
   * プレイヤーが今いるディメンションを取得します。
   * @readonly
   */
  get dimension(){
    return new Dimension(this._player.dimension);
  }
  /**
   * プレイヤーに割り当てられる識別IDを取得します。
   * @readonly
   */
  get id(){
    return this._player.id;
  }
  /**
   * 現在の座標を設定・取得します。
   */
  get location(){
    return new Vector(this._player.location);
  }
  /**
   * 現在の座標を設定・取得します。
   * @param {Vector} vector
   */
  set location(vector){
    this.teleport(vector);
  }
  /**
   * プレイヤーのMCIDを取得します。
   * @readonly
   */
  get name(){
    return this._player.name;
  }
  /**
   * プレイヤーに対してタイトルやアクションバーの表示に関するデータをかえします。
   * @readonly
   */
  get onScreenDisplay(){
    return new onScreenDisplay(this);
  }
  /**
   * ScoreboardIdentityをかえします。
   * @readonly
   */
  get scoreboardIdentity(){
    return new ScoreboardIdentity(this._player.scoreboardIdentity);
  }
  /**
   * @readonly
   */
  get target(){
    return new Entity(this._player.target);
  }
  /**
   * エンティティの識別IDをかえします。
   * 
   * Playerの場合はminecraft:playerをかえします。
   * @readonly
   */
  get typeId(){
    return this._player.typeId;
  }
  /**
   * @readonly
   */
  get headLocation(){
    return new Vector(this._player.getHeadLocation());
  }
  /**
   * 復活地点に設定されているDimensionクラスをかえします。
   * 
   * 設定されていない場合はundefinedが返ります。
   * @readonly
   */
  get spawnDimension(){
    if(!!this._player.spawnDimension)
        this.spawnDimension = new Dimension(this._player.spawnDimension);
      else
        this.spawnDimension = undefined;
  }
  /**
   * 現在のレベルを取得します。
   * @readonly
   */
  get level(){
    return this._player.level;
  }
  /**
   * @type {EntityLifetimeState[keyof EntityLifetimeState]}
   * @readonly
   */
  get lifetimeState(){
    return this._player.lifetimeState;
  }
  /**
   * 登っているかを取得します。(例: はしご、足場)
   * @readonly
   */
  get isClimbing(){
    return this._player.isClimbing;
  }
  /**
   * 落ちている状態かを取得します。
   * @readonly
   */
  get isFalling(){
    return this._player.isFalling;
  }
  /**
   * クリエイティブ飛行状態かを取得します。
   * @readonly
   */
  get isFlying(){
    return this._player.isFlying;
  }
  /**
   * エリトラ飛行状態かを取得します。
   * @readonly
   */
  get isGliding(){
    return this._player.isGliding;
  }
  /**
   * 水の中にいるのかどうかを取得します。
   * @readonly
   */
  get isInWater(){
    return this._player.isInWater;
  }
  /**
   * 地面に足をつけている状態かを取得します。
   * @readonly
   */
  get isOnGround(){
    return this._player.isOnGround;
  }
  /**
   * 泳いでいるかを取得します。
   * @readonly
   */
  get isSwimming(){
    return this._player.isSwimming;
  }
  /**
   * 走っているかを取得します。
   * @readonly
   */
  get isSprinting(){
    return this._player.isSprinting
  }
  /**
   *
   * @param {mc.Player} player
   */
  constructor(player) {
      this._player = player;
  }
}

/**
 * @param {Player} player 
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function* getBlocks(player, x, y, z){
  let checkx = x >= 0?true:(x*=-1,false)
  let checky = y >= 0?true:(y*=-1,false)
  let checkz = z >= 0?true:(z*=-1,false)

  for(let lx = 0; lx < x+1; lx++){
    for(let ly = 0; ly < y+1; ly++){
      for(let lz = 0; lz < z+1; lz++){
        yield player.dimension.getBlock(player.location.changeOffset(checkx?lx:lx*-1, checky?ly:ly*-1, checkz?lz:lz*-1))
      }
    } 
  }
  /*for(let i = 0; i < many; i++){
    try{
      if(direction == "up") yield player.dimension.getBlock(player.location.changeOffset(0, 1, 0))
      else if(direction == "down") yield player.dimension.getBlock(player.location.changeOffset(0, -1, 0))
    }catch{yield undefined; break;}
  }*/
}