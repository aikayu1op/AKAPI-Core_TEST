//勉強用
import { Player, world } from '@minecraft/server';

function getPlayers(options: import('@minecraft/server').EntityQueryOptions) {
    function* generator(): Generator<Player> {
        for (const player of world.getAllPlayers()) {
            // 名前除外クエリがあって、当てはまらないとき
            if (typeof options.excludeNames !== 'undefined' && options.excludeNames.includes(player.name)) {
                // 次のプレイヤーに飛ばす
                continue;
            }

            // 名前指定クエリがあって、当てはまらないとき（以下略
            if (typeof options.name !== 'undefined' && options.name !== player.name) {
                continue;
            }

            // 全てのクエリに当てはまったらyield（Array#pushみたいなイメージ）する
            yield player;
        }
    }

    const iterator = generator();

    return iterator;
}

const getPlayers2 = (options) => (function* () {
    for (const player of world.getAllPlayers()) {

    }
})();