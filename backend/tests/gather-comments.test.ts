import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/passport/strategies/jwt";

describe("모집 글 댓글 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let notAccessToken = "Bearer ";
  let gatherId: string;
  let commentId: string;

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

  it("모임 게시글 생성 테스트", async () => {
    const title = "모집 게시글 타이틀";
    const contents = "모집 게시글 내용";
    const subject = "gathering";
    const category = "study";
    const area = "서울";
    const tags = ["자바스크립트", "타입스크립트", "리액트"];

    const res = await request(server)
      .post("/api/gathers")
      .set("authorization", token)
      .send({
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "gatherId"])
    );

    gatherId = res.body.gatherId;
  });

  it("모집 글 코멘트 생성 테스트", async () => {
    const contents = "comment contents";

    const res = await request(server)
      .post(`/api/gathers/${gatherId}/comments`)
      .set("authorization", token)
      .send({ contents });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "commentId"])
    );

    commentId = res.body.commentId;
  });

  it("모집 글 댓글 갯수 확인", async () => {
    const res = await request(server).get(`/api/gathers/${gatherId}`).send();

    expect(res.body.gather.commentCount).toEqual(1);
  });

  it("Fail 없는 포스트 코멘트 생성 테스트", async () => {
    const contents = "comment contents";

    const res = await request(server)
      .post("/api/gathers/slkdfjlksdj/comments")
      .set("authorization", token)
      .send({ contents });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("모집 글 코멘트 리스트 테스트", async () => {
    const res = await request(server)
      .get(`/api/gathers/${gatherId}/comments`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "comments", "pagination"])
    );
  });

  it("댓글 수정 테스트", async () => {
    const contents = "update comment";

    const res = await request(server)
      .put(`/api/gathers/${gatherId}/comments`)
      .set("authorization", token)
      .send({ contents, commentId });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res1 = await request(server)
      .get(`/api/gathers/${gatherId}/comments`)
      .send();

    expect(res1.body.comments[0].contents).toEqual("update comment");
  });

  it("Fail 댓글 수정 테스트 로그인 안함", async () => {
    const contents = "update comment";

    const res = await request(server)
      .put(`/api/gathers/${gatherId}/comments`)
      .send({ contents, commentId });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("Fail 댓글 수정 테스트 권한 없음", async () => {
    const contents = "update comment";

    const res = await request(server)
      .put(`/api/gathers/${gatherId}/comments`)
      .set("authorization", notAccessToken)
      .send({ contents, commentId });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 모집 글 댓글 삭제 비로그인", async () => {
    const res = await request(server)
      .delete(`/api/gathers/${gatherId}/comments`)
      .send({ commentId });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("Fail 모집 글 댓글 삭제 권한 문제", async () => {
    const res = await request(server)
      .delete(`/api/gathers/${gatherId}/comments`)
      .set("authorization", notAccessToken)
      .send({ commentId });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 모집 글 댓글 삭제 없는 댓글", async () => {
    const res = await request(server)
      .delete(`/api/gathers/${gatherId}/comments`)
      .set("authorization", token)
      .send({ commentId: "alskdjfklsjd" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 댓글입니다.");
  });

  it("모집 글 댓글 삭제", async () => {
    const res = await request(server)
      .delete(`/api/gathers/${gatherId}/comments`)
      .set("authorization", token)
      .send({ commentId });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "commentId"])
    );
  });

  it("모집 글 댓글 갯수 확인", async () => {
    const res = await request(server).get(`/api/gathers/${gatherId}`).send();

    expect(res.body.gather.commentCount).toEqual(0);
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("gathers").deleteMany({});
    await connection.collection("comments").deleteMany({});
    await db.disconnect();
  });
});
