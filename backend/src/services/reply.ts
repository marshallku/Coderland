import { ICommentModel } from "comment";
import { IUserDocument } from "user";

export default class ReplyService {
  CommentModel: ICommentModel;

  constructor(CommentModel: ICommentModel) {
    this.CommentModel = CommentModel;
  }

  async createReply(commentId: string, user: IUserDocument, contents: string) {
    await this.CommentModel.createReply(commentId, user, contents);
  }
}
