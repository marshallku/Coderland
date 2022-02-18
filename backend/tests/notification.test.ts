import request from "supertest";
import db from "mongoose";
import { sign } from "cookie-signature";
import "regenerator-runtime";
import server from "../src/app";
import config from "../src/config";
import { createToken } from "../src/utils/jwt";

describe("댓글 알림 서비스 기능 테스트", () => {
  const connection = db.createConnection(
    `mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDBName}`
  );

  let userToken = "";
  let subUserToken = "";

  let postId: string;
  let commentId: string;

  beforeAll(async () => {
    // 유저 생성
    await connection.collection("users").insertOne({
      googleId: "1230707070702022",
      nickname: "testuser2",
      grade: 1,
      hasNewNotification: false,
    });
    userToken += createToken({ googleId: "1230707070702022" });

    // 다른 유저 생성
    await connection.collection("users").insertOne({
      googleId: "1230707070123123",
      nickname: "testuser3",
      grade: 1,
      hasNewNotification: false,
    });
    subUserToken += createToken({ googleId: "1230707070123123" });

    userToken = `s:${sign(userToken, config.COOKIE_SECRET)}`;
    subUserToken = `s:${sign(subUserToken, config.COOKIE_SECRET)}`;
  });

  // 테스트 포스트 생성
  it("테스트 포스트 생성", async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("Cookie", [`access-token=${userToken}`])
      .send({
        title: "title",
        contents: "contents",
        subject: "article",
      });
    postId = res.body.postId;
  });

  it("다른 유저가 댓글 생성 시 유저 필드에 표시", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/comments`)
      .set("Cookie", [`access-token=${subUserToken}`])
      .send({ contents: "contents" });

    commentId = res.body.commentId;

    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230707070702022" });

    expect(user.hasNewNotification).toEqual(true);
  });

  it("알림 있는 포스트 조회 시 알림 여부 확인", async () => {
    const res = await request(server)
      .get(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${userToken}`])
      .send();
    expect(res.body.hasNewNotification).toEqual(true);
  });

  it("알림 없는 포스트 조회 시 알림 여부 확인", async () => {
    const res = await request(server)
      .get(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${subUserToken}`])
      .send();
    expect(res.body.hasNewNotification).toEqual(false);
  });

  it("로그인 없이 포스트 조회 시 알림 여부 확인", async () => {
    const res = await request(server).get(`/api/posts/${postId}`).send();
    expect(res.body.hasNewNotification).toEqual(false);
  });

  it("유저 알림 확인", async () => {
    const res = await request(server)
      .get("/api/users/notification")
      .set("Cookie", [`access-token=${userToken}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.notification.length).toEqual(1);
    expect(Object.keys(res.body.notification[0])).toEqual(
      expect.arrayContaining(["title", "to", "isNewNotification"])
    );
    expect(res.body.notification[0].flag).toEqual("comment");
  });

  it("알림 확인 후 유저 필드 수정", async () => {
    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230707070702022" });

    expect(user.hasNewNotification).toEqual(false);
  });

  // 답글 알림 테스트
  it("답글 생성 후 댓글 작성자 알림 확인", async () => {
    // 답글 생성
    await request(server)
      .post(`/api/posts/${postId}/replies`)
      .set("Cookie", [`access-token=${userToken}`])
      .send({ commentId, contents: "connnntents" });

    // 댓글 유저
    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230707070123123" });

    expect(user.hasNewNotification).toEqual(true);
  });

  it("답글에 대한 알림 리스트 확인", async () => {
    const res = await request(server)
      .get("/api/users/notification")
      .set("Cookie", [`access-token=${subUserToken}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.notification.length).toEqual(1);
    expect(Object.keys(res.body.notification[0])).toEqual(
      expect.arrayContaining(["title", "to", "isNewNotification"])
    );
    expect(res.body.notification[0].flag).toEqual("reply");
  });

  it("답글 알림 확인 후 유저 필드 수정", async () => {
    const user = await connection
      .collection("users")
      .findOne({ googleId: "1230707070123123" });

    expect(user.hasNewNotification).toEqual(false);
  });

  afterAll(async () => {
    await connection.collection("posts").deleteMany({});
    await connection.collection("users").deleteMany({});
  });
});
