import { Dimension } from "../Dimension/index.js";
import { world } from "../World/index.js";

/**
 * マインクラフトに登録されているディメンションすべてを返します。
 */
export class MinecraftDimensionTypes{

    /**
     * @readonly
     * 現世のディメンションを返します。
     */
    overworld = new Dimension(world.getDimension("minecraft:overworld"));
    /**
     * @readonly
     * ネザーのディメンションを返します。
     */
    nether = new Dimension(world.getDimension("minecraft:nether"));
    /**
     * @readonly
     * エンドのディメンションを返します。
     */
    theEnd = new Dimension(world.getDimension("minecraft:the_end"));

}