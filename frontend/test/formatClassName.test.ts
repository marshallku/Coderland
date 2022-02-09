import formatClassName from "../src/utils/formatClassName";

describe("Class Name 포매터 작동 검사", () => {
  test("포매팅", () => {
    const formatted = formatClassName(
      "a",
      true && "b",
      false && "c",
      0 && "d",
      1 && "e",
      [] && "f",
      {} && "g",
      new Date("NaN").getDate() && "h"
    );

    expect(formatted).toBe("a b e f g");
  });
});
