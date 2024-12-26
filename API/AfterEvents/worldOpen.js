import { world } from "@minecraft/server";

/**
 * @type {{function: Function}[]}
 */
var _event = [];
/**
 * 一つ以上動く場合は、ここがTrueになります。
 */
let isRunning = false;
export class WorldOpenEvents {
  /**
   * イベントを登録します。
   * @param {(callback: {}) => void} callback
   * @throw 同じものが既に存在している場合にエラーをかえします。
   */
  subscribe(callback) {
    if (isDuplicate(_event, callback) == -1 && typeof callback === "function")
      _event.push({ function: callback });
    else throw new Error(`This function has already subscribed.`);
    if (!isRunning && _event.length >= 1) {
      isRunning = true;
      start();
    }
    return callback;
  }
  /**
   * イベントを削除します。
   * @param {(callback: {}) => void} callback
   */
  unsubscribe(callback) {
    let index = isDuplicate(
      _event.map((x) => x.function),
      callback
    );
    if (index != -1) _event.splice(index, 1);
    else throw new Error("This function was not found.");
    if (isRunning && _event.length == 0) isRunning = false;
  }
}
export const worldOpen = new WorldOpenEvents();


let isWorldOpen = false;
/**
 * イベント登録数が1個以上の場合にイベントを監視するようにします。
 */
function start() {
  let run1 = world.afterEvents.worldInitialize.subscribe(() => isWorldOpen = true);
  let run2 = world.afterEvents.playerSpawn.subscribe(ev =>{
    if(ev.initialSpawn && !isWorldOpen){
        _event.forEach(event =>{
            event.function({});
        })
    }
  })
}
