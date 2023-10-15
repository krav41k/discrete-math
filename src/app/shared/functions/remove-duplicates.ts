export const removeDuplicates = (str: string) => {
  str.toLowerCase();
  let charMap: { [k: string]: boolean } = {};
  let result = '';

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!charMap[char]) {
      charMap[char] = true;
      result += char;
    }
  }

  return result;
}
