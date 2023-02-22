import { world } from "@minecraft/server";

export function is70(){
    try{
        world.getDimension("overworld").getBlock({x: 0, y: 0, z: 0});
        return true;
    }catch{return false;}
}