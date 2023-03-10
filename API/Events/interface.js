import { Player } from "../Player/index.js";
import * as mc from "@minecraft/server";
import { BlockLocation } from "../Location/BlockLocation.js";
import { EntityDamageCause } from "../Interfaces/EntityDamageCause.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { Entity } from "../Entity/index.js";

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
  cancel(){}
  /**
   * 
   */
  sendToTargets = false;
  /**
   * @type {Player[]}
   * @readonly
   */
  targets;

  constructor() {}
}
export class IBeforeItemUseOnEventSignal {
    /**
     * @type {mc.Direction}
     * @readonly
     */
    blockFace;
    /**
     * @type {BlockLocation}
     * @readonly
     */
    blockLocation;
    /**
     * イベントをキャンセルします。(設置、扉を開く、チェスト開く等々)
     */
    cancel(){};
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
    item(itemStack){};
    /**
     * 実行したエンティティを返します。
     * プレイヤーの場合は強制的にプレイヤークラスに変換されますが、便宜上Entityクラスを返します。
     * @type {Entity}
     * @readonly
     */
    source;
}
export class IPlayerDeathEventSignal{
    /**
     * 死んだプレイヤーのデータが返ります。
     * @type {Player}
     * @readonly
     */
    player;
    /**
     * どういう原因で死んだかを返します。
     * @type {EntityDamageCause}
     * @readonly
     */
    reason;
    /**
     * 飛び道具で死んだ際に入るプロパティです。
     * @type {Entity}
     * @readonly
     */
    projectile;
    /**
     * 何ダメージで死んだかを取得できます。
     * @type {number}
     * @readonly
     */
    damage;
    /**
     * キルしたエンティティを返します。
     * 
     * プレイヤーの場合も便宜上Entityで分類されています。
     * @type {Entity}
     * @readonly
     */
    damagingEntity;

}