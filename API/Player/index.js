import * as mc from "@minecraft/server";
import { Components } from "../Components/EntityComponents.js";
import { Dimension } from "../Dimension/index.js";
import { Entity } from "../Entity/index.js";
import { BlockRaycastOptions } from "../Interfaces/BlockRaycastOptions.js";
import { SoundOptions } from "../Interfaces/SoundOptions.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Location } from "../Location/Location.js";
import { Vector } from "../Location/Vector.js";
import { world } from "../World/index.js";
import { EntityDamageSource } from "../Interfaces/EntityDamageSource.js";
import { onScreenDisplay } from "./onScreenDisplay.js";

export class Player {
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
   * @type {Location}
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
   * プレイヤーが向いている方向のクラスが返ります。
   * @readonly
   */
  rotation;
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
   * world.events.beforeChat.subscribe((ev) =>{
   *    let score = world.scoreboard.getObjective("スコアの名前").getScore(ev.sender.scoreboard);
   *    if(score >= 10) ev.sender.tell("スコア10以上あります。");
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
   * プレイヤーにエフェクトを追加します。
   * 書き方例(公式クラスを使用しています。)
   * ```
   * import { world, Player, MinecraftEffectTypes } from "@minecraft/server";
   *
   * world.events.beforeChat.subscribe((ev) =>{
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
    this._player.addEffect(effectType, duration, amplifier, showParticles);
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
   *
   * @param {boolean} useEffects
   */
  extinguishFire(useEffects = undefined) {
    return this._player.extinguishFire(useEffects);
  }
  /**
   * プレイヤーが向いている方向のブロッククラスを返します。
   * @param {{} | BlockRaycastOptions} options 距離等のオプションの設定
   */
  getBlockFromViewVector(options = {}) {
    if (options instanceof BlockRaycastOptions) return this._player.getBlockFromViewVector(options.getOptions());
    else return this._player.getBlockFromViewVector(options);
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
   * マイクラ公式のPlayerクラスを返します。
   * @deprecated
   */
  getMCPlayer() {
    return this._player;
  }
  /**
   * 現在のゲームモードを取得します。
   * @returns {"survival" | "creative" | "adventure" | "spectator"}
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
   * プレイヤーに指定されたタグが存在するかどうかをチェックします。
   * 配列で指定すると、指定したタグがすべて完全一致したらtrueを返します。
   * @param {string | string[]} tag
   * @returns 返ってくる値はboolean、存在した場合はtrue,存在しない場合はfalseになります。
   */
  hasTag(tag) {
    if (tag instanceof Array) return tag.filter((x) => this._player.hasTag(String(x))).length == tag.length;
    return this._player.hasTag(tag);
  }
  /**
   * プレイヤーに指定されたタグが存在するかどうかを個数単位でチェックします。
   * 配列ではない場合は、部分一致で数値を返します。
   * @param {string | string[]} tag
   */
  hasTags(tag) {
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
   *
   * @param {ItemStack} itemStack ここに何も書かなければ取得しますが、ItemStackを入力するとアイテムがセットされます。
   * @returns {ItemStack | void}
   */
  MainhandItem(itemStack = undefined) {
    if (!itemStack) return this.getComponent().getInventory().container.getItem(this.SelectedSlot());
    else if (itemStack instanceof ItemStack)
      this.getComponent().getInventory().container.setItem(this.SelectedSlot(), itemStack);
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
   * world.events.beforeChat.subscribe((ev) =>{
   *    ev.sender.playSound("random.levelup", {pitch: 2});
   * })
   * ```
   * @param {String} soundID
   * @param {mc.SoundOptions | SoundOptions} options
   */
  playSound(soundID, options = {}) {
    if (options instanceof SoundOptions) this._player.playSound(soundID, options.getOptions());
    else if (typeof options == "object") this._player.playSound(soundID, options);
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
   * 指定されたコマンドを実行します。
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
   * プロパティにデータをセットします。
   * @param {String} identifier
   * @param {boolean | String | number} value
   */
  setDynamicProperty(identifier, value) {
    this._player.setDynamicProperty(identifier, value);
  }
  /**
   * ゲームモードを設定します。
   * @param {"survival" | "creative" | "adventure" | "spectator"} gameMode
   * @returns {void}
   */
  async setGameMode(gameMode) {
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
   * プレイヤー移動速度を設定します。
   * @param {Vector | mc.Vector3} velocity
   */
  setVelocity(velocity = {}) {
    if (velocity instanceof Vector) this._player.setVelocity(velocity.getMCVector3());
    else if (typeof velocity === "object") this._player.setVelocity(velocity);
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
   * @param {Dimension} dimension
   * @param {boolean} keepVelocity
   * @param {number} xRotation
   * @param {number} yRotation
   */
  teleport(
    location,
    keepVelocity = false,
    dimension = this.dimension,
    xRotation = this._player.rotation.x,
    yRotation = this._player.rotation.y
  ) {
    this._player.teleport(location.getMCVector3(), dimension.getMCDimension(), xRotation, yRotation, keepVelocity);
  }
  /**
   * プレイヤーをテレポートさせます。
   * @param {Vector} location
   * @param {boolean} keepVelocity
   * @param {Dimension} dimension
   * @param {Vector} facing
   */
  teleportFacing(location, keepVelocity = false, dimension = this.dimension, facing) {
    this._player.teleportFacing(location.getMCVector3(), dimension, facing.getMCVector3(), keepVelocity);
  }
  /**
   * プレイヤーにメッセージを送信します。
   * @param {{} | string} message
   */
  sendMessage(message) {
    if (typeof message == "object") this._player.tell(message);
    else this._player.tell(String(message));
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
   * @param {number} value
   */
  SelectedSlot(value = undefined) {
    if (value == undefined) return this._player.selectedSlot;
    if (typeof value == "number") this._player.selectedSlot = value;
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
   * スニークを設定・変更できます。中に何も入れなかった場合は、スニークしているかどうかが返ります。
   * 中にbooleanを入れると設定されます。
   * @param {boolean} value
   */
  Sneaking(value = undefined) {
    if (value == undefined) return this._player.isSneaking;
    if (typeof value == "boolean") this._player.isSneaking = value;
  }
  /**
   *
   * @param {mc.Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;

      this.dimension = new Dimension(this._player.dimension);
      this.headLocation = new Location(this._player.headLocation);
      this.id = this._player.id;
      this.location = new Vector(this._player.location);
      this.name = this._player.name;
      this.onScreenDisplay = new onScreenDisplay(this);
      this.rotation = this._player.rotation;
      this.scoreboard = this._player.scoreboard;
      this.target = new Entity(this._player.target);
      this.typeId = this._player.typeId;
      this.velocity = new Vector(this._player.velocity);
      this.viewVector = new Vector(this._player.viewVector);
    } catch (e) {}
  }
}
