import { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPostDocument } from "post";
import { IPagination } from "pagination";

export interface IComment {
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  postId: PopulatedDoc<IPostDocument>;
  likes: number;
  anonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, Document {}

export interface ICommentModel extends Model<ICommentDocument> {
  findCommentById: (commentId: string) => Promise<ICommentDocument>;
  createComment: (
    user: IUserDocument,
    commentDto: { postId: string; contents: string }
  ) => Promise<ICommentDocument>;
  findAllComments: (
    postId: string,
    page: number
  ) => Promise<[ICommentDocument[], IPagination]>;
  updateComment: (commentId: string, contents: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
}
