function copyArray<T>(source: T[]): T[] {
  const { length } = source;
  const array: T[] = new Array(length);
  for (let index = 0; index < length; index += 1) {
    array[index] = source[index];
  }
  return array;
}

export default function shuffleArray<T>(array: T[]): T[] {
  const { length } = array;
  if (length <= 1) {
    return array;
  }
  const lastIndex = length - 1;
  const result = copyArray(array);
  for (let index = 0; index < length; index += 1) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
}
