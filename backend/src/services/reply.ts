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
    try {
      await this.CommentModel.updateReply(user, replyDto);
    } catch (error) {
      throw new Error("뭔가가 잘못되었어요...");
    }
  }

  async deleteReply(
    user: IUserDocument,
    replyDto: Pick<IReplyDto, "commentId" | "replyId">
  ) {
    try {
      await this.CommentModel.deleteReply(user, replyDto);
    } catch (error) {
      throw new Error("뭔가가 잘못되었어요...");
    }
  }
}
