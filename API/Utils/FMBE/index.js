import { IllegalTypeError } from "../../../../../RPG/Data/interface";
import { ItemStack } from "../../ItemStack/ItemStack.js";
import { Player } from "../../Player/index.js";
import { system } from "../../System/index.js";
import { world } from "../../World/index.js";


let fmbe = new Map();
export class FMBE{

    /** @private */
    _name;
    /** @private */
    _scale;
    /** @private */
    _shiftPos;
    /** @private */
    _state;
    /** @private */
    _item;

    __init(){
        if(typeof this._scale !== "object" || typeof this._shiftPos !== "object") throw new IllegalTypeError();
        let scale = {
            xbasepos: "v.xbasepos??0",
            ybasepos: "v.ybasepos??0",
            zbasepos: "v.zbasepos??0",
            xpos: "v.xpos??0",
            ypos: "v.ypos??0",
            zpos: "v.zpos??0",
            xrot: "v.xrot??0",
            yrot: "v.yrot??0",
            zrot: "v.zrot??0",
            scale: "v.scale??1",
            xzscale: "v.xzscale??1",
            yscale: "v.yscale??1",
            swelling_scale1: "2.1385*math.sqrt(v.xzscale)*math.sqrt(v.scale)",
            swelling_scale2: "2.1385*math.sqrt(v.yscale)*math.sqrt(v.scale)"
        };
        
        let shift_pos = {
            head_rotation_x: "v.head_rotation_x=0",
            head_rotation_y: "v.head_rotation_y=0",
            head_rotation_z: "v.head_rotation_z=0",
            head_position_x: "(v.xbasepos*3741/8000)*math.sqrt(v.xzscale)*math.sqrt(v.scale)",
            head_position_y: "(10.6925+v.ybasepos*3741/8000)*math.sqrt(v.yscale)*math.sqrt(v.scale)",
            head_position_z: "(17.108-v.zbasepos*3741/8000)*math.sqrt(v.xzscale)*math.sqrt(v.scale)"
        };
        
        Object.assign(scale, this._scale);
        Object.assign(shift_pos, this._shiftPos);
        this._scale = scale;
        this._shiftPos = shift_pos;
        this._state = 0;
        this.__save();
        return this;
    }
    /**
     * 偽アイテムを召喚します。
     */
    fakeItem(){
        this._scale = {
            scale: "v.scale=0.205",
            adscale: "v.adscale=math.sqrt(v.scale)",
            adscaled: "v.adscaled=2.1385*v.adscale",
            xbasepos: "v.xbasepos=0",
            ybasepos: "v.ybasepos=-0.9",
            zbasepos: "v.zbasepos=-1.2",
            xpos: "v.xpos=0",
            ypos: "v.ypos=7.4+1.7*math.sin(q.life_time*118)",
            zpos: "v.zpos=0",
            xrot: "v.xrot=90",
            yrot: "v.yrot=q.life_time*-57",
            zrot: "v.zrot=-25",
            swelling_scale1: "v.swelling_scale1=v.adscaled",
            swelling_scale2: "v.swelling_scale2=v.adscaled"
        }
        this._shiftPos = {
            adjust_xz: "v.adjust_xz=8*v.adscaled+v.zbasepos/v.adscaled",
            adjust_y: "v.adjust_y=(-5-v.ybasepos/v.adscaled/v.adscaled)*v.adscaled",
            x: "v.x=v.xbasepos/v.adscaled",
            y: "v.y=v.adjust_y",
            z: "v.z=v.adjust_xz",
            ty: "v.ty=v.y*math.cos(v.xrot)-v.z*math.sin(v.xrot)",
            tz: "v.tz=v.y*math.sin(v.xrot)+v.z*math.cos(v.xrot)",
            y_update: "v.y=v.ty",
            z_update: "v.z=v.tz",
            tx: "v.tx=-v.x*math.cos(v.zrot)+v.y*math.sin(v.zrot)",
            ty_update: "v.ty=v.x*math.sin(v.zrot)+v.y*math.cos(v.zrot)",
            x_update: "v.x=v.tx",
            y_final: "v.y=v.ty",
            tx_final: "v.tx=v.x*math.cos(v.yrot)+v.z*math.sin(v.yrot)",
            tz_final: "v.tz=-v.x*math.sin(v.yrot)+v.z*math.cos(v.yrot)",
            x_final: "v.x=v.tx",
            z_final: "v.z=v.tz",
            head_position_x: "v.head_position_x=v.x+v.xpos/v.adscaled",
            head_position_y: "v.head_position_y=7.48/v.adscale+v.z+v.zpos/v.adscaled"
        }
        this._state = 1;
        this.__save();
        return this;
    }
    __save(){
        fmbe.set(this._name, {scale: this._scale, shiftPos: this._shiftPos, item: this._item, state: this._state});
    }
    static load(name){
        if(world.overworld.getEntities({tags: ["name:"+name, "fmbe"]}).length==0) return undefined;
        return fmbe.get(name);
    }
    /**
     * 
     * @param {Player} player 
     * @param {string} name 
     */
    static summon(player, name){
        if(fmbe.has(name)){
            const entity = player.dimension.spawnEntity("minecraft:fox", player.location);
            entity.addTag("name:"+name);
            entity.addTag("fmbe");
            if(fmbe.get(name).state === 1) entity.addTag("item");
            if(isStop){
                id = system.runInterval(fmbetick);
                isStop = false;
            }
            return true;
        }
        else return false;
    }

    /**
     * 
     * @param {string} name 
     * @param {Object} obj 
     */
    constructor(name, {scale = {}, shift_pos = {}, item = ""}){
        this._name = name;
        if(!!scale) this._scale = scale || {};
        if(!!shift_pos) this._shiftPos = shift_pos || {};
        this._item = item;
        this.__init();
    }
}

let isStop = false;
let id = system.runInterval(fmbetick);

function fmbetick(){
    const entities = world.getEntities({tags: ["fmbe"], type: "minecraft:fox"});
    if(entities.length == 0){
        isStop = true;
        system.clearRun(id);
    }
    entities.forEach(entity => {
        const name = entity.getTags().find(x => x.includes("name:")).split(":")[1];
        entity.playAnimation("animation.player.sleeping",  {nextState: "none", blendOutTime: 0, stopExpression: "", controller: "controller.animation.fox.move"});
        entity.playAnimation("animation.creeper.swelling", {nextState: "none", blendOutTime: 0, stopExpression: Object.keys(fmbe.get(name).scale).map(x => `${x}=${fmbe.get(name).scale[x]}`).join("; ").trim(), controller: "scale"});
        entity.playAnimation("animation.ender_dragon.neck_head_movement", {nextState: "none", blendOutTime: 0, stopExpression: Object.keys(fmbe.get(name).shiftPos).map(x => `${x}=${fmbe.get(name).shiftPos[x]}`).join("; ").trim(), controller: "shift_pos"});
        entity.getComponent().getInventory().container.setItem(0, new ItemStack(fmbe.get(name).item));
        entity.location = entity.location;
        world.getPlayers().forEach(p =>{
            [
                "mob.fox.spit",
                "mob.fox.sniff",
                "mob.fox.sleep",
                "mob.fox.screech",
                "mob.fox.hurt",
                "mob.fox.eat",
                "mob.fox.death",
                "mob.fox.bite",
                "mob.fox.ambient",
                "mob.fox.aggro"
            ].forEach(x => p.stopSound(x));
        });
    });

}