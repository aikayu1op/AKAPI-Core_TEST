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
     * @param {Object} object 
     * @param {{min: number, max: number}}
     */
    constructor(object = undefined, {min = null, max = null}){
        if(!!min) this.min = min;
        if(!!max) this.max = max;
        if(typeof object == "object" && 'min' in object && 'max' in object){
            if(typeof object.min == "number") this.min = object.min;
            if(typeof object.max == "number") this.max = object.max;
        }
    }
}