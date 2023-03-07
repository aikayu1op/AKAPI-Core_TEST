import { system } from "../../../System/index.js";
import { Player } from "../../../Player/index.js";
import { world } from "../../../World/index.js";

/**
 * MultiLineActionbarのデータ
 * @type {Map<number, Map<string, string>>}
 */
var alldata = new Map();

/**
 * @todo 削除までの秒数(tick)がほしい際に実装する。
 * 
 * Actionbarを派生したクラスです。
 * メッセージを分けて表示させることができます。
 *
 * idがmainまたは何も書いていない場合は、一番上に表示されます。
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
   */
  constructor(player, id = "main", message = "undefined") {
    if (!alldata.has(player.id)) alldata.set(player.id, new Map().set(id, message));
    else alldata.set(player.id, alldata.get(player.id).set(id, message));
  }
}

system.run(function acbar() {
  system.run(acbar);

  for (const player of world.getPlayers()) {
    if (!alldata.has(player.id)) continue;

    let text = "";
    if (alldata.get(player.id).has("main")) text += `${alldata.get(player.id).get("main")}\n\n`;
    for (const data of alldata.get(player.id).keys()) {
      if (data != "main") text += `${alldata.get(player.id).get(data)}\n\n`;
    }
    player.sendActionbar(text);
  }
});
