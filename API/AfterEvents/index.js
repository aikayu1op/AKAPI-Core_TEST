import { playerDie } from "./playerDeath.js";
import { playerJump } from "./playerJumping.js";
import { playerMove } from "./playerMove.js";
import { playerSneak } from "./playerSneak.js";

export const afterEvents = {
  /**
   * @readonly
   */
  playerDeath: playerDie,
  /**
   * @readonly
   */
  playerMove: playerMove,
  /**
   * @readonly
   */
  playerJump: playerJump,
  /**
   * @readonly
   */
  playerSneak: playerSneak,
};
