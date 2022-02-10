import { IUserModel } from "user";
import { IPostDocument } from "post";
import axios, { AxiosResponse } from "axios";
import { User } from "../models";
import { parsePostBySubject } from "../utils";

export default class UserService {
  private UserModel: IUserModel;

  constructor() {
    this.UserModel = User;
  }

  // 유저 북마크 호출
  async findAllBookmarks(userId: string) {
    const { bookmarks } = await this.UserModel.findAllBookmarks(userId);
    const parsedBookmarks = bookmarks.map((post: IPostDocument) =>
      parsePostBySubject(post.toObject().subject, post.toObject(), userId)
    );
    return parsedBookmarks;
  }

  // 유저 정보 수정
  async updateUser(userId: string, nickname: string) {
    await this.UserModel.updateUser(userId, nickname);
  }

  // 유저 인증 키 가져오기
  async getUserAuthKey(userId: string) {
    const authKey = await this.UserModel.getUserAuthKey(userId);
    return authKey;
  }

  // 유저 인증키 확인 후 등급 업
  async checkUserAuthKey(userId: string, username: string) {
    const gitlabUrl = `http://${username}.kdt-gitlab.elice.io/auth/`;
    const authKey = await this.UserModel.getUserAuthKey(userId);

    let result: AxiosResponse;
    try {
      result = await axios.get(gitlabUrl);
    } catch (error) {
      throw new Error("유저 ID를 확인해주세요!");
    }
    if (!String(result.data).includes(authKey)) {
      throw new Error("인증키를 확인해주세요!");
    }
    await this.UserModel.updateGrade(userId);
  }
}
