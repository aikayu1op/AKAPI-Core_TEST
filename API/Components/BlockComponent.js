import { ItemStack } from "../ItemStack/ItemStack.js";
import { ItemType } from "../ItemStack/ItemType.js";
import { Block } from "../Block/Block.js";
import { Color } from "./Color/Color.js";
import { Vector } from "../Vector/Vector.js";
import { DyeColor } from "@minecraft/server";
/**
 * ブロックのコンポーネントがすべて詰まっているクラスです。
 */
export class BaseBlockComponent {
  /**
   * コンテナー機能が追加されているブロックの中身を変更することができます。(例: チェスト、シュルカーボックス等)
   * @returns {BlockInventoryComponent}
   */
  getInventory() {
    return new BlockInventoryComponent(this._block);
  }
  /**
   * 大釜に溶岩が入っている際に使用可能なコンポーネントです。
   * @returns {BlockLavaContainerComponent}
   */
  getLavaContainer() {
    return new BlockLavaContainerComponent(this._block);
  }
  /**
   * ピストンブロックだった場合に使用可能なコンポーネントです。
   * @returns {BlockPistonComponent}
   */
  getPiston() {
    return new BlockPistonComponent(this._block);
  }
  /**
   * 大釜にポーションが入っている際に使用可能なコンポーネントです。
   * @returns {BlockPotionContainerComponent}
   */
  getPotionContainer() {
    return new BlockPotionContainerComponent(this._block);
  }
  /**
   * ジュークボックスのようなブロックの場合に使用可能なコンポーネントです。
   * @returns {BlockRecordPlayerComponent}
   */
  getRecordPlayer() {
    return new BlockRecordPlayerComponent(this._block);
  }
  /**
   * 看板ブロックの類の場合に使用可能なコンポーネントです。
   * @returns {BlockSignComponent}
   */
  getSign() {
    return new BlockSignComponent(this._block);
  }
  /**
   * 大釜に粉雪が入っている際に使用可能なコンポーネントです。
   * @returns {BlockSnowContainerComponent}
   */
  getSnowContainer() {
    return new BlockSnowContainerComponent(this._block);
  }
  /**
   * 大釜に水が入っている際に使用可能なコンポーネントです。
   * @returns {BlockWaterContainerComponent}
   */
  getWaterContainer() {
    return new BlockWaterContainerComponent(this._block);
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    /**
     * @private
     */
    this._block = block;
  }
}
/**
 * 看板のコンポーネントを取得します。
 */
export class BlockSignComponent {
  /**
   * コンポーネントの名前が入っています。
   * @readonly
   */
  typeId = "minecraft:sign";
  /**
   * @readonly
   * 
   * 書き換えが可能かどうかを取得します。
   * @returns {boolean}
   */
  get isWaxed(){
    return this._blockComp.isWaxed;
  }
  /**
   * 看板の文字をstring型で返します。
   * @param {"Back" | "Front"} signSide
   * @returns {string}
   */
  getText(signSide) {
    return this._blockComp.getText(signSide);
  }
  /**
   * 看板の文字をRawText型(Object)で返します。
   * @param {"Back" | "Front"} signSide
   * @returns {import("@minecraft/server").RawText}
   */
  getRawText(signSide) {
    return this._blockComp.getRawText(signSide);
  }
  /**
   * 看板の文字の色を取得します。
   * @param {"Back" | "Front"} signSide
   * @returns {DyeColor | undefined}
   */
  getTextDyeColor(signSide) {
    return this._blockComp.getTextDyeColor(signSide);
  }
  /**
   * 看板の文字をセットします。
   * @param {string | import("@minecraft/server").RawText | import("@minecraft/server").RawMessage} text
   * @param {"Back" | "Front"} signSide
   */
  setText(text, signSide) {
    this._blockComp.setText(text, signSide);
  }
  /**
   * 看板の全体の文字の色を設定します。
   * @param {DyeColor} color
   * @param {"Back" | "Front"} signSide
   */
  setTextDyeColor(color, signSide) {
    this._blockComp.setTextDyeColor(color, signSide);
  }
  /**
   * 書き換えを不可能にします。
   */
  setWaxed(){
    this._blockComp.setWaxed();
  }

