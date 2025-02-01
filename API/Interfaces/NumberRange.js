export class NumberRange{
    /**
     * 最小値を設定できます。
     */
    min = 0;
    /**
     * 最大値を設定できます。
     */
    max = 0;
    /**
     * オブジェクトに変換します。
     * @deprecated
     */
    convertObject(){
        return{
            min: this.min,
            max: this.max
        }
    }
    /**
     * データを返します。
     * @deprecated
     */
    getOptions(){
        const data = {};
        data.min = this.min;
        data.max = this.max;
        return data;
    }
    /**
     * 指定されたminとmaxの間で乱数を生成します。
     */
    genRandomNum(){
        return Math.floor(Math.random() * this.max + this.min);
    }
    /**
     * 
     * @param {{min: number, max: number} | Object} object 
     */
    constructor(object = undefined){
        if(typeof object == "object"){
            if(typeof object.min == "number") this.min = object.min;
            if(typeof object.max == "number") this.max = object.max;
        }
    }
}