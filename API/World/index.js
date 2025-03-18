import { world as w } from "@minecraft/server";
import { Player } from "../Player/index.js";
import * as myOptions from "../Interfaces/index.js";
import { Dimension } from "../Dimension/index.js";
import { Vector } from "../Vector/Vector.js";
import { Scoreboard } from "../Scoreboard/index.js";
import { Entity } from "../Entity/index.js";
import { Time } from "../Utils/Time/index.js";
import { beforeEvents } from "../BeforeEvents/index.js";
import { afterEvents } from "../AfterEvents/index.js";
import { instanceEnum } from "../Interfaces/instanceEnum.js";
import { system } from "../System/index.js";
/**
 * @template T
 * @typedef {T[keyof T]} ValueOf
 */

class World {
  /**
   * イベントを格納しているプロパティ
   * @readonly
   */
  beforeEvents = {
    /**
     * 公式のイベントをかえします。
     * @readonly
     */
    mc: w.beforeEvents,
    /**
     * mcのイベントを自クラスのものに変えたり、新しく追加したりしているものをかえします。
     * @readonly
     */
    api: beforeEvents,
  };
  /**
   * イベントを格納しているプロパティ
   * @readonly
   */
  afterEvents = {
    /**
     * 公式のイベントをかえします。
     * @readonly
     */
    mc: w.afterEvents,
    /**
     * mcのイベントを自クラスのものに変えたり、新しく追加したりしているものをかえします。
     * @readonly
     */
    api: afterEvents,
  };
  /**
   * スコアボードを取得したい場合に使用するプロパティ
   * @readonly
   */
  scoreboard = new Scoreboard(w.scoreboard);

