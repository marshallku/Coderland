export function getRandomInt(min: number, max: number) {
  // eslint-disable-next-line no-bitwise
  return ~~(Math.random() * (max - min)) + min;
}

export function getInclusiveRandomInt(min: number, max: number) {
  // eslint-disable-next-line no-bitwise
  return ~~(Math.random() * (max - min + 1)) + min;
}
