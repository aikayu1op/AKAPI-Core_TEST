import { Player } from "../Player/index.js";
import { world } from "../World/index.js";
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
            let line = x.split("\n");
            world.sendMessage(String(line.length));
            if(line.length > 14){
                overWord = x.slice(15);
                x = x.slice(0, 15);
            }
            let get = getSubstringWithinByteLimit(x, 360);
            if(get[1] > 360){
                overWord = x.substring(get[0].length-1);
                x = x[0];
            }
            x.replace(/\n/g, "\\n");
            world.sendMessage(String(get[0]))
            x += " ".repeat(360 - get[1])
            pages.push(formatText(x.replace(/\\n/g, "\n")));
        });
        this._book = pages;
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
        if(Math.ceil(this._book.length / 2) > this._pages){
            this._form.button("§n§o");   
            this._form.button("右", undefined, () => { this._pages++; this.show(player);});   
            check = true;
        }
        if(!check) this._form.button("§n§o")
        this._form.show(player);
        player.sendMessage((this._book[0]+this._book[1]).substring(0, 194));
    }
    constructor(){ }
}
/**
 * 
 * @param {string} input 
 * @returns 
 */
function formatText(input) {
    const ROW_SIZE = 12;
    let check = 0;
    let formatted = "";
    for(let item of input.split("")){
        if(item != "\n"){
            formatted += item;
            check++;
        }
        else{
            formatted += item+" ".repeat(ROW_SIZE-check-2);
            check = 0;
        }
        if(check == ROW_SIZE){
            formatted += "\n";
            check = 0;
        }
    }
    return formatted;
}
/**
 * 
 * @param {string} str 
 * @param {number} byteLimit
 * @returns 
 */
function getSubstringWithinByteLimit(str, byteLimit) {
    let byteLength = 0;
    let endIndex = 0;

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        let charByteLength;

        if (str[i] === "\n") {
            charByteLength = 2; // Treat \n as 2 bytes
        } else if (charCode <= 0x007F) {
            charByteLength = 1; // ASCII characters (1 byte)
        } else if (charCode <= 0x07FF) {
            charByteLength = 2; // Extended ASCII (2 bytes)
        } else if (charCode <= 0xFFFF) {
            charByteLength = 3; // Unicode characters (3 bytes)
        } else {
            charByteLength = 4; // Characters outside the Basic Multilingual Plane (4 bytes)
            i++; // Skip the next code unit, as it is part of the surrogate pair
        }

        if (byteLength + charByteLength > byteLimit) {
            break;
        }

        byteLength += charByteLength;
        endIndex = i + 1;
    }

    return [str.substring(0, endIndex), byteLength];
}