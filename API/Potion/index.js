import * as mc from "@minecraft/server";

export class Potions{
    /**
     * 
     * @param {import("@minecraft/vanilla-data").MinecraftPotionEffectTypesUnion | mc.PotionEffectType} potionEffectId 
     * @returns 
     */
    static getPotionEffectType(potionEffectId){
        return mc.Potions.getPotionEffectType(potionEffectId);
    }
    /**
     * 
     * @param {import("@minecraft/vanilla-data").MinecraftPotionLiquidTypesUnion | mc.PotionLiquidType} potionLiquidId 
     * @returns 
     */
    static getPotionLiquidType(potionLiquidId){
        return mc.Potions.getPotionLiquidType(potionLiquidId);
    }
    /**
     * 
     * @param {import("@minecraft/vanilla-data").MinecraftPotionModifierTypesUnion | mc.PotionModifierType} potionModifierId 
     * @returns 
     */
    static getPotionModifierType(potionModifierId){
        return mc.Potions.getPotionModifierType(potionModifierId);
    }
}