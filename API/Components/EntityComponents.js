import {
  Player,
  Entity,
  EntityDefinitionFeedItem,
  Trigger,
  FilterGroup,
  FeedItem,
  Seat,
  Container,
  ItemTypes,
} from "@minecraft/server";
import { BlockPermutation } from "../Block/BlockPermutation.js";
import { ItemQueryOptions } from "../Interfaces/ItemQueryOptions.js";
import { NumberRange } from "../Interfaces/NumberRange.js";
import { ItemStack } from "../ItemStack/ItemStack.js";
import { BaseComponent } from "./BaseComponent.js";
import { EquipmentSlot } from "../Interfaces/EquipmentSlot.js";
import { ContainerSlot } from "../ItemStack/ContainerSlot.js";
import { EntityAttributeComponent } from "./extends/EntityAttributeComponent.js";
/**
 * @template T
 * @typedef {T[keyof T]} ValueOf
 */

/**
 * コンポーネントメインクラスです。
 * ```
 * //使い方
 * //entityとplayerが定義されていませんが、皆さんは定義しているものを使いましょう。
 * //例としてはentityCreateはentityが入ります。
 * //beforeChat等はsenderのplayerが入ります。
 *
 * const entityComponent = Components.getEntity(entity);
 * //体力の設定を取得
 * const getHealth = entityComponent.getHealth();
 * //体力を設定する
 * getHealth.setCurrent(5);
 *
 * //大きさを変更する設定を取得
 * const getScale = entityComponent.getScale();
 * //大きさを設定する
 * getScale.value = 2;
 * ```
 */
export class Components {
  /**
   * プレイヤーに含まれるすべてのコンポーネントを返します。
   * @param {Player} player
   */
  static getPlayer(player) {
    return new PlayerComponentBase(player);
  }
  /**
   * エンティティに含まれるすべてのコンポーネントを返します。
   * @param {Entity} entity
   */
  static getEntity(entity) {
    return new EntityComponentBase(entity);
  }
}
/**
 * プレイヤーが持つコンポーネントすべてが入っています。
 */
class PlayerComponentBase {
  /**
   * プレイヤーの呼吸可能なブロックと、窒息ダメージを与えるコンポーネント関数
   */
  getBreathable() {
    return new PlayerBreathableComponent(this._player);
  }
  /**
   * プレイヤーの装備品等を取得するコンポーネント関数
   */
  getEquipmentInventory(){
    return new PlayerEquipmentSlot(this._player);
  }
  /**
   * プレイヤーの体力に関するコンポーネント関数
   */
  getHealth() {
    return new PlayerHealthComponent(this._player);
  }
  /**
   * プレイヤーのインベントリに関するコンポーネント関数
   * ```
   * //アイテムのデータを取得する
   * //slotはアイテムのスロットを数値で指定する(0-35)。
   * //0-9までがホットバーを指定します。10-35までがインベントリを上から順番に指定します。
   * //itemには独自のItemStackクラスが返ってきます。
   *
   * const item = Components.getPlayer(player).getInventory().container.getItem(slot);
   * ```
   */
  getInventory() {
    return new PlayerContainerComponent(this._player);
  }
  /**
   * プレイヤーが透明化状態になって、敵対Mobから隠れることができる際に付与されるコンポーネント関数
   */
  getIsHiddenWhenInvisible() {
    return new PlayerIsHiddenWhenInvisibleComponent(this._player);
  }
  /**
   * 溶岩の中での移動速度を設定するコンポーネント関数
   */
  getLavaMovement() {
    return new PlayerLavaMovementComponent(this._player);
  }
  /**
   * プレイヤーに変数(number)を追加するコンポーネント関数。他のプレイヤーとの差別化を図る際に使用することが出来ます。
   */
  getMarkVariant() {
    return new PlayerMarkVariantComponent(this._player);
  }
  /**
   * プレイヤーの動きに関するコンポーネント関数
   */
  getMovement() {
    return new PlayerMovementComponent(this._player);
  }
  /**
   * プレイヤーが左右に揺れ、泳いでいるように見えるようになることを示すコンポーネント関数
   */
  getMovementSway() {
    return new PlayerMovementSwayComponent(this._player);
  }
  /**
   * プレイヤーが歩いたり、泳いだり、飛んだり、登ったり、飛び跳ねたりしてブロックを移動できることを示すコンポーネント関数
   */
  getNavigationGeneric() {
    return new PlayerNavigationGenericComponent(this._player);
  }
  getRideable() {
    return new PlayerRideableComponent(this._player);
  }
  /**
   * プレイヤーの見た目の大きさを設定することができるコンポーネント関数
   */
  getScale() {
    return new PlayerScaleComponent(this._player);
  }
  /**
   * プレイヤーの水中での一般的な移動速度を設定できるコンポーネント関数
   */
  getUnderwaterMovement() {
    return new PlayerUnderwaterMovementComponent(this._player);
  }
  /**
   * プレイヤーの変種の構成グループを他と区別するために使用される。(例: オセロット, 村人).
   */
  getVariant() {
    return new PlayerVariantComponent(this._player);
  }
  getCanClimb() {
    return new PlayerCanClimbComponent(this._player);
  }

  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    /**
     * @private
     */
    this._player = player;
  }
}
/**
 * エンティティが持つコンポーネントすべてが入っています。
 */
