import * as mc from "@minecraft/server";
import { ItemComponentBase } from "../Components/ItemComponents.js";
import { ItemStack } from "./ItemStack.js";
import { Player } from "../Player/index.js";

export class ContainerSlot {
  /**
   * @type {mc.ItemStack}
   * @private
   */
  _itemStack;
  /**
   * @type {Player}
   * @private
   */
  _player;
  /**
   * @type {number | string}
   * @private
   */
  _slot;
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
   * 
   */
  get keepOnDeath(){
    return this._itemStack.keepOnDeath;
  }
  /**
   * @param {boolean} value
   */
  set keepOnDeath(value){
    if(typeof value === "boolean"){
        this._itemStack.keepOnDeath = value;
        setItem(this._player, this._slot, this._itemStack);
    }
  }
  get lockMode(){
    return this._itemStack.lockMode;
  }
  /**
   * @param {mc.ItemLockMode} value
   */
  set lockMode(value){
    if(typeof value === "boolean"){
        this._itemStack.lockMode = value;
        setItem(this._player, this._slot, this._itemStack);
    }
  }
  /**
   * アドベンチャーモードで指定されたブロックに対して設置可能にします。
   */
  get canPlaceOn(){return null;}
  /**
   * @param {string[]} blockIdentifiers 指定されたブロックIDだけを設置可能にします。
   */
  set canPlaceOn(blockIdentifiers){
    this._itemStack.setCanPlaceOn(blockIdentifiers.map(x => {if(!x.startsWith("minecraft:")) return x = "minecraft:"+x;else return x}));
    setItem(this._player, this._slot, this._itemStack);
  }
  /**
   * アドベンチャーモードで指定されたブロックに対して破壊可能にします。
   */
  get canDestroy(){return null;}
  /**
   * @param {string[]} blockIdentifiers 指定されたブロックIDだけを破壊可能にします。
   */
  set canDestroy(blockIdentifiers){
    this._itemStack.setCanDestroy(blockIdentifiers.map(x => {if(!x.startsWith("minecraft:")) return x = "minecraft:"+x;else return x}));
    setItem(this._player, this._slot, this._itemStack);
  }
  /**
   * アイテムに説明文を追加します。
   * @param {string[]} loreList
   */
  setLore(loreList) {
    this._itemStack.setLore(loreList);
    setItem(this._player, this._slot, this._itemStack);
  }
  /**
   * アイテムのイベントを実行します。
   * @param {string} eventName
   */
  triggerEvent(eventName) {
    this._itemStack.triggerEvent(eventName);
    setItem(this._player, this._slot, this._itemStack);
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
    setItem(this._player, this._slot, this._itemStack);
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
    if(typeof value == "string"){
        this._itemStack.nameTag = value;
        setItem(this._player, this._slot, this._itemStack);
    }
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
    setItem(this._player, this._slot, this._itemStack);
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
    if(typeof value == "number"){
        this._itemStack.amount = value;
        setItem(this._player, this._slot, this._itemStack);
    }
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
   * @param {Player} player
   * @param {ItemStack | mc.ItemStack} itemStack アイテムの指定、ここにMinecraft側のItemStackを入れることも可能です。
   * @param {number | string} slot
   */
  constructor(player, itemStack, slot) {
    if (itemStack instanceof mc.ContainerSlot) {
      this._itemStack = new itemStack;
      this.typeId = this._itemStack.typeId;
      this._player = player;
      this._slot = slot;
    }else if(itemStack instanceof ItemStack){
        this._itemStack = itemStack.getItemStack();
        this.typeId = this._itemStack.typeId;
        this._player = player;
        this._slot = slot;
    }/*else{
      world.sendMessage(itemType instanceof mc.ItemStack);
      this._itemStack = undefined;
    }*/
  }
}

/**
 * 
 * @param {Player} player 
 * @param {number | string} slot 
 * @param {ItemStack} itemStack 
 */
function setItem(player, slot, itemStack){
    if(typeof slot === "string") player.getComponent().getEquipmentInventory().setEquipment(slot, new ItemStack(itemStack))
    else if(typeof slot === "number") player.getComponent().getInventory().container.setItem(slot, new ItemStack(itemStack));
}