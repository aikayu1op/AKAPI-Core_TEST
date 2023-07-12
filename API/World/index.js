import { world as w } from "@minecraft/server";
import { Player } from "../Player/index.js";
import * as myOptions from "../Interfaces/index.js";
import { Dimension } from "../Dimension/index.js";
import { Vector } from "../Vector/Vector.js";
import { Scoreboard } from "../Scoreboard/index.js";
import { Entity } from "../Entity/index.js";

class World {
  /**
   * イベントを格納しているプロパティ
   * @readonly
   */
  beforeEvents = w.beforeEvents;
  /**
   * イベントを格納しているプロパティ
   * @readonly
   */
  afterEvents = w.afterEvents;
  /**
   * スコアボードを取得したい場合に使用するプロパティ
   * @readonly
   */
  scoreboard = new Scoreboard(w.scoreboard);
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
    return new Vector(w.getDefaultSpawnPosition());
  }
  /**
   * ワールドに初めて参加する人や、個別にスポーンポイントを設定されていないプレイヤーがスポーンする場所を取得します。
   * @param {Vector} vector 指定された場所が初期設定のスポーンポイントになります。
   */
  set defaultSpawnPosition(vector) {
    w.setDefaultSpawn(vector.getMCVector3());
  }
  /**
   *
   * @param {string} identifier
   */
  getDynamicProperty(identifier) {
    return w.getDynamicProperty(identifier);
  }
  /**
   *
   * @param {{} | myOptions.EntityQueryOptions} options
   * @returns {Player[]}
   */
  getPlayers(options = {}) {
    if (options instanceof myOptions.EntityQueryOptions)
      return [...w.getPlayers(options.getOptions())].map((p) => new Player(p));
    return [...w.getPlayers(options)].map((p) => new Player(p));
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
   * @param {[] | myOptions.MusicOptions} options
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
    return w.removeDynamicProperty(identifier);
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
   *
   * @param {string} identifier
   * @param {string | number | boolean} value
   */
  setDynamicProperty(identifier, value) {
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
  getDay(){
    return w.getDay();
  }
  /**
   * 
   * @param {string} id 
   */
  getEntity(id){
    new Entity(w.getEntity());
  }
  /**
   * ワールドの絶対時間をセットします。
   * @param {number} absoluteTime 
   */
  setAbsoluteTime(absoluteTime){
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