export class EntityComponentBase {
  /**
   * 指定されたentityTypeでスポーンしているときに付与されるコンポーネント関数
   */
  getAddRider() {
    return new EntityAddRiderComponent(this._entity);
  }
  /**
   * エンティティの成長のタイマーを追加するクラス
   * feedItemsで定義されたアイテムでエンティティの成長を促せます。
   */
  getAgeable() {
    return new EntityAgeableComponent(this._entity);
  }
  /**
   * エンティティの呼吸可能なブロックと、窒息ダメージを与えるコンポーネント関数
   */
  getBreathable() {
    return new EntityBreathableComponent(this._entity);
  }
  /**
   * はしごを登れるエンティティに付与されるコンポーネント関数
   */
  getCanClimb() {
    return new EntityCanClimbComponent(this._entity);
  }
  /**
   * エンティティ自体が飛べる際に付与されるコンポーネント関数
   */
  getCanFly() {
    return new EntityCanFlyComponent(this._entity);
  }
  /**
   * エンティティが馬のような長押しでジャンプする際に付与されるコンポーネント関数
   */
  getCanPowerJump() {
    return new EntityCanPowerJumpComponent(this._entity);
  }
  /**
   * 指定されたエンティティのすべてのコンポーネント返す関数
   */
  getComponents() {
    /**
     * @type {BaseComponent[]}
     */
    let comps = [];
    if (this.getAddRider().hasComponent()) comps.push(this.getAddRider());
    if (this.getAgeable().hasComponent()) comps.push(this.getAgeable());
    if (this.getBreathable().hasComponent()) comps.push(this.getBreathable());
    if (this.getCanClimb().hasComponent()) comps.push(this.getCanClimb());
    if (this.getCanFly().hasComponent()) comps.push(this.getCanFly());
    if (this.getCanPowerJump().hasComponent()) comps.push(this.getCanPowerJump());
    if (this.getColor().hasComponent()) comps.push(this.getColor());
    if (this.getEntityItem().hasComponent()) comps.push(this.getEntityItem());
    if (this.getFireImmune().hasComponent()) comps.push(this.getFireImmune());
    if (this.getFloatsInLiquid().hasComponent()) comps.push(this.getFloatsInLiquid());
    if (this.getFlyingSpeed().hasComponent()) comps.push(this.getFlyingSpeed());
    if (this.getFrictionModifier().hasComponent()) comps.push(this.getFrictionModifier());
    if (this.getGroundOffset().hasComponent()) comps.push(this.getGroundOffset());
    if (this.getHealable().hasComponent()) comps.push(this.getHealable());
    if (this.getHealth().hasComponent()) comps.push(this.getHealth());
    if (this.getInventory().hasComponent()) comps.push(this.getInventory());
    if (this.getIsBaby().hasComponent()) comps.push(this.getIsBaby());
    if (this.getIsCharged().hasComponent()) comps.push(this.getIsCharged());
    if (this.getIsChested().hasComponent()) comps.push(this.getIsChested());
    if (this.getIsDyable().hasComponent()) comps.push(this.getIsDyable());
    if (this.getIsHiddenWhenInvisible().hasComponent()) comps.push(this.getIsHiddenWhenInvisible());
    if (this.getIsIgnited().hasComponent()) comps.push(this.getIsIgnited());
    if (this.getIsIllagerCaptain().hasComponent()) comps.push(this.getIsIllagerCaptain());
    if (this.getIsSaddled().hasComponent()) comps.push(this.getIsSaddled());
    if (this.getIsShaking().hasComponent()) comps.push(this.getIsShaking());
    if (this.getIsSheared().hasComponent()) comps.push(this.getIsSheared());
    if (this.getIsStackable().hasComponent()) comps.push(this.getIsStackable());
    if (this.getIsStunned().hasComponent()) comps.push(this.getIsStunned());
    if (this.getIsTamed().hasComponent()) comps.push(this.getIsTamed());
    if (this.getLavaMovement().hasComponent()) comps.push(this.getLavaMovement());
    if (this.getLeashable().hasComponent()) comps.push(this.getLeashable());
    if (this.getMarkVariant().hasComponent()) comps.push(this.getMarkVariant());
    if (this.getMountTaming().hasComponent()) comps.push(this.getMountTaming());
    if (this.getMovement().hasComponent()) comps.push(this.getMovement());
    if (this.getMovementAmphibious().hasComponent()) comps.push(this.getMovementAmphibious());
    if (this.getMovementBasic().hasComponent()) comps.push(this.getMovementBasic());
    if (this.getMovementFly().hasComponent()) comps.push(this.getMovementFly());
    if (this.getMovementGeneric().hasComponent()) comps.push(this.getMovementGeneric());
    if (this.getMovementGlide().hasComponent()) comps.push(this.getMovementGlide());
    if (this.getMovementHover().hasComponent()) comps.push(this.getMovementHover());
    if (this.getMovementJump().hasComponent()) comps.push(this.getMovementJump());
    if (this.getMovementSkip().hasComponent()) comps.push(this.getMovementSkip());
    if (this.getMovementSway().hasComponent()) comps.push(this.getMovementSway());
    if (this.getNavigationClimb().hasComponent()) comps.push(this.getNavigationClimb());
    if (this.getNavigationFloat().hasComponent()) comps.push(this.getNavigationFloat());
    if (this.getNavigationFly().hasComponent()) comps.push(this.getNavigationFly());
    if (this.getNavigationGeneric().hasComponent()) comps.push(this.getNavigationGeneric());
    if (this.getNavigationHover().hasComponent()) comps.push(this.getNavigationHover());
    if (this.getNavigationWalk().hasComponent()) comps.push(this.getNavigationWalk());
    if (this.getPushThrough().hasComponent()) comps.push(this.getPushThrough());
    if (this.getRideable().hasComponent()) comps.push(this.getRideable());
    if (this.getScale().hasComponent()) comps.push(this.getScale());
    if (this.getSkinId().hasComponent()) comps.push(this.getSkinId());
    if (this.getStrength().hasComponent()) comps.push(this.getStrength());
    if (this.getTamable().hasComponent()) comps.push(this.getTamable());
    if (this.getUnderwaterMovement().hasComponent()) comps.push(this.getUnderwaterMovement());
    if (this.getVariant().hasComponent()) comps.push(this.getVariant());
    if (this.getWantsJockey().hasComponent()) comps.push(this.getWantsJockey());
    return comps;
  }
  /**
   * エンティティの色を指定します。このコンポーネン卜は羊やシュルカーなどの色が指定できるエンティティに動作します。
   */
  getColor() {
    return new EntityColorComponent(this._entity);
  }
  getEquippableInventory(){
    return;
  }
  /**
   * エンティティが火のダメージを無効にする際に付与されるコンポーネント関数
   */
  getFireImmune() {
    return new EntityFireImmuneComponent(this._entity);
  }
  /**
   * エンティティが液体ブロック(水や溶岩等)の上に乗ることができる際に付与されるコンポーネント関数
   */
  getFloatsInLiquid() {
    return new EntityFloatsInLiquidComponent(this._entity);
  }
  /**
   * エンティティの飛行の速度に関する設定ができるコンポーネント関数
   */
  getFlyingSpeed() {
    return new EntityFlyingSpeedComponent(this._entity);
  }
  /**
   * 摩擦がこのエンティティにどの程度影響するか設定するコンポーネント関数
   */
  getFrictionModifier() {
    return new EntityFrictionModifierComponent(this._entity);
  }
  /**
   * エンティティが実際にいる地面からのオフセットを設定するコンポーネント関数
   */
  getGroundOffset() {
    return new EntityGroundOffsetComponent(this._entity);
  }
  /**
   * エンティティを回復させる相互作用に関するコンポーネント関数
   */
  getHealable() {
    return new EntityHealableComponent(this._entity);
  }
  /**
   * エンティティの体力を設定するコンポーネント関数
   */
  getHealth() {
    return new EntityHealthComponent(this._entity);
  }
  /**
   * エンティティのインベントリを設定するコンポーネント関数
   */
  getInventory() {
    return new EntityContainerComponent(this._entity);
  }
  /**
   * エンティティがまだ子供であることを示す際に付与されるコンポーネント関数
   */
  getIsBaby() {
    return new EntityIsBabyComponent(this._entity);
  }
  /**
   * エンティティが帯電であることを示す際に付与されるコンポーネント関数
   */
  getIsCharged() {
    return new EntityIsChargedComponent(this._entity);
  }
  /**
   * エンティティがチェストを持っているかどうかを示すコンポーネント関数
   */
  getIsChested() {
    return new EntityIsChestedComponent(this._entity);
  }
  /**
   * エンティティが染色可能であることを示すコンポーネント関数
   */
  getIsDyable() {
    return new EntityIsDyableComponent(this._entity);
  }
  /**
   * エンティティが透明化状態になって、敵対Mobから隠れることができる際に付与されるコンポーネント関数
   */
  getIsHiddenWhenInvisible() {
    return new EntityIsHiddenWhenInvisibleComponent(this._entity);
  }
  /**
   * エンティティが燃えていることを示すコンポーネント関数
   */
  getIsIgnited() {
    return new EntityIsIgnitedComponent(this._entity);
  }
  /**
   * エンティティが略奪者のキャプテンだということを示すコンポーネント関数
   */
  getIsIllagerCaptain() {
    return new EntityIsIllagerCaptainComponent(this._entity);
  }
  /**
   * エンティティがサドルを付けていることを示すコンポーネント関数
   */
  getIsSaddled() {
    return new EntityIsSaddledComponent(this._entity);
  }
  /**
   * エンティティが揺れていることを示すコンポーネント関数
   */
  getIsShaking() {
    return new EntityIsShakingComponent(this._entity);
  }
  /**
   * エンティティが剪毛されていることを示すコンポーネント関数
   */
  getIsSheared() {
    return new EntityIsShearedComponent(this._entity);
  }
  /**
   * エンティティがスタック可能だということを示すコンポーネント関数
   */
  getIsStackable() {
    return new EntityIsStackableComponent(this._entity);
  }
  /**
   * エンティティがスタンしていることを示すコンポーネント関数
   */
  getIsStunned() {
    return new EntityIsStunnedComponent(this._entity);
  }
  /**
   * エンティティがテイムされていることを示すコンポーネント関数
   */
  getIsTamed() {
    return new EntityIsTamedComponent(this._entity);
  }
  /**
   * このエンティティがアイテムかどうかの確認が取れるコンポーネント関数、itemStackでそのアイテムエンティティの内容を変えることが出来ます。
   */
  getEntityItem() {
    return new EntityItemComponent(this._entity);
  }
  /**
   * 溶岩の中での移動速度を設定するコンポーネント関数
   */
  getLavaMovement() {
    return new EntityLavaMovementComponent(this._entity);
  }
  /**
   * エンティティを首輪をつけることを許可し、首輪をつけたときのこのエンティティの条件とイベントに関するコンポーネント関数
   */
  getLeashable() {
    return new EntityLeashableComponent(this._entity);
  }
  /**
   * エンティティに変数(number)を追加するコンポーネント関数。他のエンティティとの差別化を図る際に使用することが出来ます。
   */
  getMarkVariant() {
    return new EntityMarkVariantComponent(this._entity);
  }
  /**
   * 乗ることが可能なエンティティのテイムするための、別々のエンティティのマウントに関するオプションが含まれたコンポーネント関数
   */
  getMountTaming() {
    return new EntityMountTamingComponent(this._entity);
  }
  /**
   * エンティティが地上を歩いたり、水の中で歩いたりすることを可能にするコンポーネント関数
   */
  getMovementAmphibious() {
    return new EntityMovementAmphibiousComponent(this._entity);
  }
  /**
   * エンティティの動きに関するベースコンポーネント関数
   */
  getMovementBasic() {
    return new EntityMovementBasicComponent(this._entity);
  }
  /**
   * エンティティの動きを設定するコンポーネント関数
   */
  getMovement() {
    return new EntityMovementComponent(this._entity);
  }
  /**
   * エンティティが空を飛ぶことができるということを示すコンポーネント関数
   */
  getMovementFly() {
    return new EntityMovementFlyComponent(this._entity);
  }
  /**
   * エンティティが泳いだり飛んだり登ったりをすることができることを示すコンポーネント関数
   */
  getMovementGeneric() {
    return new EntityMovementGenericComponent(this._entity);
  }
  /**
   * エンティティが滑空できることを示すコンポーネント関数
   */
  getMovementGlide() {
    return new EntityMovementGlideComponent(this._entity);
  }
  /**
   * エンティティがホバリングできることを示すコンポーネント関数
   */
  getMovementHover() {
    return new EntityMovementHoverComponent(this._entity);
  }
  /**
   * エンティティが指定された遅延でジャンプすることを示すコンポーネント関数
   */
  getMovementJump() {
    return new EntityMovementJumpComponent(this._entity);
  }
  /**
   * エンティティがホッピング移動をすることを示すコンポーネント関数(代表例: ウサギ)
   */
  getMovementSkip() {
    return new EntityMovementSkipComponent(this._entity);
  }
  /**
   * エンティティが左右に揺れ、泳いでいるように見えるようになることを示すコンポーネント関数
   */
  getMovementSway() {
    return new EntityMovementSwayComponent(this._entity);
  }
  /**
   * エンティティが壁を登ることができることを示すコンポーネント関数(代表例: クモ)
   */
  getNavigationClimb() {
    return new EntityNavigationClimbComponent(this._entity);
  }
  /**
   * エンティティが空中を飛び回ることを示すコンポーネント関数(代表例: ガスト)
   */
  getNavigationFloat() {
    return new EntityNavigationFloatComponent(this._entity);
  }
  /**
   * エンティティが空中にパス(経路？)を生成することが出来ることを示すコンポーネント関数(代表例: オウム)
   */
  getNavigationFly() {
    return new EntityNavigationFlyComponent(this._entity);
  }
  /**
   * エンティティが歩いたり、泳いだり、飛んだり、登ったり、飛び跳ねたりしてブロックを移動できることを示すコンポーネント関数
   */
  getNavigationGeneric() {
    return new EntityNavigationGenericComponent(this._entity);
  }
  /**
   * エンティティが空中にパス(経路？)を生成し、空中から降りないことを示すコンポーネント関数(代表例: ハチ)
   */
  getNavigationHover() {
    return new EntityNavigationHoverComponent(this._entity);
  }
  /**
   * エンティティが歩き回ったり、ジャンプする際に経路を生成することを示すコンポーネント関数
   */
  getNavigationWalk() {
    return new EntityNavigationWalkComponent(this._entity);
  }
  getNPC(){
    return
  }
  getOnFire(){
    return;
  }
  /**
   * エンティティが押し通すことができる距離を設定するコンポーネント関数
   */
  getPushThrough() {
    return new EntityPushThroughComponent(this._entity);
  }
  /**
   * エンティティが他のエンティティに乗り移ることができるようになることを示すコンポーネント関数
   */
  getRideable() {
    return new EntityRideableComponent(this._entity);
  }
  /**
   * エンティティの見た目の大きさを設定することができるコンポーネント関数
   */
  getScale() {
    return new EntityScaleComponent(this._entity);
  }
  /**
   * エンティティのスキンのID値。村人のベーススキンなど、スキンを区別するために使用することができるコンポーネント関数
   */
  getSkinId() {
    return new EntitySkinIdComponent(this._entity);
  }
  /**
   * エンティティがアイテムを運ぶための強さを示すコンポーネント関数
   */
  getStrength() {
    return new EntityStrengthComponent(this._entity);
  }
  /**
   * プレイヤーがテイムするエンティティのルールが示されているコンポーネント関数
   */
  getTamable() {
    return new EntityTamableComponent(this._entity);
  }
  getTameMount(){
    return;
  }
  /**
   * エンティティの水中での一般的な移動速度を設定できるコンポーネント関数
   */
  getUnderwaterMovement() {
    return new EntityUnderwaterMovementComponent(this._entity);
  }
  /**
   * エンティティの変種の構成グループを他と区別するために使用される。(例: オセロット, 村人).
   */
  getVariant() {
    return new EntityVariantComponent(this._entity);
  }
  /**
   * エンティティが〇〇_jockyになれることを示すコンポーネント関数
   */
  getWantsJockey() {
    return new EntityWantsJockeyComponent(this._entity);
  }

  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    /**
     * @private
     */
    this._entity = entity;
  }
}

