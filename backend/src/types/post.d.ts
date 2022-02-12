import { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPagination } from "pagination";

export type subjects =
  | "review"
  | "article"
  | "dev"
  | "recruit"
  | "chat"
  | "gather";

export type categories = "study" | "code" | "team" | "none";

export interface IPost {
  title: string;
  contents: string;
  excerpt: string;
  author: PopulatedDoc<IUserDocument>;
  commentCount: number;
  views: number;
  likes: number;
  likeUsers: string[];
  bookmarks: number;
  bookmarkUsers: string[];
  subject: subjects;
  anonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGatherPost extends IPost {
  // subejct가 gather 때만 포함될 내용
  category?: categories;
  area?: string;
  isCompleted?: boolean;
  members?: IUserDocument[];
  tags?: string[];
  icon?: string;
}

export interface IPostDocument extends IGatherPost, Document {}

export interface IPostModel extends Model<IPostDocument> {
  findAllPosts: (
    subject: string,
    category: string,
    currentPage: number,
    perPage: number
  ) => Promise<[IPostDocument[], IPagination]>;

  findPostById: (postId: string) => Promise<IPostDocument>;

  createPost: (
    user: IUserDocument,
    postDto: Partial<IPostDocument>,
    gatherDto: Partial<IPostDocument>
  ) => Promise<IPostDocument>;

  updatePost: (
    postId: string,
    postDto: Partial<IPostDocument>,
    gatherDto: Partial<IPostDocument>
  ) => Promise<void>;

  deletePost: (postId: string) => Promise<IPostDocument>;

  completePost: (postId: string) => Promise<void>;

  updateLike: (postId: string, userId: string) => Promise<void>;

  updateBookmark: (postId: string, userId: string) => Promise<void>;

  allowAppliedUser: (postId: string, user: IUserDocument) => Promise<void>;
}