  /**
   * @param {Block} block
   */
  constructor(block) {
    try {
      /**
       * @private
       */
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}

/**
 * コンテナー機能が追加されているブロックの中身を変更することができます。(例: チェスト、シュルカーボックス等)
 */
export class BlockInventoryComponent {
  /**
   * コンポーネントの名前が入っています。
   * @readonly
   */
  typeId = "minecraft:inventory";
  /**
   * @readonly
   */
  container;
  /**
   * @param {Block} block
   */
  constructor(block) {
    try {
      /**
       * @private
       */
      this._block = block.getMCBlock();
      this.container = new BlockInventoryComponentContainer(block);
    } catch (e) {}
  }
}
export class BlockInventoryComponentContainer {
  /**
   * 空のスロットがいくつあるかを返します。
   * @readonly
   * @type {number}
   */
  emptySlotsCount;
  /**
   * インベントリの最大数が入ります。
   * @readonly
   * @type {number}
   */
  size;
  /**
   * 指定したItemStackをブロックのインベントリに追加します。
   * @param {ItemStack} itemStack
   */
  addItem(itemStack) {
    try {
      this._blockComp.addItem(itemStack.getItemStack());
      return true;
    } catch (e) {
      new Error(String(e));
    }
  }
  /**
   * 指定したスロットのItemStackを返します。
   *
   * 空の場合はundefinedを返します。
   * @param {number} slot
   * @returns {ItemStack | undefined}
   */
  getItem(slot) {
    const item = this._blockComp.getItem(slot);
    if (!item) return undefined;
    else return new ItemStack(item);
  }
  /**
   * インベントリに入っているアイテムをすべて取得します。
   * @param {boolean} withEmptySlots trueにすると、空気ブロック(undefined)も含めますが、falseにすると、空気ブロック(undefined)が含まれなくなります。
   * @returns {ItemStack[]}
   */
  getAllItem(withEmptySlots = true) {
    /**
     * @type {ItemStack[]}
     */
    let allItem = [];
    if (withEmptySlots) {
      for (let i = 0; i < this.size; i++) {
        if (!this.getItem(i)) allItem.push(undefined);
        else allItem.push(this.getItem(i));
      }
      return allItem;
    }
    for (let i = 0; i < this.size; i++) {
      if (this.getItem(i) != undefined) allItem.push(this.getItem(i));
    }
    return allItem;
  }
  /**
   * 指定したスロットにItemStackを代入します。
   * @param {number} slot
   * @param {ItemStack} itemStack
   */
  setItem(slot, itemStack) {
      this._blockComp.setItem(slot, itemStack?.getItemStack());
  }
  /**
   *
   * @param {number} slot
   * @param {number} otherSlot
   * @param {Container} container
   * @returns {boolean}
   */
  swapItems(slot, otherSlot, container) {
    try {
      this._blockComp.swapItems(slot, otherSlot, container);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   *
   * @param {number} slot
   * @param {number} toSlot
   * @param {Container} toContainer
   * @returns {Boolean}
   */
  transferItem(slot, toSlot, toContainer) {
    try {
      this._blockComp.transferItem(slot, toSlot, toContainer);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * @param {Block} block
   */
  constructor(block) {
    /**
     * @private
     */
    try {
      this._blockComp = block.getMCBlock().getComponent("minecraft:inventory").container;
      this.size = this._blockComp.size;
      this.emptySlotsCount = this._blockComp.emptySlotsCount;
    } catch (e) {}
  }
}
/**
 * 大釜に溶岩が入ってる際に使用可能なコンポーネントです。
 */
export class BlockLavaContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:lavaContainer";
  /**
   * 大釜に入っている量を設定・確認できます。
   * @param {number} value 値を入れると設定されますが、何も入れないと取得できます。
   */
  FillLevel(value = undefined) {
    if (!value) return this._blockComp.fillLevel;
    else if (typeof value === "number") this._blockComp.fillLevel = value;
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}
export class BlockPistonComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:piston";
  /**
   * @readonly
   * @type {boolean}
   */
  isExpanded;
  /**
   * @readonly
   * @type {boolean}
   */
  isExpanding;
  /**
   * @readonly
   * @type {boolean}
   */
  isMoving;
  /**
   * @readonly
   * @type {boolean}
   */
  isRetracting;

  /**
   *
   * @returns {Vector[]}
   */
  getAttachedBlocks() {
    return this._blockComp.getAttachedBlocks().map((x) => new Vector(x));
  }

  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
      this.isExpanded = this._blockComp.isExpanded;
      this.isExpanding = this._blockComp.isExpanding;
      this.isMoving = this._blockComp.isMoving;
      this.isRetracting = this._blockComp.isRetracting;
    } catch (e) {}
  }
}
/**
 * 大釜にポーションが入ってる際に使用可能なコンポーネントです。
 */
export class BlockPotionContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:potionContainer";
  /**
   * 大釜に入っている量を設定・確認できます。
   * @param {number} value 値を入れると設定されますが、何も入れないと取得できます。
   */
  FillLevel(value = undefined) {
    if (!value) return this._blockComp.fillLevel;
    else if (typeof value === "number") this._blockComp.fillLevel = value;
  }
  /**
   * 大釜に入っているポーションのデータを指定された引数itemのポーションに置き換えます。
   * @param {ItemStack} item
   */
  setPotionType(item) {
    this._blockComp.setPotionType(item);
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}
/**
 * ジュークボックスと同じ機能を持つブロックの際に使用可能なコンポーネントです。
 */
export class BlockRecordPlayerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:recordPlayer";

  /**
   * 流しているレコードをクリアします。
   */
  clearRecord() {
    this._blockComp.clearRecord();
  }
  /**
   * 現在レコードがなっているかを取得できます。
   * @returns {boolean}
   */
  isPlaying() {
    return this._blockComp.isPlaying();
  }
  /**
   * レコードをセットします。
   * @param {ItemType} recordItemType
   */
  setRecord(recordItemType) {
    this._blockComp.setRecord(recordItemType.getMCItemType());
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}
/**
 * 大釜に粉雪が入ってる際に使用可能なコンポーネントです。
 */
export class BlockSnowContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:snowContainer";
  /**
   * 大釜に入っている量を設定・確認できます。
   * @param {number} value 値を入れると設定されますが、何も入れないと取得できます。
   */
  FillLevel(value = undefined) {
    if (!value) return this._blockComp.fillLevel;
    else if (typeof value === "number") this._blockComp.fillLevel = value;
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}
/**
 * 大釜に水が入ってる際に使用可能なコンポーネントです。
 */
export class BlockWaterContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:waterContainer";
  /**
   * 指定した染料で色を染めます。
   * @param {ItemType} itemType
   */
  addDye(itemType) {
    this._blockComp.addDye(itemType);
  }
  /**
   * 大釜に入っている量を設定・確認できます。
   * @param {number} value 値を入れると設定されますが、何も入れないと取得できます。
   */
  FillLevel(value = undefined) {
    if (!value) return this._blockComp.fillLevel;
    else if (typeof value === "number") this._blockComp.fillLevel = value;
  }
  /**
   * 大釜に入っている水を好きな色に設定・または取得可能です。
   *
   * @param {Color} color ここに何も入れなかった場合データ取得で、Colorを入れた場合は設定されます。
   */
  CustomColor(color = undefined) {
    if (!color) return new Color(this._blockComp.customColor);
    this._blockComp.customColor = color.getMCColor();
  }
  getHeadLocation() {
    return new Vector(this._blockComp.getHeadLocation());
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
    } catch (e) {}
  }
}
