# AKAPI-Core_TEST
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## AKAPI-Coreとは
現時点でのGametest Frameworkにちょっとした機能追加や、日本語化を目的として作ったソースです。

完成度は25%です

> 現時点でできること
### イベント
- [ ] すべてのイベントを追加する(EntityやPlayerクラスのプロパティをすべて自作クラスに置き換える)
- [x] PlayerDeathEventを追加する
- [x] BeforeChatEventを追加する
### UI
- [x] すべてのUIを追加する
- [x] Message, Actionの場合はshowの中に書くのではなく、buttonを定義する瞬間や初期化処理の瞬間に書いたりして、実行を見やすくする。
### コンポーネント
- [x] すべてのコンポーネントを追加する(1.20.0時点)
- [ ] すべてのコンポーネントを日本語化する

- [x] 1.19.70用に変更する(全ては試せてはないが、追加分は一旦は対応したと思われる)
### その他
現在特になし 

# 現在新たに追加されている内容
**PlayerInventoryComponentのgetAllItems**

**CommandBuilder, MessageBuilderの追加**

**Location系相互変換機能**

**Playerクラスにいくつかの関数追加(hasTags, isInstantSneaking, MainhandItem, sendActionbar, setGamemode, getGamemode)** etc...

# ChangeLog
> ver 1.1β
1.19.70で一応はエラーが吐かないように変更した。
> ver 1.1.1β
1.19.80でおおよそエラーが吐かないように変更した。
コンポーネントの追加(BlockSignComponent)
BlockPermutationのgetItemStackの追加
> ver 1.2.0β
1.20.10用にある程度対応、足りないデータはあるがある程度使用可能
Playerに必要なis(Gliding,Swimming..etc)系を追加(Entityにはまだ追加してない)
