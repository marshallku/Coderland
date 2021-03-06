import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import server from "../src/app";
import configs from "../src/config";
import { createToken } from "../src/utils/jwt";

describe("좋아요 테스트", () => {
  const connection = db.createConnection(
    `mongodb://${configs.mongoHost}:${configs.mongoPort}/coderland`
  );
  let token = "Bearer ";
  let postId: string;
  let commentId: string;

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

  it("Fail 없는 글 좋아요 클릭", async () => {
    const res = await request(server)
      .post("/api/posts/notexistslksdjflk/like")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("Fail 로그인 없이 좋아요 클릭", async () => {
    const res = await request(server).post(`/api/posts/${postId}/like`).send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("좋아요 취소 클릭", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/like`)
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

  it("댓글 생성", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/comments`)
      .set("authorization", token)
      .send({ contents: "contents" });

    expect(res.statusCode).toEqual(201);

    commentId = res.body.commentId;
  });

  it("댓글 좋아요", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/comments/like`)
      .set("authorization", token)
      .send({ commentId });

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.comments[0].likes).toEqual(1);
    expect(res1.body.comments[0].isLiked).toEqual(false);

    const res2 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .set("authorization", token)
      .send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.comments[0].likes).toEqual(1);
    expect(res2.body.comments[0].isLiked).toEqual(true);
  });

  it("댓글 좋아요 취소", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/comments/like`)
      .set("authorization", token)
      .send({ commentId });

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.comments[0].likes).toEqual(0);
    expect(res1.body.comments[0].isLiked).toEqual(false);

    const res2 = await request(server)
      .get(`/api/posts/${postId}/comments`)
      .set("authorization", token)
      .send();

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.comments[0].likes).toEqual(0);
    expect(res2.body.comments[0].isLiked).toEqual(false);
  });

  afterAll(async () => {
    connection.collection("users").deleteMany({});
    connection.collection("posts").deleteMany({});
    connection.collection("comments").deleteMany({});
  });
});
