import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import { createToken } from "../src/passport/strategies/jwt";
import configs from "../src/config";

describe("모임 게시글 기능 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let gatherId: string;
  let notAccessToken = "Bearer ";

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "130471033098230",
      nickname: "testuuu",
      name: "family givn2",
      profile: "profile poto url2",
      grade: 0,
    });
    const user = <IUserDocument>await connection.collection("users").findOne({
      googleId: "130471033098230",
    });
    token += createToken(user);

    await connection.collection("users").insertOne({
      googleId: "10374183748917238",
      nickname: "te2434stuuu",
      name: "family givn2",
      profile: "profile poto url2",
      grade: 0,
    });

    const notAccessUser = <IUserDocument>(
      await connection.collection("users").findOne({
        googleId: "10374183748917238",
      })
    );
    notAccessToken += createToken(notAccessUser);
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

  it("모임 게시글 리스트 조회 테스트", async () => {
    const res = await request(server)
      .get("/api/gathers")
      .query({ category: "study" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "gathers", "pagination"])
    );
    expect(res.body.gathers.length).toEqual(1);
    expect(res.body.gathers[0].author).toEqual("testuuu");
  });

  it("비어있는 리스트 모임 게시글 리스트 조회 테스트", async () => {
    const res = await request(server)
      .get("/api/gathers")
      .query({ category: "code" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "gathers", "pagination"])
    );
    expect(res.body.gathers.length).toEqual(0);
  });

  it("모임 게시글 조회 테스트", async () => {
    const res = await request(server).get(`/api/gathers/${gatherId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "gather"])
    );
    expect(res.body.gather.title).toEqual("모집 게시글 타이틀");
    expect(res.body.gather.author).toEqual("testuuu");
  });

  it("Fail 없는 모임 게시글 조회 테스트", async () => {
    const res = await request(server).get("/api/gathers/salkjdfksdjflk").send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gathering";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put(`/api/gathers/${gatherId}`)
      .set("authorization", token)
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

    const res1 = await request(server).get(`/api/gathers/${gatherId}`).send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.isOk).toEqual(true);
    expect(res1.body.gather.title).toEqual("업데이트 게시글 타이틀");
    expect(res1.body.gather.contents).toEqual("업데이트 게시글 내용");
    expect(res1.body.gather.category).toEqual("team");
    expect(res1.body.gather.area).toEqual("게더타운");
    expect(res1.body.gather.tags).toEqual(
      expect.arrayContaining(["노드", "익스프레스", "타입스크립트"])
    );
  });

  it("Fail 없는 모집 게시글 수정", async () => {
    const title = "업데이트 게시글 타이틀";
    const contents = "업데이트 게시글 내용";
    const subject = "gathering";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put("/api/gathers/sdlfkjsadfioqef")
      .set("authorization", token)
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
    const subject = "gathering";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server)
      .put(`/api/gathers/${gatherId}`)
      .set("authorization", notAccessToken)
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
    const subject = "gathering";
    const category = "team";
    const area = "게더타운";
    const tags = ["노드", "익스프레스", "타입스크립트"];

    const res = await request(server).put(`/api/gathers/${gatherId}`).send({
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
      .delete(`/api/gathers/${gatherId}`)
      .set("authorization", notAccessToken)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없어요...");
  });

  it("Fail 없는 모집 글 삭제 기능 테스트", async () => {
    const res = await request(server)
      .delete("/api/gathers/sldkfjqpeqwdas")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("Fail 로그인 없이 글 삭제 기능 테스트", async () => {
    const res = await request(server).delete(`/api/gathers/${gatherId}`).send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다!");
  });

  it("모집 글 삭제 기능 테스트", async () => {
    const res = await request(server)
      .delete(`/api/gathers/${gatherId}`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);

    const res1 = await request(server).get(`/api/gathers/${gatherId}`).send();

    expect(res1.statusCode).toEqual(403);
    expect(res1.body.isOk).toEqual(false);
    expect(res1.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("gathers").deleteMany({});
  });
});

describe("모든 모집 글 리스트 조회 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";

  beforeAll(async () => {
    await connection.collection("users").insertOne({
      googleId: "0809032903902923",
      nickname: "testuuu",
      name: "family givn2",
      profile: "profile poto url2",
      grade: 0,
    });
    const user = <IUserDocument>await connection.collection("users").findOne({
      googleId: "0809032903902923",
    });
    token += createToken(user);
  });

  it("모든 모집 글 리스트 조회 테스트", async () => {
    await request(server)
      .post("/api/gathers")
      .set("authorization", token)
      .send({
        title: "titlelkj",
        contents: "sdkfjlksdjf",
        subject: "gathering",
        category: "study",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    await request(server)
      .post("/api/gathers")
      .set("authorization", token)
      .send({
        title: "titlasdfsdfelkj",
        contents: "sdkfjasdfsdaflksdjf",
        subject: "gathering",
        category: "code",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    await request(server)
      .post("/api/gathers")
      .set("authorization", token)
      .send({
        title: "titlwerqerelkj",
        contents: "sdkfjlksdjf",
        subject: "gathering",
        category: "team",
        area: "서울",
        tags: ["자바스크립트", "타입스크립트"],
      });

    const res = await request(server).get("/api/gathers").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.gathers.length).toEqual(3);

    const res1 = await request(server)
      .get("/api/gathers")
      .query({ category: "team" })
      .send();

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.isOk).toEqual(true);
    expect(res1.body.gathers.length).toEqual(1);
  });

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("gathers").deleteMany({});
  });
});
