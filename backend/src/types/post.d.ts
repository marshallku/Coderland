import { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPagination } from "pagination";

export type subjects =
  | "review"
  | "article"
  | "dev"
  | "recruit"
  | "chat"
  | "gathering";

export interface IPost {
  title: string;
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  commentCount: number;
  views: number;
  likes: number;
  subject: subjects;
  anonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends Model<IPostDocument> {
  findAllPosts: (
    subject: string,
    page: number
  ) => Promise<[IPostDocument[], IPagination]>;

  findPostById: (postId: string) => Promise<IPostDocument>;

  viewCount: (post: IPostDocument) => Promise<IPostDocument>;

  createPost: (
    user: IUserDocument,
    postDto: Partial<IPostDocument>
  ) => Promise<IPostDocument>;

  updatePost: (
    postId: string,
    postDto: Pick<IPostDocument, "title" | "contents" | "subject">
  ) => Promise<void>;

  deletePost: (postId: string) => Promise<void>;
}
