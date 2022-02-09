import { IUserModel } from "user";
import { IPostDocument } from "post";
import { User } from "../models";
import { parsePostBySubject } from "../utils";

export default class UserService {
  private UserModel: IUserModel;

  constructor() {
    this.UserModel = User;
  }

  async findAllBookmarks(userId: string) {
    const { bookmarks } = await this.UserModel.findAllBookmarks(userId);
    const parsedBookmarks = bookmarks.map((post: IPostDocument) =>
      parsePostBySubject(post.toObject().subject, post.toObject(), userId)
    );
    return parsedBookmarks;
  }

  async updateUser(userId: string, nickname: string) {
    await this.UserModel.updateUser(userId, nickname);
  }
}
