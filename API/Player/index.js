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
import { EntityLifetimeState } from "../Interfaces/EntityLIfetimeState.js";
import { Vector2 } from "../Vector/Vector2.js";
import { EquipmentSlot } from "../Interfaces/EquipmentSlot.js";
import { EntityEffectOptions } from "../Interfaces/EntityEffectOptions.js";
import { GameMode } from "../Interfaces/GameMode.js";
import { IRawMessage } from "../Interfaces/IRawMessage.js";

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
   * 復活地点に設定されているDimensionを取得します。
   * @type {Dimension}
   * @readonly
   */
  spawnDimension;
  /**
   * プレイヤーの現在のレベルです。
   * @type {number}
   * @readonly
   */
  level;
  /**
   * プレイヤーの足元からの座標クラスが返ります。
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
   * プレイヤーの頭からの座標クラスが返ります。
   * @type {Vector}
   * @readonly
   */
  headLocation;
  /**
   * プレイヤーの現在いるディメンションクラスを取得します。
   * @type {Dimension}
   * @readonly
   */
  dimension;
  /**
   * プレイヤーのMCIDが返ります。
   * @type {string}
   * @readonly
   */
  name;
  /**
   * プレイヤーにタイトルやアクションバーを送信するクラスが返ります。
   * @type {onScreenDisplay}
   * @readonly
   */
  onScreenDisplay;
  /**
   * @readonly
   */
  target;
  /**
   * プレイヤーを表すScoreboardIdentityクラスが返ります。
   * 使い方例(公式クラスを使っています。)
   * ```
   * import { world } from "@minecraft/server";
   *
   * world.beforeEvents.chatSend.subscribe((ev) =>{
   *    let score = world.scoreboard.getObjective("スコアの名前").getScore(ev.sender.scoreboard);
   *    if(score >= 10) ev.sender.sendMessage("スコア10以上あります。");
   * })
   * ```
   * @readonly
   */
  scoreboard;
  /**
   * プレイヤーのアイデンティティが返ってきます。
   * 例として、鶏をtypeIdした際はminecraft:chickenが返ってきます。
   * @type {string}
   * @readonly
   */
  typeId;
  /**
   * プレイヤーの速度を取得し、設定されたVelocityクラスが返ってきます。
   * @type {Vector}
   * @readonly
   */
  velocity;
  /**
   * 向いている方向のベクターを返します。
   * @readonly
   * @type {Vector}
   */
  viewVector;
  /**
   * 現在のプレイヤーが参照できる状態なのかを取得します。
   * @type {EntityLifetimeState}
   * @readonly
   */
  lifetimeState;

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
   * ダメージを与えます。
   * @param {number} damage
   * @param {EntityDamageSource} source
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
   *    <Player>.tell(components.typeId);
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
   * プレイヤーに指定されたEffectTypeが付与しているかどうかを返します。付与されている場合はEffectクラスが返り、そうじゃない場合はundefinedを返します。
   * @param {mc.EffectType} effectType 取得したいエフェクトタイプ
   */
  getEffect(effectType) {
    try {
      return this._player.getEffect(effectType);
    } catch (e) {
      return undefined;
    }
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
   * 個々に指定された復活地点の座標を返します。
   * 指定がない場合は、undefinedを返します。
   * @returns {Vector | undefined}
   */
  getSpawnPosition(){
    const location = this._player.getSpawnPosition();
    if(!location) return undefined;
    return new Vector(location);
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
   * 指定されたオブジェクトでスコアを取得します。
   *
   * 値が存在しない場合は、0が返ります。
   * @param {string} objectiveId
   */
  getScore(objectiveId) {
    return world.scoreboard.getObjective(objectiveId).getScore(this.scoreboard) ?? 0;
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
   */
  isInstantSneaking() {
    if (this.Sneaking()) {
      if (!this.hasTag("AKAPI-Sneak")) {
        this.addTag("AKAPI-Sneak");
        return true;
      } else return false;
    } else {
      this.removeTag("AKAPI-Sneak");
      return false;
    }
  }
  /**
   * プレイヤーをキルします。
   */
  kill() {
    this._player.kill();
  }
  /**
   * 右手に持っているアイテムを設定・取得します。
   * @deprecated
   *
   * @param {ItemStack} itemStack ここに何も書かなければ取得しますが、ItemStackを入力するとアイテムがセットされます。
   * @returns {ItemStack | undefined}
   */
  MainhandItem(itemStack = undefined) {
    if (!itemStack) return this.getComponent().getInventory().container.getItem(this.selectedSlot);
    else if (itemStack instanceof ItemStack)
      this.getComponent().getInventory().container.setItem(this.selectedSlot, itemStack);
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
      this._player.teleport(location.getMCVector3());
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
   *
   * @param {mc.Player} player
   */
  constructor(player) {
    try {
      this._player = player;
      this.dimension = new Dimension(this._player.dimension);
      this.id = this._player.id;
      this.location = new Vector(this._player.location);
      this.name = this._player.name;
      this.onScreenDisplay = new onScreenDisplay(this);
      this.scoreboardIdentity = this._player.scoreboardIdentity;
      this.target = new Entity(this._player.target);
      this.typeId = this._player.typeId;
      this.headLocation = new Vector(this._player.getHeadLocation());
      if(!!this._player.spawnDimension)
        this.spawnDimension = new Dimension(this._player.spawnDimension);
      else
        this.spawnDimension = undefined;
      this.level = this._player.level;
      this.lifetimeState = this._player.lifetimeState;

    } catch (e) {}
  }
}
