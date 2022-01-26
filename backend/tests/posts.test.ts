import request from "supertest";
import "regenerator-runtime";
import db from "mongoose";
import { IUserDocument } from "../src/types/user";
import server from "../src/app";
import configs from "../src/config/configs";
import { createToken } from "../src/passport/strategies/jwt";

jest.setTimeout(10000);

describe("일반 포스트 기능 테스트", () => {
  const connection = db.createConnection(`${configs.mongoUri}/coderland`);
  let token = "Bearer ";
  let userId: db.Types.ObjectId;

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
    userId = user._id;
  });

  it("포스트 조회 테스트", async () => {
    // given
    const post = await connection.collection("posts").insertOne({
      title: "title",
      contents: "contents",
      author: userId,
      comments: [],
      views: 0,
      likes: 0,
      subject: "article",
      category: "none",
      anonymous: false,
    });
    const postId = post.insertedId.toString();

    // when
    const res = await request(server)
      .get(`/api/posts/${postId}`)
      .set("authorization", token)
      .send();

    // then
    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.post.title).toEqual("title");
  });

  afterAll(async () => {
    await connection
      .collection("users")
      .deleteOne({ googleId: "1230707070702022" });
    await connection.collection("posts").deleteMany({});
    db.disconnect();
  });
});
