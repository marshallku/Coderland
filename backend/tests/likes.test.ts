import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import server from "../src/app";
import { IUserDocument } from "../src/types/user";
import configs from "../src/config";
import { createToken } from "../src/utils/jwt";

describe("좋아요 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let postId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "1230707070702022",
      nickname: "testuser2",
      name: "family given2",
      profile: "profile photo url2",
      grade: 0,
    });

    const user = <IUserDocument>await connection.collection("users").findOne({
      googleId: "1230707070702022",
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

  it("좋아요 클릭", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/like`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();
    expect(res1.body.post.likes).toEqual(1);
    expect(res1.body.post.isLiked).toEqual(true);
  });

  it("Fail 로그인 없이 좋아요 클릭", async () => {
    const res = await request(server).post(`/api/posts/${postId}/like`).send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("좋아요 취소 클릭", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/like`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();
    expect(res1.body.post.likes).toEqual(0);
    expect(res1.body.post.isLiked).toEqual(false);
  });

  afterAll(async () => {
    connection.collection("users").deleteMany({});
    connection.collection("posts").deleteMany({});
  });
});
