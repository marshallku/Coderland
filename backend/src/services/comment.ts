import { IUserDocument } from "user";
import { ICommentModel } from "comment";
import { IPostModel } from "post";
import { IGatherModel } from "gather";

export default class CommentService {
  ParentModel: IPostModel | IGatherModel | ICommentModel;

  parentId: string | undefined;

  CommentModel: ICommentModel;

  constructor(
    ParentModel: IPostModel | IGatherModel | ICommentModel,
    CommentModel: ICommentModel,
    parentId?: string
  ) {
    this.ParentModel = ParentModel;
    this.CommentModel = CommentModel;
    this.parentId = parentId;
  }

  async createComment(user: IUserDocument, contents: string) {
    try {
      const parent = await this.ParentModel.findById(this.parentId);
      const comment = await this.CommentModel.createComment(user, {
        parent,
        contents,
      });
      await parent.updateOne({ $inc: { commentCount: 1 } });
      return comment._id;
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }

  async findAllComments(currentPage: number) {
    const [comments, pagination] = await this.CommentModel.findAllComments(
      this.parentId,
      currentPage
    );
    const parsedComments = comments.map((comment) => {
      const { author, anonymous, ...rest } = comment.toObject();
      return {
        ...rest,
        author: anonymous ? "anonymity" : author.nickname,
      };
    });
    return [parsedComments, pagination];
  }

  async updateComment(commentId: string, contents: string) {
    try {
      await this.CommentModel.updateComment(commentId, contents);
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }

  async deleteComment(commentId: string) {
    try {
      const parent = this.ParentModel.findById(this.parentId);
      await this.CommentModel.deleteComment(commentId);
      await parent.updateOne({ $inc: { commentCount: -1 } });
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }
}
