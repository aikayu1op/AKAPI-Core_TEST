import { Entity } from "../Entity/index.js";
import { Player } from "../Player/index.js";
import { ScoreboardIdentity } from "./ScoreboardIdentity";
import { ScoreboardScoreInfo } from "./ScoreboardScoreInfo";

export class ScoreboardObjective{
    /**
     * @readonly
     */
    get displayName(){
        return this._objective.displayName;
    }
    /**
     * @readonly
     */
    get id(){
        return this._objective.id;
    }
    getParticipants(){
        return this._objective.getParticipants().map(x => new ScoreboardIdentity(x))
    }
    /**
     * スコアを取得します。
     * @param {string | ScoreboardIdentity | Entity | Player} participant 
     * @param {number} score
     */
    addScore(participant, score){
        typeof participant == "string" ?
        this._objective.setScore(participant, this._objective.getScore(participant)+score) : (participant instanceof ScoreboardIdentity)  ?
        this._objective.setScore(participant, this._objective.getScore(participant.getRawdata())+score) : (participant instanceof Player) ?
        this._objective.setScore(participant, this._objective.getScore(participant.getMCPlayer())+score) : (participant instanceof Entity) ?
        this._objective.setScore(participant, this._objective.getScore(participant.getMCEntity())+score) : 0
    }
    /**
     * スコアを取得します。
     * @param {string | ScoreboardIdentity | Entity | Player} participant 
     */
    getScore(participant){
        return typeof participant === "string" ?
        this._objective.getScore(participant) : participant instanceof ScoreboardIdentity ?
        this._objective.getScore(participant.getRawdata()) : (participant instanceof Player) ?
        this._objective.setScore(participant, this._objective.getScore(participant.getMCPlayer())+score) : participant instanceof Entity ?
        this._objective.getScore(participant.getMCEntity()) : 0
    }
    /**
     * 
     * @returns 
     */
    getScores(){
        return this._objective.getScores().map(x => new ScoreboardScoreInfo(x))
    }
    /**
     * 
     * @param {string | ScoreboardIdentity | Entity | Player} participant 
     */
    hasParticipant(participant){
        return typeof participant === "string" ?
        this._objective.hasParticipant(participant) : participant instanceof ScoreboardIdentity ?
        this._objective.hasParticipant(participant.getRawdata()) : (participant instanceof Player) ?
        this._objective.hasParticipant(participant, this._objective.getScore(participant.getMCPlayer())+score) : participant instanceof Entity ?
        this._objective.hasParticipant(participant.getMCEntity()) : 0
    }
    isValid(){
        return this._objective.isValid();
    }
    /**
     * 
     * @param {string | ScoreboardIdentity | Entity | Player} participant 
     */
    removeParticipant(participant){
        return typeof participant === "string" ?
        this._objective.removeParticipant(participant) : participant instanceof ScoreboardIdentity ?
        this._objective.removeParticipant(participant.getRawdata()) : (participant instanceof Player) ?
        this._objective.removeParticipant(participant) : participant instanceof Entity ?
        this._objective.removeParticipant(participant.getMCEntity()) : 0
    }
    /**
     * 
     * @param {string | ScoreboardIdentity | Entity | Player} participant 
     * @param {number} score 
     */
    setScore(participant, score){
        return typeof participant === "string" ?
        this._objective.setScore(participant, score) : participant instanceof ScoreboardIdentity ?
        this._objective.setScore(participant.getRawdata(), score) : (participant instanceof Player) ?
        this._objective.setScore(participant, this._objective.getScore(participant.getMCPlayer())+score) : participant instanceof Entity ?
        this._objective.setScore(participant.getMCEntity(), score) : 0
    }
    /**
     * 
     * @deprecated
     */
    getRawdata(){
        return this._objective;
    }

    /**
     * @private
     * @type {import("@minecraft/server").ScoreboardObjective}
     */
    _objective;
    constructor(objective){
        this._objective = objective;
    }
}