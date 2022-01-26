import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import server from "../src/app";
import { createToken } from "../src/passport/strategies/jwt";
import configs from "../src/config/configs";
import { User } from "../src/models/User";

describe("구글 기능 테스트", () => {
  it("구글 로그인 페이지 리다이렉트 테스트", async () => {
    const res = await request(server).get("/api/auth/google").send();

    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toContain(
      "accounts.google.com/o/oauth2/v2/auth"
    );
  });
});

describe("유저 기능 테스트", () => {
  let token = "Bearer ";
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "1230419308012123",
      nickname: "testuser",
      name: "family given",
      profile: "profile photo url",
      grade: 0,
    });

    const user = await User.findOrCreate({ googleId: "1230419308012123" });
    token += createToken(user);
  });

  it("유저 정보 가져오기", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.user.nickname).toEqual("testuser");
  });

  it("로그인 없이 유저 정보 가져오기 접근", async () => {
    const res = await request(server).get("/api/users").send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("존재하지 않는 회원 정보로 다가가기", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", "notexiststokenfaketoken")
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230419308012123" });
    await db.disconnect();
  });
});
