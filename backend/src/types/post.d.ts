import { Document, Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";

type subjects = "review" | "article" | "dev" | "recruit" | "chat" | "gather";

type categories = "study" | "code" | "team" | "none";

interface IPagination {
  currentPage: number;
  lastPage: number;
}

interface IPost {
  title: string;
  contents: string;
  excerpt: string;
  author: PopulatedDoc<IUserDocument>;
  commentCount: number;
  viewUsers: string[];
  likes: number;
  likeUsers: string[];
  bookmarks: number;
  bookmarkUsers: string[];
  subject: subjects;
  anonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  isAuthor?: boolean;
}

interface IGatherPost extends IPost {
  // subejct가 gather 때만 포함될 내용
  category?: categories;
  area?: string;
  isCompleted?: boolean;
  members?: IUserDocument[];
  tags?: string[];
  icon?: string;
}

interface IPostDocument extends IGatherPost, Document {}

interface IPostModel extends Model<IPostDocument> {
  findAllPosts: (
    subject: string,
    category: string,
    currentPage: number,
    perPage: number
  ) => Promise<[IPostDocument[], IPagination]>;

  findPostById: (postId: string) => Promise<IPostDocument>;

  countViews: (postId: string, userId: string) => Promise<void>;

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

  addLike: (postId: string, userId: string) => Promise<void>;
  deleteLike: (postId: string, userId: string) => Promise<void>;

  addBookmark: (postId: string, userId: string) => Promise<void>;
  deleteBookmark: (postId: string, userId: string) => Promise<void>;

  addAppliedUser: (postId: string, user: IUserDocument) => Promise<void>;

  removeAppliedUser: (postId: string, user: IUserDocument) => Promise<void>;
}
