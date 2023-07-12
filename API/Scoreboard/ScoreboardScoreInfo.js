import * as mc from "@minecraft/server";
import { ScoreboardIdentity } from "./ScoreboardIdentity";
export class ScoreboardScoreInfo{

    /**
     * @private
     */
    _scoreInfo;
    /**
     * @readonly
     */
    get participant(){
        return new ScoreboardIdentity(this._scoreInfo.participant);
    }
    /**
     * @readonly
     */
    get score(){
        return this._scoreInfo.score;
    }
    /**
     * 
     * @param {mc.ScoreboardScoreInfo} scoreInfo 
     */
    constructor(scoreInfo){
        this._scoreInfo = scoreInfo;
    }
}