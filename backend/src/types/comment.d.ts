import { Document, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";

export interface IComment {
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, Document {}
