import { playerDie } from "./PlayerDeathEvent.js";
import { playerJump } from "./PlayerJumpingEvent.js";
import { playerMove } from "./PlayerMoveEvent.js";
import { playerSneak } from "./PlayerSneakingEvent.js";

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
    playerSneak: playerSneak
}