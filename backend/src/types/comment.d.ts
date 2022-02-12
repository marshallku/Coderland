import mongoose, { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPostDocument } from "post";

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
  likeUsers: string[];
  anonymous: boolean;
  isPostAuthor: boolean;
  isDeleted: boolean;
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

  findAllComments: (parentId: string) => Promise<ICommentDocument[]>;

  updateComment: (commentId: string, contents: string) => Promise<void>;

  deleteComment: (commentId: string) => Promise<boolean>;

  createReply: (
    commentId: string,
    user: IUserDocument,
    contents: string
  ) => Promise<void>;

  updateReply: (replyDto: IReplyDto) => Promise<void>;

  deleteReply: (
    replyDto: Pick<IReplyDto, "commentId" | "replyId">
  ) => Promise<void>;

  updateLike: (commentId: string, userId: string) => Promise<void>;
}
