import { IUserDocument, IUserModel } from "user";
import { IPostDocument } from "post";
import axios, { AxiosResponse } from "axios";
import { PushSubscription } from "web-push";
import config from "../config";
import { User } from "../models";
import { parsePostBySubject } from "../utils";

export default class UserService {
  private UserModel: IUserModel;

  constructor() {
    this.UserModel = User;
  }

  // 유저 북마크 호출
  async findAllBookmarks(userId: string, currentPage: number) {
    const { bookmarks } = await this.UserModel.findAllBookmarks(userId);
    const parsedBookmarks = bookmarks.map((post: IPostDocument) =>
      parsePostBySubject(post.toObject().subject, post.toObject(), userId)
    );

    // bookmark pagination
    const total = parsedBookmarks.length;
    const lastPage = Math.ceil(total / config.perPage);
    const startIdx = (currentPage - 1) * config.perPage;
    const lastIdx =
      startIdx + config.perPage > total ? total : startIdx + config.perPage;
    const returnedBookmark = parsedBookmarks.slice(startIdx, lastIdx);

    return [returnedBookmark, { currentPage, lastPage }];
  }

  // 유저 정보 수정
  async updateUser(userId: string, userDto: Partial<IUserDocument>) {
    await this.UserModel.updateUser(userId, userDto);
  }

  async withdrawUser(userId: string) {
    await this.UserModel.withdrawUser(userId);
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

  // 유저 푸시 알림 기기 추가
  async pushSubscription(userId: string, subscription: PushSubscription) {
    await this.UserModel.pushSubscription(userId, subscription);
  }

  // 유저 푸시 알림 기기 제거
  async pullSubscription(userId: string, endpoint: string) {
    await this.UserModel.pullSubscription(userId, endpoint);
  }
}
