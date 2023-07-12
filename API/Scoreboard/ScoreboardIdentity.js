import * as mc from "@minecraft/server";
import { Entity } from "../Entity/index.js";

export class ScoreboardIdentity{
    /**
     * @private
     */
    _identity;
    /**
     * @readonly
     */
    get displayName(){
        return this._identity.displayName;
    }
    /**
     * @readonly
     */
    get id(){
        return this._identity.id;
    }
    /**
     * @readonly
     */
    get type(){
        return this._identity.type;
    }
    getEntity(){
        return new Entity(this._identity.getEntity());
    }
    isValid(){
        return this._identity.isValid();
    }
    /**
     * 生データをかえします。
     * 
     * @deprecated
     */
    getRawdata(){
        return this._identity;
    }
    /**
     * 
     * @param {mc.ScoreboardIdentity} identity 
     */
    constructor(identity){
        this._identity = identity
    }
}