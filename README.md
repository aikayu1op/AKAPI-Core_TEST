# AKAPI-Core_TEST
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## AKAPI-Coreとは
現時点でのGametest Frameworkにちょっとした機能追加や、日本語化を目的として作ったソースです。

完成度は30%です

> 現時点でできること
### イベント
- [ ] すべてのイベントを追加する(EntityやPlayerクラスのプロパティをすべて自作クラスに置き換える)
- [x] PlayerDeathEventを追加する
- [x] BeforeChatEventを追加する
### UI
- [x] すべてのUIを追加する
- [x] Message, Actionの場合はshowの中に書くのではなく、buttonを定義する瞬間や初期化処理の瞬間に書いたりして、実行を見やすくする。
- [x] ChestFormDataの追加[ここのデータをお借りしております。](https://github.com/Herobrine643928/Chest-UI/tree/main)
### コンポーネント
- [x] すべてのコンポーネントを追加する(1.20.0時点)
- [ ] すべてのコンポーネントを日本語化する

- [x] 1.19.70用に変更する(全ては試せてはないが、追加分は一旦は対応したと思われる)
### その他
現在特になし 

# 現在新たに追加されている内容
**PlayerにaddScore,setScoreの追加**
**Utilsの追加**
    **sleep機能の追加**
    **CommandBuilderの追加**
**Systemの追加**
    **allPlayerTickSubscribeの追加**etc...

# ChangeLog
> ver 1.1.0β<br>
1.19.70で一応はエラーが吐かないように変更した。<br>
> ver 1.1.1β<br>
1.19.80でおおよそエラーが吐かないように変更した。<br>
コンポーネントの追加(BlockSignComponent)<br>
BlockPermutationのgetItemStackの追加<br>
> ver 1.2.0β<br>
1.20.10用にある程度対応、足りないデータはあるがある程度使用可能<br>
Playerに必要なis(Gliding,Swimming..etc)系を追加(Entityにはまだ追加してない)<br>
> ver 1.2.1β<br>
いくつかの追加データ<br>
Vectorに関数を追加<br>
etc...<br>
> ver 1.3.0<br>
1.2.0βと割と内容は一緒、Playerクラスにspeedを固定させるものを追加<br>
```js
<Player>.speed = 0.3;
```
> Entityクラスを少し整えた、前の構文のまま動かしてたので、Playerクラス準拠にした<br>
本来であればPlayerクラスに継承したかったが、なにせ古いコードなのでやる気力なし(申し訳ない)<br>
いくつか追加修正(結構時間が経ってしまったので、どこを変更したか全く覚えていない。100個以上変更加えたとあったが、commit忘れでのものなので色々追加されているはず)<br>

