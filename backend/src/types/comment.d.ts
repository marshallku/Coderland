import mongoose, { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPostDocument } from "post";
import { IPagination } from "pagination";

export interface IReply {
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReplyDto {
  commentId: string;
  replyId: string;
  contents: string;
}

export interface IReplyDocument extends IReply, Document {}

type ParentDocument = IPostDocument | ICommentDocument;

export interface IComment {
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  parentId: mongoose.Types.ObjectId;
  likes: number;
  anonymous: boolean;
  replies: IReplyDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, Document {}

export interface ICommentModel extends Model<ICommentDocument> {
  findCommentById: (commentId: string) => Promise<ICommentDocument>;

  createComment: (
    user: IUserDocument,
    commentDto: { parent: ParentDocument; contents: string }
  ) => Promise<ICommentDocument>;

  findAllComments: (
    parentId: string,
    currentPage: number
  ) => Promise<[ICommentDocument[], IPagination]>;

  updateComment: (commentId: string, contents: string) => Promise<void>;

  deleteComment: (commentId: string) => Promise<void>;

  createReply: (
    commentId: string,
    author: IUserDocument,
    contents: string
  ) => Promise<void>;

  updateReply: (
    user: IUserDocument,
    replyDto: { commentId: string; replyId: string; contents: string }
  ) => Promise<void>;
}
