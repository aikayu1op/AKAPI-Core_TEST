import { Player } from "../Player/index.js";
import * as mc from "@minecraft/server";
import { Vector } from "../Vector/Vector.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Entity } from "../Entity/index.js";
import { IMoveEventCancelMode } from "./Enum.js";
import { Block } from "../Block/Block.js";
import { Dimension } from "../Dimension/index.js";

export class IBeforeChatEventSignal {
  /**
   * プレイヤーが送信したメッセージが格納されています。
   * @readonly
   */
  message = "";
  /**
   * 送信したプレイヤーが格納されています。
   * @type {Player}
   * @readonly
   */
  sender;
  /**
   * チャットイベントをキャンセルできます。
   */
  cancel(value) {}
  /**
   *
   */
  sendToTargets = false;
  /**
   * @param {Player[]} value
   */
  setTargets(value) {}
  /**
   * @returns {Player[]}
   */
  getTargets() {}

  constructor() {}
}
export class IBeforeItemUseOnEventSignal {
  /**
   * @type {mc.Direction}
   * @readonly
   */
  blockFace;
  /**
   * Blockの座標が入ったVectorを返します。
   * @returns {Vector}
   */
  getBlockLocation() {}
  /**
   * イベントをキャンセルします。(設置、扉を開く、チェスト開く等々)
   */
  cancel() {}
  /**
   * @type {number}
   * @readonly
   */
  faceLocationX;
  /**
   * @type {number}
   * @readonly
   */
  faceLocationY;
  /**
   * 使用したアイテムを返します。
   *
   * 中に何も書かなかった場合はItemStackが返ってきて、中にItemStackを入れるとそのItemStackに置き換えられます。
   * @param {ItemStack} itemStack
   * @returns {ItemStack | undefined}
   */
  item(itemStack) {}
  /**
   * 実行したエンティティを返します。
   * プレイヤーの場合は強制的にプレイヤークラスに変換されますが、便宜上Entityクラスを返します。
   * @type {Entity | Player}
   * @readonly
   */
  source;
}
export class IBeforePlayerMoveEventSignal{
  /**
   * 動こうとしているプレイヤーを取得します。
   * @readonly
   * @type {Player}
   */
  player;
  /**
   * 動きをキャンセルします。
   * @param {IMoveEventCancelMode[keyof IMoveEventCancelMode]} value
   */
  cancel(value = "all"){}
  
}
export class IBeforePlayerInteractWithBlock{
    /**
   * @type {mc.Direction}
   * @readonly
   */
    blockFace;
    /**
     * イベントをキャンセルします。(設置、扉を開く、チェスト開く等々)
     */
    cancel() {}
    /**
     * @type {number}
     * @readonly
     */
    faceLocationX;
    /**
     * @type {number}
     * @readonly
     */
    faceLocationY;

    /**
     * 手に持っているitemStackを返します。
     * @returns {ItemStack}
     */
    getItemStack(){}
    /**
     * @type {ItemStack}
     */
    _itemStack;
    /**
     * @readonly
     */
    get itemStack(){
      return this._itemStack;
    }
    set itemStack(value){
      this._itemStack = value;
    }
    /**
     * 実行したPlayerを返します。
     * @type {Player}
     * @readonly
     */
    player;
    /**
     * @readonly
     * @type {Block}
     */
    block;
}
export class IBeforePlayerBreakBlock{
  /**
   * イベントをキャンセルします。(設置、扉を開く、チェスト開く等々)
   */
  cancel() {}
  /**
   * 手に持っているitemStackを返します。
   * @returns {ItemStack}
   */
  getItemStack(){}
  /**
   * @type {ItemStack}
   * @private
   */
  _itemStack;
  /**
   * @readonly
   */
  get itemStack(){
    return this._itemStack;
  }
  set itemStack(value){
    this._itemStack = value;
  }
  /**
   * 実行者のディメンションを返します。
   * @readonly
   * @type {Dimension}
   */
  dimension;
  /**
   * 実行したPlayerを返します。
   * @type {Player}
   * @readonly
   */
  player;
  /**
   * @readonly
   * @type {Block}
   */
  block;
}
export class IBeforePlayerEmotingEventSignal{
  /**
   * @readonly
   * @type {Player}
   */
  player;
  /**
   * 
   */
  cancel(){}
}
