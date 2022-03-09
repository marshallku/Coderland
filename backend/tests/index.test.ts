import request from "supertest";
import server from "../src/app";
import "regenerator-runtime";

describe("express 실행 테스트", () => {
  it("express 404 Not Found", async () => {
    const res = await request(server).get("/notfound").send();

    expect(res.statusCode).toEqual(404);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("페이지를 찾을 수 없습니다.");
  });
});
