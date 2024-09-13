
import { NumberRange } from "./NumberRange.js";

/**
 * @todo ItemQueryOptionsの今後の変更
・location(slot.mainhand系)の追加
・それに伴ったgetAllItemsの仕様変更

マイクラは含むやつ(type)も含まないやつ(excludeType)も複数種類にする

location["any"]はすべてObject化する

nameTag,typeId,amount,loreは必ず追加する(現時点ではdata値は取得しない方向)


多分やる
よし
頑張れ
未来の俺
*/

export class ItemQueryOptions{
    /**
     * 空のスロットも判別するかどうかを取得します。
     * 
     * falseは取得しません
     * 
     * trueは取得します
     * 
     * 初期値はfalseです。
     */
    withEmpty = false;
    /**
     * アイテムの検索位置を指定されたスロットに検索します。
     * (インベントリ内だけのスロット、頭などの特殊なスロットには対応していません)
     * 
     * mainhandはbooleanを入れることができます。
     * 
     * hotbarは0〜8までの数値を入れることができます。
     * 
     * inventoryには0〜26までの数値を入れることができます。
     * 
     * 複数個のスロットを指定したい場合は配列にすることで指定したスロット分の場所を回すことができます。
     */
    location = {
        /**
         * 手に持っているアイテムを取得します。
         * 
         * booleanでtrueにすると取得できますがfalseだと取得しません。
         * @type {{
         * isChecked: boolean,
         * item: string[] | string | undefined,
         * excludeItem: string[] | string | undefined,
         * amount: NumberRange | number | undefined,
         * nameTag: string | undefined,
         * lore: string[] | undefined
         * }}
         */
        mainhand: {
            isChecked: false,
            item: null,
            excludeItem: null,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: null,
            lore: null
        },
        /**
         * ホットバーのアイテムを取得します。
         * 
         * 0〜8までの数値を入れることができます。(配列も可)
         * 
         * それ以下や以上の場合は自動的に変換されます。
         * @type {{
         * isChecked: boolean,
         * item: string[] | string | undefined,
         * excludeItem: string[] | string | undefined,
         * amount: NumberRange | number | undefined,
         * nameTag: string[] | string | undefined,
         * lore: string[] | undefined
         * }}
         */
        hotbar: {
            isChecked: false,
            item: undefined,
            excludeItem: undefined,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: undefined,
            lore: null
        },
        /**
         * インベントリのアイテムを取得します。
         * 
         * 0〜26までの数値を入れることができます。(配列も可)
         * 
         * それ以下や以上の場合は自動的に変換されます。
         * @type {{
         * isChecked: boolean,
         * item: string[] | string | undefined,
         * excludeItem: string[] | string | undefined,
         * amount: NumberRange | number | undefined,
         * nameTag: string[] | string | undefined,
         * lore: string[] | undefined
         * }}
         */
        inventory: {
            isChecked: false,
            item: undefined,
            excludeItem: undefined,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: undefined,
            lore: null
        }
    };    

