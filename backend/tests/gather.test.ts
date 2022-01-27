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
  });

  it("모임 게시글 생성 테스트", async () => {
    const title = "모집 게시글 타이틀";
    const contents = "모집 게시글 내용";
    const subject = "gathering";
    const category = "study";
    const memberLimitCount = 10;
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
        memberLimitCount,
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

  afterAll(async () => {
    await connection.collection("users").deleteMany({});
    await connection.collection("gathers").deleteMany({});
  });
});
