import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { sign } from "cookie-signature";
import server from "../src/app";
import { createToken } from "../src/utils/jwt";
import config from "../src/config";

describe("모임 게시글 기능 테스트", () => {
  const connection = db.createConnection(
    `mongodb://${config.mongoHost}:${config.mongoPort}/coderland`
  );
  let token = "";
  let postId: string;
  let notAccessToken = "";
  let applyUserId: string;

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "130471033098230",
      nickname: "testuuu",
      grade: 1,
    });

    token += createToken({ googleId: "130471033098230" });

    await connection.collection("users").insertOne({
      googleId: "10374183748917238",
      nickname: "te2434stuuu",
      grade: 1,
    });

    notAccessToken += createToken({ googleId: "10374183748917238" });
    const notAccessUser = await connection
      .collection("users")
      .findOne({ googleId: "10374183748917238" });
    applyUserId = notAccessUser._id.toString();

    token = `s:${sign(token, config.COOKIE_SECRET)}`;
    notAccessToken = `s:${sign(notAccessToken, config.COOKIE_SECRET)}`;
  });

  it("모임 게시글 생성 테스트", async () => {
    const title = "모집 게시글 타이틀";
    const contents = "모집 게시글 내용";
    const subject = "gather";
    const category = "study";
    const area = "서울";
    const tags = ["자바스크립트", "타입스크립트", "리액트"];
    const icon = "icon-javascript";

    const res = await request(server)
      .post("/api/posts")
      .set("Cookie", [`access-token=${token}`])
      .send({
        title,
        contents,
        subject,
        category,
        area,
        tags,
        icon,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "postId"])
    );

    postId = res.body.postId;
  });

  it("모임 게시글 리스트 조회 테스트", async () => {
    const res = await request(server)
      .get("/api/posts")
      .query({ subject: "gather", category: "study" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts", "pagination"])
    );
    expect(res.body.posts.length).toEqual(1);
    expect(res.body.posts[0].author.nickname).toEqual("testuuu");
  });

  it("비어있는 리스트 모임 게시글 리스트 조회 테스트", async () => {
    const res = await request(server)
      .get("/api/posts")
      .query({ category: "code" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts", "pagination"])
    );
    expect(res.body.posts.length).toEqual(0);
  });

  it("모임 게시글 조회 테스트", async () => {
    const res = await request(server).get(`/api/posts/${postId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "post"])
    );
    expect(res.body.post.title).toEqual("모집 게시글 타이틀");
    expect(res.body.post.author.nickname).toEqual("testuuu");
    expect(Object.keys(res.body.post)).toEqual(
      expect.arrayContaining([
        "_id",
        "title",
        "contents",
        "author",
        "likes",
        "views",
        "createdAt",
        "updatedAt",
        "isCompleted",
        "area",
        "tags",
        "icon",
        "memberCount",
        "members",
      ])
    );
  });

  it("Fail 없는 모임 게시글 조회 테스트", async () => {
    const res = await request(server).get("/api/posts/salkjdfksdjflk").send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gather";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res1 = await request(server).get(`/api/posts/${postId}`).send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.isOk).toEqual(true);
    expect(res1.body.post.title).toEqual("업데이트 게시글 타이틀");
    expect(res1.body.post.contents).toEqual("업데이트 게시글 내용");
    expect(res1.body.post.category).toEqual("team");
    expect(res1.body.post.area).toEqual("게더타운");
    expect(res1.body.post.tags).toEqual(
      expect.arrayContaining(["노드", "익스프레스", "타입스크립트"])
    );
  });

  // 모집 글 신청 수락
  // 1. 작성자만 수락할 수 있다.
  // 2. 이미 수락된 유저는 수락할 수 없다.
  // 3. 모집 완료된 글은 더 수락할 수 없다.
  it("Fail 권한 없이 모집 글 신청 수락", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${notAccessToken}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("모집 글 신청 수락", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server).get(`/api/posts/${postId}`).send();
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.post.memberCount).toEqual(1);
  });

  it("Fail 이미 수락한 유저 모집 글 신청 수락", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("이미 등록된 인원입니다.");
  });

  // 수락 취소 테스트
  // 취소 조건
  // 1. 작성자
  // 2. 이미 팀으로 포함된 사람
  // 3. 글 존재 여부
  it("작성자가 신청자 취소", async () => {
    await request(server)
      .delete(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    const res = await request(server).get(`/api/posts/${postId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.post.memberCount).toEqual(0);
  });

  it("Fail 없는 신청자 취소", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("등록되지 않은 인원입니다.");
  });

  it("Fail 작성자 아닌 사람이 신청 취소", async () => {
    // 신청자 수락
    await request(server)
      .post(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    // 신청자가 신청 취소
    const res = await request(server)
      .delete(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${notAccessToken}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("모집 글 모집 완료", async () => {
    const res = await request(server)
      .patch(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);

    const res1 = await request(server).get(`/api/posts/${postId}`).send();
    expect(res1.body.post.isCompleted).toEqual(true);
  });

  it("Fail 완료된 모집 글 신청 수락", async () => {
    const res = await request(server)
      .post(`/api/posts/${postId}/cast`)
      .set("Cookie", [`access-token=${token}`])
      .send({
        userId: applyUserId,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.msg).toEqual("이미 마감된 모임입니다.");
  });

  it("Fail 권한 없이 모집 글 모집 완료", async () => {
    const res = await request(server)
      .patch(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${notAccessToken}`])
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 없는 모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gather";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put("/api/posts/sdlfkjsadfioqef")
      .set("Cookie", [`access-token=${token}`])
      .send({
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("Fail 다른 작성자가 모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gather";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${notAccessToken}`])
      .send({
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 로그인 없이 모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gather";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server).put(`/api/posts/${postId}`).send({
      title,
      contents,
      subject,
      category,
      area,
      tags,
    });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("Fail 권한 없이 모집 글 삭제 기능 테스트", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${notAccessToken}`])
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 없는 모집 글 삭제 기능 테스트", async () => {
    const res = await request(server)
      .delete("/api/posts/sldkfjqpeqwdas")
      .set("Cookie", [`access-token=${token}`])
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("Fail 로그인 없이 글 삭제 기능 테스트", async () => {
    const res = await request(server).delete(`/api/posts/${postId}`).send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("모집 글 삭제 기능 테스트", async () => {
    const res = await request(server)
      .delete(`/api/posts/${postId}`)
      .set("Cookie", [`access-token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res1 = await request(server).get(`/api/posts/${postId}`).send();

    expect(res1.statusCode).toEqual(403);
    expect(res1.body.isOk).toEqual(false);
    expect(res1.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("posts").deleteMany({});
  });
});

describe("모든 모집 글 리스트 조회 테스트", () => {
  const connection = db.createConnection(
    `mongodb://${config.mongoHost}:${config.mongoPort}/coderland`
  );
  let token = "";

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "0809032903902923",
      nickname: "testuuu",
      grade: 1,
    });

    token += createToken({ googleId: "0809032903902923" });
    token = `s:${sign(token, config.COOKIE_SECRET)}`;
  });

  it("모든 모집 글 리스트 조회 테스트", async () => {
    await request(server)
      .post("/api/posts")
      .set("Cookie", [`access-token=${token}`])
      .send({
        title: "titlelkj",
        contents: "sdkfjlksdjf",
        subject: "gather",
        category: "study",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    await request(server)
      .post("/api/posts")
      .set("Cookie", [`access-token=${token}`])
      .send({
        title: "titlasdfsdfelkj",
        contents: "sdkfjasdfsdaflksdjf",
        subject: "gather",
        category: "code",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    await request(server)
      .post("/api/posts")
      .set("Cookie", [`access-token=${token}`])
      .send({
        title: "titlwerqerelkj",
        contents: "sdkfjlksdjf",
        subject: "gather",
        category: "team",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    const res = await request(server)
      .get("/api/posts")
      .query({ subject: "gather" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.posts.length).toEqual(3);

    const res1 = await request(server)
      .get("/api/posts")
      .query({ subject: "gather", category: "team" })
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.isOk).toEqual(true);
    expect(res1.body.posts.length).toEqual(1);
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("posts").deleteMany({});
  });
});
