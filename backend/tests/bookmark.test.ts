import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/utils/jwt";

describe("북마크 테스트", () => {
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let token = "Bearer ";
  let postId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "1230707070702022",
      nickname: "testuser2",
      grade: 1,
    });
    token += createToken({ googleId: "1230707070702022" });
  });

  it("일반 포스트 생성", async () => {
    // given
    const title = "to test comment title";
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

  it("북마크 등록", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/bookmark`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.post.bookmarks).toEqual(1);
    expect(res1.body.post.isBookmarked).toEqual(true);

    const res2 = await request(server)
      .get("/api/users/bookmark")
      .set("authorization", token)
      .send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.bookmarks.length).toEqual(1);
  });

  it("북마크 취소", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/bookmark`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server).get(`/api/posts/${postId}`).send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.post.bookmarks).toEqual(0);
    expect(res1.body.post.isBookmarked).toEqual(false);

    const res2 = await request(server)
      .get("/api/users/bookmark")
      .set("authorization", token)
      .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.bookmarks.length).toEqual(0);
  });

  afterAll(async () => {
    connection.collection("users").deleteMany({});
    connection.collection("posts").deleteMany({});
  });
});

describe("북마크 테스트 포스트 먼저 삭제", () => {
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let token = "Bearer ";
  let postId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "1230707070702022",
      nickname: "testuser2",
      grade: 1,
    });

    token += createToken({ googleId: "1230707070702022" });
  });

  it("일반 포스트 생성", async () => {
    // given
    const title = "to test comment title";
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

  it("북마크 등록", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/bookmark`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.post.bookmarks).toEqual(1);
    expect(res1.body.post.isBookmarked).toEqual(true);

    const res2 = await request(server)
      .get("/api/users/bookmark")
      .set("authorization", token)
      .send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.bookmarks.length).toEqual(1);
  });

  it("Fail 없는 글 북마크 등록", async () => {
    const res = await request(server)
      .post("/api/posts/notexitssdlfkjaslkd/bookmark")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("포스트 삭제 후 북마크 확인", async () => {
    await request(server)
      .delete(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();

    const res = await request(server)
      .get("/api/users/bookmark")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.bookmarks.length).toEqual(0);
  });

  afterAll(async () => {
    connection.collection("users").deleteMany({});
    connection.collection("posts").deleteMany({});
  });
});
