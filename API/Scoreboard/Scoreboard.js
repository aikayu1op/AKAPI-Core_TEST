import { DisplaySlotId } from "../Interfaces/DisplaySlotId.js";
import { ScoreboardObjectiveDisplayOptions } from "../Interfaces/ScoreboardObjectiveDisplayOptions.js";
import { ScoreboardIdentity } from "./ScoreboardIdentity.js";
import { ScoreboardObjective } from "./ScoreboardObjective.js";

export class Scoreboard{
    /**
     * @private
     */
    _scoreboard;

    /**
     * 
     * @param {string} objectiveId 
     * @param {string} displayName 
     * @returns 
     */
    addObjective(objectiveId, displayName = objectiveId){
        return this._scoreboard.addObjective(objectiveId, displayName);
    }
    /**
     * 指定したスコアボードオブジェクトを削除します。
     * @param {string | ScoreboardObjective} objectiveId 
     * @returns 
     */
    removeObjective(objectiveId){
        if(objectiveId instanceof ScoreboardObjective)
            return this._scoreboard.removeObjective(objectiveId.getRawdata());
        else if(typeof objectiveId == "string")
            return this._scoreboard.removeObjective(objectiveId);
    }
    /**
     * 
     * @param {*} displaySlotId 
     * @returns 
     */
    clearObjectiveAtDisplaySlot(displaySlotId){
        return new ScoreboardObjective(this._scoreboard.clearObjectiveAtDisplaySlot(displaySlotId));
    }
    /**
     * 指定したオブジェクトからデータを取得します。
     * @param {string} objectiveId 
     * @returns 
     */
    getObjective(objectiveId){
        if(!this._scoreboard.getObjective(objectiveId)) return undefined;
        return new ScoreboardObjective(this._scoreboard.getObjective(objectiveId));
    }
    /**
     * 指定したオブジェクトが存在するかを取得します。
     * @param {string} objectiveId 
     */
    hasObjective(objectiveId){
        return !this._scoreboard.getObjective(objectiveId) ? false : true; 
    }
    /**
     * 
     * @param {DisplaySlotId[keyof DisplaySlotId]} displaySlotId 
     */
    getObjectiveAtDisplaySlot(displaySlotId){
        return this._scoreboard.getObjectiveAtDisplaySlot(displaySlotId);
    }
    getObjectives(){
        return this._scoreboard.getObjectives().map(x => new ScoreboardObjective(x))
    }
    getParticipants(){
        return this._scoreboard.getParticipants().map(x => new ScoreboardIdentity(x))
    }
    /**
     * 
     * @param {string} objectiveId 
     * @param {ScoreboardObjectiveDisplayOptions} objectiveDisplaySettings 
     * @returns 
     */
    setObjectiveAtDisplaySlot(objectiveId, objectiveDisplaySettings){
        if(objectiveDisplaySettings instanceof ScoreboardObjectiveDisplayOptions)
            return new ScoreboardObjective(this._scoreboard.setObjectiveAtDisplaySlot(objectiveId, objectiveDisplaySettings.toObject()));
        else
            return new ScoreboardObjective(this._scoreboard.setObjectiveAtDisplaySlot(objectiveId, objectiveDisplaySettings));
    }
    /**
     * 
     * @param {import("@minecraft/server").Scoreboard} scoreboard 
     */
    constructor(scoreboard){
        this._scoreboard = scoreboard;
    }
}