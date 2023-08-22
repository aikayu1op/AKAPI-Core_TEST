class BlockIterator {
  
    /**
     * @returns {IterableIterator<import("../Block").Block>}
     */
    [Symbol.iterator]() {

        return {
            /**
             * @returns {IteratorResult<import("../Block").Block>}
             */
            next(){},
            /**
             * @returns {import("../Block").Block}
             */
            value(){},
            /**
             * @returns {boolean}
             */
            done(){}
        }
    }
    constructor(){}
}