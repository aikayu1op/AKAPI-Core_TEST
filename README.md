# AKAPI-Core_TEST
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## AKAPI-Coreとは
現時点でのGametest Frameworkにちょっとした機能追加や、日本語化を目的として作ったソースです。

完成度は20%です

> 現時点でできること
### イベント
- [ ] すべてのイベントを追加する(EntityやPlayerクラスのプロパティをすべて自作クラスに置き換える)
- [x] PlayerDeathEventを追加する
- [x] BeforeChatEventを追加する
### UI
- [x] すべてのUIを追加する
- [x] Message, Actionの場合はshowの中に書くのではなく、buttonを定義する瞬間や初期化処理の瞬間に書いたりして、実行を見やすくする。
### コンポーネント
- [x] すべてのコンポーネントを追加する(1.19.51時点)
- [ ] すべてのコンポーネントを追加する(1.19.60時点)
- [ ] すべてのコンポーネントを日本語化する
### その他
現在特になし 

# 現在新たに追加されている内容
**PlayerInventoryComponentのgetAllItems**

**Location系相互変換機能**

**Playerクラスにいくつかの関数追加(hasTags, isInstantSneaking, MainhandItem, sendActionbar, setGamemode, getGamemode)** etc...