import { world } from "../World/index.js";

/**
 * マインクラフトに登録されているディメンションすべてを返します。
 */
export class MinecraftDimensionTypes{

    /**
     * @readonly
     * 現世のディメンションを返します。
     */
    overworld = world.getDimension("minecraft:overworld");
    /**
     * @readonly
     * ネザーのディメンションを返します。
     */
    nether = world.getDimension("minecraft:nether");
    /**
     * @readonly
     * エンドのディメンションを返します。
     */
    theEnd = world.getDimension("minecraft:the_end");

}