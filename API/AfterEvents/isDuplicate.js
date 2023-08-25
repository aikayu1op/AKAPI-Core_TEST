/**
 * 指定されたFunctionの配列は既に存在していないかを取得します。
 * 
 * -1が返る場合は存在していないです。
 * 
 * -1以外が返ってくる場合は存在しています。
 * 
 * @param {Function[]} fList 
 * @param {Function} f2 
 * @returns 
 */
export function isDuplicate(fList, f2){
    return fList.findIndex(existingFunc => existingFunc.toString() === f2.toString());
}