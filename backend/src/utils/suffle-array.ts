function copyArray(source: string[], length: number) {
  let index = -1;

  const array = new Array(length);
  while (index < length) {
    index += 1;
    array[index] = source[index];
  }
  return array;
}

export default function suffleNickname(array: string[]) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = copyArray(array, length);
  while (index < length) {
    index += 1;
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
}
