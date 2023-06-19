export class IRawMessage{
    /**
     * @type {RawMessage[]}
     */
    rawtext;
}
class RawMessage{
    /**
     * @type {string}
     */
    text;
    /**
     * @type {selector[keyof selector]}
     */
    selector;
    /**
     * @type {RawMessageScore}
     */
    scores;
    /**
     * @type {string}
     */
    translate;
    /**
     * @type {string[] | this}
     */
    with;
}
class RawMessageScore{
    /**
     * @type {string}
     */
    name;
    /**
     * @type {string}
     */
    objectives;
}
const selector = /**@type {const} */({
    player:    "@p",
    entity:    "@e[]",
    random:    "@r[]",
    initiator: "@s"
})