/**
 * プレイヤーのコンテナーを確認するクラス
 */
export class PlayerContainerComponent {
  /**
   * @readonly
   */
  get additionalPerStrength(){
    return this._player.getComponent(this.typeId).additionalSlotsPerStrength;
  }
  /**
   * @readonly
   */
  get canBeSiphonedFrom(){
    return this._player.getComponent(this.typeId).canBeSiphonedFrom;
  }
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:inventory";
  /**
   * @readonly
   */
  get container(){
    return new PlayerInventoryComponent(this._player);
  } 
  /**
   * @readonly
   */
  get containerType(){
    return this._player.getComponent(this.typeId).containerType;
  }
  /**
   * @readonly
   */
  get inventorySize(){
    return this._player.getComponent(this.typeId).inventorySize;
  }
  /**
   * @readonly
   */
  get "private"(){
    return this._player.getComponent(this.typeId).private;
  }
  /**
   * @readonly
   */
  get restrictOwner(){
    return this._player.getComponent(this.typeId).restrictToOwner;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
      this._player = player;
  }
}
/**
 * プレイヤーのインベントリを設定したりするクラス
 */
export class PlayerInventoryComponent {
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent("inventory");
      this.emptySlotsCount = this.playerComp.container.emptySlotsCount;
      this.size = this.playerComp.container.size;
    } catch (e) {}
  }
  /**
   * @readonly
   */
  emptySlotsCount = 0;
  /**
   * @readonly
   */
  size = 0;
  /**
   * 指定したItemStackをプレイヤーのインベントリに追加します。
   * @param {ItemStack} itemStack
   */
  addItem(itemStack) {
    try {
      this.playerComp.container.addItem(itemStack.getItemStack());
      return itemStack;
    } catch (e) {
      return new Error(e);
    }
  }
  /**
   * 指定したスロットのItemStackを返す関数
   *
   * 指定されたスロットのアイテムをItemStackとして返します。空の場合はundefinedを返します。
   * @param {number} slot
   * @returns  {ItemStack}
   */
  getItem(slot) {
    const item = this.playerComp.container.getItem(slot);
    if (!item) return undefined;
    else return new ItemStack(item);
  }
  /**
   * インベントリに入っているアイテムをすべて取得します。
   *
   * optionsにデータを入れることで条件を絞ることができます。
   *
   * optionsのslotに値を設定すると、withEmptyが強制的にtrueになります。
   *
   * 戻り値はItemStackの配列です。
   * @overload
   * @param {ItemQueryOptions} options
   * @returns {ItemStack[]}
   * @overload
   * @param {ItemQueryOptions[]} options
   * @returns {ItemStack[][]}
   */
  getAllItems(options = undefined) {
    /**
     * @type {ItemStack[]}
     */
    let allItem = [];
    if (options instanceof Array) {
      /**
       * @type {ItemStack[][]}
       */
      let returnData = [];
      options.forEach((option) => {
        if (option instanceof ItemQueryOptions) {
          const getData = option.getOptions();
          if (getData.withEmpty) allItem = Array(36);
          else allItem = [];
          //#region mainhandのチェック
          if (JSON.stringify(getData.location.mainhand) != "{}") {
            const ITEM = this.getItem(this._player.selectedSlot);
            let lore;
            let amount = getData.location.mainhand?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
            if (getData.location.mainhand.amount instanceof NumberRange) {
              if (!getData.location.mainhand.lore && !!ITEM) lore = ITEM.getLore();
              else if (
                getData.location.mainhand.lore instanceof Array &&
                getData.location.mainhand.lore.length == 0 &&
                !!ITEM
              )
                lore = ITEM.getLore();
              else lore = getData.location.mainhand.lore;
              if (
                !!ITEM &&
                (getData.location.mainhand.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                !(getData.location.mainhand.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                amount.min <= ITEM.Amount() &&
                amount.max >= ITEM.Amount() &&
                (getData.location.mainhand.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                lore.join() === ITEM.getLore().join()
              )
                option.withEmpty ? (allItem[this._player.selectedSlot] = ITEM) : allItem.push(ITEM);
            } else {
              if (!getData.location.mainhand.lore && !!ITEM) lore = ITEM.getLore();
              else if (
                getData.location.mainhand.lore instanceof Array &&
                getData.location.mainhand.lore.length == 0 &&
                !!ITEM
              )
                lore = ITEM.getLore();
              else lore = getData.location.mainhand.lore;
              if (
                !!ITEM &&
                (getData.location.mainhand.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                !(getData.location.mainhand.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                amount == ITEM.Amount() &&
                (getData.location.mainhand.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                lore.join() === ITEM.getLore().join()
              )
                option.withEmpty ? (allItem[this._player.selectedSlot] = ITEM) : allItem.push(ITEM);
            }
          }
          //#endregion

          //#region hotbarのチェック
          if (JSON.stringify(getData.location.hotbar) != "{}") {
            for (let i = 0; i < 9; i++) {
              const ITEM = this.getItem(i);
              let lore;
              let amount = getData.location.hotbar?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
              if (getData.location.hotbar.amount instanceof NumberRange) {
                if (!getData.location.hotbar.lore && !!ITEM) lore = ITEM.getLore();
                else if (
                  getData.location.hotbar.lore instanceof Array &&
                  getData.location.hotbar.lore.length == 0 &&
                  !!ITEM
                )
                  lore = ITEM.getLore();
                else lore = getData.location.hotbar.lore;
                if (
                  !!ITEM &&
                  (getData.location.hotbar.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                  !(getData.location.hotbar.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                  amount.min <= ITEM.Amount() &&
                  amount.max >= ITEM.Amount() &&
                  (getData.location.hotbar.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                  lore.join() === ITEM.getLore().join()
                )
                  option.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
              } else {
                if (!getData.location.hotbar.lore && !!ITEM) lore = ITEM.getLore();
                else if (
                  getData.location.hotbar.lore instanceof Array &&
                  getData.location.hotbar.lore.length == 0 &&
                  !!ITEM
                )
                  lore = ITEM.getLore();
                else lore = getData.location.hotbar.lore;
                if (
                  !!ITEM &&
                  (getData.location.hotbar.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                  !(getData.location.hotbar.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                  amount == ITEM.Amount() &&
                  (getData.location.hotbar.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                  lore.join() === ITEM.getLore().join()
                )
                  option.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
              }
            }
          }

          //#endregion

          //#region inventoryのチェック
          if (JSON.stringify(getData.location.inventory) != "{}") {
            for (let i = 9; i < 36; i++) {
              const ITEM = this.getItem(i);
              let lore;
              let amount = getData.location.inventory?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
              if (getData.location.inventory.amount instanceof NumberRange) {
                if (!getData.location.inventory.lore && !!ITEM) lore = ITEM.getLore();
                else if (
                  getData.location.inventory.lore instanceof Array &&
                  getData.location.inventory.lore.length == 0 &&
                  !!ITEM
                )
                  lore = ITEM.getLore();
                else lore = getData.location.inventory.lore;
                if (
                  !!ITEM &&
                  (getData.location.inventory.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                  !(getData.location.inventory.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                  amount.min <= ITEM.Amount() &&
                  amount.max >= ITEM.Amount() &&
                  (getData.location.inventory.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                  lore.join() === ITEM.getLore().join()
                )
                  option.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
              } else {
                if (!getData.location.inventory.lore && !!ITEM) lore = ITEM.getLore();
                else if (
                  getData.location.inventory.lore instanceof Array &&
                  getData.location.inventory.lore.length == 0 &&
                  !!ITEM
                )
                  lore = ITEM.getLore();
                else lore = getData.location.inventory.lore;
                if (
                  !!ITEM &&
                  (getData.location.inventory.item ?? ITEM.typeId).includes(ITEM.typeId) &&
                  !(getData.location.inventory.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
                  amount.min <= ITEM.Amount() &&
                  amount.max >= ITEM.Amount() &&
                  (getData.location.inventory.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
                  lore.join() === ITEM.getLore().join()
                )
                  option.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
              }
            }
          }
          if (allItem.length == 0) allItem.push(null);
          returnData.push(allItem);

          //#endregion
        }
      });

      return returnData;
    } else if (options instanceof ItemQueryOptions) {
      const getData = options.getOptions();
      if (getData.withEmpty) allItem = Array(36);
      //#region mainhandのチェック
      if (JSON.stringify(getData.location.mainhand) != "{}") {
        const ITEM = this.getItem(this._player.selectedSlot);
        let lore;
        let amount = getData.location.mainhand?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
        if (amount instanceof NumberRange) {
          if (!getData.location.mainhand.lore && !!ITEM) lore = ITEM.getLore();
          else if (
            getData.location.mainhand.lore instanceof Array &&
            getData.location.mainhand.lore.length == 0 &&
            !!ITEM
          )
            lore = ITEM.getLore();
          else lore = getData.location.mainhand.lore;
          if (
            !!ITEM &&
            (getData.location.mainhand.item ?? ITEM.typeId).includes(ITEM.typeId) &&
            !(getData.location.mainhand.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
            amount.min <= ITEM.Amount() &&
            amount.max >= ITEM.Amount() &&
            (getData.location.mainhand.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
            lore.join() === ITEM.getLore().join()
          )
            options.withEmpty ? (allItem[this._player.selectedSlot] = ITEM) : allItem.push(ITEM);
        } else {
          if (!getData.location.mainhand.lore && !!ITEM) lore = ITEM.getLore();
          else if (
            getData.location.mainhand.lore instanceof Array &&
            getData.location.mainhand.lore.length == 0 &&
            !!ITEM
          )
            lore = ITEM.getLore();
          else lore = getData.location.mainhand.lore;
          if (
            !!ITEM &&
            (getData.location.mainhand.item ?? ITEM.typeId).includes(ITEM.typeId) &&
            !(getData.location.mainhand.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
            amount == ITEM.Amount() &&
            (getData.location.mainhand.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
            lore.join() === ITEM.getLore().join()
          )
            options.withEmpty ? (allItem[this._player.selectedSlot] = ITEM) : allItem.push(ITEM);
        }
      }
      //#endregion

      //#region hotbarのチェック
      if (JSON.stringify(getData.location.hotbar) != "{}") {
        for (let i = 0; i < 9; i++) {
          const ITEM = this.getItem(i);
          let lore;
          let amount = getData.location.hotbar?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
          if (amount instanceof NumberRange) {
            if (!getData.location.hotbar.lore && !!ITEM) lore = ITEM.getLore();
            else if (
              getData.location.hotbar.lore instanceof Array &&
              getData.location.hotbar.lore.length == 0 &&
              !!ITEM
            )
              lore = ITEM.getLore();
            else lore = getData.location.hotbar.lore;
            if (
              !!ITEM &&
              (getData.location.hotbar.item ?? ITEM.typeId).includes(ITEM.typeId) &&
              !(getData.location.hotbar.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
              amount.min <= ITEM.Amount() &&
              amount.max >= ITEM.Amount() &&
              (getData.location.hotbar.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
              lore.join() === ITEM.getLore().join()
            )
              options.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
          } else {
            if (!getData.location.hotbar.lore && !!ITEM) lore = ITEM.getLore();
            else if (
              getData.location.hotbar.lore instanceof Array &&
              getData.location.hotbar.lore.length == 0 &&
              !!ITEM
            )
              lore = ITEM.getLore();
            else lore = getData.location.hotbar.lore;
            if (
              !!ITEM &&
              (getData.location.hotbar.item ?? ITEM.typeId).includes(ITEM.typeId) &&
              !(getData.location.hotbar.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
              amount == ITEM.Amount() &&
              (getData.location.hotbar.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
              lore.join() === ITEM.getLore().join()
            )
              options.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
          }
        }
      }

      //#endregion

      //#region inventoryのチェック
      if (JSON.stringify(getData.location.inventory) != "{}") {
        for (let i = 9; i < 36; i++) {
          const ITEM = this.getItem(i);
          let lore;
          let amount = getData.location.inventory?.amount ?? new NumberRange(undefined, { min: 1, max: 64 });
          if (amount instanceof NumberRange) {
            if (!getData.location.inventory.lore && !!ITEM) lore = ITEM.getLore();
            else if (
              getData.location.inventory.lore instanceof Array &&
              getData.location.inventory.lore.length == 0 &&
              !!ITEM
            )
              lore = ITEM.getLore();
            else lore = getData.location.inventory.lore;
            if (
              !!ITEM &&
              (getData.location.inventory.item ?? ITEM.typeId).includes(ITEM.typeId) &&
              !(getData.location.inventory.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
              amount.min <= ITEM.Amount() &&
              amount.max >= ITEM.Amount() &&
              (getData.location.inventory.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
              lore.join() === ITEM.getLore().join()
            )
              options.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
          } else {
            if (!getData.location.inventory.lore && !!ITEM) lore = ITEM.getLore();
            else if (
              getData.location.inventory.lore instanceof Array &&
              getData.location.inventory.lore.length == 0 &&
              !!ITEM
            )
              lore = ITEM.getLore();
            else lore = getData.location.inventory.lore;
            if (
              !!ITEM &&
              (getData.location.inventory.item ?? ITEM.typeId).includes(ITEM.typeId) &&
              !(getData.location.inventory.excludeItem ?? "noneItem").includes(ITEM.typeId) &&
              amount == ITEM.Amount() &&
              (getData.location.inventory.nameTag ?? ITEM.NameTag()) === ITEM.NameTag() &&
              lore.join() === ITEM.getLore().join()
            )
              options.withEmpty ? (allItem[i] = ITEM) : allItem.push(ITEM);
          }
        }
      }
      if (allItem.length == 0) allItem.push(null);

      return allItem;

      //#endregion
    }else{
      for(let i = 0; i < 36; i++) allItem.push(this.getItem(i));
      return allItem;
    }
  }
  /**
   * アイテムを指定されたスロットに設定します。
   * @param {number} slot
   * @param {ItemStack} itemStack
   */
  setItem(slot, itemStack) {
    try {
      this.playerComp.container.setItem(slot, itemStack?.getItemStack());
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   *
   * @param {number} slot
   * @param {number} otherSlot
   * @param {Container} container
   * @returns 成功したかを返します。
   */
  swapItems(slot, otherSlot, container) {
    try {
      this.playerComp.swapItems(slot, otherSlot, container);
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
   * @returns 成功したかを返します。
   */
  transferItem(slot, toSlot, toContainer) {
    try {
      this.playerComp.transferItem(slot, toSlot, toContainer);
      return true;
    } catch (e) {
      return false;
    }
  }
}
/**
 * プレイヤーの動きに関するものを設定するクラス
 */
export class PlayerMovementComponent extends EntityAttributeComponent {
  constructor(player){
    super(player, "minecraft:movement");
  }
}
/**
 * プレイヤーの体力を設定したりするクラス
 */
export class PlayerHealthComponent extends EntityAttributeComponent {
  constructor(player){
    super(player, "minecraft:health");
  }
}
export class PlayerBreathableComponent {
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  setAirSupply(value) {
    this.playerComp.setAirSupply(value);
  }
  /**
   *
   * @returns {BlockPermutation[]}
   */
  getBreatheBlocks() {
    return this.playerComp.getBreatheBlocks().map((x) => new BlockPermutation(x));
  }
  /**
   *
   * @returns {BlockPermutation[]}
   */
  getNonBreatheBlocks() {
    return this.playerComp.getNonBreatheBlocks().map((x) => new BlockPermutation(x));
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    /**
     * @private
     */
    this._player = player;
    /**
     * @private
     */
    this.playerComp = player.getComponent(this.typeId);
    /**
     * @readonly
     * @type {BlockPermutation[]}
     */
    this.breatheBlocks = this.playerComp.breatheBlocks;
    /**
     * @readonly
     * @type {boolean}
     */
    this.breathesAir = this.playerComp.breatheAir;
    /**
     * @readonly
     * @type {boolean}
     */
    this.breathesLava = this.playerComp.breatheLava;
    /**
     * @readonly
     * @type {boolean}
     */
    this.breathesSolids = this.playerComp.breatheSolids;
    /**
     * @readonly
     * @type {boolean}
     */
    this.breathesWater = this.playerComp.breatheWater;
    /**
     * @readonly
     * @type {boolean}
     */
    this.generatesBubbles = this.playerComp.generatesBubbles;
    /**
     * @readonly
     * @type {number}
     */
    this.inhaleTime = this.playerComp.inhaleTime;
    /**
     * @readonly
     * @type {BlockPermutation[]}
     */
    this.nonBreatheBlocks = this.playerComp.nonBreatheBlocks;
    /**
     * @readonly
     * @type {number}
     */
    this.suffocateTime = this.playerComp.suffocateTime;
    /**
     * @readonly
     * @type {number}
     */
    this.totalSupply = this.playerComp.totalSupply;
    /**
     * @readonly
     * コンポーネントID
     */
    this.typeId = "minecraft:breathable";
  }
}
export class PlayerEquipmentSlot {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:equippable";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   * 
   * @param {ValueOf<EquipmentSlot>} equipmentSlot 
   */
  getEquipment(equipmentSlot){
    if(!!this._player.getComponent(this.typeId).getEquipment(equipmentSlot))
      return new ItemStack(this._player.getComponent(this.typeId).getEquipment(equipmentSlot));
    return undefined;
  }
  /**
   * 
   * @param {ValueOf<EquipmentSlot>} equipmentSlot 
   */
  getEquipmentSlot(equipmentSlot){
    if(!!this._player.getComponent(this.typeId).getEquipmentSlot(equipmentSlot))
      return new ContainerSlot(this._player.getComponent(this.typeId).getEquipmentSlot(equipmentSlot));
    return undefined;
  }
  /**
   * 
   * @param {ValueOf<EquipmentSlot>} equipmentSlot 
   * @param {ItemStack | undefined} itemStack 
   */
  setEquipment(equipmentSlot, itemStack){
    this._player.getComponent(this.typeId).setEquipment(equipmentSlot, itemStack?.getItemStack());
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class PlayerCanClimbComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:can_climb";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class PlayerIsHiddenWhenInvisibleComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_hidden_when_invisible";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this.playerComp.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    /**
     * @private
     */
    this._player = player;
    /**
     * @private
     */
    this.playerComp = player.getComponent(this.typeId);
  }
}
export class PlayerLavaMovementComponent extends EntityAttributeComponent {
  /**
   * 
   * @param {Player} player 
   */
  constructor(player){
    super(player, "minecraft:lava_movement")
  }
}
export class PlayerRideableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:rideable";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   * 指定されたプレイヤーがこのコンポーネント元のプレイヤーに乗せることが出来ます。
   * @param {Entity} rider
   * @returns 成功したかどうかが返ってきます。
   */
  addRider(rider) {
    try {
      /**
       * @type {boolean}
       */
      this.playerComp.addRider(rider);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * 指定されたプレイヤーがこのコンポーネント元のプレイヤーから降ろすことが出来ます。
   * @param {Entity} rider
   * @returns 成功したかどうかが返ってきます。
   */
  ejectRider(rider) {
    try {
      this.playerComp.ejectRider(rider);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * コンポーネント元のプレイヤーに乗っているすべてのプレイヤーを強制的に降ろします。
   * @returns 成功したか返ってきます。
   */
  ejectRiders() {
    try {
      this.playerComp.ejectRiders();
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   *
   * @returns {string[]}
   */
  getFamilyTypes() {
    return this.playerComp.getFamilyTypes();
  }
  /**
   *
   * @returns {Seat[]}
   */
  getSeats() {
    return this.playerComp.getSeats();
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.controllingSeat = this.playerComp.controllingSeat;
      /**
       * @readonly
       * @type {boolean}
       */
      this.crouchingSkipInteract = this.playerComp.crouchingSkipInteract;
      /**
       * @readonly
       * @type {string[]}
       */
      this.familyTypes = this.playerComp.familyTypes;
      /**
       * @readonly
       * @type {string}
       */
      this.interactText = this.playerComp.interactText;
      /**
       * @readonly
       * @type {boolean}
       */
      this.pullInEntities = this.playerComp.pullInEntities;
      /**
       * @readonly
       * @type {boolean}
       */
      this.riderCanInteract = this.playerComp.riderCanInteract;
      /**
       * @readonly
       * @type {number}
       */
      this.seatCount = this.playerComp.seatCount;
      /**
       * @readonly
       * @type {Seat[]}
       */
      this.seats = this.playerComp.seats;
    } catch (e) {}
  }
}
export class PlayerMarkVariantComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:mark_variant";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  getValue() {
    return this.playerComp.value;
  }
  /**
   *
   * @param {number} value
   */
  setValue(value) {
    this.playerComp.value = value;
    this.value = value;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @type {number}
       */
      this.value = this.playerComp.value;
    } catch (e) {}
  }
}
export class PlayerMovementSwayComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.sway";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.playerComp.maxTurn;
      /**
       * @readonly
       * @type {number}
       */
      this.swayAmplitude = this.playerComp.swayAmplitude;
      /**
       * @readonly
       * @type {number}
       */
      this.swayFrequency = this.playerComp.swayFrequency;
    } catch (e) {}
  }
}
export class PlayerNavigationGenericComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.generic";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.playerComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.playerComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.playerComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.playerComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.playerComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.playerComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.playerComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.playerComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.playerComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.playerComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.playerComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.playerComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.playerComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.playerComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.playerComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.playerComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.playerComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.playerComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.playerComp.isAmphibious;
    } catch (e) {}
  }
}
export class PlayerScaleComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:scale";
  /**
   * プレイヤーがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  getValue() {
    return this.playerComp.value;
  }
  /**
   *
   * @param {number} value
   */
  setValue(value) {
    this.playerComp.value = value;
    this.value = value;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @type {number}
       */
      this.value = this.playerComp.value;
    } catch (e) {}
  }
}
export class PlayerUnderwaterMovementComponent extends EntityAttributeComponent {
  /**
   * 
   * @param {Player} player 
   */
  constructor(player){
    super(player, "minecraft:underwater_movement");
  }
}
export class PlayerVariantComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:variant";
  /**
   * プレイヤーがコンポーネントを所持しているか確認します。
   */
  hasComponent() {
    if (this._player.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    try {
      /**
       * @private
       */
      this._player = player;
      /**
       * @private
       */
      this.playerComp = player.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.value = this.playerComp.value;
    } catch (e) {}
  }
}

/**
 * エンティティのコンテナーを設定したり、持っているか確認したりするクラス
 */
export class EntityContainerComponent {
  /**
   * @readonly
   */
  get additionalPerStrength(){
    return this._entity.getComponent(this.typeId).additionalSlotsPerStrength;
  }
  /**
   * @readonly
   */
  get canBeSiphonedFrom(){
    return this._entity.getComponent(this.typeId).canBeSiphonedFrom;
  }
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:inventory";
  /**
   * @readonly
   */
  container = new EntityInventoryComponent(this._entity);
  /**
   * @readonly
   */
  get containerType(){
    return this._entity.getComponent(this.typeId).containerType;
  }
  /**
   * @readonly
   */
  get inventorySize(){
    return this._entity.getComponent(this.typeId).inventorySize;
  }
  /**
   * @readonly
   */
  get "private"(){
    return this._entity.getComponent(this.typeId).private;
  }
  /**
   * @readonly
   */
  get restrictOwner(){
    return this._entity.getComponent(this.typeId).restrictToOwner;
  }
  /**
   * エンティティがコンポーネントを所持しているか確認します。
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      this._entity = entity;
    } catch (e) {}
  }
}
/**
 * エンティティのインベントリを設定するクラス
 */
export class EntityInventoryComponent {
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent("inventory");
      /**
       * @readonly
       */
      this.emptySlotsCount = this.entityComp.container.emptySlotsCount;
      /**
       * @readonly
       */
      this.size = this.entityComp.container.size;
    } catch (e) {}
  }
  /**
   * @private
   */
  entityComp;
  /**
   * 指定したItemStackをエンティティのインベントリに追加します。
   * @param {ItemStack} itemStack
   */
  addItem(itemStack) {
    try {
      this.entityComp.container.addItem(itemStack.getItemStack());
      return true;
    } catch (e) {
      new Error(e);
    }
  }
  /**
   * 指定したスロットのItemStackを返す関数
   *
   * 空の場合はundefinedが返ります。
   * @param {number} slot
   * @returns {ItemStack}
   */
  getItem(slot) {
    const item = this.entityComp.container.getItem(slot);
    if (!item) return undefined;
    else return new ItemStack(item);
  }
  /**
   *
   * @param {number} slot
   * @param {ItemStack} itemStack
   */
  setItem(slot, itemStack) {
    try {
      this.entityComp.container.setItem(slot, itemStack.getItemStack());
    } catch (e) {
      return new Error(e);
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
      this.entityComp.container.swapItems(slot, otherSlot, container);
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
      this.entityComp.container.transferItem(slot, toSlot, toContainer);
      return true;
    } catch (e) {
      return false;
    }
  }
}
/**
 * エンティティの移動に関するものを設定するクラス
 */
export class EntityMovementComponent extends EntityAttributeComponent{
  constructor(entity){
    super(entity, "minecraft:movement");
  }
}
/**
 * エンティティの体力などの設定ができるクラス
 */
export class EntityHealthComponent extends EntityAttributeComponent{
  constructor(entity){
    super(entity, "minecraft:health");
  }
}
export class EntityAddRiderComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:addrider";

  /**
   * エンティティがコンポーネントを所持しているか確認します。
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {string}
       */
      this.entityType = this.entityComp.entityType;
      /**
       * @readonly
       * @type {string}
       */
      this.spawnEvent = this.entityComp.spawnEvent;
    } catch (e) {}
  }
}
export class EntityAgeableComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:ageable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @returns {string[]}
   */
  getDropItems() {
    return this.entityComp.dropItems;
  }
  /**
   *
   * @returns {EntityDefinitionFeedItem[]}
   */
  getFeedItems() {
    return this.entityComp.feedItems;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent("ageable");
      /**
       * @readonly
       * @type {number}
       */
      this.duration = this.entityComp.duration;
      /**
       * @readonly
       * @type {Trigger}
       */
      this.growUp = this.entityComp.growUp;
    } catch (e) {}
  }
}
export class EntityBreathableComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:breathable";

  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  setAirSupply(value) {
    this.entityComp.setAirSupply(value);
  }
  getBreatheBlocks() {
    return this.entityComp.getBreatheBlocks().map((x) => new BlockPermutation(x));
  }
  getNonBreatheBlocks() {
    return this.entityComp.getNonBreatheBlocks().map((x) => new BlockPermutation(x));
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityCanClimbComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:can_climb";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
    } catch (e) {}
  }
}
export class EntityCanFlyComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:can_fly";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityCanPowerJumpComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:can_power_jump";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityColorComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:color";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  Color(value = undefined) {
    if (value == undefined) return this.entityComp.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityFireImmuneComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:fire_immune";
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityFloatsInLiquidComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:floats_in_liquid";
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityFlyingSpeedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:flying_speed";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  value(value = undefined) {
    if (value == undefined) return this.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityFrictionModifierComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:friction_modifier";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  value(value = undefined) {
    if (value == undefined) return this.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityGroundOffsetComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:ground_offset";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  value(value = undefined) {
    if (value == undefined) return this.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityHealableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:healable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  getFeedItems() {
    return this.entityComp.getFeedItems();
  }

  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {FilterGroup}
       */
      this.filters = this.entityComp.filters;
      /**
       * @readonly
       * @type {boolean}
       */
      this.forceUse = this.entityComp.forceUse;
    } catch (e) {}
  }
}
export class EntityIsBabyComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_baby";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsChargedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_charged";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsChestedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_chested";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsDyableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_dyable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsHiddenWhenInvisibleComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_hidden_when_invisible";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsIgnitedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_ignited";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsIllagerCaptainComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_illager_captain";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsSaddledComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_saddled";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsShakingComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_shaking";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsShearedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_sheared";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsStackableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_stackable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsStunnedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_stunned";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityIsTamedComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_tamed";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityItemComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:item";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {ItemStack}
       */
      this.itemStack = new ItemStack(this.entityComp.itemStack);
    } catch (e) {}
  }
}
export class EntityLeashableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:is_tamed";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} leashHolder
   */
  leash(leashHolder) {
    try {
      this.entityComp.leash(leashHolder);
      return true;
    } catch (e) {
      return false;
    }
  }
  unleash() {
    try {
      this.entityComp.unleash();
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      softDistance = this.entityComp.softDistance;
    } catch (e) {}
  }
}
/**
 * エンティティの移動に関するものを設定するクラス
 */
export class EntityLavaMovementComponent extends EntityAttributeComponent {
  constructor(entity){
    super(entity, "minecraft:lava_movement");
  }
}
export class EntityMarkVariantComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:mark_variant";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  value(value = undefined) {
    if (value == undefined) return this.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityMountTamingComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:tamemount";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {boolean} showParticles
   */
  setTamed(showParticles) {
    try {
      this.entityComp.setTamed(showParticles);
    } catch (e) {}
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityMovementAmphibiousComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.amphibious";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityMovementBasicComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.basic";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementFlyComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.fly";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementGenericComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.generic";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementGlideComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.glide";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
      /**
       * @readonly
       * @type {number}
       */
      this.speedWhenTurning = this.entityComp.speedWhenTurning;
      /**
       * @readonly
       * @type {number}
       */
      this.startSpeed = this.entityComp.startSpeed;
    } catch (e) {}
  }
}
export class EntityMovementHoverComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.hover";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementJumpComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.jump";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementSkipComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.skip";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
    } catch (e) {}
  }
}
export class EntityMovementSwayComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:movement.sway";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.maxTurn = this.entityComp.maxTurn;
      /**
       * @readonly
       * @type {number}
       */
      this.swayAmplitude = this.entityComp.swayAmplitude;
      /**
       * @readonly
       * @type {number}
       */
      this.swayFrequency = this.entityComp.swayFrequency;
    } catch (e) {}
  }
}
export class EntityNavigationClimbComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.climb";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityNavigationFloatComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.float";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityNavigationFlyComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.fly";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityNavigationGenericComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.generic";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityNavigationHoverComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.hover";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityNavigationWalkComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:navigation.walk";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidDamageBlocks = this.entityComp.avoidDamageBlocks;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidPortals = this.entityComp.avoidPortals;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidSun = this.entityComp.avoidSun;
      /**
       * @readonly
       * @type {boolean}
       */
      this.avoidWater = this.entityComp.avoidWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreach = this.entityComp.canBreach;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canBreakDoors = this.entityComp.canBreakDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canFloats = this.entityComp.canFloats;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canJump = this.entityComp.canJump;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenDoors = this.entityComp.canOpenDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canOpenIronDoors = this.entityComp.canOpenIronDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassDoors = this.entityComp.canPassDoors;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPathFromAir = this.entityComp.canPathFromAir;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverLava = this.entityComp.canPassOverLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canPassOverWater = this.entityComp.canPassOverWater;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSink = this.entityComp.canSink;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canSwim = this.entityComp.canSwim;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalk = this.entityComp.canWalk;
      /**
       * @readonly
       * @type {boolean}
       */
      this.canWalkInLava = this.entityComp.canWalkInLava;
      /**
       * @readonly
       * @type {boolean}
       */
      this.isAmphibious = this.entityComp.isAmphibious;
    } catch (e) {}
  }
}
export class EntityPushThroughComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:push_through";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  value(value = undefined) {
    if (value == undefined) return this.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityRideableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:rideable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   * 指定されたエンティティがこのコンポーネント元のエンティティに乗せることが出来ます。
   * @param {Entity} rider
   * @returns 成功したかどうかが返ってきます。
   */
  addRider(rider) {
    try {
      /**
       * @type {boolean}
       */
      this.entityComp.addRider(rider);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * 指定されたエンティティがこのコンポーネント元のエンティティから降ろすことが出来ます。
   * @param {Entity} rider
   * @returns 成功したかどうかが返ってきます。
   */
  ejectRider(rider) {
    try {
      this.entityComp.ejectRider(rider);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * コンポーネント元のエンティティに乗っているすべてのエンティティを強制的に降ろします。
   * @returns 成功したか返ってきます。
   */
  ejectRiders() {
    try {
      this.entityComp.ejectRiders();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @returns {string[]}
   */
  getFamilyTypes() {
    return this.entityComp.getFamilyTypes();
  }
  /**
   *
   * @returns {Seat[]}
   */
  getSeats() {
    return this.entityComp.getSeats();
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.controllingSeat = this.entityComp.controllingSeat;
      /**
       * @readonly
       * @type {boolean}
       */
      this.crouchingSkipInteract = this.entityComp.crouchingSkipInteract;
      /**
       * @readonly
       * @type {string}
       */
      this.interactText = this.entityComp.interactText;
      /**
       * @readonly
       * @type {boolean}
       */
      this.pullInEntities = this.entityComp.pullInEntities;
      /**
       * @readonly
       * @type {boolean}
       */
      this.riderCanInteract = this.entityComp.riderCanInteract;
      /**
       * @readonly
       * @type {number}
       */
      this.seatCount = this.entityComp.seatCount;
    } catch (e) {}
  }
}
export class EntityScaleComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:scale";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  Scale(value = undefined) {
    if (value == undefined) return this.entityComp.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntitySkinIdComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:skin_id";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {number} value
   */
  SkinId(value = undefined) {
    if (value == undefined) return this.entityComp.value;
    else this.entityComp.value = value;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
    } catch (e) {}
  }
}
export class EntityStrengthComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:strength";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.value = this.entityComp.value;
      /**
       * @readonly
       * @type {number}
       */
      this.max = this.entityComp.value;
    } catch (e) {}
  }
}
export class EntityTamableComponent {
  /**
   * @readonly
   */
  typeId = "minecraft:tamable";
  /**
   * エンティティがコンポーネントを持っているか確認できます。
   * @returns 持っている場合はtrueを、持っていない場合はfalseが返ります
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   * コンポーネント元のエンティティに対して、テイムをすることが出来ます。
   * @returns エンティティがテイムされたかの判定が返ります。
   */
  tame() {
    try {
      /**
       * @type {boolean}
       */
      const data = this.entityComp.tame();
      return data;
    } catch (e) {
      return false;
    }
  }
  /**
   * @returns {string[]}
   */
  getTameItems() {
    return this.entityComp.getTameItems();
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.probability = this.entityComp.probability;
      /**
       * @readonly
       * @type {Trigger}
       */
      this.tameEvent = this.entityComp.tameEvent;
    } catch (e) {}
  }
}
export class EntityUnderwaterMovementComponent extends EntityAttributeComponent{

  /**
   * 
   * @param {Entity} entity 
   */
  constructor(entity){
    super(entity, "minecraft:underwater_movement");
  }
}
export class EntityVariantComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:variant";
  /**
   * エンティティがコンポーネントを所持しているか確認します。
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
      /**
       * @private
       */
      this.entityComp = entity.getComponent(this.typeId);
      /**
       * @readonly
       * @type {number}
       */
      this.value = this.entityComp.value;
    } catch (e) {}
  }
}
/**
 * このコンポーネントが追加しているエンティティは、〇〇_jockeyだと示すコンポーネント
 */
export class EntityWantsJockeyComponent {
  /**
   * @readonly
   * コンポーネントID
   */
  typeId = "minecraft:wants_jockey";
  /**
   * エンティティがコンポーネントを所持しているか確認します。
   */
  hasComponent() {
    if (this._entity.hasComponent(this.typeId)) return true;
    else return false;
  }
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    try {
      /**
       * @private
       */
      this._entity = entity;
    } catch (e) {}
  }
}