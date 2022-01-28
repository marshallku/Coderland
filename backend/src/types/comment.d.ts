import mongoose, { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPostDocument } from "post";
import { IPagination } from "pagination";
import { IGatherDocument } from "gather";

type ParentDocument = IPostDocument | IGatherDocument | ICommentDocument;

export interface IComment {
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  parentId: mongoose.Types.ObjectId;
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
    commentDto: { parent: ParentDocument; contents: string }
  ) => Promise<ICommentDocument>;

  findAllComments: (
    parentId: string,
    currentPage: number
  ) => Promise<[ICommentDocument[], IPagination]>;

  updateComment: (commentId: string, contents: string) => Promise<void>;

  deleteComment: (commentId: string) => Promise<void>;
}
