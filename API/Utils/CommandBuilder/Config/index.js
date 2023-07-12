const commandPrefix = ".";
export default {
    /**
     * かぶらないようにするためのものです。基本的に変える必要はないです
     */
    firstTag: "AKAPI-CoreCB:",
    /**
     * コマンドの識別子を表します。
     */
    commandPrefix: commandPrefix,
    /**
     * ヘルプのコマンドの表示数を設定します。
     */
    helpShowLimit: 5,
    /**
     * コマンドが見つからない、または権限レベルが足りない際に吐かせるメッセージです。
     */
    invalidMessage: `§c不明なコマンド $1 は存在しない、または実行レベルが足りません。 ${commandPrefix}helpで確認してください。`,
    /**
     * opを識別させるタグです。
     */
    opTag: "op",
    /**
     * メッセージを表示の際に使用する最初のTagです。
     */
    firstTagMsg: "AKAPI-CoreMsg:",
    /**
     * メッセージをシンプルにしたい人向けのタグです。
     */
    noShowPrefix: "noShowPrefix",
    /**
     * メッセージを送信しないようにするためのタグです
     */
    noSend: "noSend"
}