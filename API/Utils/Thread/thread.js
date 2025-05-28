import { system } from "@minecraft/server";

// スレッドを回す際の上限となる実行時間（ミリ秒）
// watchdogが6msまでの遅延を許容するので、それより小さい値にするのが安全。
// 3ms前後が安全かつそこそこ高速に動かせるバランスのよい値。
const THRESHOLD = 32;

/** @type Generator[] 疑似スレッドで実行するタスク（ジェネレータ）の配列 */
let tasks = [];
/** 疑似スレッド稼働状況フラグ */
export let isRunning = false;
/** 実行結果の保管（必要な場合） */
export let results = [];

/**
 * 疑似スレッドを開始する関数。
 * ジェネレータ関数（function*）を受け取り、task queue に積んで処理を開始します。
 * @param {GeneratorFunction} task ジェネレータ関数（yield を含む関数）
 */
export function thread(task) {
  tasks.push(task());

  // 実行中でなければ、tick 関数を起動
  if (!isRunning) {
    isRunning = true;
    system.run(tick);
  }
}

/**
 * 1tickごとに呼ばれる内部処理関数。
 * THRESHOLD（実行時間上限）以内で、task queue にあるジェネレータを順に処理します。
 */
function tick() {
  try {
    const start = Date.now();

    // 許容時間内であれば、次の yield まで実行を続ける
    while (Date.now() - start < THRESHOLD && tasks.length > 0) {
      const task = tasks.shift();
      const result = task.next();

      if (!result.done) {
        // タスクがまだ完了していなければ再度queueへ戻す
        tasks.push(task);
      } else {
        // 完了したタスクの戻り値を保存（必要に応じて）
        results.push(result.value);
      }
    }

  } catch (error) {
    // 何かしらのエラーが発生した場合は、キューをリセットして処理停止
    console.warn('[thread] エラー発生:', error);
    tasks = [];
    results = [];
    isRunning = false;
    return;
  }

  // タスクが残っていれば次の tick へ続行
  if (tasks.length > 0) {
    system.run(tick);
  } else {
    isRunning = false; // タスクが空になったら自動停止
  }
}