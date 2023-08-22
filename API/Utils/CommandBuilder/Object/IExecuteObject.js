export class IExecuteObject {
  /**
   * 送られたプレイヤーを取得します。
   * @readonly
   * @type {import("../../../Player/index").Player}
   */
  sender;
  /**
   * 送ったプレイヤーがopを持っているかどうかを取得します。
   * @returns {boolean}
   */
  isOp(){}
  /**
   * 名前の最初が少し一致していればPlayerをかえします。
   * @readonly
   * @param {string} name
   * @returns {import("../../../../index.js").Player}
   */
  getPlayer(name) {}
  /**
   * 名前の最初が少し一致しているすべてのPlayerをかえします。
   * @readonly
   * @param {string} name
   * @returns {import("../../../../index.js").Player}
   */
  getPlayers(name) {}
}
