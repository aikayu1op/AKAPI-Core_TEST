import { ItemStack } from "../ItemStack/ItemStack.js";
import { ItemType } from "../ItemStack/ItemType.js";
import { BlockLocation } from "../Location/BlockLocation.js";
import { Block } from "./Block.js";
import { Color } from "../Components/Color/index.js";
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
  getLavaContainer(){
    return new BlockLavaContainerComponent(this._block);
  }
  /**
   * ピストンブロックだった場合に使用可能なコンポーネントです。
   * @returns {BlockPistonComponent}
   */
  getPiston(){
    return new BlockPistonComponent(this._block);
  }
  /**
   * 大釜にポーションが入っている際に使用可能なコンポーネントです。
   * @returns {BlockPotionContainerComponent}
   */
  getPotionContainer(){
    return new BlockPotionContainerComponent(this._block);
  }
  /**
   * ジュークボックスのようなブロックの場合に使用可能なコンポーネントです。
   * @returns {BlockRecordPlayerComponent}
   */
  getRecordPlayer(){
    return new BlockRecordPlayerComponent(this._block);
  }
  /**
   * 看板ブロックの類の場合に使用可能なコンポーネントです。
   * @returns {BlockSignComponent}
   */
  getSign(){
    return new BlockSignComponent(this._block);
  }
  /**
   * 大釜に粉雪が入っている際に使用可能なコンポーネントです。
   * @returns {BlockSnowContainerComponent}
   */
  getSnowContainer(){
    return new BlockSnowContainerComponent(this._block);
  }
  /**
   * 大釜に水が入っている際に使用可能なコンポーネントです。
   * @returns {BlockWaterContainerComponent}
   */
  getWaterContainer(){
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
 * コンテナー機能が追加されているブロックの中身を変更することができます。(例: チェスト、シュルカーボックス等)
 */
class BlockInventoryComponent {
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
   * ブロックの座標データが入っています。
   * @readonly
   * @type {BlockLocation}
   */
  location;
  /**
   * @param {Block} block
   */
  constructor(block) {
    try {
      /**
       * @private
       */
      this._block = block.getMCBlock();
      this.location = block.location;
      this.container = new BlockInventoryComponentContainer(block);
    } catch (e) {}
  }
}
class BlockInventoryComponentContainer {
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
    try {
      this._blockComp.setItem(slot, itemStack.getItemStack());
    } catch (e) {
      return new Error(String(e));
    }
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
    this._blockComp = block.getMCBlock().getComponent("minecraft:inventory").container;
    this.size = this._blockComp.size;
    this.emptySlotsCount = this._blockComp.emptySlotsCount;
  }
}
/**
 * 大釜に溶岩が入ってる際に使用可能なコンポーネントです。
 */
class BlockLavaContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:lavaContainer";
  /**
   * ブロックの座標データが格納されています。
   * @type {BlockLocation}
   * @readonly
   */
  location;
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
      this.location = this._blockComp.location;
    } catch (e) {}
  }
}
class BlockPistonComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:piston";
  /**
   * ブロックの座標データが格納されています。
   * @type {BlockLocation}
   * @readonly
   */
  location;
  /**
   * @type {BlockLocation}
   * @readonly
   */
  attachedBlocks;
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
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
      this.location = this._blockComp.location;
      this.attachedBlocks = this._blockComp.attachedBlocks;
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
class BlockPotionContainerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:potionContainer";
  /**
   * ブロックの座標データが格納されています。
   * @type {BlockLocation}
   * @readonly
   */
  location;
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
      this.location = this._blockComp.location;
    } catch (e) {}
  }
}
/**
 * ジュークボックスと同じ機能を持つブロックの際に使用可能なコンポーネントです。
 */
class BlockRecordPlayerComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:recordPlayer";
  /**
   * ブロックの座標データが格納されています。
   * @type {BlockLocation}
   * @readonly
   */
  location;

  /**
   * 流しているレコードをクリアします。
   */
  clearRecord(){
    this._blockComp.clearRecord();
  }
  /**
   * 現在レコードがなっているかを取得できます。
   * @returns {boolean}
   */
  isPlaying(){
    return this._blockComp.isPlaying();
  }
  /**
   * レコードをセットします。
   * @param {ItemType} recordItemType
   */
  setRecord(recordItemType){
    this._blockComp.setRecord(recordItemType.getMCItemType());
  }
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    try {
      this._blockComp = block.getMCBlock().getComponent(this.typeId);
      this.location = this._blockComp.location;
    } catch (e) {}
  }
}

/**
 * 
 */
class BlockSignComponent {
    /**
     * @readonly
     * コンポーネントID
     */
    typeId = "minecraft:sign";
    /**
     * ブロックの座標データが格納されています。
     * @type {BlockLocation}
     * @readonly
     */
    location;
    /**
     * 看板のデータが格納されています。
     * @readonly
     * @type {string}
     */
    text;
    /**
     *
     * @param {Block} block
     */
    constructor(block) {
      try {
        this._blockComp = block.getMCBlock().getComponent(this.typeId);
        this.location = this._blockComp.location;
        this.text = this._blockComp.text;
      } catch (e) {}
    }
  }
  /**
 * 大釜に粉雪が入ってる際に使用可能なコンポーネントです。
 */
class BlockSnowContainerComponent {
    /**
     * @readonly
     * コンポーネントID
     */
    typeId = "minecraft:snowContainer";
    /**
     * ブロックの座標データが格納されています。
     * @type {BlockLocation}
     * @readonly
     */
    location;
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
        this.location = this._blockComp.location;
      } catch (e) {}
    }
  }
  /**
 * 大釜に水が入ってる際に使用可能なコンポーネントです。
 */
class BlockWaterContainerComponent {
    /**
     * @readonly
     * コンポーネントID
     */
    typeId = "minecraft:waterContainer";
    /**
     * ブロックの座標データが格納されています。
     * @type {BlockLocation}
     * @readonly
     */
    location;
    /**
     * 指定した染料で色を染めます。
     * @param {ItemType} itemType 
     */
    addDye(itemType){
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
    CustomColor(color = undefined){
        if(!color) return new Color(this._blockComp.customColor);
        this._blockComp.customColor = color.getMCColor();
    }
    /**
     *
     * @param {Block} block
     */
    constructor(block) {
      try {
        this._blockComp = block.getMCBlock().getComponent(this.typeId);
        this.location = this._blockComp.location;
      } catch (e) {}
    }
  }
