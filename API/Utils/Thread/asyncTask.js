/**
 * @author Potchie <https://minecraft.lflab.work/>
 */

import { system } from "@minecraft/server";
import { setImmediate } from "../Time/timer.js";

// スレッドを回す際の上限となる秒数（ミリ秒）
// watchdogが6msまでの遅延を許容するので6msより小さい値にすれば番犬は吠えない。
// watchdogを無効化するコードを入れている場合、32msくらいまで大きくできるけど
// setblockとか負荷の高い系のコマンドの場合はせいぜい10msくらいにしておかないと
// エラーが発生するので、カリカリにチューニングしたい場合以外は0.1～5.5msが無難
const THRESHOLD = 0.000001;

/** @type Generator[] 疑似スレッドで実行するタスク（ジェネレータ）の配列 */
let tasks = [];
/** 疑似スレッド稼働状況 */
export let isRunning = false;
// ジェネレータの実行結果を格納
export let results = [];

async function runTask(task) {
  const current = task.next();
  if (current.done) {
    if (isRunning && tasks.length === 0) {
      isRunning = false;
      results.push(current.value);
      return;
    }
  } else {
    tasks.push(task);
    results.push(current.value);
  }
}

/**
 * 疑似スレッド.
 * ジェネレータ関数を受け取ります。
 * @param {Generator} task 
 */
export function asyncThread(task) {
  tasks.push(task());
  if (!isRunning) {
    isRunning = true;
    runThread();
  }
}

async function runThread() {
  try {
    system.run(async function tick(ev) {
      system.run(tick);
      if (isRunning === true) {
        const ms = Date.now();
        while (Date.now() - ms < THRESHOLD) {
          if (tasks.length > 0) {
            await runTask(tasks.shift());
          } else {
            isRunning = false;
            return;
          }
        }
      }
    });
  } catch (error) {
    console.warn(error);
    tasks = [];
    results = [];
    isRunning = false;
  }
}