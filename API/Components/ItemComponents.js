import * as mc from "@minecraft/server";
import { NumberRange } from "../Interfaces/NumberRange.js";
import { ItemStack } from "../ItemStack/ItemStack.js";

export class ItemComponentBase {
  getDurability() {
    return new ItemDurabilityComponent(this._itemStack);
  }
  getCooldown() {
    return new ItemCooldownComponent(this._itemStack);
  }
  getEnchantments() {
    return new ItemEnchantmentsComponent(this._itemStack);
  }
  getItemFood() {
    return new ItemFoodComponent(this._itemStack);
  }
  getItemStack() {
    return new ItemStack(this._itemStack);
  }
  getItemPotion(){
    return new ItemPotionComponent(this._itemStack);
  }
  getComponents() {
    let returnPush = [];
    if (this.getDurability().hasComponent()) returnPush.push(this.getDurability());
    if (this.getCooldown().hasComponent()) returnPush.push(this.getCooldown());
    if (this.getEnchantments().hasComponent()) returnPush.push(this.getEnchantments());
    if (this.getItemFood().hasComponent()) returnPush.push(this.getItemFood());
    return returnPush;
  }
  /**
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      this._itemStack = itemStack;
    } catch (e) {}
  }
}
class ItemComponentInterface{
  /**
   * @private
   * @type {ItemStack}
   */
  _itemStack;
  /**
   * @private
   */
  _typeId;

  hasComponent(){
    return this._itemStack.getItemStack().hasComponent(this._typeId);
  }
  /**
   * ComponentのIDを返します。
   * @readonly
   */
  get typeId(){
    return this._typeId;
  }
  /**
   * Componentを返します。
   * @readonly
   */
  get itemComp(){
    return this._itemStack.getItemStack().getComponent(this._typeId);
  }

  constructor(itemStack, typeId){
    this._itemStack = itemStack;
    this._typeId = typeId;
  }
}
class ItemFoodComponent extends ItemComponentInterface{
  /**
   *
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      super(itemStack, "minecraft:food");
      /**
       * @readonly
       * @type {boolean}
       */
      this.canAlwaysEat = super.itemComp.canAlwaysEat;
      /**
       * @readonly
       * @type {number}
       */
      this.nutrition = super.itemComp.nutrition;
      /**
       * @readonly
       * @type {number}
       */
      this.saturationModifier = super.itemComp.saturationModifier;
      /**
       * @readonly
       * @type {string}
       */
      this.usingConvertsTo = super.itemComp.usingConvertsTo;
    } catch (e) {}
  }
}
class ItemDurabilityComponent extends ItemComponentInterface{

  getDamageChance() {
    /**
     * @type {number}
     */
    const returnNumber = this.itemComp.getDamageChance();
    return returnNumber;
  }
  /**
   * 耐久値を取得します。
   */
  getDamage() {
    return this.itemComp.damage;
  }
  /**
   * 耐久値を設定します。
   * @param {number} value
   */
  setDamage(value) {
    this.itemComp.damage = value;
  }
  /**
   * 
   */
  getDamageRange(){
    return new NumberRange(this.itemComp.getDamageRange());
  }
  /**
   *
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      super(itemStack, "minecraft:durability");
      this.damage = super.itemComp.damage;
      /**
       * @readonly
       * @type {number}
       */
      this.maxDurability = super.itemComp.maxDurability;
    } catch (e) {}
  }
}
class ItemCooldownComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:cooldown";
  /**
   * アイテムがコンポーネントを持っているか確認する関数
   */
  hasComponent() {
    if (this._itemStack.getItemStack().hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   * アイテムに指定されているクールダウンを実行します。
   * @param {Player} player
   */
  startCooldown(player) {
    this.itemComp.startCooldown(player);
  }
  /**
   *
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      this._itemStack = itemStack;
      /**
       * @private
       */
      this.itemComp = this._itemStack.getItemStack().getComponent(this.typeId);
      /**
       * @readonly
       * @type {string}
       */
      this.cooldownCategory = this.itemComp.cooldownCategory;
      /**
       * @readonly
       * @type {number}
       */
      this.cooldownTicks = this.itemComp.cooldownTicks;
    } catch (e) {}
  }
}
class ItemPotionComponent extends ItemComponentInterface{

  /**
   * @type {boolean}
   * @readonly
   */
  get potionEffectType(){
    return super.itemComp.potionEffectType;
  }
  /**
   * @type {boolean}
   * @readonly
   */
  get potionLiquidType(){
    return super.itemComp.potionLiquidType;
  }
  /**
   * @type {boolean}
   * @readonly
   */
  get potionModifierType(){
    return super.itemComp.potionModifierType;
  }
  /**
   * 
   * @param {ItemStack} itemStack 
   */
  constructor(itemStack){
    super(itemStack, "minecraft:potion");
  }
}
class ItemEnchantmentsComponent {
  /**
   * @readonly
   */
  enchantments = new EnchantmentsListComponent();
  /**
   * @readonly
   */
  typeId = "minecraft:enchantments";
  /**
   * アイテムがコンポーネントを持っているか確認する関数
   */
  hasComponent() {
    if (this._itemStack.getItemStack().hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      this._itemStack = itemStack;
    } catch (e) {}
  }
}
class EnchantmentsListComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:enchantments";
  /**
   * エンチャントを付与します。
   * @param {mc.Enchantment} enchantment
   */
  addEnchantment(enchantment) {
    /**
     * @type {boolean}
     */
    const bool = this.itemComp.addEnchantment(enchantment);
    return bool;
  }
  /**
   * エンチャントが付与できるかチェックします。
   * @param {mc.Enchantment} enchantment
   */
  canAddEnchantment(enchantment) {
    /**
     * @type {boolean}
     */
    const bool = this.itemComp.canAddEnchantment(enchantment);
    return bool;
  }
  /**
   * エンチャントを取得します。
   * @param {mc.EnchantmentType} enchantmentType
   */
  getEnchantment(enchantmentType) {
    /**
     * @type {mc.Enchantment}
     */
    const returnEnchantment = this.itemComp.getEnchantment(enchantmentType);
    return returnEnchantment;
  }
  /**
   * すべてのエンチャントを取得します。
   */
  getAllEnchantment() {
    /**
     * @type {mc.Enchantment[]}
     */
    let save = [];
    for (const data of this.itemComp) save.push(data);
    return save[Symbol.iterator]();
  }
  /**
   * エンチャントがあるか確認します。
   * @param {mc.EnchantmentType} enchantmentType
   * @returns どの場所にそのエンチャントがあるかを返します。
   */
  hasEnchantment(enchantmentType) {
    /**
     * @type {number}
     */
    const returnNumber = this.itemComp.hasEnchantment(enchantmentType);
    return returnNumber;
  }
  /**
   * エンチャントを削除します。
   * @param {mc.EnchantmentType} enchantmentType
   */
  removeEnchantment(enchantmentType) {
    this.itemComp.removeEnchantment(enchantmentType);
  }

  /**
   *
   * @param {ItemStack} itemStack
   */
  constructor(itemStack) {
    try {
      this._itemStack = itemStack;
      /**
       * @private
       */
      this.itemComp = this._itemStack.getItemStack().getComponent(this.typeId).enchantments;
    } catch (e) {}
  }
}
