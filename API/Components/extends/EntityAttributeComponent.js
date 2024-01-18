export class EntityAttributeComponent {
    /**
     * @private
     */
    _entity;
    /**
     * @private
     */
    _typeId;
  
    /**
     * 
     * @param {import("@minecraft/server").Entity | import("@minecraft/server").Player} entity 
     * @param {string} typeId 
     */
    constructor(entity, typeId) {
      this._entity = entity;
      this._typeId = typeId;
    }
  
    /**
     * @readonly
     * @returns {number}
     */
    get currentValue() {
      return this._entity.getComponent(this._typeId)?.currentValue;
    }
  
    /**
     * @readonly
     * @returns {number}
     */
    get defaultValue() {
      return this._entity.getComponent(this._typeId)?.defaultValue;
    }
  
    /**
     * @readonly
     * @returns {number}
     */
    get effectiveMax() {
      return this._entity.getComponent(this._typeId)?.effectiveMax;
    }
  
    /**
     * @readonly
     * @returns {number}
     */
    get effectiveMin() {
      return this._entity.getComponent(this._typeId)?.effectiveMin;
    }
    /**
     * コンポーネントを所持しているかを返します。
     * @returns 
     */
    hasComponent() {
      if (this._entity.hasComponent(this._typeId)) return true;
      else return false;
    }
    /**
     * コンポーネントID
     * @readonly
     */
    get typeId(){
      return this._typeId;
    }
    /**
     * デフォルト値に設定します。
     */
    resetToDefaultValue() {
      try {
        this._entity.getComponent(this._typeId).resetToDefaultValue();
      } catch (e) {
        throw new Error(e);
      }
    }
    
    /**
     * 最大値にリセットします。
     */
    resetToMaxValue() {
      try {
        this._entity.getComponent(this._typeId).resetToMaxValue();
      } catch (e) {
        throw new Error(e);
      }
    }
    /**
     * 最小値にリセットします。
     */
    resetToMinValue() {
      try {
        this._entity.getComponent(this._typeId).resetToMinValue();
      } catch (e) {
        throw new Error(e);
      }
    }
    /**
     * 指定された値にセットします。
     * @param {number} value 
     */
    setCurrentValue(value) {
      try {
        this._entity.getComponent(this._typeId).setCurrentValue(value);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  