  /**
   * ワールドがハードコアかどうかを取得します。
   * @readonly
   */
  get isHardcore(){
    return w.isHardcore;
  }
  /**
   * @readonly
   */
  get structureManager(){
    return w.structureManager;
  }
  /**
   * ディメンションを返します。
   * @readonly
   */
  get overworld(){
    return this.getDimension("overworld");
  }
  /**
   * ディメンションを返します。
   * @readonly
   */
  get nether(){
    return this.getDimension("nether");
  }
  /**
   * ディメンションを返します。
   * @readonly
   */
  get theEnd(){
    return this.getDimension("the_end");
  }
  /**
   * ワールドにいるすべてのプレイヤーを蹴ります。
   * @param {string} reason 
   */
  allKick(reason){
    this.getPlayers({excludeNames: [this.getOwner().name]}).forEach(p => this.overworld.runCommand(`kick ${p.name} ${reason}`));
    system.run(() => system.close());
  }
  /**
   *
   * @param {string} id
   * @param {string} value
   */
  broadCastClientMessage(id, value) {
    w.broadcastClientMessage(id, value);
  }
  /**
   * ワールドの開始からの絶対時間を返します。
   */
  getAbsoluteTime() {
    return w.getAbsoluteTime();
  }
  /**
   * ワールドのオーナーを返します。
   * @returns 
   */
  getOwner(){
    return this.getAllPlayers().find(x=>x.isOwner);
  }
  /**
   * すべてのプレイヤーを返します。
   */
  getAllPlayers() {
    return w.getAllPlayers().map((p) => new Player(p));
  }
  /**
   * 指定されたIDのDimensionクラスを返します。
   * @param {string} dimensionId
   */
  getDimension(dimensionId) {
    return new Dimension(dimensionId);
  }
  /**
   * ワールドに初めて参加する人や、個別にスポーンポイントを設定されていないプレイヤーがスポーンする場所を取得します。
   */
  get defaultSpawnPosition() {
    return new Vector(w.getDefaultSpawnLocation());
  }
  /**
   * ワールドに初めて参加する人や、個別にスポーンポイントを設定されていないプレイヤーがスポーンする場所を取得します。
   * @param {Vector} vector 指定された場所が初期設定のスポーンポイントになります。
   */
  set defaultSpawnPosition(vector) {
    w.setDefaultSpawnLocation(vector.getMCVector3());
  }
  /**
   * 動的プロパティを取得します。
   * @param {string} identifier
   */
  getDynamicProperty(identifier) {
    return w.getDynamicProperty(identifier);
  }
  /**
   * 全ての動的プロパティのIDを取得します。
   * @returns 
   */
  getDynamicPropertyIds(){
    return w.getDynamicPropertyIds();
  }
  /**
   * 動的プロパティのトータルのバイト数を取得します。どれだけの量が保存されているのか取得可能です。
   * 
   * データが重くなっている場合は見直しが必要になります。
   */
  getDynamicPropertyTotalByteCount(){
    return w.getDynamicPropertyTotalByteCount();
  }
  /**
   * Optionで指定されたプレイヤーを全て取得します。
   * @param {myOptions.EntityQueryOptions} options
   */
  getPlayers(options = {}) {
    if (options instanceof myOptions.EntityQueryOptions)
      return [...w.getPlayers(options.getOptions())].map((p) => new Player(p));
    return [...w.getPlayers(options)].map((p) => new Player(p));
  }
  /**
   * 指定されたIDから動的プロパティがあるかどうかを取得します。 
   * @param {string} identifier DynamicPropertyで指定されたID
   * @param {ValueOf<instanceEnum>} type Stringなどの型を指定します。DynamicPropertyで設定できるものだけが対応しています。
   */
  hasDynamicProperty(identifier, type = undefined){
    let instance = ["string", "number", "boolean", "Vector", "undefined"];
    if(!identifier) return false;
    if(type === "Vector"   ) return (this.getDynamicProperty(identifier) instanceof Vector);
    if(type === "undefined" || typeof type === "undefined") return !this.getDynamicProperty(identifier);
    if(instance.includes(type) && typeof this.getDynamicProperty(identifier) === type) return true;
    return false;
  }
  /**
   * 音楽を再生します。
   * @param {string} trackID
   * @param {{} | myOptions.MusicOptions} options
   */
  playMusic(trackID, options = {}) {
    if (options instanceof myOptions.MusicOptions) w.playMusic(trackID, options.getOptions());
    else if (typeof options === "object") w.playMusic(trackID, options);
  }
  /**
   * 音を再生します。
   * @param {string} soundID
   * @param {{} | myOptions.SoundOptions} options
   */
  playSound(soundID, options = {}) {
    if (options instanceof myOptions.SoundOptions) w.playSound(soundID, options.getOptions());
    else if (typeof options === "object") w.playSound(options);
  }
  /**
   * 音楽をキューにいれることができます。
   * @param {string} trackID
   * @param {{} | myOptions.MusicOptions} options
   */
  queueMusic(trackID, options = {}) {
    if (options instanceof myOptions.SoundOptions) w.queueMusic(trackID, options.getOptions());
    else if (typeof options === "object") w.queueMusic(trackID, options);
  }
  /**
   *
   * @param {string} identifier
   */
  removeDynamicProperty(identifier) {
    return w.setDynamicProperty(identifier, undefined);
  }
  /**
   * すべてのプレイヤーに対して、メッセージを送信します。
   * @param {{} | string} message
   */
  sendMessage(message) {
    if (typeof message === "object") w.sendMessage(message);
    else w.sendMessage(String(message));
  }
  /**
   * すべてのプレイヤーに対して、actionbarを送信します。
   * @param {{} | string} message
   */
  sendActionbar(message) {
    this.getAllPlayers().forEach((p) => {
      if (typeof message === "object") p.onScreenDisplay.setActionbar(message);
      else p.onScreenDisplay.setActionbar(String(message));
    });
  }
  /**
   * 動的プロパティをセットします。このプロパティは、ワールドを閉じても保持し続けます。
   * @param {string} identifier
   * @param {string | number | boolean | Vector} value
   */
  setDynamicProperty(identifier, value) {
    if(value instanceof Vector) value = JSON.stringify(value);
    w.setDynamicProperty(identifier, value);
  }
  /**
   * ワールドの時間を設定します。
   *
   * 引数に何も書かなければ、ワールドの時間が返ってきます
   *
   * 引数に数値を入れるとワールドに時間を設定できます。
   * @param {number} time
   */
  Time(time = undefined) {
    if (time == undefined) return w.getTimeOfDay();
    else if (typeof time === "number") {
      w.setTimeOfDay(time);
      return time;
    }
  }
  /**
   * 現在何日経過したか取得します。
   */
  getDay() {
    return w.getDay();
  }
  async getGameTick() {
    const date = new Date().getTime();
    await Time.sleep(1);
    return new Date().getTime() - date;
  }
  /**
   * <Player>.idや<Entity>.idで取得したIDからentityを取得します。
   * @param {string} id
   */
  getEntity(id) {
    return new Entity(w.getEntity(id));
  }
  /**
   * すべてのディメンションにいるエンティティを取得します。
   * @param {myOptions.EntityQueryOptions} options
   * @returns {Entity[]}
   */
  getEntities(options){
    if(options instanceof myOptions.EntityQueryOptions) options = options.getOptions();
    if(options instanceof myOptions.EntityQueryOptions || typeof options !== 'object') throw new Error("Invalid options.");
    let exchange = [];
    w.getDimension("overworld").getEntities(options).map(x => exchange.push(new Entity(x)));
    w.getDimension("nether").getEntities(options).map(x => exchange.push(new Entity(x)));
    w.getDimension("the_end").getEntities(options).map(x => exchange.push(new Entity(x)));
    return exchange;
  }
  /**
   * すべてのディメンションにいるエンティティを取得します。(Generator版)
   * @param {myOptions.EntityQueryOptions} options
   */
  *getGeneratedEntities(options){
    if(options instanceof myOptions.EntityQueryOptions) options = options.getOptions();
    if(options instanceof myOptions.EntityQueryOptions || typeof options !== 'object') throw new Error("Invalid options.");
    let exchange = [];
    for(let entity of w.getDimension("overworld").getEntities(options)){
      exchange.push(new Entity(entity));
      yield exchange;
    }
    for(let entity of w.getDimension("nether").getEntities(options)){
      exchange.push(new Entity(entity));
      yield exchange;
    }
    for(let entity of w.getDimension("the_end").getEntities(options)){
      exchange.push(new Entity(entity));
      yield exchange;
    }
  }
  /**
   * ワールドの絶対時間をセットします。
   * @param {number} absoluteTime
   */
  setAbsoluteTime(absoluteTime) {
    w.setAbsoluteTime(absoluteTime);
  }

  /**
   * 音楽を止めれます。
   */
  stopMusic() {
    w.stopMusic();
  }

  constructor() {}
}
export const world = new World();
