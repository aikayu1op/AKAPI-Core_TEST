export * from "./CommandBuilder/index.js";
export * from "./PluginManager/index.js";
export * from "./Thread/index.js";
export * from "./Time/timer.js";

class UtilsClass{
    /**
     * 
     * @param {string} text 
     * @param {number} width 
     * @returns 
     */
    centerText(text, width) {
        let save = text;
        const textLength = this.getStringByteCount(save.replace(/§./gm, ""));
        if (textLength >= width) return text;
        
        const totalSpaces = width - textLength;
        const leftSpaces = Math.floor(totalSpaces / 4);
        const centeredText = ' '.repeat(leftSpaces) + text;
    
        return centeredText;
    }
    /**
     * 
     * @param {string} str 
     * @returns 
     */
    getStringByteCount(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (code <= 0x7f)        count += 1;
            else if (code <= 0x7ff)  count += 2;
            else if (code <= 0xffff) count += 3;
            else                     count += 4;
        }
        return count;
    }
    constructor(){}
    
}
export const Utils = new UtilsClass();