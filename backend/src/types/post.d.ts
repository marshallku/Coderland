import { Document, Model, PopulatedDoc } from "mongoose";
import { ICommentDocument } from "comment";
import { IUserDocument } from "user";

export interface IPost {
  title: string;
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  comments: ICommentDocument[];
  views: number;
  likes: number;
  subject: "review" | "article" | "dev" | "recruit" | "chat";
  category: "none";
  anonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends Model<IPostDocument> {
  findPostById: (postId: string) => Promise<IPostDocument>;
}
