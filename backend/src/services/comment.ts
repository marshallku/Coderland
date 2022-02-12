import { IUserDocument } from "user";
import { ICommentModel } from "comment";
import { IPostModel } from "post";
import { Post, Comment } from "../models";
import { parseReply, createAuthorName } from "../utils";

export default class CommentService {
  private ParentModel: IPostModel | ICommentModel;

  private CommentModel: ICommentModel;

  private parentId: string | undefined;

  constructor(parentId?: string) {
    this.ParentModel = Post;
    this.CommentModel = Comment;
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

  async findAllComments(userId: string) {
    const comments = await this.CommentModel.findAllComments(this.parentId);
    const parsedComments = comments.map((comment) => {
      const { author, anonymous, replies, isPostAuthor, likeUsers, ...rest } =
        comment.toObject();
      return {
        ...rest,
        isPostAuthor,
        isLiked: likeUsers.includes(userId),
        replies: parseReply(
          replies,
          anonymous,
          author,
          isPostAuthor,
          this.parentId
        ),
        author: createAuthorName(anonymous, author, this.parentId),
      };
    });
    return parsedComments;
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
      const isDeleted = await this.CommentModel.deleteComment(commentId);
      if (isDeleted) {
        await parent.updateOne({ $inc: { commentCount: -1 } });
      }
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }

  async updateLike(commentId: string, userId: string) {
    await this.CommentModel.updateLike(commentId, userId);
  }
}