    /**
     * オプションを返します。
     *
     * @deprecated
     */
    getOptions(){
        const options = {};

        if(typeof this.withEmpty != "boolean") this.withEmpty = false;

        if(typeof this.location != "object"){
            this.location = {};
            this.location.hotbar = {};
            this.location.inventory = {};
            this.location.mainhand = {};
        }
        //#region  locationの中身がobjectではないか、指定したプロパティが存在しなかった場合はすべてnullを返す場所
        if(typeof this.location.mainhand != "object" ||
            !("item" in this.location.mainhand) ||
            !("excludeItem" in this.location.mainhand) ||
            !("amount" in this.location.mainhand) ||
            !("nameTag" in this.location.mainhand) ||
            !("lore" in this.location.mainhand)
        ) this.location.mainhand = {
            isChecked: false,
            item: undefined,
            excludeItem: undefined,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: undefined,
            lore: null
        }
        if(typeof this.location.hotbar != "object" ||
            !("item" in this.location.hotbar) ||
            !("excludeItem" in this.location.hotbar) ||
            !("amount" in this.location.hotbar) ||
            !("nameTag" in this.location.hotbar) ||
            !("lore" in this.location.hotbar)
        ) this.location.hotbar = {
            isChecked: false,
            item: undefined,
            excludeItem: undefined,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: undefined,
            lore: null
        }
        if(typeof this.location.inventory != "object" ||
            !("item" in this.location.inventory) ||
            !("excludeItem" in this.location.inventory) ||
            !("amount" in this.location.inventory) ||
            !("nameTag" in this.location.inventory) ||
            !("lore" in this.location.inventory)
        ) this.location.inventory = {
            isChecked: false,
            item: undefined,
            excludeItem: undefined,
            amount: new NumberRange(undefined, {max: 64}),
            nameTag: undefined,
            lore: null
        }
        //#endregion
        //#region  mainhandの中身の処理
        if(this.location.mainhand.item instanceof Array)
            for(let i = 0; i < this.location.mainhand.item.length; i++){
                if(typeof this.location.mainhand.item[i] != "string") this.location.mainhand.item[i] = undefined;
                if(typeof this.location.mainhand.item[i] == "string" && !this.location.mainhand.item[i].includes(":")) this.location.mainhand.item[i] = "minecraft:"+this.location.mainhand.item[i];
            }
        else{
            if(typeof this.location.mainhand.item != "string") this.location.mainhand.item = undefined;
            if(typeof this.location.mainhand.item == "string" && !this.location.mainhand.item.includes(":")) this.location.mainhand.item = "minecraft:"+this.location.mainhand.item;
        }
        if(this.location.mainhand.excludeItem instanceof Array)
            for(let i = 0; i < this.location.mainhand.excludeItem.length; i++){
                if(typeof this.location.mainhand.excludeItem[i] != "string") this.location.mainhand.excludeItem[i] = undefined;
                if(typeof this.location.mainhand.excludeItem[i] == "string" && !this.location.mainhand.excludeItem[i].includes(":")) this.location.mainhand.excludeItem[i] = "minecraft:"+this.location.mainhand.excludeItem[i];
            }
        else{
            if(typeof this.location.mainhand.excludeItem != "string") this.location.mainhand.excludeItem = undefined;
            if(typeof this.location.mainhand.excludeItem == "string" && !this.location.mainhand.excludeItem.includes(":")) this.location.mainhand.excludeItem = "minecraft:"+this.location.mainhand.excludeItem;
        }

        if(!(this.location.mainhand.amount instanceof NumberRange) && typeof this.location.mainhand.amount !== "number"){
            const range = new NumberRange(undefined, {min: 1, max: 64});
            this.location.mainhand.amount = range;
        }else if(typeof this.location.mainhand.amount === "number"){
            if(this.location.mainhand.amount < 0) this.location.mainhand.amount = 0;
            else if(this.location.mainhand.amount > 64) this.location.mainhand.amount = 64;
        }
        else{
            if(this.location.mainhand.amount.min < 1) this.location.mainhand.amount.min = 1;
            if(this.location.mainhand.amount.max < 64) this.location.mainhand.amount.max = 64;
        }

        if(this.location.mainhand.nameTag instanceof Array)
            for(let i = 0; i < this.location.mainhand.nameTag.length; i++)
                if(typeof this.location.mainhand.nameTag[i] != "string") this.location.mainhand.nameTag[i] = undefined;
                
        else
            if(typeof this.location.mainhand.nameTag != "string") this.location.mainhand.nameTag = undefined;

        if(!(this.location.mainhand.lore instanceof Array)) this.location.mainhand.lore = null;
        
        //#endregion

        //#region  hotbarの中身の処理
        if(this.location.hotbar.item instanceof Array)
            for(let i = 0; i < this.location.hotbar.item.length; i++){
                if(typeof this.location.hotbar.item[i] != "string") this.location.hotbar.item[i] = undefined;
                if(typeof this.location.hotbar.item[i] == "string" && !this.location.hotbar.item[i].includes(":")) this.location.hotbar.item[i] = "minecraft:"+this.location.hotbar.item[i];
            }
        else{
            if(typeof this.location.hotbar.item != "string") this.location.hotbar.item = undefined;
            if(typeof this.location.hotbar.item == "string" && !this.location.hotbar.item.includes(":")) this.location.hotbar.item = "minecraft:"+this.location.hotbar.item;
        }
        
        if(this.location.hotbar.excludeItem instanceof Array)
            for(let i = 0; i < this.location.hotbar.excludeItem.length; i++){
                if(typeof this.location.hotbar.excludeItem[i] != "string") this.location.hotbar.excludeItem[i] = undefined;
                if(typeof this.location.hotbar.excludeItem[i] == "string" && !this.location.hotbar.excludeItem[i].includes(":")) this.location.hotbar.excludeItem[i] = "minecraft:"+this.location.hotbar.excludeItem[i];
            }
                
        else{
            if(typeof this.location.hotbar.excludeItem != "string") this.location.hotbar.excludeItem = undefined;
            if(typeof this.location.hotbar.excludeItem == "string" && !this.location.hotbar.excludeItem.includes(":")) this.location.hotbar.excludeItem = "minecraft:"+this.location.hotbar.excludeItem;
        }

        if(!(this.location.hotbar.amount instanceof NumberRange) && typeof this.location.hotbar.amount !== "number"){
            const range = new NumberRange(undefined, {min: 1, max: 64});
            this.location.hotbar.amount = range;
        }else if(typeof this.location.hotbar.amount === "number"){
            if(this.location.hotbar.amount < 0) this.location.hotbar.amount = 0;
            else if(this.location.hotbar.amount > 64) this.location.hotbar.amount = 64;
        }else{
            if(this.location.hotbar.amount.min < 1) this.location.hotbar.amount.min = 1;
            if(this.location.hotbar.amount.max < 64) this.location.hotbar.amount.max = 64;
        }

        if(this.location.hotbar.nameTag instanceof Array)
            for(let i = 0; i < this.location.hotbar.nameTag.length; i++)
                if(typeof this.location.hotbar.nameTag[i] != "string") this.location.hotbar.nameTag[i] = undefined;
        else
            if(typeof this.location.hotbar.nameTag != "string") this.location.hotbar.nameTag = undefined;

        if(!(this.location.hotbar.lore instanceof Array)) this.location.hotbar.lore = null;
        
        //#endregion

        //#region  inventoryの中身の処理
        if(this.location.inventory.item instanceof Array)
            for(let i = 0; i < this.location.inventory.item.length; i++){
                if(typeof this.location.inventory.item[i] != "string") this.location.inventory.item[i] = undefined;
                if(typeof this.location.inventory.item[i] == "string" && !this.location.inventory.item[i].includes(":")) this.location.inventory.item[i] = "minecraft:"+this.location.inventory.item[i];
            }
        else{
            if(typeof this.location.inventory.item != "string") this.location.inventory.item = undefined;
            if(typeof this.location.inventory.item == "string" && !this.location.inventory.item.includes(":")) this.location.inventory.item = "minecraft:"+this.location.inventory.item;
        }
        
        if(this.location.inventory.excludeItem instanceof Array)
            for(let i = 0; i < this.location.inventory.excludeItem.length; i++){
                if(typeof this.location.inventory.excludeItem[i] != "string") this.location.inventory.excludeItem[i] = undefined;
                if(typeof this.location.inventory.excludeItem[i] == "string" && !this.location.inventory.excludeItem[i].includes(":")) this.location.inventory.excludeItem[i] = "minecraft:"+this.location.inventory.excludeItem[i];
            }
        else{
            if(typeof this.location.inventory.excludeItem != "string") this.location.inventory.excludeItem = undefined;
            if(typeof this.location.inventory.excludeItem == "string" && !this.location.inventory.excludeItem.includes(":")) this.location.inventory.excludeItem = "minecraft:"+this.location.inventory.excludeItem;
        }

        if(!(this.location.inventory.amount instanceof NumberRange) && typeof this.location.inventory.amount !== "number"){
            const range = new NumberRange(undefined, {min: 1, max: 64});
            this.location.inventory.amount = range;
        }else if(typeof this.location.inventory.amount === "number"){
            if(this.location.inventory.amount < 0) this.location.inventory.amount = 0;
            else if(this.location.inventory.amount > 64) this.location.inventory.amount = 64;
        }else{
            if(this.location.inventory.amount.min < 1) this.location.inventory.amount.min = 1;
            if(this.location.inventory.amount.max < 64) this.location.inventory.amount.max = 64;
        }

        if(this.location.inventory.nameTag instanceof Array)
            for(let i = 0; i < this.location.inventory.nameTag.length; i++)
                if(typeof this.location.inventory.nameTag[i] != "string") this.location.inventory.nameTag[i] = undefined;
        else
            if(typeof this.location.inventory.nameTag != "string") this.location.inventory.nameTag = undefined;

        if(!(this.location.inventory.lore instanceof Array)) this.location.inventory.lore = null;
        
        //#endregion
        if(this.location.mainhand.lore instanceof Array && this.location.mainhand.lore.length == 0) this.location.mainhand.lore = [""];
        if(!this.location.mainhand.item &&
           !this.location.mainhand.excludeItem &&
           this.location.mainhand.amount.min == 1 &&
           this.location.mainhand.amount.max == 64 &&
           !this.location.mainhand.nameTag &&
           !this.location.mainhand.lore &&
           !this.location.mainhand.isChecked) this.location.mainhand = {};

        if(this.location.hotbar.lore instanceof Array && this.location.hotbar.lore.length == 0) this.location.hotbar.lore = [""];
        if(!this.location.hotbar.item &&
           !this.location.hotbar.excludeItem &&
           this.location.hotbar.amount.min == 1 &&
           this.location.hotbar.amount.max == 64 &&
           !this.location.hotbar.nameTag &&
           !this.location.hotbar.lore &&
           !this.location.hotbar.isChecked) this.location.hotbar = {};

        if(this.location.inventory.lore instanceof Array && this.location.inventory.lore.length == 0) this.location.inventory.lore = [""];
        if(!this.location.inventory.item &&
           !this.location.inventory.excludeItem &&
           this.location.inventory.amount.min == 1 &&
           this.location.inventory.amount.max == 64 &&
           !this.location.inventory.nameTag &&
           !this.location.inventory.lore &&
           !this.location.inventory.isChecked) this.location.inventory = {};
        options.location = this.location;
        options.withEmpty = this.withEmpty;
        return options;
    }
    /**
     * ItemStackから自動的にOptionを生成します。
     * @param {ItemStack} itemStack 
     */
    static from(itemStack){
        const options = {};

        return options;
    }
    constructor(){}
}