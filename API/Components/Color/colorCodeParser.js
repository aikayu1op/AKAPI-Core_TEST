export class ColorCodeParser{
    /**
     * 6桁の文字列をカラーコードに変換します。
     * r,g,bの順番に配列を返します。
     * @param {string} value 
     */
    static rgbParse(value){
        const r = parseInt("0x"+value.substring(0,2), 16);
        const g = parseInt("0x"+value.substring(2,4), 16);
        const b = parseInt("0x"+value.substring(4), 16);
        return [r, g, b];
    }
}