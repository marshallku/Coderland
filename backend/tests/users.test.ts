import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import jwt, { SignOptions, decode } from "jsonwebtoken";
import server from "../src/app";
import configs from "../src/config";

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
  let expiredToken = "Bearer ";
  let refreshToken = "";
  let expiredRefreshToken = "";

  beforeAll(async () => {
    const payload = { googleId: "1230419308012123" };
    refreshToken += jwt.sign({}, configs.jwtSecret, { expiresIn: "14d" });

    await connection.collection("users").insertOne({
      googleId: "1230419308012123",
      nickname: "testuser",
      name: "family given",
      profile: "profile photo url",
      grade: 0,
      refreshToken,
    });

    const signOpts: SignOptions = {
      expiresIn: "1h",
    };
    token += jwt.sign(payload, configs.jwtSecret, signOpts);
    expiredToken += jwt.sign(payload, configs.jwtSecret, { expiresIn: 0 });

    expiredRefreshToken = jwt.sign({}, configs.jwtSecret, {
      expiresIn: 0,
    });
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

  it("토큰 리프레시", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", expiredToken)
      .set("refreshToken", refreshToken)
      .send();

    expect(
      Object(decode(res.header["set-cookie"][0].split(";")[0].split("=")[1]))
        .exp
    ).toBeGreaterThan(Object(decode(expiredToken.split(" ")[1])).exp);
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
  });

  it("토큰 리프레시도 만료", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", expiredToken)
      .set("refreshToken", expiredRefreshToken)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
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
