import { Entity } from "../Entity/index.js";
import { EntityDamageCause } from "./EntityDamageCause";

export class EntityDamageSource{
    /**
     * @readonly
     * ダメージの内容が入っています。
     */
    cause = new EntityDamageCause();
    /**
     * ダメージを与えたエンティティを返します。
     * @type {Entity}
     * @readonly
     */
    damagingEntity;
    /**
     * ダメージを与えた投擲物のEntityを返します。
     * @type {Entity}
     * @readonly
     */
    damagingProjectile;
    constructor(){}
}
