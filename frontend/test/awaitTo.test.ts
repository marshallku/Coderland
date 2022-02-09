import to from "../src/utils/awaitTo";

function dummyPromise(success: boolean) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (success) {
        res("hi");
      }

      rej(new Error("bye"));
    }, 10);
  });
}

describe("await to 작동 검사", () => {
  test("성공하는 await", async () => {
    const [err, data] = await to(dummyPromise(true));

    expect(data).toBe("hi");
  });

  test("실패하는 await", async () => {
    const [err, data] = await to(dummyPromise(false));

    expect(err).toEqual({
      message: "bye",
    });
  });
});
