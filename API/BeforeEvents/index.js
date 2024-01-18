import { BeforeChat as chatSend } from "./chatSend.js";
import { BeforeItemUseOn as itemUseOn } from "./itemUseOn.js";
import { playerBreakBlock } from "./playerBreakBlock.js";
import { playerEmoting } from "./playerEmoting.js";
import { playerInteractWithBlock } from "./playerInteractWithBlock.js";
import { playerMove } from "./playerMove.js";

export const beforeEvents = {
    /**
     * @readonly
     */
    chatSend: chatSend,
    /**
     * @readonly
     */
    itemUseOn: itemUseOn,
    /**
     * @readonly
     */
    playerBreakBlock: playerBreakBlock,
    /**
     * @readonly
     */
    playerMove: playerMove,
    /**
     * @readonly
     */
    playerEmoting: playerEmoting,
    /**
     * @readonly
     */
    playerInteractWithBlock: playerInteractWithBlock
}