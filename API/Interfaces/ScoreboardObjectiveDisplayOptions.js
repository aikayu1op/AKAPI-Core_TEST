import { ScoreboardObjective } from "../Scoreboard/ScoreboardObjective";
import { SortOrder } from "../Scoreboard/SortOrderEnum";

export class ScoreboardObjectiveDisplayOptions{
    /**
     * @type {ScoreboardObjective}
     */
    objective;
    /**
     * @typedef {SortOrder[keyof SortOrder]} sortOrder
     * 
     * @type {sortOrder | number}
     */
    sortOrder;
    /**
     * @deprecated
     */
    toObject(){
        let obj = {};
        if(this.objective instanceof ScoreboardObjective) obj.objective = this.objective;
        if(typeof this.sortOrder == "number") obj.sortOrder = this.sortOrder;
        if(typeof this.sortOrder == "string"){
            if(this.sortOrder == "ascending") obj.sortOrder = 0;
            else obj.sortOrder = 1;
        }
        return obj;
    }
    constructor(){}
}