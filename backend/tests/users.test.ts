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
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let expiredToken = "Bearer ";
  let refreshToken = "";
  let expiredRefreshToken = "";

  beforeAll(async () => {
    const payload = { googleId: "1230419308012123" };
    refreshToken += jwt.sign({}, configs.jwtSecret, { expiresIn: "14d" });

    await connection.collection("users").insertOne({
      googleId: "1230419308012123",
      nickname: "testuser",
      profile: "profile photo url",
      grade: 1,
      refreshToken,
      github: "githuburl",
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
      .set("refresh-token", refreshToken)
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
      .set("refresh-token", expiredRefreshToken)
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

  it("유저 정보 수정하기", async () => {
    const res = await request(server)
      .patch("/api/users")
      .set("authorization", token)
      .send({ nickname: "update nickname" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res1 = await request(server)
      .get("/api/users")
      .set("authorization", token)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.user.nickname).toEqual("update nickname");
  });

  it("Fail 없는 유저 정보 수정하기", async () => {
    const res = await request(server)
      .patch("/api/users")
      .set("authorization", "lksjdfkljsdlfksldkfj")
      .send({ nickname: "update nickname" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230419308012123" });
  });
});

describe("유저 레이서 인증 서비스", () => {
  let token = "Bearer ";
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let refreshToken = "";
  let authKey: string;

  beforeAll(async () => {
    const payload = { googleId: "1230419308012123" };
    refreshToken += jwt.sign({}, configs.jwtSecret, { expiresIn: "14d" });
    const authKey = "e94275d5-0871-4e70-aab8-305eb80f313d";
    await connection.collection("users").insertOne({
      googleId: "1230419308012123",
      nickname: "testuser",
      profile: "profile photo url",
      grade: 0,
      authKey,
      refreshToken,
    });

    const signOpts: SignOptions = {
      expiresIn: "1h",
    };
    token += jwt.sign(payload, configs.jwtSecret, signOpts);
  });

  it("유저 인증 페이지 접근, 인증키 발급", async () => {
    const res = await request(server)
      .get("/api/users/auth")
      .set("authorization", token)
      .send({ authKey });

    expect(res.statusCode).toEqual(200);

    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230419308012123" });

    expect(user.grade).toEqual(0);
    expect(res.body.authKey).toEqual(user.authKey);
  });

  it("Fail 이상한 유저 ID 유저 인증 페이지 포스팅", async () => {
    const username = "atatsdfkdkd";
    const res = await request(server)
      .post("/api/users/auth")
      .set("authorization", token)
      .send({ username });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("유저 ID를 확인해주세요!");

    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230419308012123" });
    expect(user.grade).toEqual(0);
  });

  it("Fail 인증키 다른거 유저 인증 페이지 포스팅", async () => {
    const username = "marshallku";
    const res = await request(server)
      .post("/api/users/auth")
      .set("authorization", token)
      .send({ username });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("인증키를 확인해주세요!");

    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230419308012123" });
    expect(user.grade).toEqual(0);
  });

  it("유저 인증 페이지 포스팅", async () => {
    const username = "wjdtp93";
    const res = await request(server)
      .post("/api/users/auth")
      .set("authorization", token)
      .send({ username });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230419308012123" });
    expect(user.grade).toEqual(1);
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230419308012123" });
  });
});

describe("회원 탈퇴 기능", () => {
  let token = "Bearer ";
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let refreshToken = "";
  let postId: string;

  beforeAll(async () => {
    const payload = { googleId: "1230419308012123" };
    refreshToken += jwt.sign({}, configs.jwtSecret, { expiresIn: "14d" });
    const authKey = "uniquekeyisgeneratedbyuuid";
    await connection.collection("users").insertOne({
      googleId: "1230419308012123",
      nickname: "testuser",
      profile: "profile photo url",
      grade: 1,
      authKey,
      refreshToken,
    });

    const signOpts: SignOptions = {
      expiresIn: "1h",
    };
    token += jwt.sign(payload, configs.jwtSecret, signOpts);
  });

  it("포스트 생성", async () => {
    // given
    const title = "new title";
    const contents = "contents";
    const subject = "article";
    const category = "none";

    // when
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", token)
      .send({ title, contents, subject, category });

    // then
    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "postId"])
    );

    postId = res.body.postId;
  });

  it("회원 탈퇴", async () => {
    const res = await request(server)
      .delete("/api/users")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const user = await connection
      .collection("users")
      .findOne({ googleId: "withdrawal" });

    expect(user.nickname).toEqual("사라진 체셔 고양이");
    expect(user.grade).toEqual(-1);
    expect(user.profile).toEqual("Not access");
    expect(user.track).toEqual("Not access");
    expect(user.github).toEqual("Not access");
    expect(user.refreshToken).toEqual("Not access");
  });

  it("탈퇴한 회원이 생성한 포스트 저자 확인", async () => {
    const res = await request(server).get(`/api/posts/${postId}`).send();

    expect(res.body.post.author.nickname).toEqual("사라진 체셔 고양이");
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
  });
});
