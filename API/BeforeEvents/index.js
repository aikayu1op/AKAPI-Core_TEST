import { BeforeChat as chatSend } from "./BeforeChat.js";
import { BeforeItemUseOn as itemUseOn } from "./BeforeItemUseOn.js";

export const beforeEvents = {
    chatSend: chatSend,
    itemUseOn: itemUseOn
}