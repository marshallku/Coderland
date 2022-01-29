import { ICommentModel, IReplyDto } from "comment";
import { IUserDocument } from "user";

export default class ReplyService {
  CommentModel: ICommentModel;

  constructor(CommentModel: ICommentModel) {
    this.CommentModel = CommentModel;
  }

  async createReply(commentId: string, user: IUserDocument, contents: string) {
    await this.CommentModel.createReply(commentId, user, contents);
  }

  async updateReply(user: IUserDocument, replyDto: IReplyDto) {
    await this.CommentModel.updateReply(user, replyDto);
  }
}
