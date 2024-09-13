import { playerDie } from "./playerDeath.js";
import { playerJump } from "./playerJumping.js";
import { playerMove } from "./playerMove.js";
import { playerPick } from "./playerPick.js";
import { playerSneak } from "./playerSneak.js";

export const afterEvents = {
  /**
   * プレイヤーが死んだら
   * @readonly
   */
  playerDeath: playerDie,
  /**
   * プレイヤーが動いたら
   * @readonly
   */
  playerMove: playerMove,
  /**
   * プレイヤーがジャンプすれば
   * @readonly
   */
  playerJump: playerJump,
  /**
   * プレイヤーがアイテムを取れば
   * @readonly
   */
  playerPick: playerPick,
  /**
   * プレイヤーがしゃがめば
   * @readonly
   */
  playerSneak: playerSneak,
};
