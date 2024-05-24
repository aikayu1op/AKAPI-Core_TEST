import { Player } from "../Player/index.js";
import { ActionFormData } from "./ActionFormData.js";

export class BookFormData{

    /**
     * @private
     * @type {string[]}
     */
    _book;
    /**
     * @private
     * @type {number}
     */
    _pages = 0;
    /**
     * @private
     * @type {ActionFormData}
     */
    _form;
    /**
     * 本を書きます。
     * 
     * 改行は普通に\nを使用してください。
     * 
     * 最大文字数は英語日本語でも全てにおいて1ページ180文字が限界です。
     * 
     * 改行は2文字カウントになります。
     * @param {string[]} write 
     */
    writeBook(write){
        let pages = [];
        let overWord = "";
        write.forEach(x =>{
            if(overWord != ""){
                x += overWord;
                overWord = "";
            }
            if(x.length > 180){
                overWord = x.substring(180);
                x = x.substring(0, 180);
            }
            x += " ".repeat(180 - x.length)
            pages.push(x);
        });
        let convert = pages.map(x => formatText(x))
        this._book = convert;
        return this;
    }
    /**
     * 本を表示します。
     * @param {Player} player 
     */
    show(player){
        if(this._book.length == 0){
            player.sendMessage("This book is empty!");
            return;
        }
        this._form = new ActionFormData()
        .title("§b§o§o§k");
        this._form.body(this._book[this._pages*2]+(this._book[this._pages*2+1]??""));
        let check = false;
        if(this._pages > 0){
            this._form.button("左", undefined, () => { this._pages--; this.show(player);})
            this._form.button("§n§o");
            check = true;
        }
        if(Math.floor(this._book.length / 2) > this._pages){
            this._form.button("§n§o");   
            this._form.button("右", undefined, () => { this._pages++; this.show(player);});   
            check = true;
        }
        if(!check) this._form.button("§n§o")
        this._form.show(player);
    }
    constructor(){ }
}
/**
 * 
 * @param {string} input 
 * @returns 
 */
function formatText(input) {
    let rowSize = 12;
    let formattedText = "";

    for (let j = 0; j < input.length; j += rowSize) {
        if (j + rowSize < input.length)
            formattedText += input.substring(j, j + rowSize) + "\n";
        else 
            formattedText += input.substring(j, j + rowSize);
    }

    return formattedText;
}
