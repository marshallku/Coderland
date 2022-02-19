import request from "supertest";
import server from "../src/app";
import "regenerator-runtime";

describe("express 실행 테스트", () => {
  it("express 실행 접속 테스트", async () => {
    const res = await request(server).get("/").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
  });

  it("express 404 Not Found", async () => {
    const res = await request(server).get("/notfound").send();

    expect(res.statusCode).toEqual(404);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("뭔가 잘못된 것 같아요...");
  });

  it("express 403 Forbbiden test", async () => {
    const res = await request(server).get("/error").send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("에러가 발생했어요...");
  });
});
