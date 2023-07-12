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
    addObjective(objectiveId, displayName){
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
    getObjective(){
        return new ScoreboardObjective(this._scoreboard.getObjective());
    }
    getObjectiveAtDisplaySlot(){
        return this._scoreboard.getObjectiveAtDisplaySlot();
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