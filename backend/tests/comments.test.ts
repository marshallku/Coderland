import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/passport/strategies/jwt";

describe("댓글 통합 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let postId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "01010203040404",
      nickname: "testuser2",
      name: "family given2",
      profile: "profile photo url2",
      grade: 0,
    });

    const user = <IUserDocument>await connection.collection("users").findOne({
      googleId: "01010203040404",
    });

    token += createToken(user);
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

  it("일반 포스트 코멘트 생성 테스트", async () => {
    const contents = "comment contents";

    const res = await request(server)
      .post(`/api/posts/${postId}/comments`)
      .set("authorization", token)
      .send({ contents });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "commentId"])
    );
  });

  it("일반 포스트 코멘트 리스트 테스트", async () => {
    const res = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "comments", "pagination"])
    );
  });

  let anonymousPostId: string;
  it("익명 포스트 생성", async () => {
    // given
    const title = "to test comment";
    const contents = "new contents";
    const subject = "chat";
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

  it("익명 포스트 댓글 추가", async () => {
    const contents = "anony comment";

    const res = await request(server)
      .post(`/api/posts/${anonymousPostId}/comments`)
      .set("authorization", token)
      .send({ contents });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
  });

  it("익명 포스트 댓글 리스트 조회", async () => {
    const res = await request(server)
      .get(`/api/posts/${anonymousPostId}/comments`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.comments[0].anonymous).toEqual(true);
    expect(res.body.comments[0].author).not.toEqual("testuser2");
    expect(res.body.comments[0].author).toEqual("anonymity");
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "01010203040404" });
    await connection.collection("posts").deleteMany({});
    await connection.collection("comments").deleteMany({});
    await db.disconnect();
  });
});
