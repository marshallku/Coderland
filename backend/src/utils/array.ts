export function pick<T>(
  array: Array<T>,
  length: number,
  random = false
): Array<T> {
  return array
    .map((x, i) => ({ x, sort: random ? Math.random() : i }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ x }) => x)
    .filter((_, i) => i < length);
}

export function pickRandom<T>(array: Array<T>): T {
  // eslint-disable-next-line no-bitwise
  return array[~~(Math.random() * array.length)];
}
