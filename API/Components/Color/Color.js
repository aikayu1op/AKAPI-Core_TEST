import * as mc from "@minecraft/server";
import { ColorCodeParser } from "./colorCodeParser";
export class Color{
    /**
     * 赤色の値、最小値は0、最大値は255です。
     * @type {number}
     * @readonly
     */
    red;
    /**
     * 緑色の値、最小値は0、最大値は255です。
     * @type {number}
     * @readonly
     */
    green;
    /**
     * 青色の値、最小値は0、最大値は255です。
     * @type {number}
     * @readonly
     */
    blue;
    /**
     * 透明度の値、最小値は0、最大値は1で、小数点を扱います。
     * @type {number}
     * @readonly
     */
    alpha;
    /**
     * 色のオフセットを変更します。
     * @param {number} red 
     * @param {number} green 
     * @param {number} blue 
     * @param {number} alpha 
     */
    changeColorOffset(red = 0, green = 0, blue = 0, alpha = 0){
        this.red += red;
        this.green += green;
        this.blue += blue;
        this.alpha += alpha;
        return this;
    }
    setColor(red = 255, green = 255, blue = 255, alpha = 1){
        if(red > 255) this.red = 255;
        else if(red < 0) this.red = 0;
        else this.red = red;

        if(green > 255) this.green = 255;
        else if(green < 0) this.green = 0;
        else this.green = green;

        if(blue > 255) this.blue = 255;
        else if(blue < 0) this.blue = 0;
        else this.blue = blue;

        if(alpha > 1) this.alpha = 1;
        else if(alpha < 0) this.alpha = 0;
        else this.alpha = alpha;
        return this;
    }
    /**
     * RGBコードをHexに変換します。
     * @returns {string}
     */
    getColorCode(){
        return "#"+[this.red, this.green, this.blue].map(x => ("0"+x.toString(16)).slice(-2)).join("");
    }
    /**
     * Hexコードから255割った結果を返します。
     */
    getDyeableColor(){
        this.red /= 255;
        this.green /= 255;
        this.blue /= 255;
        return this;
    }
    /**
     * マイクラ公式のColorクラスを返します。
     * @deprecated
     * @returns {{}}
     */
    getMCColor(){
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        }
    }
    toObject(){
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        }
    }
    /**
     * 色を生成します。
     * redには、Gametest FrameworkのColorクラスと、色コードと、数字を入れることができます。
     * @param {mc.Color | number | string} red 
     * @param {number} green 
     * @param {number} blue 
     * @param {number} alpha 
     */
    constructor(red = 255, green = 255, blue = 255, alpha = 1){
        if(red > 255) this.red = 255;
        else if(red < 0) this.red = 0;
        else this.red = red;

        if(green > 255) this.green = 255;
        else if(green < 0) this.green = 0;
        else this.green = green;

        if(blue > 255) this.blue = 255;
        else if(blue < 0) this.blue = 0;
        else this.blue = blue;

        if(alpha > 1) this.alpha = 1;
        else if(alpha < 0) this.alpha = 0;
        else this.alpha = alpha;

        if(typeof red === "string" && red.startsWith("#") && red.length == 7){
            const cc = ColorCodeParser.parse(red.slice(1));
            this.red = cc[0];
            this.green = cc[1];
            this.blue = cc[2];
        }else if(typeof red === "object"){
            this.red = red.red;
            this.green = red.green;
            this.blue = red.blue;
            this.alpha = red?.alpha;
        }
    }
}