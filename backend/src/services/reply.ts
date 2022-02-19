import { ICommentModel, IReplyDto } from "comment";
import { IUserDocument } from "user";
import { Comment } from "../models";

export default class ReplyService {
  private CommentModel: ICommentModel;

  constructor() {
    this.CommentModel = Comment;
  }

  async createReply(commentId: string, user: IUserDocument, contents: string) {
    await this.CommentModel.createReply(commentId, user, contents);
  }

  async updateReply(replyDto: IReplyDto) {
    try {
      await this.CommentModel.updateReply(replyDto);
    } catch (error) {
      throw new Error("뭔가가 잘못되었어요...");
    }
  }

  async deleteReply(replyDto: Pick<IReplyDto, "commentId" | "replyId">) {
    try {
      await this.CommentModel.deleteReply(replyDto);
    } catch (error) {
      throw new Error("뭔가가 잘못되었어요...");
    }
  }
}
