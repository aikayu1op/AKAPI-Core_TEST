import * as mc from "@minecraft/server";
import { ItemComponentBase } from "../Components/ItemComponents.js";
import { world } from "../World/index.js";

export class ItemStack {
  /**
   * @type {mc.ItemStack}
   * @private
   */
  _itemStack;
  /**
   * アイテムのID
   * @type {string}
   * @readonly
   */
  typeId = undefined;
  /**
   * アイテムのコンポーネントを操作できます。
   */
  getComponent() {
    return new ItemComponentBase(this);
  }
  /**
   * アイテムが持つコンポーネントすべてを返します。
   */
  getComponents() {
    return new ItemComponentBase(this).getComponents();
  }
  /**
   * アイテムの説明文を取得します。
   */
  getLore() {
    return this._itemStack.getLore();
  }
  /**
   * アイテムに説明文を追加します。
   * @param {string[]} loreList
   */
  setLore(loreList) {
    this._itemStack.setLore(loreList);
  }
  /**
   * アイテムのイベントを実行します。
   * @param {string} eventName
   */
  triggerEvent(eventName) {
    this._itemStack.triggerEvent(eventName);
  }
  /**
   * アイテムの名前を確認・変更します。
   * valueに値を入れると変更され、何も入れないと確認可能です。
   * @example
   * ```
   * const item = new ItemStack(mc.MinecraftItemTypes.apple);
   * item.NameTag("test");
   * 
   * console.log(item.NameTag()); //output: test
   * ```
   * @param {string} value 
   */
  NameTag(value = undefined){
    if(value == undefined) return this._itemStack.nameTag;
    this._itemStack.nameTag = value;
  }
  /**
   * アイテムの個数を確認・変更します。
   * valueに値を入れると変更され、何も入れないと確認可能です。
   * @example
   * ```
   * const item = new ItemStack(mc.MinecraftItemTypes.apple);
   * item.Amount(10);
   * 
   * console.log(item.Amount()); //output: 10
   * ```
   * @param {number} value 
   */
  Amount(value = undefined){
    if(value == undefined) return this._itemStack.amount;
    this._itemStack.amount = value;
  }
  /**
   * アイテムのデータ値を確認・変更します。
   * valueに値を入れると変更され、何も入れないと確認可能です。
   * @example
   * ```
   * const item = new ItemStack(mc.MinecraftItemTypes.apple);
   * item.Data(1);
   * 
   * console.log(item.Data()); //output: 1
   * ```
   * @param {number} value 
   */
  Data(value = undefined){
    if(value == undefined) return this._itemStack.data;
    this._itemStack.data = value;
  }
  /**
   * マイクラ公式のItemStackを返します。
   * @deprecated
   */
  getItemStack() {
    return this._itemStack;
  }
  /**
   * ワールドで使用するItemStackの初期化処理
   * コンストラクタにItemStackを入れることも可能です。
   * ```
   * import * as mc from "@minecraft/server";
   * import { ItemStack } from "./ItemStack/index.js";
   *
   * //ItemType Version
   * const itemTypeVer = new ItemStack(mc.MinecraftItemTypes.apple, 1, 0);
   * const itemTypeVer2 = new ItemStack(mc.MinecraftItemTypes.apple, 1, 0, "apple?", "yes");
   *
   * //ItemStack Version
   * const example = new mc.ItemStack(mc.MinecraftItemTypes.apple, 1, 0);
   * const itemStackVersion = new ItemStack(example);
   * ```
   * @param {mc.ItemType | mc.ItemStack} itemType アイテムの指定、ここにMinecraft側のItemStackを入れることも可能です。
   * @param {number} amount 個数
   * @param {number} data データ値
   * @param {string} nameTag アイテム名
   * @param {string[]} lore アイテムの説明
   */
  constructor(itemType, amount = 1, data = 0, nameTag = "", lore = undefined) {
    if (itemType instanceof mc.ItemStack) {
      this._itemStack = itemType;
      this.typeId = this._itemStack.typeId;
      this.amount = this._itemStack.amount;
      if(nameTag != "") this._itemStack.nameTag = nameTag;
      if(lore instanceof Array && lore != undefined) this._itemStack.setLore(lore);

    }
    if (itemType instanceof mc.ItemType) {
      this._itemStack = new mc.ItemStack(itemType, amount, data);
      this.typeId = this._itemStack.typeId;
      if(nameTag != "") this._itemStack.nameTag = nameTag;
      if(lore instanceof Array && lore != undefined) this._itemStack.setLore(lore);
    }/*else{
      world.sendMessage(itemType instanceof mc.ItemStack);
      this._itemStack = undefined;
    }*/
  }
}

