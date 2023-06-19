const SectionColorCode = /**@type {const} */({
    black:        "0",
    darkBlue:     "1",
    darkGreen:    "2",
    darkAqua:     "3",
    darkRed:      "4",
    darkPurple:   "5",
    gold:         "6",
    gray:         "7",
    darkGrey:     "8",
    blue:         "9",
    green:        "a",
    aqua:         "b",
    red:          "c",
    purple:       "d",
    yellow:       "e",
    white:        "f",
    minecoinGold: "g",
    obfuscated:   "k",
    bold:         "l",
    italic:       "o",
    reset:        "r"
})
export const SectionColor = /**@type {const} */({
    black:        "black",
    darkBlue:     "darkBlue",
    darkGreen:    "darkGreen",
    darkAqua:     "darkAqua",
    darkRed:      "darkRed",
    darkPurple:   "darkPurple",
    gold:         "gold",
    gray:         "gray",
    darkGrey:     "darkGrey",
    blue:         "blue",
    green:        "green",
    aqua:         "aqua",
    red:          "red",
    purple:       "purple",
    yellow:       "yellow",
    white:        "white",
    minecoinGold: "minecoinGold",
    obfuscated:   "obfuscated",
    bold:         "bold",
    italic:       "italic",
    reset:        "reset"
})

/**@typedef {SectionColor[keyof SectionColor]} colorCode */

/**
 * 文字列に使用可能なカラーコードを返します。 
 * @param {colorCode | colorCode[]} code 
 * @returns 
 */
export function getColorCode(code){
    if(code instanceof Array) return code.map(x => x = `§${x}`).join("");
    return `§${SectionColorCode[code] ?? "f"}`;
}