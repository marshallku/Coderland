import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/passport/strategies/jwt";

describe("답글 통합 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let postId: string;
  let commentId: string;
  let replyId: string;
  let notAccessToken = "Bearer ";

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

    await connection.collection("users").insertOne({
      googleId: "1734981374981123",
      nickname: "testuser2",
      name: "family given2",
      profile: "profile photo url2",
      grade: 0,
    });

    const notOwner = <IUserDocument>(
      await connection.collection("users").findOne({
        googleId: "1734981374981123",
      })
    );

    notAccessToken += createToken(notOwner);
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

  it("코멘트 생성 테스트", async () => {
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

    commentId = res.body.commentId;
  });

  it("답글 생성 테스트", async () => {
    const contents = "reply contents";

    const res = await request(server)
      .post(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, contents });

    expect(res.statusCode).toEqual(201);

    const res1 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(Object.keys(res1.body.comments[0].replies[0])).toEqual(
      expect.arrayContaining([
        "_id",
        "author",
        "contents",
        "createdAt",
        "updatedAt",
      ])
    );
    expect(res1.body.comments[0].replies[0].isPostAuthor).toEqual(true);

    replyId = res1.body.comments[0].replies[0]._id;
  });

  it("답글 수정 테스트", async () => {
    const contents = "update reply contents";

    const res = await request(server)
      .put(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, replyId, contents });

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(Object.keys(res1.body.comments[0].replies[0])).toEqual(
      expect.arrayContaining([
        "_id",
        "author",
        "contents",
        "createdAt",
        "updatedAt",
      ])
    );
    expect(res1.body.comments[0].replies[0].contents).toEqual(
      "update reply contents"
    );
  });

  it("Fail 없는 답글 수정 테스트", async () => {
    const contents = "update reply contents";

    const res = await request(server)
      .put(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, replyId: "sldkfjlkaaldkj", contents });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("Fail 권한 없이 답글 수정 테스트", async () => {
    const contents = "update reply contents";

    const res = await request(server)
      .put(`/api/posts/${postId}/replies`)
      .set("authorization", notAccessToken)
      .send({ commentId, replyId, contents });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없습니다.");
  });

  it("Fail 권한 없이 답글 삭제 테스트", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/replies`)
      .set("authorization", notAccessToken)
      .send({ commentId, replyId });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없습니다.");
  });

  it("Fail 없는 답글 삭제 테스트", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, replyId: "asdlfkjkl" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("답글 삭제 테스트", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, replyId });

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.comments[0].replies.length).toEqual(0);
  });

  // ======================익 명 테 스 트=========================

  it("익명 포스트 생성", async () => {
    // given
    const title = "to test comment title";
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

    postId = res.body.postId;
  });

  it("코멘트 생성 테스트", async () => {
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

    commentId = res.body.commentId;
  });

  it("답글 생성 테스트", async () => {
    const contents = "reply contents";

    const res = await request(server)
      .post(`/api/posts/${postId}/replies`)
      .set("authorization", token)
      .send({ commentId, contents });

    expect(res.statusCode).toEqual(201);
  });

  it("다른 사람 글 답글 생성 테스트", async () => {
    const contents = "reply contents";

    const res = await request(server)
      .post(`/api/posts/${postId}/replies`)
      .set("authorization", notAccessToken)
      .send({ commentId, contents });

    expect(res.statusCode).toEqual(201);
  });

  it("익명 포스트 조회 테스트", async () => {
    // when
    const res = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body.comments[0].replies[0])).toEqual(
      expect.arrayContaining([
        "_id",
        "author",
        "contents",
        "createdAt",
        "updatedAt",
      ])
    );
    expect(res.body.comments[0].replies[0].isPostAuthor).toEqual(true); // 내 글 임
    expect(res.body.comments[0].replies[1].isPostAuthor).toEqual(false); // 내 글 아님

    expect(res.body.comments[0].replies[0].author).not.toEqual("testuser2");
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("posts").deleteMany({});
    await connection.collection("comments").deleteMany({});
    await db.disconnect();
  });
});
