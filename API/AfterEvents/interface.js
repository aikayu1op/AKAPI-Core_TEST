import { Block } from "../Block/Block.js";
import { Dimension } from "../Dimension/index.js";
import { Entity } from "../Entity/index.js";
import { Player } from "../Player/index.js";

class IPlayerEvents{
  /**
   * プレイヤーを取得します。
   * @readonly
   * @type {Player}
   */
  player;
  /**
   * 発火した状態でこれが最初の発火かどうかを取得します。
   * @readonly
   * @type {boolean}
   */
  isMoment;  
  constructor(){}
}

export class IPlayerDeathEventSignal {
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
export class IPlayerMoveEventSignal{
  /**
   * 動いたプレイヤーを取得します。
   * @readonly 
   * @type {Player}
   */
  player;
  /**
   * プレイヤーの速度を取得します。
   */
  getVelocity(){}
  /**
   * 現在のプレイヤーの座標を取得します。
   */
  getLocation(){}
  /**
   * プレイヤーの座標を取得します。
   * @readonly
   * @type {Dimension}
   */
  dimension;
}
export class IPlayerSneakingEvents{
  /**
   * プレイヤーを取得します。
   * @readonly
   * @type {Player}
   */
  player;
  /**
   * 発火した状態でこれが最初の発火かどうかを取得します。
   * @readonly
   * @type {boolean}
   */
  isMoment;  
  /**
   * スニークの時間を取得します
   * @readonly
   * @type {boolean}
   */
  sneakTime;
}
export class IPlayerJumpingEvents{
  /**
   * プレイヤーを取得します。
   * @readonly
   * @type {Player}
   */
  player;
  /**
   * 発火した状態でこれが最初の発火かどうかを取得します。
   * @readonly
   * @type {boolean}
   */
  isMoment;  
}
class IBlockFallingEvents{
  /**
   * @type {Entity}
   * @readonly
   * 何のブロックが落ちたかをエンティティクラスで返します。
   */
  entity;
  /**
   * @type {boolean}
   * @readonly
   * プレイヤーが設置したものかどうかを取得します。
   */
  isPlayer;
  /**
   * @type {Player}
   * @readonly
   * プレイヤーが設置した場合のプレイヤークラスを返します。
   */
  player;
}