import { parseQuery, composeQuery } from "../src/utils/url";

describe("URL 관련 유틸 작동 검사", () => {
  test("쿼리 파싱", () => {
    const query = "?foo=test&foo%3D=foo&foo%20bar=foo%20bar";
    const parsed = parseQuery(query);

    expect(parsed).toEqual({
      foo: "test",
      "foo=": "foo",
      "foo bar": "foo bar",
    });
  });

  test("쿼리 직렬화", () => {
    const query = {
      a: "apple",
      b: "",
      c: 1 > 2 && "falsy",
      d: 1 < 2 && "truthy",
      e: undefined,
    };
    const composed = composeQuery(query);

    expect(composed).toBe("?a=apple&d=truthy");
  });
});
