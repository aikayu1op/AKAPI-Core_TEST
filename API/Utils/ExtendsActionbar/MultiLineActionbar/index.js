import { system } from "../../../System/index.js";
import { Player } from "../../../Player/index.js";

/**
 * MultiLineActionbarのデータ
 * @type {Map<number, Map<string, string>>}
 */
var alldata = new Map();

/**
 * MultiLineActionbarの自動的に表示を消すための保存データ
 * @type {Map<number, Map<string, number>>}
 */
var deleteDataTick = new Map();

/**
 * @todo 削除までの秒数(tick)がほしい際に実装する。
 * 
 * Actionbarを派生したクラスです。
 * メッセージを分けて表示させることができます。
 *
 * idがmainまたは何も書いていない場合は、一番上に表示されます。
 * 
 * idがlastの場合は、一番下に表示されます。
 */
export class MultiLineActionbar {
  /**
   * actionbarの表示データをIDで削除します。
   * @param {Player} player
   * @param {string} id
   */
  static deleteData(player, id) {
    alldata.get(player.id).delete(id);
  }

  /**
   * @param {Player} player 表示させるPlayer
   * @param {string} id 表示用のID
   * @param {string} message 表示したいメッセージ
   * @param {number} tick 表示させたい時間
   */
  static addMultiLineData(player, id, message, tick = -1, debug = false) {
    if(!deleteDataTick.get(player.id)) deleteDataTick.set(player.id, new Map().set(id, tick));
    else deleteDataTick.set(player.id, deleteDataTick.get(player.id).set(id, tick));
    if(debug) message = "§e[Debug]§r "+message;

    if (!alldata.has(player.id)) alldata.set(player.id, new Map().set(id, message));
    else alldata.set(player.id, alldata.get(player.id).set(id, message));
  }
  /**
   * @deprecated
   */
  static getAllData(){
    return alldata;
  }
  /**
   * そのデータが存在しているかどうかを取得します。
   * @param {Player} player 
   * @param {string} id 
   * @returns 
   */
  static isDat(player, id){
    return alldata.get(player.id)?.has(id);
  }
}

system.allPlayerTickSubscribe(({player}) =>{
    if (!alldata.has(player.id)) return;
    let deleteTick = deleteDataTick.get(player.id);

    let text = "";
    if (alldata.get(player.id).has("main")) text += `${alldata.get(player.id).get("main")}\n\n`;
    for (const data of [...alldata.get(player.id).keys()].sort()) {
      if (data != "main" && data != "last"){
        text += `${alldata.get(player.id).get(data)}\n\n`;
        if(deleteTick.get(data) != -1) deleteTick.set(data, deleteTick.get(data)-1);
        if(deleteTick.get(data) == 0) player.deleteMultiLineActionbar(data);
      }
    }
    if(alldata.get(player.id).has("last")) text += `${alldata.get(player.id).get("last")}\n\n`;
    player.sendActionbar(text);
});
