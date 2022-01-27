import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/passport/strategies/jwt";

jest.setTimeout(10000);

describe("일반 포스트 기능 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let notOwnerToken = "Bearer ";
  let postId: string;
  let anonymousPostId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "1230707070702022",
      nickname: "testuser2",
      name: "family given2",
      profile: "profile photo url2",
      grade: 0,
    });

    await connection.collection("users").insertOne({
      googleId: "1230809419304811",
      nickname: "testuser233",
      name: "family given2",
      profile: "profile photo url2",
      grade: 0,
    });

    const user = <IUserDocument>await connection.collection("users").findOne({
      googleId: "1230707070702022",
    });

    const notOwnerUser = <IUserDocument>(
      await connection.collection("users").findOne({
        googleId: "1230809419304811",
      })
    );

    token += createToken(user);
    notOwnerToken += createToken(notOwnerUser);
  });

  it("일반 포스트 생성 테스트", async () => {
    // given
    const title = "new title";
    const contents = "new contents";
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

  it("일반 포스트 조회 테스트", async () => {
    // when
    const res = await request(server).get(`/api/posts/${postId}`).send();

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.post.title).toEqual("new title");
    expect(res.body.post.author).toEqual("testuser2");
    expect(res.body.post.anonymous).toEqual(false);
  });

  it("일반 포스트 리스트 조회 테스트", async () => {
    // when
    const res = await request(server)
      .get("/api/posts")
      .query({ subject: "article" })
      .send();

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.posts[0].author).toEqual("testuser2");
    expect(res.body.posts[0].anonymous).toEqual(false);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts", "pagination"])
    );
  });

  it("Fail 익명 포스트 생성 테스트 로그인 없이", async () => {
    // given
    const title = "new title2222";
    const contents = "new contents2222";
    const subject = "chat";
    const category = "none";

    // when
    const res = await request(server)
      .post("/api/posts")
      .send({ title, contents, subject, category });

    // then
    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("일반 포스트에서 익명 포스트로 수정 로직", async () => {
    // given
    const title = "update title";
    const contents = "update contents";
    const subject = "chat";

    // when
    const res = await request(server)
      .put(`/api/posts/${postId}`)
      .set("authorization", token)
      .send({
        title,
        contents,
        subject,
      });

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res2 = await request(server)
      .get(`/api/posts/${res.body.postId}`)
      .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.isOk).toEqual(true);
    expect(res2.body.post.title).toEqual("update title");
    expect(res2.body.post.author).not.toEqual("testuser2");
    expect(res2.body.post.anonymous).toEqual(true);
  });

  it("Fail 포스트 수정 로직 권한 없음", async () => {
    // given
    const title = "update title";
    const contents = "update contents";

    // when
    const res = await request(server)
      .put(`/api/posts/${postId}`)
      .set("authorization", notOwnerToken)
      .send({
        title,
        contents,
      });

    // then
    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 포스트 삭제 로직 권한 없음", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}`)
      .set("authorization", notOwnerToken)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("포스트 삭제 로직", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
  });

  it("포스트 삭제 확인 로직", async () => {
    const res = await request(server).get(`/api/posts/${postId}`).send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("익명 포스트 생성 테스트", async () => {
    // given
    const title = "anonymous";
    const contents = "new contents";
    const subject = "review";
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

    anonymousPostId = res.body.postId;
  });

  it("익명 포스트 조회 테스트", async () => {
    // when
    const res = await request(server)
      .get(`/api/posts/${anonymousPostId}`)
      .send();

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.post.title).toEqual("anonymous");
    expect(res.body.post.author).not.toEqual("testuser2");
    expect(res.body.post.anonymous).toEqual(true);
  });

  it("익명 포스트 리스트 조회 테스트", async () => {
    // when
    const res = await request(server)
      .get("/api/posts")
      .query({ subject: "review" })
      .send();

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.posts[0].author).not.toEqual("testuser2");
    expect(res.body.posts[0].anonymous).toEqual(true);
    expect(typeof res.body.posts[0].commentCount).toEqual("number");
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts", "pagination"])
    );
  });

  it("익명 포스트에서 일반 포스트로 수정 로직 테스트", async () => {
    const title = "update anony";
    const contents = "contentntntntnt";
    const subject = "recruit";

    const res = await request(server)
      .put(`/api/posts/${anonymousPostId}`)
      .set("authorization", token)
      .send({
        title,
        contents,
        subject,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res2 = await request(server)
      .get(`/api/posts/${anonymousPostId}`)
      .send();

    expect(res2.body.post.title).toEqual("update anony");
    expect(res2.body.post.author).toEqual("testuser2");
    expect(res2.body.post.anonymous).toEqual(false);
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230707070702022" });
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230809419304811" });

    await connection.collection("posts").deleteMany({});
    await db.disconnect();
  });
});
