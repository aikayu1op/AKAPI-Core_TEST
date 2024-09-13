import * as mc from "@minecraft/server";
import { ItemComponentBase } from "../Components/ItemComponents.js";
import { ItemLockMode } from "../Interfaces/ItemLockMode.js";
import { Vector } from "../Vector/index.js";

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
  get typeId(){
    return this._itemStack.typeId;
  };

  /**
   * itemStackを複製します。
   */
  clone(){
    return new ItemStack(this._itemStack.clone());
  }
  /**
   * 適応されている動的プロパティをクリアします。
   */
  clearDynamicProperties(){
    this._itemStack.clearDynamicProperties();
  }
  /**
   * ポーションを作成します。
   * @param {mc.PotionOptions} options 
   */
  static createPotion(options){
    let create = mc.ItemStack.createPotion(options);
    if(!create) return undefined;
    return new ItemStack(create);
  }
  /**
   * このアイテムに保存されている動的プロパティを取得します。
   * @param {string} identifier 
   * @returns 
   */
  getDynamicProperty(identifier){
    if(typeof this._itemStack.getDynamicProperty(identifier) === "object") return new Vector(this._itemStack.getDynamicProperty(identifier));
    return this._itemStack.getDynamicProperty(identifier);
  }
  /**
   * 
   * @returns 
   */
  getDynamicPropertyIds(){
    return this._itemStack.getDynamicPropertyIds();
  }
  /**
   * 
   * @returns 
   */
  getDynamicPropertyTotalByteCount(){
    return this._itemStack.getDynamicPropertyTotalByteCount();
  }
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
   * そのアイテムが1stいくら持てるのかを取得できます。
   * @readonly
   */
  get maxAmount(){
    return this._itemStack.maxAmount;
  }
  /**
   * そのアイテムがスタック可能かを返します。
   * @readonly
   */
  get isStackable(){
    return this._itemStack.isStackable;
  }
  /**
   * @param {ItemStack} itemStack
   */
  isStackableWith(itemStack){
    return this._itemStack.isStackableWith(itemStack.getItemStack())
  }
  /**
   * 
   */
  get keepOnDeath(){
    return this._itemStack.keepOnDeath;
  }
  /**
   * @param {boolean} value
   */
  set keepOnDeath(value){
    if(typeof value === "boolean") this._itemStack.keepOnDeath = value;
  }
  get lockMode(){
    return this._itemStack.lockMode;
  }
  /**
   * @param {ItemLockMode[keyof ItemLockMode]} value
   */
  set lockMode(value){
    this._itemStack.lockMode = value;
  }
  /**
   * アドベンチャーモードで指定されたブロックに対して設置可能にします。
   */
  get canPlaceOn(){return this._itemStack.getCanPlaceOn();}
  /**
   * @param {string[]} blockIdentifiers 指定されたブロックIDだけを設置可能にします。
   */
  set canPlaceOn(blockIdentifiers){
    this._itemStack.setCanPlaceOn(blockIdentifiers.map(x => {if(!x.startsWith("minecraft:")) return x = "minecraft:"+x;else return x}));
  }
  /**
   * アドベンチャーモードで指定されたブロックに対して破壊可能にします。
   */
  get canDestroy(){return this._itemStack.getCanDestroy();}
  /**
   * @param {string[]} blockIdentifiers 指定されたブロックIDだけを破壊可能にします。
   */
  set canDestroy(blockIdentifiers){
    this._itemStack.setCanDestroy(blockIdentifiers.map(x => {if(!x.startsWith("minecraft:")) return x = "minecraft:"+x;else return x}));
  }
  /**
   * アイテムに説明文を追加します。
   * @param {string[]} loreList
   */
  setLore(loreList) {
    this._itemStack.setLore(loreList);
  }
  /**
   * 
   * @param {string} identifier 
   * @param {string | number | boolean | Vector} value 
   */
  setDynamicProperty(identifier, value){
    if(value instanceof Vector) value = value.getMCVector3();
    this._itemStack.setDynamicProperty(identifier, value);
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
   * アイテムの名前を確認します。
   */
  get nameTag(){
    return this._itemStack.nameTag;
  }
  /**
   * アイテムの名前を確認します。
   * @param {string} value 文字列を入れることでアイテムに名前を付けれます。undefinedをいれることで名前をリセットできます。
   */
  set nameTag(value){
    if(typeof value == "string") this._itemStack.nameTag = value;
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
   * アイテムの個数を確認します。
   */
  get amount(){
    return this._itemStack.amount;
  }
  /**
   * アイテムの個数を確認します。
   * @param {number} value
   */
  set amount(value){
    if(typeof value == "number") this._itemStack.amount = value;
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
   * @deprecated
   */
  /*Data(value = undefined){
    if(value == undefined) return this._itemStack.data;
    this._itemStack.data = value;
  }*/
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
   * const itemTypeVer = new ItemStack(mc.MinecraftItemTypes.apple, 1);
   * const itemTypeVer2 = new ItemStack(mc.MinecraftItemTypes.apple, 1, "apple?", "yes");
   *
   * //ItemStack Version
   * const example = new mc.ItemStack(mc.MinecraftItemTypes.apple, 1);
   * const itemStackVersion = new ItemStack(example);
   * ```
   * @overload
   * @param {mc.ItemType} itemType アイテムの指定、ここにMinecraft側のItemStackを入れることも可能です。
   * @param {number} amount 個数
   * @param {string} nameTag アイテム名
   * @param {string[]} lore アイテムの説明
   * @overload
   * @param {mc.ItemStack} itemStack
   */
  constructor(itemType, amount = 1, nameTag = "", lore = undefined) {
    if (itemType instanceof mc.ItemStack) {
      this._itemStack = itemType;
      if(lore instanceof Array && lore != undefined) this._itemStack.setLore(lore);

    }
    else if (itemType instanceof mc.ItemType || typeof itemType === "string") {
      this._itemStack = new mc.ItemStack(itemType, amount);
      if(nameTag != "") this._itemStack.nameTag = nameTag;
      if(lore instanceof Array && lore != undefined) this._itemStack.setLore(lore);
    }else{
      console.warn(JSON.stringify(itemType));
      return;
    }
  }
}

